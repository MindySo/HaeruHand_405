package com.ssafy.haeruhand.domain.location.service;

import com.ssafy.haeruhand.domain.location.entity.LocationShareMember;
import com.ssafy.haeruhand.domain.location.entity.LocationShareRoom;
import com.ssafy.haeruhand.domain.location.repository.LocationShareMemberRepository;
import com.ssafy.haeruhand.domain.location.repository.LocationShareRoomRepository;
import com.ssafy.haeruhand.domain.location.repository.UserLocationLogRepository;
import com.ssafy.haeruhand.domain.marine.entity.Tide;
import com.ssafy.haeruhand.domain.marine.repository.TideRepository;
import com.ssafy.haeruhand.domain.notification.event.FishingEndAlertEvent;
import com.ssafy.haeruhand.domain.notification.event.FisheryAlertEvent;
import com.ssafy.haeruhand.domain.user.entity.User;
import com.ssafy.haeruhand.domain.user.repository.UserRepository;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

/**
 * 위치 기반 안전 서비스
 * GPS 정체 감지 및 해루질 종료 알림 처리
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LocationSafetyService {
    
    private final UserLocationLogRepository locationLogRepository;
    private final LocationShareMemberRepository memberRepository;
    private final LocationShareRoomRepository roomRepository;
    private final TideRepository tideRepository;
    private final UserRepository userRepository;
    private final ApplicationEventPublisher eventPublisher;
    
    // 정체 감지 설정
    private static final double STATIONARY_RADIUS_METERS = 50.0;
    private static final int STATIONARY_MINUTES = 30;
    
    /**
     * GPS 정체 사용자 감지 및 알림
     */
    @Transactional
    public void detectAndNotifyStationaryUsers() {
        LocalDateTime since = LocalDateTime.now().minusMinutes(STATIONARY_MINUTES);
        
        List<Object[]> stationaryUsers = locationLogRepository
            .findStationaryUsers(since, STATIONARY_RADIUS_METERS);
        
        log.info("정체 사용자 감지 결과: {}명", stationaryUsers.size());
        
        for (Object[] result : stationaryUsers) {
            Long userId = ((Number) result[0]).longValue();
            Long roomId = ((Number) result[1]).longValue();
            
            notifyRoomMembers(userId, roomId);
        }
    }
    
    /**
     * 해루질 종료 시간 체크 및 알림
     */
    @Transactional
    public void checkAndNotifyFishingEndTime() {
        LocalDate today = LocalDate.now();
        LocalTime currentTime = LocalTime.now();
        LocalTime thirtyMinutesLater = currentTime.plusMinutes(30);
        
        // 활성화된 모든 룸 조회
        List<LocationShareRoom> activeRooms = roomRepository.findByIsActiveTrue();
        
        for (LocationShareRoom room : activeRooms) {
            String stationCode = room.getFishery().getStationCode();
            if (stationCode == null) {
                continue;
            }
            
            Optional<Tide> tideOpt = tideRepository
                .findByObservationDateAndStationCode(today, stationCode);
            
            if (tideOpt.isEmpty()) {
                continue;
            }
            
            Tide tide = tideOpt.get();
            Optional<LocalTime> fishingEndTimeOpt = tide.getFishingEndTime();
            
            if (fishingEndTimeOpt.isEmpty()) {
                continue;
            }
            
            LocalTime fishingEndTime = fishingEndTimeOpt.get();
            
            // 현재 시간이 종료 30분 전인지 체크
            if (currentTime.isBefore(fishingEndTime) && 
                thirtyMinutesLater.isAfter(fishingEndTime)) {
                
                // 방의 모든 멤버에게 알림
                notifyFishingEndToMembers(room);
                
                log.info("해루질 종료 알림 발송 - Room: {}, Fishery: {}", 
                    room.getRoomCode(), room.getFishery().getName());
            }
        }
    }
    
    /**
     * 정체된 사용자가 있는 방의 다른 멤버들에게 알림
     */
    private void notifyRoomMembers(Long stationaryUserId, Long roomId) {
        // 정체된 사용자 정보 조회
        User stationaryUser = userRepository.findById(stationaryUserId)
            .orElseThrow(() -> new GlobalException(ErrorStatus.USER_NOT_FOUND));
        
        // 같은 방의 다른 멤버들 조회
        List<Long> otherMemberIds = memberRepository
            .findOtherMemberUserIds(roomId, stationaryUserId);
        
        log.info("GPS 정체 알림 발송 - 정체 사용자: {}, 알림 대상: {}명", 
            stationaryUser.getNickname(), otherMemberIds.size());
        
        // 각 멤버에게 알림 이벤트 발행
        for (Long memberId : otherMemberIds) {
            eventPublisher.publishEvent(
                new FisheryAlertEvent(
                    memberId, 
                    roomId, 
                    stationaryUser.getNickname()
                )
            );
        }
    }
    
    /**
     * 해루질 종료 알림을 방의 모든 멤버에게 발송
     */
    private void notifyFishingEndToMembers(LocationShareRoom room) {
        List<LocationShareMember> members = memberRepository
            .findByRoomIdAndActiveRoom(room.getId());
        
        String fisheryName = room.getFishery().getName();
        
        for (LocationShareMember member : members) {
            eventPublisher.publishEvent(
                new FishingEndAlertEvent(
                    member.getUser().getId(),
                    room.getId(),
                    fisheryName
                )
            );
        }
    }
    
}