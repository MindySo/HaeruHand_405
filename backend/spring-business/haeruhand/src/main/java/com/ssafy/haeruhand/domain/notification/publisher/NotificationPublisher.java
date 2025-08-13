package com.ssafy.haeruhand.domain.notification.publisher;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.haeruhand.global.config.NotificationConfig;
import com.ssafy.haeruhand.domain.notification.dto.NotificationTaskDto;
import com.ssafy.haeruhand.domain.notification.event.BaseNotificationEvent;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

/**
 * 알림 메시지 발행자
 * Spring Event를 받아서 Redis Pub/Sub로 메시지 발행
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationPublisher {

    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper redisObjectMapper;

    /**
     * 이벤트를 받아서 알림 작업으로 발행
     */
    public void publishNotificationEvent(BaseNotificationEvent event) {
        try {
            // 메시지 ID 생성 (중복 방지)
            String messageId = String.format("%s_%s_%d_%d",
                    event.getNotificationType(),
                    event.getUserId(),
                    event.getOccurredAt().getNano(),
                    System.currentTimeMillis());

            // 팀 컨벤션에 따라 Builder 패턴으로 DTO 생성
            NotificationTaskDto task = NotificationTaskDto.builder()
                    .messageId(messageId)
                    .event(event)
                    .attemptCount(0)
                    .delayUntil(0L)
                    .createdAt(LocalDateTime.now())
                    .build();

            String taskJson = redisObjectMapper.writeValueAsString(task);

            // 중복 처리 방지를 위한 메시지 ID 저장 (5분 TTL)
            String messageIdKey = "notification:processed:" + task.getMessageId();
            Boolean isNew = redisTemplate.opsForValue().setIfAbsent(messageIdKey, "1");
            redisTemplate.expire(messageIdKey, java.time.Duration.ofMinutes(5));

            if (Boolean.TRUE.equals(isNew)) {
                redisTemplate.convertAndSend(NotificationConfig.NOTIFICATION_CHANNEL, taskJson);

                log.info("알림 작업 발행 완료 - Type: {}, UserId: {}, MessageId: {}",
                        event.getNotificationType(), event.getUserId(), task.getMessageId());
            } else {
                log.warn("중복 작업 발행 시도 차단 - MessageId: {}", task.getMessageId());
            }

        } catch (Exception e) {
            log.error("알림 작업 발행 실패 - Type: {}, UserId: {}, Error: {}",
                    event.getNotificationType(), event.getUserId(), e.getMessage(), e);
            throw new GlobalException(ErrorStatus.FCM_SEND_FAILED);
        }
    }

    /**
     * 재시도 작업 발행
     */
    public void publishRetryTask(NotificationTaskDto task) {
        try {
            String taskJson = redisObjectMapper.writeValueAsString(task);
            redisTemplate.convertAndSend(NotificationConfig.NOTIFICATION_RETRY_CHANNEL, taskJson);

            log.info("재시도 작업 발행 완료 - UserId: {}, Attempt: {}, MessageId: {}",
                    task.getEvent().getUserId(), task.getAttemptCount(), task.getMessageId());

        } catch (Exception e) {
            log.error("재시도 작업 발행 실패 - UserId: {}, MessageId: {}, Error: {}",
                    task.getEvent().getUserId(), task.getMessageId(), e.getMessage(), e);
            throw new GlobalException(ErrorStatus.FCM_SEND_FAILED);
        }
    }

    /**
     * DLQ(Dead Letter Queue)로 작업 발행
     */
    public void publishToDLQ(NotificationTaskDto task, String errorReason) {
        try {
            String taskJson = redisObjectMapper.writeValueAsString(task);
            redisTemplate.convertAndSend(NotificationConfig.NOTIFICATION_DLQ_CHANNEL, taskJson);

            log.warn("DLQ로 작업 발행 - UserId: {}, MessageId: {}, Reason: {}",
                    task.getEvent().getUserId(), task.getMessageId(), errorReason);

        } catch (Exception e) {
            log.error("DLQ 작업 발행 실패 - UserId: {}, MessageId: {}, Error: {}",
                    task.getEvent().getUserId(), task.getMessageId(), e.getMessage(), e);
        }
    }
}