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

    public void save(String kakaoSub, String refreshToken) {
        redisTemplate.opsForValue().set(kakaoSub, refreshToken, REFRESH_TOKEN_EXPIRATION, TimeUnit.SECONDS);
    }

    public String findByKakaoSub(String kakaoSub) {
        return redisTemplate.opsForValue().get(kakaoSub);
    }

    public void deleteByKakaoSub(String kakaoSub) {
        redisTemplate.delete(kakaoSub);
    }
}
