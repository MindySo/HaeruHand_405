package com.ssafy.haeruhand.domain.notification.subscriber;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.haeruhand.domain.notification.dto.NotificationTaskDto;
import com.ssafy.haeruhand.domain.notification.entity.UserFcmToken;
import com.ssafy.haeruhand.domain.notification.event.BaseNotificationEvent;
import com.ssafy.haeruhand.domain.notification.publisher.NotificationPublisher;
import com.ssafy.haeruhand.domain.notification.service.FCMService;
import com.ssafy.haeruhand.domain.notification.service.FcmTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * 알림 작업 구독자
 * Redis Pub/Sub로부터 작업을 받아서 FCM 전송 처리
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationSubscriber implements MessageListener {

    private final FCMService fcmService;
    private final FcmTokenService fcmTokenService;
    private final NotificationPublisher notificationPublisher;

    @Qualifier("notificationObjectMapper")
    private final ObjectMapper notificationObjectMapper;

    private static final int MAX_RETRY_COUNT = 3;
    private static final long INITIAL_DELAY_SECONDS = 60L;


//    @Value("${notification.pubsub.enabled:true}")  // notification 전용 설정
//    private boolean pubsubEnabled;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        // if (!pubsubEnabled) 체크 제거

        String channel = new String(message.getChannel());
        String body = new String(message.getBody());

        log.info("=== Direct Redis 메시지 수신 ===");
        log.info("채널: {}, 메시지: {}", channel, body);

        if ("notification:send".equals(channel)) {
            handleNotificationMessage(body);
        }
    }

    @PostConstruct
    public void init() {
        log.info("NotificationSubscriber 초기화 완료 - ObjectMapper: {}",
                notificationObjectMapper != null ? "주입됨" : "주입 안됨");
    }

    /**
     * 일반 알림 작업 처리
     */
    public void handleNotificationMessage(String taskJson) {
        try {
            NotificationTaskDto task = notificationObjectMapper.readValue(taskJson, NotificationTaskDto.class);
            log.info("=== 메시지 수신됨 ===");
            log.info("수신된 JSON: {}", taskJson);
            processNotificationTask(task);

        } catch (Exception e) {
            log.error("알림 작업 처리 중 파싱 오류: {}", e.getMessage(), e);
        }
    }

    /**
     * 재시도 작업 처리
     */
    public void handleRetryMessage(String taskJson) {
        try {
            NotificationTaskDto task = notificationObjectMapper.readValue(taskJson, NotificationTaskDto.class);

            // 지연 시간 확인
            long currentTime = System.currentTimeMillis() / 1000;
            if (task.getDelayUntil() > currentTime) {
                // 아직 처리 시간이 아니면 다시 발행
                notificationPublisher.publishRetryTask(task);
                return;
            }

            processNotificationTask(task);

        } catch (Exception e) {
            log.error("재시도 작업 처리 중 파싱 오류: {}", e.getMessage(), e);
        }
    }

    /**
     * 실제 알림 작업 처리 로직
     */
    private void processNotificationTask(NotificationTaskDto task) {
        BaseNotificationEvent event = task.getEvent();

        log.info("알림 작업 처리 시작 - Type: {}, UserId: {}, Attempt: {}",
                event.getNotificationType(), event.getUserId(), task.getAttemptCount());

        try {
            List<UserFcmToken> activeTokens = fcmTokenService.getUserActiveTokens(event.getUserId());

            if (activeTokens.isEmpty()) {
                log.warn("알림 전송 실패 - 활성화된 FCM 토큰이 없습니다. UserId: {}", event.getUserId());
                return;
            }

            int successCount = 0;
            int failCount = 0;

            for (UserFcmToken token : activeTokens) {
                try {
                    sendNotificationToToken(event, token);
                    successCount++;

                } catch (Exception e) {
                    failCount++;
                    log.error("FCM 전송 실패 - TokenId: {}, Error: {}", token.getId(), e.getMessage());
                    handleTokenFailure(task, token, e);
                }
            }

            log.info("알림 전송 완료 - Type: {}, UserId: {}, 성공: {}, 실패: {}",
                    event.getNotificationType(), event.getUserId(), successCount, failCount);

        } catch (Exception e) {
            log.error("알림 작업 처리 중 예외 발생 - Type: {}, UserId: {}, Error: {}",
                    event.getNotificationType(), event.getUserId(), e.getMessage(), e);

            handleTaskFailure(task, e);
        }
    }

    /**
     * 개별 토큰으로 알림 전송
     */
    private void sendNotificationToToken(BaseNotificationEvent event, UserFcmToken token) {
        if (event.getAdditionalData() != null && !event.getAdditionalData().isEmpty()) {
            fcmService.sendNotificationWithData(
                    token.getFcmToken(),
                    event.getTitle(),
                    event.getBody(),
                    event.getAdditionalData()
            );
        } else {
            fcmService.sendNotification(
                    token.getFcmToken(),
                    event.getTitle(),
                    event.getBody()
            );
        }

        log.debug("FCM 전송 성공 - TokenId: {}, Type: {}",
                token.getId(), event.getNotificationType());
    }

    /**
     * 토큰별 실패 처리
     */
    private void handleTokenFailure(NotificationTaskDto task, UserFcmToken token, Exception exception) {
        String errorMessage = exception.getMessage().toLowerCase();

        // 유효하지 않은 토큰인 경우 삭제
        if (errorMessage.contains("invalid-registration-token") ||
                errorMessage.contains("not-registered") ||
                errorMessage.contains("invalid-argument")) {

            log.warn("유효하지 않은 FCM 토큰 감지 - TokenId: {}, 소프트 삭제 처리", token.getId());
            try {
                fcmTokenService.deleteToken(token.getId());
            } catch (Exception deleteException) {
                log.error("유효하지 않은 토큰 삭제 실패 - TokenId: {}, Error: {}",
                        token.getId(), deleteException.getMessage());
            }
        }
        // 기타 오류는 재시도 처리에서 전체적으로 핸들링
    }

    /**
     * 작업 전체 실패 처리 (재시도 로직)
     */
    private void handleTaskFailure(NotificationTaskDto task, Exception exception) {
        if (task.getAttemptCount() >= MAX_RETRY_COUNT) {
            log.error("최대 재시도 횟수 초과 - DLQ로 전송. UserId: {}, MessageId: {}",
                    task.getEvent().getUserId(), task.getMessageId());
            notificationPublisher.publishToDLQ(task, "최대 재시도 횟수 초과: " + exception.getMessage());
            return;
        }

        // 지수 백오프 계산
        long delaySeconds = INITIAL_DELAY_SECONDS * (long) Math.pow(2, task.getAttemptCount());

        // 팀 컨벤션에 따라 Builder 패턴으로 재시도 작업 생성
        NotificationTaskDto retryTask = NotificationTaskDto.builder()
                .messageId(task.getMessageId())
                .event(task.getEvent())
                .attemptCount(task.getAttemptCount() + 1)
                .delayUntil(System.currentTimeMillis() / 1000 + delaySeconds)
                .createdAt(task.getCreatedAt())
                .build();

        notificationPublisher.publishRetryTask(retryTask);

        log.info("재시도 작업 스케줄링 완료 - UserId: {}, Attempt: {}, RetryIn: {}초",
                task.getEvent().getUserId(), retryTask.getAttemptCount(), delaySeconds);
    }

//    @Override
//    public void onMessage(Message message, byte[] pattern) {
//        // MessageListenerAdapter를 사용하므로 이 메서드는 직접 사용되지 않음
//        log.debug("Direct message received: {}", new String(message.getBody()));
//    }
}