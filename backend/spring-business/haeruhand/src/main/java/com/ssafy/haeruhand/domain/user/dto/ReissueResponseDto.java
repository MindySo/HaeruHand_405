package com.ssafy.haeruhand.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class ReissueResponseDto {
    private String accessToken;
    private String refreshToken;
    private ReissueResponseBodyDto responseBodyDto;
}