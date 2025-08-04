package com.ssafy.haeruhand.domain.user.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class RefreshTokenRepository {
    private final StringRedisTemplate redisTemplate;

    @Value("${jwt.refresh-token-expiration}")
    private Long REFRESH_TOKEN_EXPIRATION;

    public void save(String userId, String refreshToken) {
        redisTemplate.opsForValue().set(userId, refreshToken, REFRESH_TOKEN_EXPIRATION / 1000, TimeUnit.SECONDS);
    }

    public String findByUserId(String userId) {
        return redisTemplate.opsForValue().get(userId);
    }

    public void deleteByUserId(String userId) {
        redisTemplate.delete(userId);
    }
}
