package com.ssafy.haeruhand.domain.notification.service;

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
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FcmTokenServiceImpl implements FcmTokenService {

    private final UserFcmTokenRepository fcmTokenRepository;

    @Override
    @Transactional
    public FcmTokenResponseDto registerToken(Long userId, FcmTokenRegisterRequestDto request) {
        Optional<UserFcmToken> existingToken = fcmTokenRepository
                .findByFcmTokenAndIsDeletedFalse(request.getFcmToken());

        if (existingToken.isPresent()) {
            // 같은 토큰이 다른 사용자에게 등록되어 있다면 해당 토큰을 비활성화
            if (!existingToken.get().getUserId().equals(userId)) {
                log.info("다른 사용자의 토큰을 현재 사용자로 이전 - Old UserId: {}, New UserId: {}",
                        existingToken.get().getUserId(), userId);
                existingToken.get().softDelete();
            } else {
                existingToken.get().setLastUsedAt(LocalDateTime.now());
                log.info("기존 FCM 토큰 갱신 - userId: {}, tokenId: {}", userId, existingToken.get().getId());
                return FcmTokenResponseDto.builder()
                        .tokenId(existingToken.get().getId())
                        .maskedToken(maskToken(existingToken.get().getFcmToken()))
                        .isActive(!existingToken.get().isDeleted())
                        .lastUsedAt(existingToken.get().getLastUsedAt())
                        .build();
            }
        }

        UserFcmToken newToken = UserFcmToken.builder()
                .userId(userId)
                .fcmToken(request.getFcmToken())
                .lastUsedAt(LocalDateTime.now())
                .build();

        try {
            UserFcmToken savedToken = fcmTokenRepository.save(newToken);
            log.info("FCM 토큰 등록 완료 - userId: {}, tokenId: {}", userId, savedToken.getId());
            return FcmTokenResponseDto.builder()
                    .tokenId(savedToken.getId())
                    .maskedToken(maskToken(savedToken.getFcmToken()))
                    .isActive(!savedToken.isDeleted())
                    .lastUsedAt(savedToken.getLastUsedAt())
                    .build();
        } catch (DataIntegrityViolationException e) {
            log.warn("FCM 토큰 등록 중 데이터 제약 조건 위반 - userId: {}", userId);
            throw new GlobalException(ErrorStatus.FCM_TOKEN_DUPLICATE);
        }
    }

    @Override
    @Transactional
    public FcmTokenResponseDto updateToken(Long tokenId, FcmTokenUpdateRequestDto request) {
        UserFcmToken token = fcmTokenRepository.findById(tokenId)
                .orElseThrow(() -> new GlobalException(ErrorStatus.FCM_TOKEN_NOT_FOUND));

        if (token.isDeleted()) {
            throw new GlobalException(ErrorStatus.FCM_TOKEN_NOT_FOUND);
        }

        token.setFcmToken(request.getFcmToken());
        token.setLastUsedAt(LocalDateTime.now());

        log.info("FCM 토큰 갱신 완료 - tokenId: {}, userId: {}", tokenId, token.getUserId());
        return FcmTokenResponseDto.builder()
                .tokenId(token.getId())
                .maskedToken(maskToken(token.getFcmToken()))
                .isActive(!token.isDeleted())
                .lastUsedAt(token.getLastUsedAt())
                .build();
    }

    @Override
    @Transactional
    public void deleteToken(Long tokenId) {
        UserFcmToken token = fcmTokenRepository.findById(tokenId)
                .orElseThrow(() -> new GlobalException(ErrorStatus.FCM_TOKEN_NOT_FOUND));

        if (token.isDeleted()) {
            throw new GlobalException(ErrorStatus.FCM_TOKEN_NOT_FOUND);
        }

        token.softDelete();
        log.info("FCM 토큰 비활성화 완료 - tokenId: {}, userId: {}", tokenId, token.getUserId());
    }

    @Override
    public List<UserFcmToken> getUserActiveTokens(Long userId) {
        List<UserFcmToken> activeTokens = fcmTokenRepository.findByUserIdAndIsDeletedFalse(userId);
        log.debug("사용자 활성 FCM 토큰 조회 - userId: {}, tokenCount: {}", userId, activeTokens.size());
        return activeTokens;
    }

    @Override
    public boolean isTokenActive(Long tokenId) {
        return fcmTokenRepository.findById(tokenId)
                .map(token -> !token.isDeleted())
                .orElse(false);
    }

    private String maskToken(String token) {
        if (token == null || token.length() < 10) {
            return "INVALID_TOKEN";
        }
        return token.substring(0, 6) + "****" + token.substring(token.length() - 4);
    }
}