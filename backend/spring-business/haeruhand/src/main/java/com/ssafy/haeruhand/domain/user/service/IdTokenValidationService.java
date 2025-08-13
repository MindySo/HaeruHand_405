package com.ssafy.haeruhand.domain.user.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.haeruhand.domain.user.dto.KakaoUserInfoDto;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Signature;
import java.security.interfaces.RSAPublicKey;
import java.util.Base64;

@Service
@Slf4j
@RequiredArgsConstructor
public class IdTokenValidationService {
    
    private final JwksService jwksService;
    private final ObjectMapper objectMapper;
    
    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String clientId;
    
    public KakaoUserInfoDto validateAndDecodeIdToken(String idToken) {
        try {
            // JWT 파싱 및 디코딩
            String[] parts = idToken.split("\\.");
            if (parts.length != 3) {
                throw new GlobalException(ErrorStatus.INVALID_ID_TOKEN);
            }
            
            String header = new String(Base64.getUrlDecoder().decode(parts[0]));
            String payload = new String(Base64.getUrlDecoder().decode(parts[1]));
            
            JsonNode headerJson = objectMapper.readTree(header);
            JsonNode payloadJson = objectMapper.readTree(payload);
            
            // 기본 클레임 검증
            validateClaims(payloadJson);
            
            // 서명 검증
            String kid = headerJson.get("kid").asText();
            RSAPublicKey publicKey = jwksService.getPublicKey(kid);
            
            if (!verifySignature(parts[0] + "." + parts[1], parts[2], publicKey)) {
                throw new GlobalException(ErrorStatus.ID_TOKEN_SIGNATURE_INVALID);
            }
            
            // 사용자 정보 추출
            return extractUserInfo(payloadJson);
            
        } catch (GlobalException e) {
            throw e;
        } catch (Exception e) {
            log.error("ID Token 검증 실패 - error: {}", e.getMessage());
            throw new GlobalException(ErrorStatus.INVALID_ID_TOKEN);
        }
    }
    
    private void validateClaims(JsonNode payload) {
        // 발급자 검증
        String issuer = payload.get("iss").asText();
        if (!"https://kauth.kakao.com".equals(issuer)) {
            log.warn("잘못된 발급자 - issuer: {}", issuer);
            throw new GlobalException(ErrorStatus.INVALID_ID_TOKEN);
        }
        
        // app 키(clientId) 일치 여부 검증
        String audience = payload.get("aud").asText();
        if (!clientId.equals(audience)) {
            log.warn("잘못된 대상 - audience: {}", audience);
            throw new GlobalException(ErrorStatus.INVALID_ID_TOKEN);
        }
        
        // 만료 시간 검증
        long exp = payload.get("exp").asLong();
        long currentTime = System.currentTimeMillis() / 1000;
        if (exp < currentTime) {
            log.warn("만료된 ID Token - exp: {}, current: {}", exp, currentTime);
            throw new GlobalException(ErrorStatus.EXPIRED_ID_TOKEN);
        }
        
        log.debug("ID Token 클레임 검증 완료");
    }
    
    private boolean verifySignature(String data, String signature, RSAPublicKey publicKey) {
        try {
            Signature sig = Signature.getInstance("SHA256withRSA");
            sig.initVerify(publicKey);
            sig.update(data.getBytes(StandardCharsets.UTF_8));
            
            byte[] signatureBytes = Base64.getUrlDecoder().decode(signature);
            return sig.verify(signatureBytes);
            
        } catch (Exception e) {
            log.error("서명 검증 중 오류 - error: {}", e.getMessage());
            return false;
        }
    }
    
    private KakaoUserInfoDto extractUserInfo(JsonNode payload) {
        return KakaoUserInfoDto.builder()
                .kakaoSub(payload.get("sub").asLong())
                .nickname(payload.has("nickname") ? payload.get("nickname").asText() : null)
                .profileImage(payload.has("picture") ? payload.get("picture").asText() : null)
                .build();
    }
}