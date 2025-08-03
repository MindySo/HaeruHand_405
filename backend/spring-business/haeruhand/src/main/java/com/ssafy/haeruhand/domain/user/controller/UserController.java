package com.ssafy.haeruhand.domain.user.controller;

import com.ssafy.haeruhand.domain.user.dto.LoginRequestDto;
import com.ssafy.haeruhand.domain.user.dto.LoginResponseDto;
import com.ssafy.haeruhand.domain.user.dto.TokenReissueResponseDto;
import com.ssafy.haeruhand.domain.user.dto.UserInfoDto;
import com.ssafy.haeruhand.domain.user.service.OAuthService;
import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final OAuthService oAuthService;

    @PostMapping("/login/kakao")
    public ResponseEntity<ApiResponse<LoginResponseDto>> loginWithKakao(
            @RequestBody LoginRequestDto request,
            HttpServletResponse response) {

        return oAuthService.loginWithKakao(request.getCode(), response);
    }

    @PostMapping("/reissue")
    public ResponseEntity<ApiResponse<TokenReissueResponseDto>> reissueToken(
            @RequestHeader("X-Refresh-Token") String refreshToken) {

        return oAuthService.reissueToken(refreshToken);
    }

    @GetMapping("/userinfo")
    public ResponseEntity<ApiResponse<UserInfoDto>> getUserInfo(
            @RequestHeader("Authorization") String bearerToken) {

        String accessToken = bearerToken.replace("Bearer ", "");
        UserInfoDto userInfo = oAuthService.getUserInfo(accessToken);
        return ApiResponse.success(SuccessStatus.OK, userInfo);
    }
}
