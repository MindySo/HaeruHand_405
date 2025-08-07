package com.ssafy.haeruhand.domain.notification.event;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@RequiredArgsConstructor
public abstract class BaseNotificationEvent {

    private final Long userId;
    private final String title;
    private final String body;
    private final LocalDateTime occurredAt;
    private final Map<String, String> additionalData;   // 프론트에 정보 제공(push 클릭 시 페이지 이동을 위한 정보 제공)

    protected BaseNotificationEvent(Long userId, String title, String body, Map<String, String> additionalData) {
        this.userId = userId;
        this.title = title;
        this.body = body;
        this.occurredAt = LocalDateTime.now();
        this.additionalData = additionalData;
    }

    public abstract String getNotificationType();
}