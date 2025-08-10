package com.ssafy.haeruhand.domain.location.scheduler;

import com.ssafy.haeruhand.domain.location.repository.LocationShareRoomRepository;
import com.ssafy.haeruhand.domain.location.service.LocationSafetyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * 위치 기반 안전 모니터링 스케줄러
 * GPS 정체 감지 및 해루질 종료 시간 알림
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class LocationSafetyScheduler {

    private final LocationShareRoomRepository roomRepository;
    private final LocationSafetyService locationSafetyService;

    /**
     * GPS 정체 감지 (1분마다 실행)
     * 30분 이상 같은 위치에 있는 사용자 감지
     */
    @Scheduled(fixedRate = 60000)
    public void checkStationaryUsers() {
        // 활성 룸이 있을 때만 실행
        long activeRoomCount = roomRepository.countByIsActiveTrue();
        if (activeRoomCount == 0) {
            return;
        }
        
        log.debug("GPS 정체 감지 스케줄러 실행 - 활성 룸: {}", activeRoomCount);
        
        try {
            locationSafetyService.detectAndNotifyStationaryUsers();
        } catch (Exception e) {
            log.error("GPS 정체 감지 중 오류 발생", e);
        }
    }

    /**
     * 해루질 종료 시간 알림 (5분마다 실행)
     * 종료 30분 전 알림 발송
     */
    @Scheduled(fixedRate = 300000)
    public void checkFishingEndTime() {
        long activeRoomCount = roomRepository.countByIsActiveTrue();
        if (activeRoomCount == 0) {
            return;
        }
        
        log.debug("해루질 종료 시간 체크 스케줄러 실행 - 활성 룸: {}", activeRoomCount);
        
        try {
            locationSafetyService.checkAndNotifyFishingEndTime();
        } catch (Exception e) {
            log.error("해루질 종료 시간 체크 중 오류 발생", e);
        }
    }
}