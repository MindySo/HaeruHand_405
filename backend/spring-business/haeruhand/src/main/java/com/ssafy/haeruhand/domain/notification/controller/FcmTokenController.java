package com.ssafy.haeruhand.domain.notification.controller;

import com.ssafy.haeruhand.domain.notification.dto.FcmTokenRegisterRequestDto;
import com.ssafy.haeruhand.domain.notification.dto.FcmTokenResponseDto;
import com.ssafy.haeruhand.domain.notification.dto.FcmTokenUpdateRequestDto;
import com.ssafy.haeruhand.domain.notification.service.FcmTokenService;
import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/notifications/tokens")
@RequiredArgsConstructor
@Tag(name = "FCM Token Management", description = "FCM 토큰 관리 API")
public class FcmTokenController {

    private final FcmTokenService fcmService;

    @PostMapping
    @Operation(summary = "FCM 토큰 등록")
    public ResponseEntity<ApiResponse<FcmTokenResponseDto>> registerToken(
            @RequestHeader("X-User-Id") Long userId,
            @RequestBody @Valid FcmTokenRegisterRequestDto request) {

        FcmTokenResponseDto response = fcmService.registerToken(userId, request);
        return ApiResponse.success(SuccessStatus.REGISTER_FCM_TOKEN_SUCCESS, response);
    }

    @PutMapping("/{tokenId}")
    @Operation(summary = "FCM 토큰 갱신")
    public ResponseEntity<ApiResponse<FcmTokenResponseDto>> updateToken(
            @PathVariable Long tokenId,
            @RequestBody @Valid FcmTokenUpdateRequestDto request) {

        FcmTokenResponseDto response = fcmService.updateToken(tokenId, request);
        return ApiResponse.success(SuccessStatus.UPDATE_FCM_TOKEN_SUCCESS, response);
    }

    @DeleteMapping("/{tokenId}")
    @Operation(summary = "FCM 토큰 삭제")
    public ResponseEntity<ApiResponse<Void>> deleteToken(@PathVariable Long tokenId) {
        fcmService.deleteToken(tokenId);
        return ApiResponse.success(SuccessStatus.DELETE_FCM_TOKEN_SUCCESS);
    }
}