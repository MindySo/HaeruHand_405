package com.ssafy.haeruhand.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class UserInfoDto {
    private Long userId;
    private Long kakaoSub;
    private String nickname;
    private String profileImageUrl;
}
