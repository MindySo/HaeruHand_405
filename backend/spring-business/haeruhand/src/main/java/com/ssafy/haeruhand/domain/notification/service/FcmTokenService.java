package com.ssafy.haeruhand.domain.notification.service;

import com.ssafy.haeruhand.domain.notification.dto.FcmTokenRegisterRequestDto;
import com.ssafy.haeruhand.domain.notification.dto.FcmTokenResponseDto;
import com.ssafy.haeruhand.domain.notification.dto.FcmTokenUpdateRequestDto;
import com.ssafy.haeruhand.domain.notification.entity.UserFcmToken;

import java.util.List;

public interface FcmTokenService {

    FcmTokenResponseDto registerToken(Long userId, FcmTokenRegisterRequestDto request);
    FcmTokenResponseDto updateToken(Long tokenId, FcmTokenUpdateRequestDto request);
    void deleteToken(Long tokenId);
    List<UserFcmToken> getUserActiveTokens(Long userId);  // API 노출 안 함
}