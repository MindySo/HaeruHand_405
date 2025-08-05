package com.ssafy.haeruhand.domain.notification.service;

import com.ssafy.haeruhand.domain.notification.dto.FcmTokenListResponseDto;
import com.ssafy.haeruhand.domain.notification.dto.FcmTokenRegisterRequestDto;
import com.ssafy.haeruhand.domain.notification.dto.FcmTokenResponseDto;
import com.ssafy.haeruhand.domain.notification.dto.FcmTokenUpdateRequestDto;
import com.ssafy.haeruhand.domain.notification.entity.UserFcmToken;
import com.ssafy.haeruhand.domain.notification.repository.UserFcmTokenRepository;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FcmTokenServiceImpl implements FcmTokenService {

    private final UserFcmTokenRepository fcmTokenRepository;

    @Override
    @Transactional
    public FcmTokenResponseDto registerToken(Long userId, FcmTokenRegisterRequestDto request) {
        UserFcmToken newToken = UserFcmToken.builder()
                .userId(userId)
                .fcmToken(request.getFcmToken())
                .isActive(true)
                .lastUsedAt(LocalDateTime.now())
                .build();

        try {
            UserFcmToken savedToken = fcmTokenRepository.save(newToken);
            log.info("FCM 토큰 등록 완료 - userId: {}, tokenId: {}", userId, savedToken.getId());
            return FcmTokenResponseDto.from(savedToken);
        } catch (DataIntegrityViolationException e) {
            // 중복 토큰인 경우 (unique 제약 조건)
            log.warn("중복 FCM 토큰 등록 시도 - userId: {}", userId);
            throw new GlobalException(ErrorStatus.FCM_TOKEN_DUPLICATE);
        }
    }

    @Override
    @Transactional
    public FcmTokenResponseDto updateToken(Long tokenId, FcmTokenUpdateRequestDto request) {
        UserFcmToken token = fcmTokenRepository.findById(tokenId)
                .orElseThrow(() -> new GlobalException(ErrorStatus.FCM_TOKEN_NOT_FOUND));

        token.setFcmToken(request.getFcmToken());
        token.setLastUsedAt(LocalDateTime.now());

        log.info("FCM 토큰 갱신 완료 - tokenId: {}, userId: {}", tokenId, token.getUserId());
        return FcmTokenResponseDto.from(token);
    }

    @Override
    @Transactional
    public void deleteToken(Long tokenId) {
        UserFcmToken token = fcmTokenRepository.findById(tokenId)
                .orElseThrow(() -> new GlobalException(ErrorStatus.FCM_TOKEN_NOT_FOUND));

        token.setIsActive(false);
        log.info("FCM 토큰 비활성화 완료 - tokenId: {}, userId: {}", tokenId, token.getUserId());
    }

    @Override
    public List<UserFcmToken> getUserActiveTokens(Long userId) {
        return List.of();
    }
}