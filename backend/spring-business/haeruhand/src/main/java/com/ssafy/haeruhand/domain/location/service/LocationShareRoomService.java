package com.ssafy.haeruhand.domain.location.service;

import com.ssafy.haeruhand.domain.location.dto.request.CreateRoomRequest;
import com.ssafy.haeruhand.domain.location.dto.response.CloseRoomResponse;
import com.ssafy.haeruhand.domain.location.dto.response.CreateRoomResponse;
import com.ssafy.haeruhand.domain.location.dto.response.RoomInfoResponse;
import com.ssafy.haeruhand.domain.location.entity.LocationShareMember;
import com.ssafy.haeruhand.domain.location.entity.LocationShareRoom;
import com.ssafy.haeruhand.domain.location.repository.LocationShareMemberRepository;
import com.ssafy.haeruhand.domain.location.repository.LocationShareRoomRepository;
import com.ssafy.haeruhand.domain.user.entity.User;
import com.ssafy.haeruhand.domain.user.repository.UserRepository;
import com.ssafy.haeruhand.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${server.host:localhost}")
    private String serverHost;

    @Value("${server.port:8080}")
    private String serverPort;

    private static final String[] MEMBER_COLORS = {
        "#FF0000", // 빨강 (호스트)
        "#0084FF", // 파랑
        "#00C851", // 초록
        "#FF6900"  // 주황
    };

    private static final int MAX_MEMBERS = 4;
    private static final int MIN_EXPIRES_MINUTES = 30;
    private static final int MAX_EXPIRES_MINUTES = 1440; // 24시간

    @Transactional
    public CreateRoomResponse createRoom(Long userId, CreateRoomRequest request) {
        // 방 코드 생성
        String roomCode = generateUniqueRoomCode();
        
        // 만료 시간 검증
        int expiresInMin = validateExpiresInMin(request.getExpiresInMin());
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiresAt = now.plusMinutes(expiresInMin);
        
        // 방 생성
        LocationShareRoom room = LocationShareRoom.builder()
                .roomCode(roomCode)
                .hostUserId(userId)
                .title(request.getTitle() != null ? request.getTitle() : "해루 함께하기")
                .startedAt(now)
                .expiresAt(expiresAt)
                .build();
        
        room = roomRepository.save(room);
        
        // 호스트를 첫 번째 멤버로 추가
        LocationShareMember hostMember = LocationShareMember.builder()
                .room(room)
                .userId(userId)
                .isHost(true)
                .color(MEMBER_COLORS[0])
                .lastActiveAt(now)
                .build();
        
        memberRepository.save(hostMember);
        
        // joinToken 생성 (방 만료 시간과 동일하게 설정)
        String joinToken = jwtProvider.createJoinToken(roomCode, userId, expiresInMin);
        
        // 딥링크 생성
        String deepLink = String.format("seafeet://join?code=%s&token=%s", roomCode, joinToken);
        
        // WebSocket URL
        String wsUrl = String.format("wss://%s:%s/api/ws", serverHost, serverPort);
        
        return CreateRoomResponse.builder()
                .roomId(room.getId())
                .roomCode(roomCode)
                .deepLink(deepLink)
                .wsUrl(wsUrl)
                .startedAt(room.getStartedAt())
                .expiresAt(room.getExpiresAt())
                .build();
    }

    public RoomInfoResponse getRoomInfo(String roomCode) {
        LocationShareRoom room = roomRepository.findByRoomCode(roomCode)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 방입니다."));
        
        List<LocationShareMember> members = memberRepository.findByRoomId(room.getId());
        
        // 경과 시간 계산
        long elapsedMin = ChronoUnit.MINUTES.between(room.getStartedAt(), LocalDateTime.now());
        
        // joinToken 재생성 (남은 시간으로)
        long remainingMin = ChronoUnit.MINUTES.between(LocalDateTime.now(), room.getExpiresAt());
        String joinToken = jwtProvider.createJoinToken(roomCode, room.getHostUserId(), (int) remainingMin);
        String deepLink = String.format("seafeet://join?code=%s&token=%s", roomCode, joinToken);
        
        // 멤버 정보 변환
        List<RoomInfoResponse.MemberInfo> memberInfos = members.stream()
                .map(member -> {
                    User user = userRepository.findById(member.getUserId())
                            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
                    
                    return RoomInfoResponse.MemberInfo.builder()
                            .userId(member.getUserId())
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
                .title(room.getTitle())
                .hostUserId(room.getHostUserId())
                .isActive(room.getIsActive())
                .startedAt(room.getStartedAt())
                .expiresAt(room.getExpiresAt())
                .elapsedMin(elapsedMin)
                .maxMembers(MAX_MEMBERS)
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
        LocationShareRoom room = roomRepository.findByRoomCodeAndIsActiveTrue(roomCode)
                .orElseThrow(() -> new IllegalArgumentException("활성화된 방을 찾을 수 없습니다."));
        
        room.close();
        
        return CloseRoomResponse.builder()
                .success(true)
                .closedAt(room.getClosedAt())
                .build();
    }
    
    public LocationShareRoom findActiveRoom(String roomCode) {
        return roomRepository.findByRoomCodeAndIsActiveTrue(roomCode)
                .orElseThrow(() -> new IllegalArgumentException("활성화된 방을 찾을 수 없습니다."));
    }

    private String generateUniqueRoomCode() {
        String roomCode;
        do {
            roomCode = generateRoomCode();
        } while (roomRepository.existsByRoomCode(roomCode));
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

    private int validateExpiresInMin(Integer expiresInMin) {
        if (expiresInMin == null) {
            return 180; // 기본값 3시간
        }
        if (expiresInMin < MIN_EXPIRES_MINUTES) {
            return MIN_EXPIRES_MINUTES;
        }
        if (expiresInMin > MAX_EXPIRES_MINUTES) {
            return MAX_EXPIRES_MINUTES;
        }
        return expiresInMin;
    }
}