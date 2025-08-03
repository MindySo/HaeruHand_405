package com.ssafy.haeruhand.domain.user.controller;

import com.ssafy.haeruhand.domain.user.dto.TokenReissueResponseDto;
import com.ssafy.haeruhand.domain.user.dto.UserInfoDto;
import com.ssafy.haeruhand.domain.user.entity.User;
import com.ssafy.haeruhand.domain.user.repository.RefreshTokenRepository;
import com.ssafy.haeruhand.domain.user.repository.UserRepository;
import com.ssafy.haeruhand.global.jwt.JwtProvider;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@CookieValue(value = "refresh_token", required = false) String refreshToken,
                                     HttpServletResponse response) {

        if (refreshToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        String userId;
        try {
            userId = jwtProvider.getSubject(refreshToken);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 토큰입니다.");
        }

        String savedToken = refreshTokenRepository.findByUserId(userId);
        if (savedToken == null || !savedToken.equals(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("refreshToken이 유효하지 않습니다.");
        }

        String newAccessToken = jwtProvider.createAccessToken(Long.parseLong(userId));
        long accessTokenExpiration = jwtProvider.getAccessTokenExpirationMillis();

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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }

        Long userId = jwtProvider.getUserIdFromToken(accessToken);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

        UserInfoDto userInfo = UserInfoDto.builder()
                .userId(user.getId())
                .kakaoSub(user.getKakaoSub())
                .nickname(user.getNickname())
                .profileImageUrl(user.getProfileImage())
                .build();

        return ResponseEntity.ok(userInfo);
    }
}
