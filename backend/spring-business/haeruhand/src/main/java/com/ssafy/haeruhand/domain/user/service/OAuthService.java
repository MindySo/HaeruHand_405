package com.ssafy.haeruhand.domain.user.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.haeruhand.domain.user.dto.LoginResponseDto;
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
public class OAuthService {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${CLIENT_ID}")
    private String clientId;
    private final String redirectUri = "http://localhost:3000/oauth/kakao/callback.html";

    public
    ResponseEntity
            <ApiResponse<LoginResponseDto>> loginWithKakao(String code, HttpServletResponse response) {
        try {
            // 1. 인가코드로 카카오 access token 요청
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
            String kakaoAccessToken = tokenJson.get("access_token").asText();

            log.info("카카오 토큰 응답: {}", tokenResponse.getBody());

            // 2. accessToken으로 사용자 정보 요청
            String userInfoUrl = "https://kapi.kakao.com/v2/user/me";

            HttpHeaders userHeaders = new HttpHeaders();
            userHeaders.setBearerAuth(kakaoAccessToken);

            HttpEntity<?> userRequest = new HttpEntity<>(userHeaders);
            ResponseEntity<String> userResponse = restTemplate.exchange(
                    URI.create(userInfoUrl),
                    HttpMethod.GET,
                    userRequest,
                    String.class
            );

            JsonNode userJson = objectMapper.readTree(userResponse.getBody());
            log.info("카카오 사용자 정보: {}", userJson.toPrettyString());

            log.info("발급받은 access token: {}", kakaoAccessToken);

            // 3. 사용자 정보 추출 (예: id, email 등)
            long kakaoSub = userJson.get("id").asLong();
            String nickname = userJson.get("properties").get("nickname").asText();
            String profileImage = userJson.get("properties").get("profile_image").asText();

            User user = userRepository.findByKakaoSub(kakaoSub)
                    .orElseGet(() -> userRepository.save(
                            User.builder()
                                    .kakaoSub(kakaoSub)
                                    .nickname(nickname)
                                    .profileImage(profileImage)
                                    .build()
                    ));

            String refreshToken = jwtProvider.createRefreshToken(user.getId());
            String accessToken = jwtProvider.createAccessToken(user.getId());
            long accessTokenExpiresIn = jwtProvider.getAccessTokenExpirationSec();

            log.info("JWT issued - userId: {}, accessTokenExpiresIn: {}", user.getId(), accessTokenExpiresIn);

            refreshTokenRepository.save(String.valueOf(user.getId()), refreshToken);

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

            return ApiResponse.successWithToken(SuccessStatus.LOGIN_SUCCESS, loginResponse, accessToken, refreshToken);

        } catch (Exception e) {
            throw new GlobalException(ErrorStatus.OAUTH_ERROR);
        }
    }
}
