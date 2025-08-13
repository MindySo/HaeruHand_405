package com.ssafy.haeruhand.domain.notification.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

/**
 * 알림 재시도 서비스 구현체 (Redis Pub/Sub 버전)
 * 기존 Queue 기반 재시도 로직을 제거하고 실패 카운트 관리 기능만 유지
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationRetryServiceImpl implements NotificationRetryService {

    private final RedisTemplate<String, String> redisTemplate;

    private static final String FAILURE_COUNT_KEY = "notification:failure:count:%s:%s";
    private static final int FAILURE_COUNT_TTL_HOURS = 24;

    @Override
    public void incrementFailureCount(Long userId, Long tokenId) {
        String key = String.format(FAILURE_COUNT_KEY, userId, tokenId);
        redisTemplate.opsForValue().increment(key);
        redisTemplate.expire(key, FAILURE_COUNT_TTL_HOURS, TimeUnit.HOURS);

        log.debug("실패 카운트 증가 - UserId: {}, TokenId: {}", userId, tokenId);
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
            // 실패 카운트 키 패턴으로 정리
            // 실제로는 TTL로 자동 만료되므로 특별한 정리 작업 불필요
            log.info("실패 카운트 정리 작업 완료 - TTL에 의해 자동 만료됨");

        } catch (Exception e) {
            log.error("실패 카운트 정리 작업 실패: {}", e.getMessage(), e);
        }
    }
}