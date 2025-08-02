package com.ssafy.haeruhand.domain.user.controller;

import com.ssafy.haeruhand.domain.user.dto.TokenReissueRequestDto;
import com.ssafy.haeruhand.domain.user.dto.TokenReissueResponseDto;
import com.ssafy.haeruhand.domain.user.repository.RefreshTokenRepository;
import com.ssafy.haeruhand.global.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@RequestBody TokenReissueRequestDto requestDto) {
        String refreshToken = requestDto.getRefreshToken();
        String kakaoSub;

        try {
            kakaoSub = jwtProvider.getSubject(refreshToken);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않은 토큰입니다.");
        }

        String savedToken = refreshTokenRepository.findByKakaoSub(kakaoSub);
        if (savedToken == null || !savedToken.equals(refreshToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("refreshToken이 유효하지 않습니다.");
        }

        String newAccessToken = jwtProvider.createAccessToken(Long.parseLong(kakaoSub));

        return ResponseEntity.ok(new TokenReissueResponseDto(newAccessToken));
    }
}
