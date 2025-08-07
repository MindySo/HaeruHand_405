package com.ssafy.haeruhand.global.websocket.service;

import com.ssafy.haeruhand.domain.location.service.LocationShareMemberService;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * WebSocket 세션 생명주기 관리 서비스
 * 세션 검증, 속성 관리, 연결/해제 이벤트 처리
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class WebSocketSessionService {

    private final LocationShareMemberService memberService;

    /**
     * WebSocket 연결 시 세션 초기화 처리
     */
    public SessionConnectionResult handleConnect(Long userId, String roomCode, Long roomId) {
        try {
            // 최대 인원 체크 (4명 제한)
            int currentMemberCount = memberService.getActiveMemberCount(roomId);
            boolean isExistingMember = memberService.isMemberExists(roomId, userId);
            
            if (!isExistingMember && currentMemberCount >= 4) {
                log.warn("Room {} is full. Max members: 4, current: {}", roomCode, currentMemberCount);
                throw new GlobalException(ErrorStatus.WEBSOCKET_ROOM_FULL);
            }
            
            // 멤버 UPSERT (색상 자동 할당)
            memberService.upsertMember(roomId, userId);
            
            log.info("WebSocket connection established. User: {}, Room: {}", userId, roomCode);
            return SessionConnectionResult.success();
            
        } catch (GlobalException e) {
            log.error("WebSocket connection failed: {} ({})", e.getErrorStatus().getMessage(), e.getErrorStatus().getCode());
            return SessionConnectionResult.failure(e.getErrorStatus().getMessage());
        } catch (Exception e) {
            log.error("Failed to handle WebSocket connection with unexpected error", e);
            throw new GlobalException(ErrorStatus.WEBSOCKET_CONNECTION_FAILED);
        }
    }

    /**
     * 세션 속성에서 정보 추출 및 검증
     */
    public SessionInfo extractSessionInfo(Map<String, Object> sessionAttributes) {
        Long userId = (Long) sessionAttributes.get("userId");
        String roomCode = (String) sessionAttributes.get("roomCode");
        Long roomId = (Long) sessionAttributes.get("roomId");
        
        if (userId == null || roomCode == null || roomId == null) {
            throw new GlobalException(ErrorStatus.WEBSOCKET_SESSION_INVALID);
        }
        
        return new SessionInfo(userId, roomCode, roomId);
    }

    /**
     * 세션 속성 생성
     */
    public void setSessionAttributes(Map<String, Object> attributes, Long userId, String roomCode, Long roomId) {
        attributes.put("userId", userId);
        attributes.put("roomCode", roomCode);
        attributes.put("roomId", roomId);
    }

    /**
     * 세션 연결 결과 DTO
     */
    public static class SessionConnectionResult {
        private final boolean success;
        private final String errorMessage;

        private SessionConnectionResult(boolean success, String errorMessage) {
            this.success = success;
            this.errorMessage = errorMessage;
        }

        public static SessionConnectionResult success() {
            return new SessionConnectionResult(true, null);
        }

        public static SessionConnectionResult failure(String errorMessage) {
            return new SessionConnectionResult(false, errorMessage);
        }

        public boolean isSuccess() { return success; }
        public String getErrorMessage() { return errorMessage; }
    }

    /**
     * 세션 정보 DTO
     */
    public static class SessionInfo {
        private final Long userId;
        private final String roomCode;
        private final Long roomId;

        public SessionInfo(Long userId, String roomCode, Long roomId) {
            this.userId = userId;
            this.roomCode = roomCode;
            this.roomId = roomId;
        }

        public Long getUserId() { return userId; }
        public String getRoomCode() { return roomCode; }
        public Long getRoomId() { return roomId; }
    }
}