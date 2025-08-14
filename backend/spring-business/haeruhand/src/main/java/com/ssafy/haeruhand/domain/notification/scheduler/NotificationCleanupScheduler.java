package com.ssafy.haeruhand.domain.notification.scheduler;

import com.ssafy.haeruhand.domain.notification.service.NotificationRetryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * 알림 관련 정리 스케줄러
 * Redis Pub/Sub 전환으로 인해 기존 재시도 큐 처리 기능은 제거되고
 * 정리 작업만 유지
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationCleanupScheduler {
    
    private final NotificationRetryService retryService;
    
    /**
     * 오래된 실패 카운트 정리 (매일 새벽 4시)
     */
    @Scheduled(cron = "0 0 4 * * *")
    public void cleanup() {
        try {
            log.info("알림 관련 정리 작업 시작");
            retryService.cleanup();
            log.info("알림 관련 정리 작업 완료");
        } catch (Exception e) {
            log.error("정리 작업 중 오류 발생: {}", e.getMessage(), e);
        }
    }
}
