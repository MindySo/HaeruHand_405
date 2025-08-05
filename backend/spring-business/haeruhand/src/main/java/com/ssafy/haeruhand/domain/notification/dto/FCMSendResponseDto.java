package com.ssafy.haeruhand.domain.notification.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FCMSendResponseDto {

    private String maskedToken;
    private String title;
    private String body;
    private String firebaseMessageId;
    private String sentAt;

    public static FCMSendResponseDto of(String maskedToken, String title, String body,
                                        String firebaseMessageId, String sentAt) {
        FCMSendResponseDto dto = new FCMSendResponseDto();
        dto.maskedToken = maskedToken;
        dto.title = title;
        dto.body = body;
        dto.firebaseMessageId = firebaseMessageId;
        dto.sentAt = sentAt;
        return dto;
    }
}