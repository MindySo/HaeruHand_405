package com.ssafy.haeruhand.global.websocket;

import com.ssafy.haeruhand.domain.location.entity.LocationShareRoom;
import com.ssafy.haeruhand.domain.location.service.LocationShareMemberService;
import com.ssafy.haeruhand.domain.location.service.LocationShareRoomService;
import com.ssafy.haeruhand.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.List;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class WsHandshakeInterceptor implements HandshakeInterceptor {

    private final JwtProvider jwtProvider;
    private final LocationShareRoomService roomService;
    private final LocationShareMemberService memberService;
    private final RedisTemplate<String, String> redisTemplate;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, 
                                 ServerHttpResponse response,
                                 WebSocketHandler wsHandler, 
                                 Map<String, Object> attributes) throws Exception {
        
        try {
            // 1. accessJWT 인증 → userId 추출
            String accessToken = extractBearerToken(request);
            Long userId = jwtProvider.validateAndGetUserId(accessToken);
            
            // 2. room-code 조회 → is_active 검사
            String roomCode = extractHeader(request, "room-code");
            LocationShareRoom room = roomService.findActiveRoom(roomCode);
            
            // 3. 최대 인원 체크 (4명 제한)
            int currentMemberCount = memberService.getActiveMemberCount(room.getId());
            boolean isExistingMember = memberService.isMemberExists(room.getId(), userId);
            
            if (!isExistingMember && currentMemberCount >= 4) {
                log.warn("Room {} is full. Max members: 4", roomCode);
                return false;
            }
            
            // 4. joinToken 검증
            String joinToken = extractHeader(request, "join-token");
            jwtProvider.validateJoinToken(joinToken, roomCode);
            
            // 5. Redis jti 관리 (선택)
            String jti = jwtProvider.getJti(joinToken);
            redisTemplate.opsForValue().setIfAbsent("jti:" + jti, "used");
            
            // 6. 멤버 UPSERT (색상 자동 할당)
            memberService.upsertMember(room.getId(), userId);
            
            attributes.put("userId", userId);
            attributes.put("roomCode", roomCode);
            attributes.put("roomId", room.getId());
            
            log.info("WebSocket handshake successful. User: {}, Room: {}", userId, roomCode);
            return true;
            
        } catch (Exception e) {
            log.error("WebSocket handshake failed: {}", e.getMessage(), e);
            return false;
        }
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, 
                              ServerHttpResponse response,
                              WebSocketHandler wsHandler, 
                              Exception exception) {
        // 핸드셰이크 후 처리가 필요한 경우 구현
    }

    private String extractBearerToken(ServerHttpRequest request) {
        List<String> headers = request.getHeaders().get(HttpHeaders.AUTHORIZATION);
        if (headers == null || headers.isEmpty()) {
            throw new IllegalArgumentException("Authorization header is missing");
        }
        
        String authHeader = headers.get(0);
        if (!authHeader.startsWith("Bearer ")) {
            throw new IllegalArgumentException("Invalid Authorization header format");
        }
        
        return authHeader.substring(7);
    }

    private String extractHeader(ServerHttpRequest request, String headerName) {
        List<String> headers = request.getHeaders().get(headerName);
        if (headers == null || headers.isEmpty()) {
            throw new IllegalArgumentException(headerName + " header is missing");
        }
        return headers.get(0);
    }
}