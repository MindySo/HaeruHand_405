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

}