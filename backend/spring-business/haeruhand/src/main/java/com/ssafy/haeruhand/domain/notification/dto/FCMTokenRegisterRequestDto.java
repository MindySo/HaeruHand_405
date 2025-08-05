package com.ssafy.haeruhand.domain.notification.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FCMTokenRegisterRequestDto {

    @NotBlank(message = "FCM 토큰은 필수입니다.")
    private String token;

    @NotBlank(message = "디바이스 타입은 필수입니다.")
    private String deviceType; // android, ios, web

    private String deviceId;
}