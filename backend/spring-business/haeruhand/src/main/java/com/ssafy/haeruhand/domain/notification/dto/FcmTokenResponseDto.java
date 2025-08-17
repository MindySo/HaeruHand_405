package com.ssafy.haeruhand.domain.notification.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class FcmTokenResponseDto {

    private Long tokenId;
    private String maskedToken;
    private Boolean isActive;
    private LocalDateTime lastUsedAt;
}