package com.ssafy.haeruhand.domain.user.controller;

import com.ssafy.haeruhand.domain.user.dto.*;
import com.ssafy.haeruhand.domain.user.service.OAuthService;
import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final OAuthService oAuthService;

    @PostMapping("/issue/kakao")
    @Operation(summary = "카카오 인증 및 Token 발급")
    public ResponseEntity<ApiResponse<IssueResponseBodyDto>> authorizeKakaoAndIssueToken(
            @RequestBody @Valid LoginRequestDto request,
            HttpServletResponse response) {

        IssueResponseDto responseDto = oAuthService.authorizeKakaoAndIssueToken(request.getCode(), response);
        return ApiResponse.successWithToken(
                SuccessStatus.LOGIN_SUCCESS,
                responseDto.getResponseBodyDto(),
                responseDto.getAccessToken(),
                responseDto.getRefreshToken()
        );
    }

    @PostMapping("/reissue")
    @Operation(summary = "Token 재발급")
    public ResponseEntity<ApiResponse<ReissueResponseBodyDto>> reissueToken(
            @RequestHeader("X-Refresh-Token") String refreshToken) {

        ReissueResponseDto responseDto = oAuthService.reissueToken(refreshToken);

        return ApiResponse.successWithToken(
                SuccessStatus.TOKEN_REISSUE_SUCCESS,
                responseDto.getResponseBodyDto(),
                responseDto.getAccessToken(),
                responseDto.getRefreshToken()
        );
    }

    @GetMapping("/userinfo")
    @Operation(summary = "유저 정보 조회")
    public ResponseEntity<ApiResponse<UserInfoDto>> getUserInfo(
            @RequestHeader("Authorization") String bearerToken) {

        String accessToken = bearerToken.replace("Bearer ", "");
        UserInfoDto userInfo = oAuthService.getUserInfo(accessToken);
        return ApiResponse.success(SuccessStatus.OK, userInfo);
    }
}
