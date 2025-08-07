package com.ssafy.haeruhand.domain.location.service;

import com.ssafy.haeruhand.domain.location.dto.response.CloseRoomResponse;
import com.ssafy.haeruhand.domain.location.dto.response.CreateRoomResponse;
import com.ssafy.haeruhand.domain.location.dto.response.RoomInfoResponse;
import com.ssafy.haeruhand.domain.location.entity.LocationShareMember;
import com.ssafy.haeruhand.domain.location.entity.LocationShareRoom;
import com.ssafy.haeruhand.domain.location.repository.LocationShareMemberRepository;
import com.ssafy.haeruhand.domain.location.repository.LocationShareRoomRepository;
import com.ssafy.haeruhand.domain.user.entity.User;
import com.ssafy.haeruhand.domain.user.repository.UserRepository;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.jwt.JwtProvider;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import com.ssafy.haeruhand.domain.location.enums.MemberColor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LocationShareRoomService {

    private final LocationShareRoomRepository roomRepository;
    private final LocationShareMemberRepository memberRepository;
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;



    @Transactional
    public CreateRoomResponse createRoom(String bearerToken) {
        // 토큰에서 사용자 ID 추출
        String accessToken = bearerToken.replace("Bearer ", "");
        Long userId = jwtProvider.validateAndGetUserId(accessToken);
        
        // 방 코드 생성
        String roomCode = generateUniqueRoomCode();
        
        LocalDateTime now = LocalDateTime.now();
        
        // 호스트 사용자 조회
        User hostUser = userRepository.findById(userId)
                .orElseThrow(() -> new GlobalException(ErrorStatus.USER_NOT_FOUND));
        
        // 방 생성
        LocationShareRoom room = LocationShareRoom.builder()
                .roomCode(roomCode)
                .hostUser(hostUser)
                .startedAt(now)
                .build();
        
        room = roomRepository.save(room);
        
        // 호스트를 첫 번째 멤버로 추가
        LocationShareMember hostMember = LocationShareMember.builder()
                .room(room)
                .user(hostUser)
                .isHost(true)
                .color(MemberColor.HOST.getColorCode())
                .lastActiveAt(now)
                .build();
        
        memberRepository.save(hostMember);
        
        // joinToken 생성 (장기간 유효하게 설정 - 24시간)
        String joinToken = jwtProvider.createJoinToken(roomCode, userId, 1440);
        
        // 딥링크 생성
        String deepLink = String.format("seafeet://join?code=%s&token=%s", roomCode, joinToken);
        
        return CreateRoomResponse.builder()
                .roomId(room.getId())
                .roomCode(roomCode)
                .deepLink(deepLink)
                .startedAt(room.getStartedAt())
                .build();
    }

    public RoomInfoResponse getRoomInfo(String roomCode) {
        LocationShareRoom room = roomRepository.findByRoomCodeAndIsDeletedFalse(roomCode)
                .orElseThrow(() -> new GlobalException(ErrorStatus.WEBSOCKET_ROOM_NOT_FOUND));
        
        List<LocationShareMember> members = memberRepository.findByRoomIdAndIsDeletedFalse(room.getId());
        
        // 경과 시간 계산
        long elapsedMin = ChronoUnit.MINUTES.between(room.getStartedAt(), LocalDateTime.now());
        
        // joinToken 재생성 (24시간 유효)
        String joinToken = jwtProvider.createJoinToken(roomCode, room.getHostUser().getId(), 1440);
        String deepLink = String.format("seafeet://join?code=%s&token=%s", roomCode, joinToken);
        
        // 멤버 정보 변환
        List<RoomInfoResponse.MemberInfo> memberInfos = members.stream()
                .map(member -> {
                    User user = userRepository.findById(member.getUser().getId())
                            .orElseThrow(() -> new GlobalException(ErrorStatus.USER_NOT_FOUND));
                    
                    return RoomInfoResponse.MemberInfo.builder()
                            .userId(member.getUser().getId())
                            .nickname(user.getNickname())
                            .color(member.getColor())
                            .isHost(member.getIsHost())
                            .joinedAt(member.getJoinedAt())
                            .lastActiveAt(member.getLastActiveAt())
                            .build();
                })
                .collect(Collectors.toList());
        
        RoomInfoResponse.RoomInfo roomInfo = RoomInfoResponse.RoomInfo.builder()
                .roomId(room.getId())
                .roomCode(room.getRoomCode())
                .hostUserId(room.getHostUser().getId())
                .isActive(room.getIsActive())
                .startedAt(room.getStartedAt())
                .elapsedMin(elapsedMin)
                .maxMembers(MemberColor.getMaxMembers())
                .currentMemberCount(members.size())
                .build();
        
        return RoomInfoResponse.builder()
                .roomInfo(roomInfo)
                .deepLink(deepLink)
                .members(memberInfos)
                .build();
    }

    @Transactional
    public CloseRoomResponse closeRoom(String roomCode) {
        LocationShareRoom room = roomRepository.findByRoomCodeAndIsActiveTrueAndIsDeletedFalse(roomCode)
                .orElseThrow(() -> new GlobalException(ErrorStatus.WEBSOCKET_ROOM_NOT_FOUND));
        
        room.close();
        
        return CloseRoomResponse.builder()
                .success(true)
                .closedAt(room.getClosedAt())
                .build();
    }
    
    public LocationShareRoom findActiveRoom(String roomCode) {
        return roomRepository.findByRoomCodeAndIsActiveTrueAndIsDeletedFalse(roomCode)
                .orElseThrow(() -> new GlobalException(ErrorStatus.WEBSOCKET_ROOM_NOT_FOUND));
    }

    private String generateUniqueRoomCode() {
        String roomCode;
        do {
            roomCode = generateRoomCode();
        } while (roomRepository.existsByRoomCodeAndIsDeletedFalse(roomCode));
        return roomCode;
    }

    private String generateRoomCode() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuilder sb = new StringBuilder(6);
        
        for (int i = 0; i < 6; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        
        return sb.toString();
    }

}