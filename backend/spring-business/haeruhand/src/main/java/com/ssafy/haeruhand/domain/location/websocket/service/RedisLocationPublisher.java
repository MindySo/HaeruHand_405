package com.ssafy.haeruhand.domain.location.websocket.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.haeruhand.domain.location.dto.websocket.LocationMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

/**
 * Redis Pub/Sub 메시지 발행 서비스
 * 분산 환경에서 모든 서버 인스턴스에 메시지 전파
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RedisLocationPublisher {

    private final StringRedisTemplate stringRedisTemplate;
    private final ObjectMapper redisObjectMapper;
    
    @Value("${redis.pubsub.enabled:false}")
    private boolean pubsubEnabled;
    
    @Value("${location.websocket.channel-prefix:location:room:}")
    private String channelPrefix;
    
    /**
     * 특정 방에 메시지 발행
     * Feature Flag로 활성화/비활성화 제어
     */
    public void publishToRoom(String roomCode, LocationMessage message) {
        if (!pubsubEnabled) {
            log.debug("Redis Pub/Sub is disabled. Skipping message publication.");
            return;
        }
        
        try {
            String channel = channelPrefix + roomCode;
            String messageJson = redisObjectMapper.writeValueAsString(message);
            
            stringRedisTemplate.convertAndSend(channel, messageJson);
            
            log.debug("Published message to Redis channel {}. Type: {}", 
                    channel, message.getType());
        } catch (Exception e) {
            log.error("Failed to publish message to Redis for room {}: {}", 
                    roomCode, e.getMessage());
        }
    }
    
    /**
     * Pub/Sub 활성화 여부 확인
     */
    public boolean isPubsubEnabled() {
        return pubsubEnabled;
    }
}