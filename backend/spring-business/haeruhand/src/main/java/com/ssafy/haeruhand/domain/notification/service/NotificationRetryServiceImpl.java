package com.ssafy.haeruhand.domain.notification.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.haeruhand.domain.notification.dto.RetryNotificationDto;
import com.ssafy.haeruhand.domain.notification.entity.UserFcmToken;
import com.ssafy.haeruhand.domain.notification.event.BaseNotificationEvent;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationRetryServiceImpl implements NotificationRetryService {
    
    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;
    
    private static final String RETRY_QUEUE_KEY = "notification:retry:queue";
    private static final String FAILURE_COUNT_KEY = "notification:failure:count:%s:%s";
    private static final String PROCESSING_SET_KEY = "notification:retry:processing";
    
    private static final int MAX_RETRY_COUNT = 3;
    private static final long INITIAL_DELAY_SECONDS = 60L;
    private static final int RETRY_QUEUE_TTL_DAYS = 7;
    private static final int PROCESSING_TTL_MINUTES = 10;
    private static final int FAILURE_COUNT_TTL_HOURS = 24;
    
    @Override
    public void scheduleRetry(BaseNotificationEvent event, UserFcmToken token, 
                            Exception exception, int currentAttempt) {
        try {
            if (currentAttempt >= MAX_RETRY_COUNT) {
                log.warn("최대 재시도 횟수 초과 - UserId: {}, TokenId: {}", 
                        event.getUserId(), token.getId());
                return;
            }
            
            long delaySeconds = INITIAL_DELAY_SECONDS * (long) Math.pow(2, currentAttempt);
            long retryTimestamp = Instant.now().getEpochSecond() + delaySeconds;
            
            RetryNotificationDto retryDto = RetryNotificationDto.builder()
                    .userId(event.getUserId())
                    .tokenId(token.getId())
                    .fcmToken(token.getFcmToken())
                    .notificationType(event.getNotificationType())
                    .title(event.getTitle())
                    .body(event.getBody())
                    .additionalData(event.getAdditionalData())
                    .attemptCount(currentAttempt + 1)
                    .originalTimestamp(Instant.now().getEpochSecond())
                    .errorMessage(exception.getMessage())
                    .build();
            
            String taskJson = objectMapper.writeValueAsString(retryDto);
            
            redisTemplate.opsForZSet().add(RETRY_QUEUE_KEY, taskJson, retryTimestamp);
            redisTemplate.expire(RETRY_QUEUE_KEY, RETRY_QUEUE_TTL_DAYS, TimeUnit.DAYS);
            
            log.info("재시도 작업 스케줄링 완료 - UserId: {}, TokenId: {}, Attempt: {}, RetryIn: {}초", 
                    event.getUserId(), token.getId(), currentAttempt + 1, delaySeconds);
                    
        } catch (Exception e) {
            log.error("재시도 스케줄링 실패: {}", e.getMessage());
            throw new GlobalException(ErrorStatus.FCM_SEND_FAILED);
        }
    }
    
    @Override
    public Set<String> getReadyRetryTasks(int limit) {
        long currentTimestamp = Instant.now().getEpochSecond();
        
        Set<String> tasks = redisTemplate.opsForZSet()
                .rangeByScore(RETRY_QUEUE_KEY, 0, currentTimestamp, 0, limit);
        
        log.debug("실행 가능한 재시도 작업 조회 완료 - 개수: {}", tasks.size());
        return tasks;
    }

    @Override
    public boolean startProcessing(String taskJson) {
        try {
            Long addedCount = redisTemplate.opsForSet().add(PROCESSING_SET_KEY, taskJson);

            if (addedCount != null && addedCount > 0) {
                redisTemplate.expire(PROCESSING_SET_KEY, PROCESSING_TTL_MINUTES, TimeUnit.MINUTES);
                redisTemplate.opsForZSet().remove(RETRY_QUEUE_KEY, taskJson);
                return true;
            }

            return false;

        } catch (Exception e) {
            log.error("재시도 작업 처리 시작 실패: {}", e.getMessage());
            return false;
        }
    }
    
    @Override
    public void completeProcessing(String taskJson, boolean success) {
        try {
            redisTemplate.opsForSet().remove(PROCESSING_SET_KEY, taskJson);
            
            if (success) {
                log.debug("재시도 작업 처리 성공");
            } else {
                log.debug("재시도 작업 처리 실패");
            }
            
        } catch (Exception e) {
            log.error("재시도 작업 완료 처리 실패: {}", e.getMessage());
        }
    }
    
    @Override
    public void incrementFailureCount(Long userId, Long tokenId) {
        String key = String.format(FAILURE_COUNT_KEY, userId, tokenId);
        redisTemplate.opsForValue().increment(key);
        redisTemplate.expire(key, FAILURE_COUNT_TTL_HOURS, TimeUnit.HOURS);
    }
    
    @Override
    public Long getFailureCount(Long userId, Long tokenId) {
        String key = String.format(FAILURE_COUNT_KEY, userId, tokenId);
        String count = redisTemplate.opsForValue().get(key);
        return count != null ? Long.parseLong(count) : 0L;
    }
    
    @Override
    public void cleanup() {
        try {
            long weekAgo = Instant.now().getEpochSecond() - (RETRY_QUEUE_TTL_DAYS * 24 * 60 * 60);
            Long removed = redisTemplate.opsForZSet().removeRangeByScore(RETRY_QUEUE_KEY, 0, weekAgo);
            
            log.info("오래된 재시도 작업 정리 완료 - 삭제된 개수: {}", removed);
            
        } catch (Exception e) {
            log.error("정리 작업 실패: {}", e.getMessage());
        }
    }
}