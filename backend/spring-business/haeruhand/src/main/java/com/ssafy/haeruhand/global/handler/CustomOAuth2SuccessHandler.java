package com.ssafy.haeruhand.global.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.haeruhand.domain.user.dto.LoginResponseDto;
import com.ssafy.haeruhand.domain.user.dto.UserInfoDto;
import com.ssafy.haeruhand.domain.user.entity.User;
import com.ssafy.haeruhand.domain.user.repository.RefreshTokenRepository;
import com.ssafy.haeruhand.domain.user.repository.UserRepository;
import com.ssafy.haeruhand.domain.user.service.OAuthService;
import com.ssafy.haeruhand.global.jwt.JwtProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final OAuthService oAuthService;
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        if (authentication instanceof OAuth2AuthenticationToken token) {
            oAuthService.processOAuthPostLogin(token);
        }

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Long kakaoSub = oAuth2User.getAttribute("id");
        log.info("OAuth2User attributes: {}", oAuth2User.getAttributes());

        User user = userRepository.findByKakaoSub(kakaoSub)
                .orElseThrow(() -> new RuntimeException("로그인 후 사용자 정보를 찾을 수 없습니다."));

        String refreshToken = jwtProvider.createRefreshToken(user.getId());
        String accessToken = jwtProvider.createAccessToken(user.getId());
        long refreshTokenExpiresIn = jwtProvider.getRefreshTokenExpirationMillis();
        long accessTokenExpiresIn = jwtProvider.getAccessTokenExpirationMillis();

        log.info("JWT issued - userId: {}, accessTokenExpiresIn: {}", user.getId(), accessTokenExpiresIn);

        refreshTokenRepository.save(String.valueOf(user.getId()), refreshToken);

        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge((int)refreshTokenExpiresIn);
        response.addCookie(refreshTokenCookie);

        Cookie accessTokenCookie = new Cookie("access_token", accessToken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(true);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge((int)accessTokenExpiresIn);
        response.addCookie(accessTokenCookie);

        UserInfoDto userInfo = UserInfoDto.builder()
                .userId(user.getId())
                .kakaoSub(user.getKakaoSub())
                .nickname(user.getNickname())
                .profileImageUrl(user.getProfileImage())
                .build();

        LoginResponseDto loginResponse = LoginResponseDto.builder()
                .accessTokenExpiresIn(accessTokenExpiresIn)
                .user(userInfo)
                .build();

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(loginResponse));
    }
}
