package com.ssafy.haeruhand.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoUserInfoDto {
    private Long kakaoSub;
    private String nickname;
    private String profile_image;
}
