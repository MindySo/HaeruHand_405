package com.ssafy.haeruhand.domain.location.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * WebSocket 세션 정보 DTO
 * WebSocket 연결 시 세션에 저장되는 기본 정보
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SessionInfo {
    
    private Long userId;        // 사용자 ID
    private String roomCode;    // 방 코드
    private Long roomId;        // 방 ID
    private String sessionId;   // WebSocket 세션 ID (optional)
    private String jti;         // JWT ID for duplicate connection tracking (optional)
}