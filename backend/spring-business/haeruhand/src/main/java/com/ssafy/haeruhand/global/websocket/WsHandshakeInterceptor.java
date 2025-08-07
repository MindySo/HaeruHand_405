package com.ssafy.haeruhand.global.websocket;

import com.ssafy.haeruhand.global.websocket.service.WebSocketAuthService;
import com.ssafy.haeruhand.global.websocket.service.WebSocketSessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class WsHandshakeInterceptor implements HandshakeInterceptor {

    private final WebSocketAuthService authService;
    private final WebSocketSessionService sessionService;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, 
                                 ServerHttpResponse response,
                                 WebSocketHandler wsHandler, 
                                 Map<String, Object> attributes) throws Exception {
        
        // 1. 인증 처리
        WebSocketAuthService.WebSocketAuthResult authResult = authService.authenticateSession(request);
        if (!authResult.isSuccess()) {
            log.error("WebSocket authentication failed: {}", authResult.getErrorMessage());
            return false;
        }
        
        // 2. 세션 연결 처리
        WebSocketSessionService.SessionConnectionResult connectionResult = 
                sessionService.handleConnect(authResult.getUserId(), authResult.getRoomCode(), authResult.getRoomId());
        
        if (!connectionResult.isSuccess()) {
            log.error("WebSocket connection failed: {}", connectionResult.getErrorMessage());
            return false;
        }
        
        // 3. 세션 속성 설정
        sessionService.setSessionAttributes(attributes, authResult.getUserId(), 
                authResult.getRoomCode(), authResult.getRoomId());
        
        log.info("WebSocket handshake successful. User: {}, Room: {}", 
                authResult.getUserId(), authResult.getRoomCode());
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, 
                              ServerHttpResponse response,
                              WebSocketHandler wsHandler, 
                              Exception exception) {
        // 핸드셰이크 후 처리가 필요한 경우 구현
        if (exception != null) {
            log.warn("WebSocket handshake completed with exception: {}", exception.getMessage());
        }
    }
}