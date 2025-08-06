package com.ssafy.haeruhand.domain.location.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CloseRoomResponse {
    
    private Boolean success;
    private LocalDateTime closedAt;
}