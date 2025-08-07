package com.ssafy.haeruhand.global.websocket;

import com.ssafy.haeruhand.domain.location.dto.internal.MemberJoinResultDto;
import com.ssafy.haeruhand.domain.location.entity.LocationShareRoom;
import com.ssafy.haeruhand.domain.location.service.LocationShareRoomService;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.jwt.JwtProvider;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import com.ssafy.haeruhand.global.websocket.service.WebSocketSessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class StompAuthChannelInterceptor implements ChannelInterceptor {

    private final JwtProvider jwtProvider;
    private final LocationShareRoomService roomService;
    private final WebSocketSessionService sessionService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            try {
                // STOMP CONNECT 헤더에서 인증 정보 추출
                String authorization = accessor.getFirstNativeHeader("Authorization");
                String roomCode = accessor.getFirstNativeHeader("room-code");
                String joinToken = accessor.getFirstNativeHeader("join-token");
                
                log.info("STOMP CONNECT - Authorization: {}, Room: {}, JoinToken: {}", 
                    authorization != null ? "present" : "missing", 
                    roomCode,
                    joinToken != null ? "present" : "missing");
                
                // 1. Access Token 검증
                if (authorization == null || !authorization.startsWith("Bearer ")) {
                    throw new GlobalException(ErrorStatus.WEBSOCKET_INVALID_HEADER);
                }
                
                String accessToken = authorization.substring(7);
                Long userId = jwtProvider.validateAndGetUserId(accessToken);
                
                // 2. Room Code 검증
                if (roomCode == null) {
                    throw new GlobalException(ErrorStatus.WEBSOCKET_INVALID_HEADER);
                }
                LocationShareRoom room = roomService.findActiveRoom(roomCode);
                
                // 3. Join Token 검증 및 JTI 추출
                String jti = null;
                if (joinToken != null && !joinToken.isEmpty()) {
                    jwtProvider.validateJoinToken(joinToken, roomCode);
                    jti = jwtProvider.getJti(joinToken);
                }
                
                // 4. 세션 연결 처리 (JTI 중복 연결 체크 포함)
                MemberJoinResultDto connectionResult = 
                        sessionService.handleConnect(userId, roomCode, room.getId(), jti);
                
                if (!connectionResult.isSuccess()) {
                    log.error("WebSocket connection failed: {}", connectionResult.getErrorMessage());
                    throw new GlobalException(ErrorStatus.WEBSOCKET_CONNECTION_FAILED);
                }
                
                // 5. 사용자 정보를 세션에 저장
                accessor.getSessionAttributes().put("userId", userId);
                accessor.getSessionAttributes().put("roomCode", roomCode);
                accessor.getSessionAttributes().put("roomId", room.getId());
                
                log.info("WebSocket STOMP authentication successful. User: {}, Room: {}", userId, roomCode);
                
            } catch (GlobalException e) {
                log.error("WebSocket STOMP authentication failed: {}", e.getErrorStatus().getMessage());
                throw e;
            } catch (Exception e) {
                log.error("WebSocket STOMP authentication failed with unexpected error", e);
                throw new GlobalException(ErrorStatus.WEBSOCKET_CONNECTION_FAILED);
            }
        }
        
        return message;
    }
}