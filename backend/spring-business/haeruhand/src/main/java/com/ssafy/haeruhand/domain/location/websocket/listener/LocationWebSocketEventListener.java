package com.ssafy.haeruhand.domain.location.websocket.listener;

import com.ssafy.haeruhand.domain.location.dto.internal.MemberLeaveResultDto;
import com.ssafy.haeruhand.domain.location.service.LocationRoomEventService;
import com.ssafy.haeruhand.domain.location.websocket.dto.SessionInfo;
import com.ssafy.haeruhand.domain.location.websocket.service.LocationWebSocketMessageService;
import com.ssafy.haeruhand.domain.location.websocket.service.LocationWebSocketSessionService;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Slf4j
@Component
@RequiredArgsConstructor
public class LocationWebSocketEventListener {

    private final LocationWebSocketSessionService sessionService;
    private final LocationRoomEventService roomEventService;
    private final LocationWebSocketMessageService messageService;

    @EventListener
    public void handleSessionDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        
        try {
            // 세션 정보 추출
            SessionInfo sessionInfo = 
                    sessionService.extractSessionInfo(headerAccessor.getSessionAttributes());
            
            log.info("Session disconnected. User: {}, Room: {}", 
                    sessionInfo.getUserId(), sessionInfo.getRoomCode());
            
            // 멤버 퇴장 및 방 종료 처리
            MemberLeaveResultDto leaveResult = 
                    roomEventService.handleMemberLeave(sessionInfo.getUserId(), sessionInfo.getRoomCode());
            
            if (!leaveResult.isSuccess()) {
                log.error("Failed to handle member leave: {}", leaveResult.getErrorMessage());
                return;
            }
            
            // 메시지 브로드캐스트
            if (leaveResult.isRoomClosed()) {
                messageService.broadcastRoomClosed(leaveResult.getRoomCode(), leaveResult.getMessage());
            } else {
                messageService.broadcastMemberLeft(leaveResult.getRoomCode(), leaveResult.getMessage());
            }
            
        } catch (GlobalException e) {
            if (e.getErrorStatus().equals(ErrorStatus.WEBSOCKET_SESSION_INVALID)) {
                log.warn("Session disconnect event for invalid session: {}", e.getErrorStatus().getMessage());
            } else {
                log.error("Session disconnect failed: {} ({})", e.getErrorStatus().getMessage(), e.getErrorStatus().getCode());
            }
        } catch (Exception e) {
            log.error("Error handling session disconnect with unexpected error", e);
        }
    }
}