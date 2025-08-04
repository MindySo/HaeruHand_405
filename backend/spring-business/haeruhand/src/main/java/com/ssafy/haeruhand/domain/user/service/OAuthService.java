package com.ssafy.haeruhand.domain.user.service;

import com.ssafy.haeruhand.domain.user.dto.LoginResponseDto;
import com.ssafy.haeruhand.domain.user.dto.TokenReissueResponseDto;
import com.ssafy.haeruhand.domain.user.dto.UserInfoDto;
import com.ssafy.haeruhand.global.response.ApiResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface OAuthService {
    ResponseEntity<ApiResponse<LoginResponseDto>> loginWithKakao(String code, HttpServletResponse response);
    ResponseEntity<ApiResponse<TokenReissueResponseDto>> reissueToken(String refreshToken);
    UserInfoDto getUserInfo(String accessToken);
}
