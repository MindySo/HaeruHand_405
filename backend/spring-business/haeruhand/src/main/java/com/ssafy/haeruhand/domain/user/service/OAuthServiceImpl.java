package com.ssafy.haeruhand.domain.user.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.haeruhand.domain.user.dto.KakaoUserInfoDto;
import com.ssafy.haeruhand.domain.user.dto.LoginResponseDto;
import com.ssafy.haeruhand.domain.user.dto.TokenReissueResponseDto;
import com.ssafy.haeruhand.domain.user.dto.UserInfoDto;
import com.ssafy.haeruhand.domain.user.entity.User;
import com.ssafy.haeruhand.domain.user.repository.RefreshTokenRepository;
import com.ssafy.haeruhand.domain.user.repository.UserRepository;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.jwt.JwtProvider;
import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthServiceImpl implements OAuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String clientId;

    // 프론트 redirectUri로 변경 필요
    private final String redirectUri = "http://localhost:3000/oauth/kakao/callback.html";

    @Override
    public ResponseEntity<ApiResponse<LoginResponseDto>> loginWithKakao(String code, HttpServletResponse response) {
        try {
            // 카카오 AccessToken 요청
            String kakaoAccessToken = requestKakaoToken(code);

            // 사용자 정보 조회
            KakaoUserInfoDto kakaoUserInfoDto = requestKakaoUserInfo(kakaoAccessToken);

            // 유저 조회/생성
            User user = findOrCreateUserFromKakao(kakaoUserInfoDto);

            // JWT 발급
            String accessToken = jwtProvider.createAccessToken(user.getId());
            String refreshToken = jwtProvider.createRefreshToken(user.getId());
            long accessTokenExpiresIn = jwtProvider.getAccessTokenExpirationMilliSec();
            refreshTokenRepository.save(String.valueOf(user.getId()), refreshToken);

            // 응답 구성
            LoginResponseDto loginResponse = buildLoginResponse(user, accessTokenExpiresIn / 1000);
            return ApiResponse.successWithToken(SuccessStatus.LOGIN_SUCCESS, loginResponse, accessToken, refreshToken);

        } catch (Exception e) {
            throw new GlobalException(ErrorStatus.OAUTH_ERROR);
        }
    }

    @Override
    public ResponseEntity<ApiResponse<TokenReissueResponseDto>> reissueToken(String refreshToken) {
        try {
            // rtk 유효성 검사
            if (!jwtProvider.validateToken(refreshToken)) {
                throw new GlobalException(ErrorStatus.INVALID_TOKEN);
            }

            // 저장된 리프레시 토큰과 일치하는지 확인
            Long userId = jwtProvider.getUserIdFromToken(refreshToken);
            String savedRefreshToken = refreshTokenRepository.findByUserId(String.valueOf(userId));
            if (savedRefreshToken == null || !savedRefreshToken.equals(refreshToken)) {
                throw new GlobalException(ErrorStatus.INVALID_TOKEN);
            }

            // 새로운 access token 발급
            String newAccessToken = jwtProvider.createAccessToken(userId);
            TokenReissueResponseDto responseDto =
                    new TokenReissueResponseDto((long) jwtProvider.getAccessTokenExpirationMilliSec());

            return ApiResponse.successWithToken(SuccessStatus.OK, responseDto, newAccessToken);

        } catch (Exception e) {
            throw new GlobalException(ErrorStatus.OAUTH_ERROR);
        }
    }

    @Override
    public UserInfoDto getUserInfo(String accessToken) {
        System.out.println(accessToken);
        try {
            // atk 유효성 검사
            if (!jwtProvider.validateToken(accessToken)) {
                throw new GlobalException(ErrorStatus.INVALID_TOKEN);
            }

            // 사용자 조회
            Long userId = jwtProvider.getUserIdFromToken(accessToken);
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new GlobalException(ErrorStatus.USER_NOT_FOUND));

            // UserInfoDto 반환
            return UserInfoDto.builder()
                    .userId(user.getId())
                    .kakaoSub(user.getKakaoSub())
                    .nickname(user.getNickname())
                    .profileImageUrl(user.getProfileImage())
                    .build();

        } catch (Exception e) {
            throw new GlobalException(ErrorStatus.PROFILE_ERROR);
        }
    }

    private String requestKakaoToken(String code) throws Exception {
        String tokenUrl = "https://kauth.kakao.com/oauth/token";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<String> tokenResponse = restTemplate.postForEntity(tokenUrl, request, String.class);

        JsonNode tokenJson = objectMapper.readTree(tokenResponse.getBody());
        return tokenJson.get("access_token").asText();
    }

    private KakaoUserInfoDto requestKakaoUserInfo(String accessToken) throws Exception {
        String userInfoUrl = "https://kapi.kakao.com/v2/user/me";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<?> request = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                URI.create(userInfoUrl),
                HttpMethod.GET,
                request,
                String.class
        );

        JsonNode userJson = objectMapper.readTree(response.getBody());
        long kakaoSub = userJson.get("id").asLong();
        String nickname = userJson.get("properties").get("nickname").asText();
        String profileImage = userJson.get("properties").get("profile_image").asText();

        return new KakaoUserInfoDto(kakaoSub, nickname, profileImage);
    }

    private User findOrCreateUserFromKakao(KakaoUserInfoDto kakaoUserInfoDto) {
        return userRepository.findByKakaoSub(kakaoUserInfoDto.getKakaoSub())
                .orElseGet(() -> userRepository.save(
                        User.builder()
                                .kakaoSub(kakaoUserInfoDto.getKakaoSub())
                                .nickname(kakaoUserInfoDto.getNickname())
                                .profileImage(kakaoUserInfoDto.getProfile_image())
                                .build()
                ));
    }

    private LoginResponseDto buildLoginResponse(User user, long accessTokenExpiresIn) {
        UserInfoDto userInfo = UserInfoDto.builder()
                .userId(user.getId())
                .kakaoSub(user.getKakaoSub())
                .nickname(user.getNickname())
                .profileImageUrl(user.getProfileImage())
                .build();

        return LoginResponseDto.builder()
                .accessTokenExpiresIn(accessTokenExpiresIn)
                .user(userInfo)
                .build();
    }
}
