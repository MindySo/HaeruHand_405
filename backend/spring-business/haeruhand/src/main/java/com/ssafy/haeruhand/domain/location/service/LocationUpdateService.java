package com.ssafy.haeruhand.domain.location.service;

import com.ssafy.haeruhand.domain.location.dto.internal.LocationBatchDto;
import com.ssafy.haeruhand.domain.location.dto.websocket.LocationUpdateRequest;
import com.ssafy.haeruhand.domain.location.entity.LocationShareRoom;
import com.ssafy.haeruhand.domain.location.entity.UserLocationLog;
import com.ssafy.haeruhand.domain.location.repository.LocationShareRoomRepository;
import com.ssafy.haeruhand.domain.location.repository.UserLocationLogRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LocationUpdateService {

    private final UserLocationLogRepository locationLogRepository;
    private final LocationShareRoomRepository roomRepository;
    private final JdbcTemplate jdbcTemplate;
    
    private final BlockingQueue<LocationBatchDto> locationQueue = new LinkedBlockingQueue<>();
    
    // 위치 정보를 큐에 추가
    public void enqueueLocation(Long roomId, Long userId, LocationUpdateRequest request) {
        LocationBatchDto locationDto = LocationBatchDto.builder()
                .roomId(roomId)
                .userId(userId)
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .accuracy(request.getAccuracy())
                .timestamp(LocalDateTime.now())
                .build();
        
        boolean offered = locationQueue.offer(locationDto);
        if (!offered) {
            log.warn("Location queue is full. Dropping location update for user: {}", userId);
        }
    }
    
    // 3초마다 배치 처리
    @Scheduled(fixedRate = 3000)
    @Transactional
    public void flushLocationBatch() {
        List<LocationBatchDto> batch = new ArrayList<>();
        locationQueue.drainTo(batch, 1000); // 최대 1000개
        
        if (batch.isEmpty()) {
            return;
        }
        
        try {
            jdbcTemplate.batchUpdate(
                """
                INSERT INTO user_location_log 
                (location_share_room_id, user_id, latitude, longitude, accuracy, timestamp, is_deleted, created_at, updated_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                batch,
                batch.size(),
                (PreparedStatement ps, LocationBatchDto location) -> {
                    LocalDateTime now = LocalDateTime.now();
                    ps.setLong(1, location.getRoomId());
                    ps.setLong(2, location.getUserId());
                    ps.setBigDecimal(3, location.getLatitude());
                    ps.setBigDecimal(4, location.getLongitude());
                    ps.setBigDecimal(5, location.getAccuracy());
                    ps.setTimestamp(6, Timestamp.valueOf(location.getTimestamp()));
                    ps.setBoolean(7, false); // is_deleted
                    ps.setTimestamp(8, Timestamp.valueOf(now)); // created_at
                    ps.setTimestamp(9, Timestamp.valueOf(now)); // updated_at
                }
            );
            
            log.debug("Batch inserted {} location updates", batch.size());
        } catch (Exception e) {
            log.error("Failed to batch insert location updates", e);
        }
    }
}