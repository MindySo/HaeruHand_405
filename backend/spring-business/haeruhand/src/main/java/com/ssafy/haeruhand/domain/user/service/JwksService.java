package com.ssafy.haeruhand.domain.user.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;

import java.math.BigInteger;
import java.security.KeyFactory;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.time.Duration;
import java.util.Base64;

@Service
@Slf4j
@RequiredArgsConstructor
public class JwksService {

    private final StringRedisTemplate redisTemplate;
    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    private static final String JWKS_KEY_PREFIX = "kakao:jwks:";
    private static final Duration CACHE_TTL = Duration.ofHours(1);

    public RSAPublicKey getPublicKey(String kid) {
        String cacheKey = JWKS_KEY_PREFIX + kid;

        String cachedKey = redisTemplate.opsForValue().get(cacheKey);
        if (cachedKey != null) {
            log.debug("Redis에서 공개키 조회 성공 - kid: {}", kid);
            return deserializePublicKey(cachedKey);
        }

        // 조회된 캐시 없을 시 저장
        log.info("Redis 캐시 미스 - JWKS API 호출: {}", kid);
        RSAPublicKey publicKey = fetchPublicKeyFromKakao(kid);

        String serializedKey = serializePublicKey(publicKey);
        redisTemplate.opsForValue().set(cacheKey, serializedKey, CACHE_TTL);

        return publicKey;
    }

    private RSAPublicKey fetchPublicKeyFromKakao(String kid) {
        try {
            String jwksUrl = "https://kauth.kakao.com/.well-known/jwks.json";
            String responseBody = restClient.get()
                    .uri(jwksUrl)
                    .retrieve()
                    .body(String.class);

            JsonNode jwks = objectMapper.readTree(responseBody);
            JsonNode keys = jwks.get("keys");

            for (JsonNode keyNode : keys) {
                if (kid.equals(keyNode.get("kid").asText())) {
                    return buildRSAPublicKey(keyNode);
                }
            }

            throw new GlobalException(ErrorStatus.PUBLIC_KEY_NOT_FOUND);

        } catch (GlobalException e) {
            throw e;
        } catch (Exception e) {
            log.error("JWKS API 호출 실패 - kid: {}, error: {}", kid, e.getMessage());
            throw new GlobalException(ErrorStatus.JWKS_API_ERROR);
        }
    }

    private RSAPublicKey buildRSAPublicKey(JsonNode keyNode) {
        try {
            String n = keyNode.get("n").asText(); // modulus
            String e = keyNode.get("e").asText(); // exponent

            byte[] nBytes = Base64.getUrlDecoder().decode(n);
            byte[] eBytes = Base64.getUrlDecoder().decode(e);

            BigInteger modulus = new BigInteger(1, nBytes);
            BigInteger exponent = new BigInteger(1, eBytes);

            RSAPublicKeySpec spec = new RSAPublicKeySpec(modulus, exponent);
            KeyFactory factory = KeyFactory.getInstance("RSA");

            return (RSAPublicKey) factory.generatePublic(spec);
        } catch (Exception e) {
            log.error("RSA 공개키 생성 실패 - error: {}", e.getMessage());
            throw new GlobalException(ErrorStatus.PUBLIC_KEY_NOT_FOUND);
        }
    }

    private String serializePublicKey(RSAPublicKey publicKey) {
        try {
            byte[] encoded = publicKey.getEncoded();
            return Base64.getEncoder().encodeToString(encoded);
        } catch (Exception e) {
            log.error("공개키 직렬화 실패 - error: {}", e.getMessage());
            throw new GlobalException(ErrorStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private RSAPublicKey deserializePublicKey(String encodedKey) {
        try {
            byte[] decoded = Base64.getDecoder().decode(encodedKey);
            java.security.spec.X509EncodedKeySpec spec = new java.security.spec.X509EncodedKeySpec(decoded);
            KeyFactory factory = KeyFactory.getInstance("RSA");
            return (RSAPublicKey) factory.generatePublic(spec);
        } catch (Exception e) {
            log.error("공개키 역직렬화 실패 - error: {}", e.getMessage());
            throw new GlobalException(ErrorStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public void evictKey(String kid) {
        String cacheKey = JWKS_KEY_PREFIX + kid;
        redisTemplate.delete(cacheKey);
        log.info("공개키 캐시 삭제 완료 - kid: {}", kid);
    }
}