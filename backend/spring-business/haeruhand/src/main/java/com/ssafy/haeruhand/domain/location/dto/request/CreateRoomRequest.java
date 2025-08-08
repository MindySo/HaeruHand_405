package com.ssafy.haeruhand.domain.location.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateRoomRequest {
    
    @NotBlank(message = "역 코드는 필수입니다")
    private String stationCode;
}