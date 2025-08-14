package com.ssafy.haeruhand.domain.notification.listener;

import com.ssafy.haeruhand.domain.notification.event.BaseNotificationEvent;
import com.ssafy.haeruhand.domain.notification.publisher.NotificationPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

/**
 * 알림 이벤트 리스너 (Redis Pub/Sub 버전)
 * Spring Event를 받아서 Redis Pub/Sub로 전환하는 역할
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationEventListener {

    private final NotificationPublisher notificationPublisher;

    /**
     * 알림 이벤트를 받아서 Redis Pub/Sub로 전환
     */
    @EventListener
    @Async("notificationTaskExecutor")
    public void handleNotificationEvent(BaseNotificationEvent event) {
        log.info("알림 이벤트 수신 - Type: {}, UserId: {}, Title: {}",
                event.getNotificationType(), event.getUserId(), event.getTitle());

        try {
            // Redis Pub/Sub로 메시지 발행
            notificationPublisher.publishNotificationEvent(event);

            log.debug("알림 이벤트 → Pub/Sub 전환 완료 - Type: {}, UserId: {}",
                    event.getNotificationType(), event.getUserId());

        } catch (Exception e) {
            log.error("알림 이벤트 → Pub/Sub 전환 실패 - Type: {}, UserId: {}, Error: {}",
                    event.getNotificationType(), event.getUserId(), e.getMessage(), e);
        }
    }
}
