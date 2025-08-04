package com.ssafy.haeruhand.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TokenReissueResponseDto {
    private Long accessTokenExpiresIn;
}