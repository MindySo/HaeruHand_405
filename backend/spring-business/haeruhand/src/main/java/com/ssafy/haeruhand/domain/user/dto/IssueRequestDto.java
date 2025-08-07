package com.ssafy.haeruhand.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class IssueRequestDto {
    private String code;
    private String fcmToken;
}
