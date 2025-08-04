package com.ssafy.haeruhand.domain.location.dto.request;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateRoomRequest {
    
    private String title;
    
    @Builder.Default
    private Integer expiresInMin = 180;
}