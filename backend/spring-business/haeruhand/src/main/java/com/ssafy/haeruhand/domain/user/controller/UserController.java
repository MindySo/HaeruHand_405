package com.ssafy.haeruhand.domain.user.controller;

import com.ssafy.haeruhand.domain.user.dto.LoginRequestDto;
import com.ssafy.haeruhand.domain.user.dto.LoginResponseDto;
import com.ssafy.haeruhand.domain.user.dto.TokenReissueResponseDto;
import com.ssafy.haeruhand.domain.user.dto.UserInfoDto;
import com.ssafy.haeruhand.domain.user.entity.User;
import com.ssafy.haeruhand.domain.user.repository.RefreshTokenRepository;
import com.ssafy.haeruhand.domain.user.repository.UserRepository;
import com.ssafy.haeruhand.domain.user.service.OAuthService;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.jwt.JwtProvider;
import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final OAuthService oAuthService;

    @PostMapping("/login/kakao")
    public
    ResponseEntity<ApiResponse<LoginResponseDto>> loginWithKakao(@RequestBody LoginRequestDto request
            , HttpServletResponse response) {
        return oAuthService.loginWithKakao(request.getCode(), response);
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@CookieValue(value = "refresh_token", required = false) String refreshToken,
                                     HttpServletResponse response) {

        if (refreshToken == null) {
            throw new GlobalException(ErrorStatus.UNAUTHORIZED);
        }

        String userId;
        try {
            userId = jwtProvider.getSubject(refreshToken);
        } catch (Exception e) {
            throw new GlobalException(ErrorStatus.INVALID_TOKEN);
        }

        String savedToken = refreshTokenRepository.findByUserId(userId);
        if (savedToken == null || !savedToken.equals(refreshToken)) {
            throw new GlobalException(ErrorStatus.INVALID_TOKEN);
        }

        String newAccessToken = jwtProvider.createAccessToken(Long.parseLong(userId));
        long accessTokenExpiration = jwtProvider.getAccessTokenExpirationSec();

        Cookie accessTokenCookie = new Cookie("access_token", newAccessToken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(true);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge((int) (accessTokenExpiration));
        response.addCookie(accessTokenCookie);

        return ResponseEntity.ok(new TokenReissueResponseDto(accessTokenExpiration));
    }

    @GetMapping("/userinfo")
    public ResponseEntity<UserInfoDto> getUserInfo(@CookieValue(value = "access_token", required = false) String accessToken) {
        if (accessToken == null || !jwtProvider.validateToken(accessToken)) {
            throw new GlobalException(ErrorStatus.UNAUTHORIZED);
        }

        Long userId = jwtProvider.getUserIdFromToken(accessToken);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new GlobalException(ErrorStatus.USER_NOT_FOUND));

        UserInfoDto userInfo = UserInfoDto.builder()
                .userId(user.getId())
                .kakaoSub(user.getKakaoSub())
                .nickname(user.getNickname())
                .profileImageUrl(user.getProfileImage())
                .build();

        return ResponseEntity.ok(userInfo);
    }
}
