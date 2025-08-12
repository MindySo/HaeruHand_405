package com.ssafy.haeruhand.domain.location.websocket.listener;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.haeruhand.domain.location.dto.websocket.LocationMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

/**
 * Redis Pub/Sub 메시지 구독 리스너
 * 다른 서버 인스턴스에서 발행한 메시지를 수신하여 WebSocket 클라이언트에게 전달
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class RedisLocationSubscriber implements MessageListener {

    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper redisObjectMapper;
    
    @Value("${redis.pubsub.enabled:false}")
    private boolean pubsubEnabled;
    
    private static final String CHANNEL_PREFIX = "location:room:";
    private static final String WEBSOCKET_PREFIX = "/sub/location.";
    
    /**
     * Redis 메시지 수신 처리
     * 채널에서 방 코드를 추출하고 해당 WebSocket 채널로 브로드캐스트
     */
    @Override
    public void onMessage(Message message, byte[] pattern) {
        if (!pubsubEnabled) {
            return;
        }
        
        try {
            // 채널명에서 방 코드 추출
            String channel = new String(message.getChannel());
            if (!channel.startsWith(CHANNEL_PREFIX)) {
                log.warn("Received message from unexpected channel: {}", channel);
                return;
            }
            
            String roomCode = channel.substring(CHANNEL_PREFIX.length());
            
            // 메시지 역직렬화
            String messageBody = new String(message.getBody());
            LocationMessage locationMessage = redisObjectMapper.readValue(
                    messageBody, LocationMessage.class);
            
            // WebSocket으로 브로드캐스트
            String destination = WEBSOCKET_PREFIX + roomCode;
            messagingTemplate.convertAndSend(destination, locationMessage);
            
            log.debug("Broadcasted Redis message to WebSocket channel {}. Type: {}", 
                    destination, locationMessage.getType());
            
        } catch (Exception e) {
            log.error("Failed to process Redis message: {}", e.getMessage());
        }
    }
    
    /**
     * MessageListenerAdapter에서 호출할 메서드
     * Spring의 메시지 리스너 어댑터와 호환성을 위해 추가
     */
    public void handleMessage(String message, String channel) {
        if (!pubsubEnabled) {
            return;
        }
        
        try {
            // 채널명에서 방 코드 추출
            if (!channel.startsWith(CHANNEL_PREFIX)) {
                log.warn("Received message from unexpected channel: {}", channel);
                return;
            }
            
            String roomCode = channel.substring(CHANNEL_PREFIX.length());
            
            // 메시지 역직렬화
            LocationMessage locationMessage = redisObjectMapper.readValue(
                    message, LocationMessage.class);
            
            // WebSocket으로 브로드캐스트
            String destination = WEBSOCKET_PREFIX + roomCode;
            messagingTemplate.convertAndSend(destination, locationMessage);
            
            log.debug("Broadcasted Redis message to WebSocket channel {}. Type: {}", 
                    destination, locationMessage.getType());
            
        } catch (Exception e) {
            log.error("Failed to process Redis message: {}", e.getMessage());
        }
    }
}