package com.ssafy.haeruhand.domain.location.websocket.service;

import com.ssafy.haeruhand.domain.location.dto.websocket.LocationMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

/**
 * WebSocket 메시지 생성 및 전송 로직 서비스
 * LocationMessage 팩토리, 브로드캐스트 전략, 메시지 변환
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class LocationWebSocketMessageService {

    private final SimpMessagingTemplate messagingTemplate;
    private final RedisLocationPublisher redisPublisher;
    
    @Value("${location.websocket.destination-prefix:/sub/location.}")
    private String destinationPrefix;

    /**
     * 특정 사용자에게 개인 메시지 전송
     */
    public void sendToUser(String userId, String roomCode, LocationMessage message) {
        String destination = destinationPrefix + roomCode;
        try {
            messagingTemplate.convertAndSendToUser(userId, destination, message);
            log.debug("Message sent to user {}. Type: {}, Room: {}", userId, message.getType(), roomCode);
        } catch (Exception e) {
            log.error("Failed to send message to user {}: {}", userId, e.getMessage());
        }
    }

    /**
     * 방의 모든 멤버에게 브로드캐스트
     * Redis Pub/Sub이 활성화된 경우 Redis를 통해 전파, 아니면 직접 전송
     */
    public void broadcastToRoom(String roomCode, LocationMessage message) {
        try {
            if (redisPublisher.isPubsubEnabled()) {
                // Redis Pub/Sub을 통해 모든 서버에 전파
                redisPublisher.publishToRoom(roomCode, message);
                log.debug("Message published to Redis for room {}. Type: {}", roomCode, message.getType());
            } else {
                // 기존 방식: 현재 서버에만 전송
                String destination = destinationPrefix + roomCode;
                messagingTemplate.convertAndSend(destination, message);
                log.debug("Message broadcasted directly to room {}. Type: {}", roomCode, message.getType());
            }
        } catch (Exception e) {
            log.error("Failed to broadcast message to room {}: {}", roomCode, e.getMessage());
        }
    }

    /**
     * 방의 모든 멤버에게 브로드캐스트 (특정 사용자 제외)
     */
    public void broadcastToRoomExcept(String roomCode, String excludeUserId, LocationMessage message) {
        // 현재 SimpMessagingTemplate에는 특정 사용자 제외 기능이 없으므로
        // 추후 필요시 구현 가능한 구조로 준비
        broadcastToRoom(roomCode, message);
        log.debug("Message broadcasted to room {} (excluding user {}). Type: {}", 
                roomCode, excludeUserId, message.getType());
    }

    /**
     * 타이머 업데이트 메시지 생성 및 브로드캐스트
     */
    public void broadcastTimerUpdate(String roomCode, long elapsedMin) {
        LocationMessage timerMessage = LocationMessage.builder()
                .type(LocationMessage.MessageType.TIMER_UPDATE)
                .elapsedMin(elapsedMin)
                .build();
        
        broadcastToRoom(roomCode, timerMessage);
        log.debug("Timer update broadcasted to room {}. Elapsed: {} minutes", roomCode, elapsedMin);
    }

    /**
     * 위치 업데이트 브로드캐스트 (전송자 제외)
     */
    public void broadcastLocationUpdate(String roomCode, String senderUserId, LocationMessage locationMessage) {
        // 위치 업데이트는 보통 전송자를 제외하고 브로드캐스트
        broadcastToRoomExcept(roomCode, senderUserId, locationMessage);
    }

    /**
     * 멤버 참가 알림 브로드캐스트
     */
    public void broadcastMemberJoined(String roomCode, LocationMessage joinedMessage) {
        broadcastToRoom(roomCode, joinedMessage);
        log.info("Member joined notification broadcasted to room {}", roomCode);
    }

    /**
     * 멤버 퇴장 알림 브로드캐스트
     */
    public void broadcastMemberLeft(String roomCode, LocationMessage leftMessage) {
        broadcastToRoom(roomCode, leftMessage);
        log.info("Member left notification broadcasted to room {}", roomCode);
    }

    /**
     * 방 종료 알림 브로드캐스트
     */
    public void broadcastRoomClosed(String roomCode, LocationMessage closedMessage) {
        broadcastToRoom(roomCode, closedMessage);
        log.info("Room closed notification broadcasted to room {}", roomCode);
    }

    /**
     * 메시지 전송 성공 여부 확인을 위한 콜백 메서드
     */
    public void sendWithCallback(String roomCode, LocationMessage message, MessageSendCallback callback) {
        try {
            broadcastToRoom(roomCode, message);
            callback.onSuccess();
        } catch (Exception e) {
            callback.onFailure(e);
        }
    }

    /**
     * 메시지 전송 결과 콜백 인터페이스
     */
    public interface MessageSendCallback {
        void onSuccess();
        void onFailure(Exception e);
    }

}