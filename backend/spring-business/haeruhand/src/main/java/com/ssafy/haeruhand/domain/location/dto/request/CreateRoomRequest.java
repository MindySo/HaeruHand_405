package com.ssafy.haeruhand.domain.location.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateRoomRequest {
    
    @NotNull(message = "어장 ID는 필수입니다")
    private Long fisheryId;
}