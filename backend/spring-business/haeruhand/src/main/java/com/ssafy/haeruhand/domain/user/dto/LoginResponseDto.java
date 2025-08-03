package com.ssafy.haeruhand.domain.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponseDto {
    private long accessTokenExpiresIn;
    private UserInfoDto user;
}
