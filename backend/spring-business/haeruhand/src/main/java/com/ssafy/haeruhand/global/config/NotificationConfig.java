package com.ssafy.haeruhand.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.haeruhand.domain.notification.listener.NotificationSubscriber;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
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

        log.info("NotificationContainer 생성 시작");

        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);

        container.addMessageListener(notificationMessageListenerAdapter,
                new PatternTopic(NOTIFICATION_CHANNEL));
        container.addMessageListener(notificationRetryMessageListenerAdapter,
                new PatternTopic(NOTIFICATION_RETRY_CHANNEL));

        log.info("NotificationContainer 생성 완료");

        return container;
    }

    // ApplicationReadyEvent를 사용한 컨테이너 시작
    @EventListener(ApplicationReadyEvent.class)
    public void startNotificationContainer(ApplicationReadyEvent event) {
        try {
            RedisMessageListenerContainer container =
                    event.getApplicationContext().getBean("notificationMessageListenerContainer", RedisMessageListenerContainer.class);

            log.info("NotificationContainer 실행 상태: {}", container.isRunning());

            if (!container.isRunning()) {
                log.info("NotificationContainer 수동 시작");
                container.start();

                // 잠시 대기 후 재확인
                Thread.sleep(500);
                log.info("NotificationContainer 시작 후 상태: {}", container.isRunning());
            }
        } catch (Exception e) {
            log.error("NotificationContainer 시작 실패: {}", e.getMessage(), e);
        }
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

    /**
     * 알림 전용 ObjectMapper (타입 정보 포함)
     */
    @Bean
    public ObjectMapper notificationObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        // 알림 전용 타입 정보 포함 설정
        mapper.activateDefaultTyping(mapper.getPolymorphicTypeValidator(),
                ObjectMapper.DefaultTyping.NON_FINAL);

        return mapper;
    }
}