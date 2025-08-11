package com.ssafy.haeruhand.domain.notification.scheduler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.haeruhand.domain.notification.dto.RetryNotificationDto;
import com.ssafy.haeruhand.domain.notification.service.FCMService;
import com.ssafy.haeruhand.domain.notification.service.FcmTokenService;
import com.ssafy.haeruhand.domain.notification.service.NotificationRetryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class RetryScheduler {
    
    private final NotificationRetryService retryService;
    private final FCMService fcmService;
    private final FcmTokenService fcmTokenService;
    private final ObjectMapper objectMapper;
    
    // 배치 처리 상수
    private static final int BATCH_SIZE = 50;
    
    @Scheduled(fixedRate = 30000)
    public void processRetryQueue() {
        try {
            Set<String> readyTasks = retryService.getReadyRetryTasks(BATCH_SIZE);
            
            if (readyTasks.isEmpty()) {
                return;
            }
            
            log.info("재시도 작업 처리 시작 - 개수: {}", readyTasks.size());
            
            int successCount = 0;
            int failCount = 0;
            
            for (String taskJson : readyTasks) {
                try {
                    if (!retryService.startProcessing(taskJson)) {
                        continue;
                    }
                    
                    RetryNotificationDto task = objectMapper.readValue(taskJson, RetryNotificationDto.class);
                    
                    boolean success = processRetryTask(task);
                    
                    if (success) {
                        successCount++;
                    } else {
                        failCount++;
                    }
                    
                    retryService.completeProcessing(taskJson, success);
                    
                } catch (Exception e) {
                    failCount++;
                    log.error("재시도 작업 처리 중 오류: {}", e.getMessage());
                    retryService.completeProcessing(taskJson, false);
                }
            }
            
            log.info("재시도 작업 처리 완료 - 성공: {}, 실패: {}", successCount, failCount);
            
        } catch (Exception e) {
            log.error("재시도 큐 처리 중 전체 오류: {}", e.getMessage());
        }
    }
    
    private boolean processRetryTask(RetryNotificationDto task) {
        try {
            // 토큰 유효성 재확인 (getUserActiveTokens 사용)
            boolean isTokenActive = fcmTokenService.getUserActiveTokens(task.getUserId())
                    .stream()
                    .anyMatch(token -> token.getId().equals(task.getTokenId()));
            
            if (!isTokenActive) {
                log.warn("재시도 대상 토큰이 비활성화됨 - TokenId: {}", task.getTokenId());
                return false;
            }
            
            // FCM 전송
            if (task.getAdditionalData() != null && !task.getAdditionalData().isEmpty()) {
                fcmService.sendNotificationWithData(
                        task.getFcmToken(),
                        task.getTitle(),
                        task.getBody(),
                        task.getAdditionalData()
                );
            } else {
                fcmService.sendNotification(
                        task.getFcmToken(),
                        task.getTitle(),
                        task.getBody()
                );
            }
            
            log.info("재시도 알림 전송 성공 - UserId: {}, Attempt: {}", 
                    task.getUserId(), task.getAttemptCount());
            
            return true;
            
        } catch (Exception e) {
            log.error("재시도 알림 전송 실패 - UserId: {}, Attempt: {}, Error: {}", 
                    task.getUserId(), task.getAttemptCount(), e.getMessage());
            
            // 토큰 관련 오류면 토큰 삭제
            if (isTokenRelatedError(e)) {
                fcmTokenService.deleteToken(task.getTokenId());
            }
            
            return false;
        }
    }
    
    private boolean isTokenRelatedError(Exception e) {
        String error = e.getMessage().toLowerCase();
        return error.contains("invalid-registration-token") || 
               error.contains("not-registered");
    }
    
    @Scheduled(cron = "0 0 4 * * *")
    public void cleanup() {
        retryService.cleanup();
    }
}