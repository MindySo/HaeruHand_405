package com.ssafy.haeruhand.domain.notification.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RetryNotificationDto {
    private Long userId;
    private Long tokenId;
    private String fcmToken;
    private String notificationType;
    private String title;
    private String body;
    private Map<String, String> additionalData;
    private Integer attemptCount;
    private Long originalTimestamp;
    private String errorMessage;
}