package com.ssafy.haeruhand.domain.location.controller;

import com.ssafy.haeruhand.domain.location.dto.websocket.LocationMessage;
import com.ssafy.haeruhand.domain.location.dto.websocket.LocationUpdateRequest;
import com.ssafy.haeruhand.domain.location.entity.LocationShareMember;
import com.ssafy.haeruhand.domain.location.entity.LocationShareRoom;
import com.ssafy.haeruhand.domain.location.service.LocationShareMemberService;
import com.ssafy.haeruhand.domain.location.service.LocationShareRoomService;
import com.ssafy.haeruhand.domain.location.service.LocationUpdateService;
import com.ssafy.haeruhand.domain.user.entity.User;
import com.ssafy.haeruhand.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Controller
@RequiredArgsConstructor
public class LocationWebSocketController {

    private final SimpMessagingTemplate messagingTemplate;
    private final LocationShareRoomService roomService;
    private final LocationShareMemberService memberService;
    private final LocationUpdateService locationUpdateService;
    private final UserRepository userRepository;

    @MessageMapping("/location.join")
    public void handleJoin(@Header("simpSessionAttributes") Map<String, Object> sessionAttributes) {
        Long userId = (Long) sessionAttributes.get("userId");
        String roomCode = (String) sessionAttributes.get("roomCode");
        Long roomId = (Long) sessionAttributes.get("roomId");
        
        log.info("User {} joined room {}", userId, roomCode);
        
        // 현재 멤버 목록 조회
        List<LocationShareMember> members = memberService.getMembersByRoomId(roomId);
        
        // 멤버 정보 변환
        List<LocationMessage.MemberInfo> memberInfos = members.stream()
                .map(member -> {
                    User user = userRepository.findById(member.getUserId())
                            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
                    
                    return LocationMessage.MemberInfo.builder()
                            .userId(member.getUserId())
                            .nickname(user.getNickname())
                            .color(member.getColor())
                            .isHost(member.getIsHost())
                            .lastActiveAt(member.getLastActiveAt())
                            .build();
                })
                .collect(Collectors.toList());
        
        // 경과 시간 계산
        LocationShareRoom room = roomService.findActiveRoom(roomCode);
        long elapsedMin = java.time.temporal.ChronoUnit.MINUTES.between(
                room.getStartedAt(), LocalDateTime.now());
        
        // 새 참가자에게 멤버 목록 전송
        LocationMessage memberListMessage = LocationMessage.builder()
                .type(LocationMessage.MessageType.MEMBER_LIST)
                .elapsedMin(elapsedMin)
                .members(memberInfos)
                .build();
        
        messagingTemplate.convertAndSendToUser(
                userId.toString(), 
                "/sub/location." + roomCode, 
                memberListMessage);
        
        // 기존 멤버들에게 새 참가자 알림
        User newUser = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        
        LocationShareMember newMember = memberService.getMembersByRoomId(roomId).stream()
                .filter(m -> m.getUserId().equals(userId))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("멤버 정보를 찾을 수 없습니다."));
        
        LocationMessage joinedMessage = LocationMessage.builder()
                .type(LocationMessage.MessageType.MEMBER_JOINED)
                .userId(userId)
                .nickname(newUser.getNickname())
                .color(newMember.getColor())
                .isHost(newMember.getIsHost())
                .joinedAt(newMember.getJoinedAt())
                .build();
        
        messagingTemplate.convertAndSend(
                "/sub/location." + roomCode, 
                joinedMessage);
    }

    @MessageMapping("/location.update")
    public void handleLocationUpdate(@Header("simpSessionAttributes") Map<String, Object> sessionAttributes,
                                    @Payload LocationUpdateRequest request) {
        Long userId = (Long) sessionAttributes.get("userId");
        String roomCode = (String) sessionAttributes.get("roomCode");
        Long roomId = (Long) sessionAttributes.get("roomId");
        
        // 위치 정보를 배치 처리기에 추가
        locationUpdateService.enqueueLocation(roomId, userId, request);
        
        // 다른 멤버들에게 위치 브로드캐스트
        LocationMessage locationMessage = LocationMessage.builder()
                .type(LocationMessage.MessageType.LOCATION)
                .userId(userId)
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .accuracy(request.getAccuracy())
                .receivedAt(LocalDateTime.now())
                .build();
        
        messagingTemplate.convertAndSend(
                "/sub/location." + roomCode, 
                locationMessage);
    }

    @MessageMapping("/location.leave")
    public void handleLeave(@Header("simpSessionAttributes") Map<String, Object> sessionAttributes) {
        Long userId = (Long) sessionAttributes.get("userId");
        String roomCode = (String) sessionAttributes.get("roomCode");
        
        log.info("User {} leaving room {}", userId, roomCode);
        
        // 멤버 제거 및 방 종료 처리는 SessionDisconnectEvent에서 처리
    }
}