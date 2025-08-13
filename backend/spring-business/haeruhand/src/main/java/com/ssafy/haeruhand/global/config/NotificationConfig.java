package com.ssafy.haeruhand.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.haeruhand.domain.notification.subscriber.NotificationSubscriber;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.listener.PatternTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;

/**
 * 알림 시스템을 위한 Redis Pub/Sub 설정
 * Location과 독립적으로 동작하는 알림 전용 컨테이너
 */
@Configuration
@RequiredArgsConstructor
@Slf4j
public class NotificationConfig {

    private final ObjectMapper redisObjectMapper;  // RedisConfig에서 생성된 ObjectMapper 주입

    // 채널 이름 상수
    public static final String NOTIFICATION_CHANNEL = "notification:send";
    public static final String NOTIFICATION_RETRY_CHANNEL = "notification:retry";
    public static final String NOTIFICATION_DLQ_CHANNEL = "notification:dlq";

    /**
     * 알림 전용 Redis 메시지 리스너 컨테이너
     * Location과 독립적으로 동작
     */
    @Bean
    public RedisMessageListenerContainer notificationMessageListenerContainer(
            RedisConnectionFactory connectionFactory,
            MessageListenerAdapter notificationMessageListenerAdapter,
            MessageListenerAdapter notificationRetryMessageListenerAdapter) {

        log.info("=== NotificationConfig: 컨테이너 생성 시작 ===");

        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);

        container.addMessageListener(notificationMessageListenerAdapter,
                new PatternTopic(NOTIFICATION_CHANNEL));
        container.addMessageListener(notificationRetryMessageListenerAdapter,
                new PatternTopic(NOTIFICATION_RETRY_CHANNEL));

        log.info("=== NotificationConfig: 컨테이너 시작 완료 ===");
        log.info("컨테이너 실행 상태: {}", container.isRunning());

        return container;
    }

    /**
     * 일반 알림 메시지 리스너 어댑터
     */
    @Bean
    public MessageListenerAdapter notificationMessageListenerAdapter(
            NotificationSubscriber subscriber) {
        return new MessageListenerAdapter(subscriber, "handleNotificationMessage");
    }

    /**
     * 재시도 알림 메시지 리스너 어댑터
     */
    @Bean
    public MessageListenerAdapter notificationRetryMessageListenerAdapter(
            NotificationSubscriber subscriber) {
        return new MessageListenerAdapter(subscriber, "handleRetryMessage");
    }
}