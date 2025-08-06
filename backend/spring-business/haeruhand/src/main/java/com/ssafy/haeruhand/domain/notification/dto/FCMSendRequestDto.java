package com.ssafy.haeruhand.domain.notification.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FCMSendRequestDto {

    @NotBlank(message = "FCM 토큰은 필수입니다.")
    private String token;

    @NotBlank(message = "알림 제목은 필수입니다.")
    @Size(max = 100, message = "알림 제목은 100자 이하여야 합니다.")
    private String title;

    @NotBlank(message = "알림 내용은 필수입니다.")
    @Size(max = 500, message = "알림 내용은 500자 이하여야 합니다.")
    private String body;
}



