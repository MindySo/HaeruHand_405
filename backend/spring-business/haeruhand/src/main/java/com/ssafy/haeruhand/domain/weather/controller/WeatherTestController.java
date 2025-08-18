package com.ssafy.haeruhand.domain.weather.controller;

import com.ssafy.haeruhand.domain.location.entity.LocationShareMember;
import com.ssafy.haeruhand.domain.location.entity.LocationShareRoom;
import com.ssafy.haeruhand.domain.location.repository.LocationShareMemberRepository;
import com.ssafy.haeruhand.domain.location.repository.LocationShareRoomRepository;
import com.ssafy.haeruhand.domain.notification.event.WeatherAlertEvent;
import com.ssafy.haeruhand.domain.weather.entity.*;
import com.ssafy.haeruhand.domain.weather.repository.WeatherWarningRepository;
import com.ssafy.haeruhand.domain.weather.service.WeatherWarningRefreshService;
import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/test/weather")
public class WeatherTestController {

    private final WeatherWarningRefreshService weatherWarningRefreshService;
    private final WeatherWarningRepository weatherWarningRepository;
    private final LocationShareRoomRepository roomRepository;
    private final LocationShareMemberRepository memberRepository;
    private final ApplicationEventPublisher eventPublisher;

    @PostMapping("/refresh-warning")
    public ResponseEntity<ApiResponse<String>> refreshWarning() {
        weatherWarningRefreshService.refresh(Optional.of("f"), Optional.empty());
        return ApiResponse.success(SuccessStatus.OK, "날씨 특보 갱신 완료");
    }

    @PostMapping("/create-test-warning")
    public ResponseEntity<ApiResponse<String>> createTestWarning() {
        // 테스트용 풍랑경보 생성
        WeatherWarning testWarning = WeatherWarning.builder()
                .regionCode("S1323100")  // 제주도북부앞바다
                .warningType(WarningType.HIGH_WAVE)  // 풍랑
                .warningLevel(WarningLevel.WARNING)  // 경보
                .warningCommand(WarningCommand.ISSUE)  // 발표
                .announcedAt(LocalDateTime.now())
                .effectiveAt(LocalDateTime.now())
                .expectedEndAt(LocalDateTime.now().plusHours(6))
                .build();
        
        weatherWarningRepository.save(testWarning);
        
        // 활성 룸이 있으면 알림 발송
        if (roomRepository.countByIsActiveTrue() > 0) {
            notifyActiveRoomMembers(testWarning);
            return ApiResponse.success(SuccessStatus.OK,
                "테스트 특보 생성 및 알림 발송 완료 - 제주도북부앞바다 풍랑경보");
        }
        
        return ApiResponse.success(SuccessStatus.OK, 
            "테스트 특보 생성 완료 (활성 룸 없음) - 제주도북부앞바다 풍랑경보");
    }
    
    private void notifyActiveRoomMembers(WeatherWarning warning) {
        List<LocationShareRoom> activeRooms = roomRepository.findByIsActiveTrue();
        
        if (activeRooms.isEmpty()) {
            return;
        }
        
        String regionName = RegionSeaArea.fromCode(warning.getRegionCode())
                .map(RegionSeaArea::label)
                .orElse("제주 해역");
        
        String warningTypeStr = warning.getWarningType().label();
        String warningLevelStr = warning.getWarningLevel() != null ? 
                warning.getWarningLevel().label() : "특보";
        
        String alertLevel = warningTypeStr + " " + warningLevelStr;
        
        List<Long> roomIds = activeRooms.stream()
                .map(LocationShareRoom::getId)
                .collect(Collectors.toList());
        
        List<LocationShareMember> allMembers = memberRepository
                .findByRoomIdsAndActiveRoom(roomIds);
        
        for (LocationShareMember member : allMembers) {
            eventPublisher.publishEvent(
                    new WeatherAlertEvent(
                            member.getUser().getId(),
                            regionName,
                            alertLevel
                    )
            );
        }
        
        log.info("⚠️ 테스트 날씨 특보 알림 발송 - {} {}, 활성 룸: {}개, 알림 대상: {}명", 
                regionName, alertLevel, activeRooms.size(), allMembers.size());
    }
}