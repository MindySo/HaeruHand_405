package com.ssafy.haeruhand.domain.notification.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class FCMSendResponseDto {

    private String maskedToken;
    private String title;
    private String body;
    private String firebaseMessageId;
    private String sentAt;
}