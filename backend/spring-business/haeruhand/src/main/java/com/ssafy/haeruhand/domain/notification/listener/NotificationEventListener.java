package com.ssafy.haeruhand.domain.notification.listener;

import com.ssafy.haeruhand.domain.notification.entity.UserFcmToken;
import com.ssafy.haeruhand.domain.notification.event.BaseNotificationEvent;
import com.ssafy.haeruhand.domain.notification.service.FCMService;
import com.ssafy.haeruhand.domain.notification.service.FcmTokenService;
import com.ssafy.haeruhand.domain.notification.service.NotificationRetryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationEventListener {

    private final FCMService fcmService;
    private final FcmTokenService fcmTokenService;
    private final NotificationRetryService retryService;

    // 재시도 관련 상수
    private static final int MAX_IMMEDIATE_RETRY = 2;

    @EventListener
    @Async("notificationTaskExecutor")
    public void handleNotificationEvent(BaseNotificationEvent event) {
        log.info("알림 이벤트 수신 - Type: {}, UserId: {}, Title: {}",
                event.getNotificationType(), event.getUserId(), event.getTitle());

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
                    sendNotificationWithRetry(event, token, 0);
                    successCount++;
                    log.debug("FCM 전송 성공 - TokenId: {}, Type: {}",
                            token.getId(), event.getNotificationType());

                } catch (Exception e) {
                    failCount++;
                    log.error("FCM 전송 최종 실패 - TokenId: {}, Error: {}",
                            token.getId(), e.getMessage());

                    handleNotificationFailure(event, token, e, MAX_IMMEDIATE_RETRY);
                }
            }

            log.info("알림 전송 완료 - Type: {}, UserId: {}, 성공: {}, 실패: {}",
                    event.getNotificationType(), event.getUserId(), successCount, failCount);

        } catch (Exception e) {
            log.error("알림 이벤트 처리 중 예외 발생 - Type: {}, UserId: {}, Error: {}",
                    event.getNotificationType(), event.getUserId(), e.getMessage(), e);
        }
    }

    private void sendNotificationWithRetry(BaseNotificationEvent event, UserFcmToken token, int attemptCount)
            throws Exception {
        int maxAttempts = MAX_IMMEDIATE_RETRY;
        Exception lastException = null;

        for (int attempt = 0; attempt < maxAttempts; attempt++) {
            try {
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
                return;

            } catch (Exception e) {
                lastException = e;
                log.warn("FCM 전송 실패 (Attempt: {}/{}) - TokenId: {}, Error: {}",
                        attempt + 1, maxAttempts, token.getId(), e.getMessage());

                if (attempt < maxAttempts - 1) {
                    try {
                        Thread.sleep(1000 * (long) Math.pow(2, attempt));
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        throw new RuntimeException("재시도 대기 중 인터럽트 발생", ie);
                    }
                }
            }
        }

        throw lastException;
    }

    private void handleNotificationFailure(BaseNotificationEvent event, UserFcmToken token,
                                           Exception exception, int attemptCount) {
        FailureType failureType = categorizeFailure(exception);

        switch (failureType) {
            case INVALID_TOKEN:
                handleInvalidToken(token, exception);
                break;

            case QUOTA_EXCEEDED:
            case NETWORK_ERROR:
            case UNKNOWN_ERROR:
                retryService.scheduleRetry(event, token, exception, attemptCount);
                retryService.incrementFailureCount(event.getUserId(), token.getId());
                break;
        }
    }

    private FailureType categorizeFailure(Exception exception) {
        String errorMessage = exception.getMessage().toLowerCase();

        if (errorMessage.contains("invalid-registration-token") ||
                errorMessage.contains("not-registered") ||
                errorMessage.contains("invalid-argument")) {
            return FailureType.INVALID_TOKEN;
        }

        if (errorMessage.contains("quota") ||
                errorMessage.contains("rate") ||
                errorMessage.contains("throttled")) {
            return FailureType.QUOTA_EXCEEDED;
        }

        if (errorMessage.contains("network") ||
                errorMessage.contains("timeout") ||
                errorMessage.contains("connection")) {
            return FailureType.NETWORK_ERROR;
        }

        return FailureType.UNKNOWN_ERROR;
    }

    private void handleInvalidToken(UserFcmToken token, Exception exception) {
        log.warn("유효하지 않은 FCM 토큰 감지 - TokenId: {}, 소프트 삭제 처리", token.getId());

        try {
            fcmTokenService.deleteToken(token.getId());
        } catch (Exception deleteException) {
            log.error("유효하지 않은 토큰 삭제 실패 - TokenId: {}, Error: {}",
                    token.getId(), deleteException.getMessage());
        }
    }

    private enum FailureType {
        INVALID_TOKEN,
        QUOTA_EXCEEDED,
        NETWORK_ERROR,
        UNKNOWN_ERROR
    }
}