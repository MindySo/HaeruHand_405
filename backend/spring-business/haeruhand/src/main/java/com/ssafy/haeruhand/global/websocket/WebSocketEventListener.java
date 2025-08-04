package com.ssafy.haeruhand.global.websocket;

import com.ssafy.haeruhand.domain.location.dto.websocket.LocationMessage;
import com.ssafy.haeruhand.domain.location.entity.LocationShareRoom;
import com.ssafy.haeruhand.domain.location.service.LocationShareMemberService;
import com.ssafy.haeruhand.domain.location.service.LocationShareRoomService;
import com.ssafy.haeruhand.domain.user.entity.User;
import com.ssafy.haeruhand.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final SimpMessagingTemplate messagingTemplate;
    private final LocationShareMemberService memberService;
    private final LocationShareRoomService roomService;
    private final UserRepository userRepository;

    @EventListener
    public void handleSessionDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        
        String roomCode = (String) headerAccessor.getSessionAttributes().get("roomCode");
        Long userId = (Long) headerAccessor.getSessionAttributes().get("userId");
        
        if (roomCode == null || userId == null) {
            return; // 인증되지 않은 세션
        }
        
        log.info("Session disconnected. User: {}, Room: {}", userId, roomCode);
        
        try {
            // 사용자 정보 조회
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
            
            // 멤버 제거
            memberService.removeMember(roomCode, userId);
            
            // 남은 멤버 수 확인
            LocationShareRoom room = roomService.findActiveRoom(roomCode);
            int remainingMembers = memberService.getActiveMemberCount(room.getId());
            
            if (remainingMembers == 0) {
                // 방 종료 처리
                roomService.closeRoom(roomCode);
                
                // 경과 시간 계산
                long totalDurationMin = java.time.temporal.ChronoUnit.MINUTES.between(
                        room.getStartedAt(), LocalDateTime.now());
                
                // ROOM_CLOSED 브로드캐스트
                LocationMessage roomClosedMessage = LocationMessage.builder()
                        .type(LocationMessage.MessageType.ROOM_CLOSED)
                        .reason(LocationMessage.CloseReason.HOST_LEFT)
                        .closedAt(LocalDateTime.now())
                        .totalDurationMin(totalDurationMin)
                        .build();
                
                messagingTemplate.convertAndSend(
                        "/sub/location." + roomCode,
                        roomClosedMessage);
                
                log.info("Room {} closed. Total duration: {} minutes", roomCode, totalDurationMin);
            } else {
                // MEMBER_LEFT 브로드캐스트
                LocationMessage memberLeftMessage = LocationMessage.builder()
                        .type(LocationMessage.MessageType.MEMBER_LEFT)
                        .userId(userId)
                        .nickname(user.getNickname())
                        .build();
                
                messagingTemplate.convertAndSend(
                        "/sub/location." + roomCode,
                        memberLeftMessage);
                
                log.info("Member {} left room {}. Remaining members: {}", 
                        user.getNickname(), roomCode, remainingMembers);
            }
        } catch (Exception e) {
            log.error("Error handling session disconnect", e);
        }
    }
}