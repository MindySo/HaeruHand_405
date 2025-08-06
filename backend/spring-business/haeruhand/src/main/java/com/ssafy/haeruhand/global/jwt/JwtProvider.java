package com.ssafy.haeruhand.global.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;


import javax.crypto.SecretKey;
import java.util.Date;
import java.util.UUID;

@Slf4j
@Component
public class JwtProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    @Getter
    @Value("${jwt.access-token-expiration}")
    private int accessTokenExpirationMilliSec;

    @Getter
    @Value("${jwt.refresh-token-expiration}")
    private int refreshTokenExpirationMilliSec;

    private SecretKey key;

    @EventListener(ApplicationReadyEvent.class)
    public void init() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String createAccessToken(Long userId) {
        return createToken(userId, accessTokenExpirationMilliSec);
    }

    public String createRefreshToken(Long userId) {
        return createToken(userId, refreshTokenExpirationMilliSec);
    }

    private String createToken(Long userId, long expirationMillis) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMillis);

        return Jwts.builder()
                .subject(String.valueOf(userId))
                .issuedAt(now)
                .expiration(expiry)
                .signWith(key)
                .compact();
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = parseClaims(token);
        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("Invalid JWT token: {}", e.getMessage());
            return false;
        }
    }

    private Claims parseClaims(String token) {
        JwtParser parser = Jwts.parser().verifyWith(key).build();
        return parser.parseSignedClaims(token).getPayload();
    }
    
    public String createJoinToken(String roomCode, Long hostUserId, int expiresInMin) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + (expiresInMin * 60 * 1000L));
        String jti = UUID.randomUUID().toString();
        
        return Jwts.builder()
                .claim("room", roomCode)
                .subject(String.valueOf(hostUserId))
                .id(jti)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(key)
                .compact();
    }
    
    public void validateJoinToken(String token, String expectedRoomCode) {
        try {
            Claims claims = parseClaims(token);
            String roomCode = claims.get("room", String.class);
            
            if (!expectedRoomCode.equals(roomCode)) {
                throw new JwtException("Invalid room code in join token");
            }
        } catch (JwtException | IllegalArgumentException e) {
            log.error("Invalid join token: {}", e.getMessage());
            throw new IllegalArgumentException("Invalid join token", e);
        }
    }
    
    public String getJti(String token) {
        Claims claims = parseClaims(token);
        return claims.getId();
    }
    
    public Long validateAndGetUserId(String token) {
        if (!validateToken(token)) {
            throw new IllegalArgumentException("Invalid token");
        }
        return getUserIdFromToken(token);
    }
}
