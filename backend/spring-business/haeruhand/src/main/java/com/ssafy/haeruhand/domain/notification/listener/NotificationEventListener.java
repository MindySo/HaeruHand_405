package com.ssafy.haeruhand.domain.notification.listener;

import com.ssafy.haeruhand.domain.notification.entity.UserFcmToken;
import com.ssafy.haeruhand.domain.notification.event.BaseNotificationEvent;
import com.ssafy.haeruhand.domain.notification.service.FCMService;
import com.ssafy.haeruhand.domain.notification.service.FcmTokenService;
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

    @EventListener
    @Async("notificationTaskExecutor")
    public void handleNotificationEvent(BaseNotificationEvent event) {
        log.info("알림 이벤트 수신 - Type: {}, UserId: {}, Title: {}", 
                event.getNotificationType(), event.getUserId(), event.getTitle());

        try {
            // 사용자의 활성 FCM 토큰 조회
            List<UserFcmToken> activeTokens = fcmTokenService.getUserActiveTokens(event.getUserId());
            
            if (activeTokens.isEmpty()) {
                log.warn("알림 전송 실패 - 활성화된 FCM 토큰이 없습니다. UserId: {}", event.getUserId());
                return;
            }

            // 각 토큰에 대해 FCM 알림 전송
            int successCount = 0;
            int failCount = 0;

            for (UserFcmToken token : activeTokens) {
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
                    
                    successCount++;
                    log.debug("FCM 전송 성공 - TokenId: {}, Type: {}", 
                            token.getId(), event.getNotificationType());

                } catch (Exception e) {
                    failCount++;
                    log.error("개별 FCM 전송 실패 - TokenId: {}, Error: {}", 
                            token.getId(), e.getMessage());
                    
                    // 토큰 유효성 체크
                    handleInvalidToken(token, e);
                }
            }

            log.info("알림 전송 완료 - Type: {}, UserId: {}, 성공: {}, 실패: {}", 
                    event.getNotificationType(), event.getUserId(), successCount, failCount);

        } catch (Exception e) {
            log.error("알림 이벤트 처리 중 예외 발생 - Type: {}, UserId: {}, Error: {}", 
                    event.getNotificationType(), event.getUserId(), e.getMessage(), e);
        }
    }

    // 유효하지 않은 토큰 처리
    private void handleInvalidToken(UserFcmToken token, Exception exception) {
        String errorMessage = exception.getMessage().toLowerCase();
        
        // Firebase에서 반환하는 에러 메시지 체크
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
    }
}