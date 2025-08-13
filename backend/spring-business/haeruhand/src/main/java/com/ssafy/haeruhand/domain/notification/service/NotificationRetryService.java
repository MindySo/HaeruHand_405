package com.ssafy.haeruhand.domain.notification.service;

/**
 * 알림 재시도 서비스 인터페이스
 * Redis Pub/Sub 전환으로 인해 기존 기능을 대체
 *
 * 기존 Redis Queue 기반의 재시도 로직은 Pub/Sub의 메시지 기반 재시도로 대체됨
 * 실패 카운트 관리 기능만 유지
 */
public interface NotificationRetryService {

    /**
     * 사용자별 토큰의 실패 횟수 증가
     */
    void incrementFailureCount(Long userId, Long tokenId);

    /**
     * 사용자별 토큰의 실패 횟수 조회
     */
    Long getFailureCount(Long userId, Long tokenId);

    /**
     * 오래된 실패 카운트 정리
     */
    void cleanup();
}