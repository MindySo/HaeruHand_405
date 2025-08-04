package com.ssafy.haeruhand.domain.location.scheduler;

import com.ssafy.haeruhand.domain.location.dto.websocket.LocationMessage;
import com.ssafy.haeruhand.domain.location.entity.LocationShareRoom;
import com.ssafy.haeruhand.domain.location.repository.LocationShareRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class LocationRoomScheduler {

    private final LocationShareRoomRepository roomRepository;
    private final SimpMessagingTemplate messagingTemplate;

    // 1분마다 타이머 업데이트
    @Scheduled(fixedRate = 60000)
    public void sendTimerUpdates() {
        List<LocationShareRoom> activeRooms = roomRepository.findAll().stream()
                .filter(room -> room.getIsActive())
                .toList();
        
        for (LocationShareRoom room : activeRooms) {
            long elapsedMin = ChronoUnit.MINUTES.between(room.getStartedAt(), LocalDateTime.now());
            
            LocationMessage timerMessage = LocationMessage.builder()
                    .type(LocationMessage.MessageType.TIMER_UPDATE)
                    .elapsedMin(elapsedMin)
                    .build();
            
            messagingTemplate.convertAndSend(
                    "/sub/location." + room.getRoomCode(),
                    timerMessage);
        }
        
        if (!activeRooms.isEmpty()) {
            log.debug("Sent timer updates to {} active rooms", activeRooms.size());
        }
    }

    // 5분마다 만료된 방 확인 및 정리
    @Scheduled(fixedRate = 300000)
    public void cleanupExpiredRooms() {
        LocalDateTime now = LocalDateTime.now();
        List<LocationShareRoom> expiredRooms = roomRepository
                .findByIsActiveTrueAndExpiresAtBefore(now);
        
        for (LocationShareRoom room : expiredRooms) {
            try {
                room.close();
                roomRepository.save(room);
                
                long totalDurationMin = ChronoUnit.MINUTES.between(room.getStartedAt(), now);
                
                // ROOM_CLOSED 브로드캐스트
                LocationMessage roomClosedMessage = LocationMessage.builder()
                        .type(LocationMessage.MessageType.ROOM_CLOSED)
                        .reason(LocationMessage.CloseReason.EXPIRED)
                        .closedAt(room.getClosedAt())
                        .totalDurationMin(totalDurationMin)
                        .build();
                
                messagingTemplate.convertAndSend(
                        "/sub/location." + room.getRoomCode(),
                        roomClosedMessage);
                
                log.info("Expired room {} closed. Total duration: {} minutes", 
                        room.getRoomCode(), totalDurationMin);
            } catch (Exception e) {
                log.error("Failed to close expired room: {}", room.getRoomCode(), e);
            }
        }
        
        if (!expiredRooms.isEmpty()) {
            log.info("Cleaned up {} expired rooms", expiredRooms.size());
        }
    }
}