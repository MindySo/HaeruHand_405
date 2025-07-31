package com.ssafy.haeruhand.domain.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KakaoUserInfoDto {
    private String kakaoSub;
    private String email;
    private String nickname;
    private String profile_image;
}
