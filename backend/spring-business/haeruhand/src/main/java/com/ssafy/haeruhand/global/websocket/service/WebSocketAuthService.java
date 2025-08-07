package com.ssafy.haeruhand.global.websocket.service;

import com.ssafy.haeruhand.domain.location.entity.LocationShareRoom;
import com.ssafy.haeruhand.domain.location.service.LocationShareRoomService;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.jwt.JwtProvider;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

import java.util.List;

/**
 * WebSocket 인증 로직 전담 서비스
 * JWT 토큰 검증, 세션 권한 확인, 인증 실패 처리
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class WebSocketAuthService {

    private final JwtProvider jwtProvider;
    private final LocationShareRoomService roomService;
    private final RedisTemplate<String, String> redisTemplate;

    /**
     * WebSocket 핸드셰이크 시 전체 인증 처리
     */
    public WebSocketAuthResult authenticateSession(ServerHttpRequest request) {
        try {
            // 1. Access Token 추출 및 검증
            String accessToken = extractBearerToken(request);
            Long userId = jwtProvider.validateAndGetUserId(accessToken);
            
            // 2. Room Code 추출 및 방 상태 검증
            String roomCode = extractHeader(request, "room-code");
            LocationShareRoom room = roomService.findActiveRoom(roomCode);
            
            // 3. Join Token 검증
            String joinToken = extractHeader(request, "join-token");
            jwtProvider.validateJoinToken(joinToken, roomCode);
            
            // 4. Redis JTI 관리 (사용자별 중복 연결 추적)
            // 동일한 joinToken으로 여러 사용자가 입장 가능하도록 userId 포함
            String jti = jwtProvider.getJti(joinToken);
            String jtiKey = String.format("jti:%s:user:%d", jti, userId);
            
            // 30분 TTL로 자동 정리, 동일 사용자의 중복 세션 체크
            boolean isNewConnection = redisTemplate.opsForValue()
                    .setIfAbsent(jtiKey, "connected", 30, TimeUnit.MINUTES);
            
            if (!isNewConnection) {
                log.info("User {} reconnecting with existing JTI: {}", userId, jti);
                // 재연결 허용 - 네트워크 끊김 등의 상황 대응
            }
            
            return WebSocketAuthResult.success(userId, roomCode, room.getId());
            
        } catch (GlobalException e) {
            log.error("WebSocket authentication failed: {} ({})", e.getErrorStatus().getMessage(), e.getErrorStatus().getCode());
            return WebSocketAuthResult.failure(e.getErrorStatus().getMessage());
        } catch (Exception e) {
            log.error("WebSocket authentication failed with unexpected error: {}", e.getMessage());
            return WebSocketAuthResult.failure("인증 처리 중 예상치 못한 오류가 발생했습니다.");
        }
    }

    /**
     * Bearer 토큰 추출
     */
    private String extractBearerToken(ServerHttpRequest request) {
        List<String> headers = request.getHeaders().get(HttpHeaders.AUTHORIZATION);
        if (headers == null || headers.isEmpty()) {
            throw new GlobalException(ErrorStatus.WEBSOCKET_INVALID_HEADER);
        }
        
        String authHeader = headers.get(0);
        if (!authHeader.startsWith("Bearer ")) {
            throw new GlobalException(ErrorStatus.WEBSOCKET_INVALID_HEADER);
        }
        
        return authHeader.substring(7);
    }

    /**
     * 커스텀 헤더 추출
     */
    private String extractHeader(ServerHttpRequest request, String headerName) {
        List<String> headers = request.getHeaders().get(headerName);
        if (headers == null || headers.isEmpty()) {
            throw new GlobalException(ErrorStatus.WEBSOCKET_INVALID_HEADER);
        }
        return headers.get(0);
    }

    /**
     * WebSocket 인증 결과 DTO
     */
    public static class WebSocketAuthResult {
        private final boolean success;
        private final String errorMessage;
        private final Long userId;
        private final String roomCode;
        private final Long roomId;

        private WebSocketAuthResult(boolean success, String errorMessage, Long userId, String roomCode, Long roomId) {
            this.success = success;
            this.errorMessage = errorMessage;
            this.userId = userId;
            this.roomCode = roomCode;
            this.roomId = roomId;
        }

        public static WebSocketAuthResult success(Long userId, String roomCode, Long roomId) {
            return new WebSocketAuthResult(true, null, userId, roomCode, roomId);
        }

        public static WebSocketAuthResult failure(String errorMessage) {
            return new WebSocketAuthResult(false, errorMessage, null, null, null);
        }

        public boolean isSuccess() { return success; }
        public String getErrorMessage() { return errorMessage; }
        public Long getUserId() { return userId; }
        public String getRoomCode() { return roomCode; }
        public Long getRoomId() { return roomId; }
    }
}