package com.ssafy.haeruhand.domain.notification.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FcmTokenUpdateRequestDto {

    @NotBlank(message = "새로운 FCM 토큰은 필수입니다.")
    @Size(max = 200, message = "FCM 토큰은 200자 이하여야 합니다.")
    private String fcmToken;
}