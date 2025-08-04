package com.ssafy.haeruhand.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class KakaoUserInfoDto {
    private Long kakaoSub;
    private String nickname;
    private String profile_image;
}
