package com.ssafy.haeruhand.domain.notification.dto;

import com.ssafy.haeruhand.domain.notification.event.BaseNotificationEvent;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

/**
 * 알림 처리 작업을 위한 DTO
 * Redis Pub/Sub를 통해 전송되는 작업 단위
 */
@Getter
@Builder
public class NotificationTaskDto {

    private String messageId;                    // 메시지 고유 ID (중복 처리 방지)
    private BaseNotificationEvent event;        // 원본 알림 이벤트
    private int attemptCount;                    // 재시도 횟수
    private long delayUntil;                     // 지연 처리 시각 (재시도용)
    private LocalDateTime createdAt;             // 메시지 생성 시간
}