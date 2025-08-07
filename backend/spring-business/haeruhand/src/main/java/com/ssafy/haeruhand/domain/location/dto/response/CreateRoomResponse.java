package com.ssafy.haeruhand.domain.location.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateRoomResponse {
    
    private Long roomId;
    private String roomCode;
    private String deepLink;
    private LocalDateTime startedAt;
}