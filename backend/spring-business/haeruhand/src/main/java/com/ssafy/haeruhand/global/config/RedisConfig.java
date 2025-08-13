package com.ssafy.haeruhand.global.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.haeruhand.domain.location.websocket.listener.RedisLocationSubscriber;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.listener.PatternTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;

/**
 * Redis Pub/Sub 설정
 * 분산 환경에서 WebSocket 메시지 동기화를 위한 설정
 */
@Configuration
@RequiredArgsConstructor
public class RedisConfig {

    @Value("${location.websocket.channel-prefix:location:room:}")
    private String channelPrefix;

    /**
     * Redis 메시지 리스너 컨테이너
     * Pub/Sub 메시지를 수신하고 적절한 리스너로 라우팅
     */
    @Bean
    public RedisMessageListenerContainer redisMessageListenerContainer(
            RedisConnectionFactory connectionFactory,
            MessageListenerAdapter locationMessageListenerAdapter) {
        
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        
        // 위치 공유 방별 채널 패턴 등록
        container.addMessageListener(locationMessageListenerAdapter, 
                new PatternTopic(channelPrefix + "*"));
        
        return container;
    }
    
    /**
     * 위치 메시지 리스너 어댑터
     * RedisLocationSubscriber를 메시지 리스너로 등록
     */
    @Bean
    public MessageListenerAdapter locationMessageListenerAdapter(
            RedisLocationSubscriber subscriber) {
        return new MessageListenerAdapter(subscriber, "handleMessage");
    }
    
    /**
     * LocationMessage 직렬화/역직렬화용 ObjectMapper
     * LocalDateTime 처리를 위한 JavaTimeModule 포함
     */
    @Bean
    public ObjectMapper redisObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        return mapper;
    }
}