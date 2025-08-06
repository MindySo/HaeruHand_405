package com.ssafy.haeruhand.domain.location.dto.websocket;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LocationMessage {
    
    private MessageType type;
    
    // MEMBER_LIST, TIMER_UPDATE
    private Long elapsedMin;
    
    // MEMBER_LIST
    private List<MemberInfo> members;
    
    // MEMBER_JOINED
    private Long userId;
    private String nickname;
    private String color;
    private Boolean isHost;
    private LocalDateTime joinedAt;
    
    // LOCATION
    private BigDecimal latitude;
    private BigDecimal longitude;
    private BigDecimal accuracy;
    private LocalDateTime receivedAt;
    
    // MEMBER_LEFT
    // userId, nickname already defined above
    
    // ROOM_CLOSED
    private CloseReason reason;
    private LocalDateTime closedAt;
    private Long totalDurationMin;
    
    // MEMBER_LIST의 멤버 정보
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MemberInfo {
        private Long userId;
        private String nickname;
        private String color;
        private Boolean isHost;
        private LocalDateTime lastActiveAt;
    }
    
    public enum MessageType {
        MEMBER_LIST,
        MEMBER_JOINED,
        LOCATION,
        TIMER_UPDATE,
        MEMBER_LEFT,
        ROOM_CLOSED
    }
    
    public enum CloseReason {
        HOST_LEFT,
        ALL_MEMBERS_LEFT,
        MANUAL
    }
}