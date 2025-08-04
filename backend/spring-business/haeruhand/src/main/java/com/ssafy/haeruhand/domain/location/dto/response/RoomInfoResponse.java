package com.ssafy.haeruhand.domain.location.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomInfoResponse {
    
    private RoomInfo roomInfo;
    private String deepLink;
    private List<MemberInfo> members;
    
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RoomInfo {
        private Long roomId;
        private String roomCode;
        private String title;
        private Long hostUserId;
        private Boolean isActive;
        private LocalDateTime startedAt;
        private LocalDateTime expiresAt;
        private Long elapsedMin;
        private Integer maxMembers;
        private Integer currentMemberCount;
    }
    
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MemberInfo {
        private Long userId;
        private String nickname;
        private String color;
        private Boolean isHost;
        private LocalDateTime joinedAt;
        private LocalDateTime lastActiveAt;
    }
}