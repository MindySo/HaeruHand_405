package com.ssafy.haeruhand.domain.user.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.haeruhand.domain.user.dto.*;
import com.ssafy.haeruhand.domain.user.entity.User;
import com.ssafy.haeruhand.domain.user.repository.RefreshTokenRepository;
import com.ssafy.haeruhand.domain.user.repository.UserRepository;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.jwt.JwtProvider;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
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

    @Value("${spring.security.oauth2.client.registration.kakao.redirect-uri}")
    private String redirectUri;

    @Override
    public IssueResponseDto authorizeKakaoAndIssueToken(String code, HttpServletResponse response) {
        log.info("카카오 OAuth 인증 시작 - 인가코드 수신: {}, redirectUri : {}", code.substring(0, Math.min(10, code.length())) + "...", redirectUri);

        try {
            // 카카오 AccessToken 요청
            String kakaoAccessToken = requestKakaoToken(code);
            log.info("카카오 액세스 토큰 발급 성공 - 토큰 길이: {}", kakaoAccessToken.length());

            // 사용자 정보 조회
            KakaoUserInfoDto kakaoUserInfoDto = requestKakaoUserInfo(kakaoAccessToken);
            log.info("카카오 사용자 정보 조회 성공 - kakaoSub: {}, nickname: {}",
                    kakaoUserInfoDto.getKakaoSub(), kakaoUserInfoDto.getNickname());

            // 유저 조회/생성
            User user = findOrCreateUserFromKakao(kakaoUserInfoDto);
            log.info("유저 처리 완료 - userId: {}, 신규 유저: {}", user.getId(),
                    user.getCreatedAt().equals(user.getUpdatedAt()));

            // JWT 발급
            String accessToken = jwtProvider.createAccessToken(user.getId());
            String refreshToken = jwtProvider.createRefreshToken(user.getId());
            long accessTokenExpiresIn = jwtProvider.getAccessTokenExpirationMilliSec();
            log.info("JWT 토큰 생성 완료 - 액세스 토큰 만료시간: {}ms", accessTokenExpiresIn);

            // 리프레시 토큰 저장
            refreshTokenRepository.save(String.valueOf(user.getId()), refreshToken);
            log.info("리프레시 토큰 저장 완료");

            // 응답 구성
            IssueResponseDto responseDto = buildIssueResponse(accessToken, refreshToken, user, accessTokenExpiresIn / 1000);
            log.info("카카오 OAuth 인증 완료 - userId: {}", user.getId());

            return responseDto;

        } catch (Exception e) {
            log.error("카카오 OAuth 인증 실패 - code: {}, error: {}", code, e.getMessage(), e);
            throw new GlobalException(ErrorStatus.OAUTH_ERROR);
        }
    }

    @Override
    public ReissueResponseDto reissueToken(String refreshToken) {
        log.info("토큰 재발급 시작 - 리프레시 토큰 길이: {}", refreshToken.length());

        try {
            // rtk 유효성 검사
            if (!jwtProvider.validateToken(refreshToken)) {
                log.warn("리프레시 토큰 유효성 검증 실패");
                throw new GlobalException(ErrorStatus.INVALID_TOKEN);
            }
            log.info("리프레시 토큰 유효성 검증 성공");

            // 저장된 리프레시 토큰과 일치하는지 확인
            Long userId = jwtProvider.getUserIdFromToken(refreshToken);
            log.info("리프레시 토큰에서 userId 추출 완료: {}", userId);

            String savedRefreshToken = refreshTokenRepository.findByUserId(String.valueOf(userId));
            log.info("저장된 리프레시 토큰 조회 완료 - 존재 여부: {}", savedRefreshToken != null);

            if (savedRefreshToken == null || !savedRefreshToken.equals(refreshToken)) {
                log.warn("리프레시 토큰 불일치 - userId: {}", userId);
                throw new GlobalException(ErrorStatus.INVALID_TOKEN);
            }
            log.info("리프레시 토큰 일치 확인 완료");

            // 새로운 토큰들 발급
            String newRefreshToken = jwtProvider.createRefreshToken(userId);
            String newAccessToken = jwtProvider.createAccessToken(userId);
            long accessTokenExpiresIn = jwtProvider.getAccessTokenExpirationMilliSec();
            log.info("새 토큰 생성 완료 - 액세스 토큰 만료시간: {}ms", accessTokenExpiresIn);

            // 새로운 리프레시 토큰 저장
            refreshTokenRepository.save(String.valueOf(userId), newRefreshToken);
            log.info("새 리프레시 토큰 저장 완료");

            ReissueResponseDto responseDto = buildReissueResponse(newAccessToken, newRefreshToken, accessTokenExpiresIn / 1000);
            log.info("토큰 재발급 완료 - userId: {}", userId);

            return responseDto;

        } catch (Exception e) {
            log.error("토큰 재발급 실패 - error: {}", e.getMessage(), e);
            throw new GlobalException(ErrorStatus.OAUTH_ERROR);
        }
    }

    @Override
    public UserInfoDto getUserInfo(String accessToken) {
        try {
            // atk 유효성 검사
            if (!jwtProvider.validateToken(accessToken)) {
                log.warn("액세스 토큰 유효성 검증 실패");
                throw new GlobalException(ErrorStatus.INVALID_TOKEN);
            }
            log.info("액세스 토큰 유효성 검증 성공");

            // 사용자 조회
            Long userId = jwtProvider.getUserIdFromToken(accessToken);
            log.info("userId 추출 완료: {}", userId);

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new GlobalException(ErrorStatus.USER_NOT_FOUND));
            log.info("사용자 조회 완료 - nickname: {}", user.getNickname());

            // UserInfoDto 반환
            UserInfoDto userInfo = UserInfoDto.builder()
                    .userId(user.getId())
                    .kakaoSub(user.getKakaoSub())
                    .nickname(user.getNickname())
                    .profileImageUrl(user.getProfileImage())
                    .build();

            log.info("사용자 정보 조회 완료 - userId: {}", userId);
            return userInfo;

        } catch (Exception e) {
            log.error("사용자 정보 조회 실패 - error: {}", e.getMessage(), e);
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

        log.info("카카오 토큰 요청 파라미터 구성 완료");
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
        ResponseEntity<String> tokenResponse = restTemplate.postForEntity(tokenUrl, request, String.class);

        log.info("카카오 토큰 API 응답 수신 - 상태코드: {}", tokenResponse.getStatusCode());
        JsonNode tokenJson = objectMapper.readTree(tokenResponse.getBody());
        String accessToken = tokenJson.get("access_token").asText();
        log.info("카카오 액세스 토큰 파싱 완료");

        return accessToken;
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

        log.info("카카오 사용자 정보 API 응답 수신 - 상태코드: {}", response.getStatusCode());
        JsonNode userJson = objectMapper.readTree(response.getBody());
        long kakaoSub = userJson.get("id").asLong();
        String nickname = userJson.get("properties").get("nickname").asText();
        String profileImage = userJson.get("properties").get("profile_image").asText();

        log.info("카카오 사용자 정보 파싱 완료 - kakaoSub: {}, nickname: {}", kakaoSub, nickname);
        return new KakaoUserInfoDto(kakaoSub, nickname, profileImage);
    }

    private User findOrCreateUserFromKakao(KakaoUserInfoDto kakaoUserInfoDto) {
        return userRepository.findByKakaoSub(kakaoUserInfoDto.getKakaoSub())
                .map(existingUser -> {
                    log.info("기존 사용자 발견 - userId: {}, nickname: {}", existingUser.getId(), existingUser.getNickname());
                    return userRepository.save(existingUser);
                })
                .orElseGet(() -> {
                    try {
                        User newUser = userRepository.save(
                                User.builder()
                                        .kakaoSub(kakaoUserInfoDto.getKakaoSub())
                                        .nickname(kakaoUserInfoDto.getNickname())
                                        .profileImage(kakaoUserInfoDto.getProfile_image())
                                        .build()
                        );
                        log.info("신규 사용자 생성 완료 - userId: {}", newUser.getId());
                        return newUser;
                    } catch (DataIntegrityViolationException e) {
                        log.warn("중복 사용자 생성 시도 감지 - kakaoSub: {}, 기존 사용자 조회", kakaoUserInfoDto.getKakaoSub());
                        return userRepository.findByKakaoSub(kakaoUserInfoDto.getKakaoSub())
                                .orElseThrow(() -> new GlobalException(ErrorStatus.USER_NOT_FOUND));
                    }
                });
    }

    private IssueResponseDto buildIssueResponse(String accessToken, String refreshToken, User user, long accessTokenExpiresIn) {
        UserInfoDto userInfo = UserInfoDto.builder()
                .userId(user.getId())
                .kakaoSub(user.getKakaoSub())
                .nickname(user.getNickname())
                .profileImageUrl(user.getProfileImage())
                .build();

        IssueResponseBodyDto responseBodyDto = IssueResponseBodyDto.builder()
                .accessTokenExpiresIn(accessTokenExpiresIn)
                .user(userInfo)
                .build();

        IssueResponseDto responseDto = IssueResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .responseBodyDto(responseBodyDto)
                .build();

        log.info("IssueResponseDto 구성 완료");
        return responseDto;
    }

    private ReissueResponseDto buildReissueResponse(String accessToken, String refreshToken, long accessTokenExpiresIn) {
        ReissueResponseBodyDto responseBodyDto = ReissueResponseBodyDto.builder()
                .accessTokenExpiresIn(accessTokenExpiresIn)
                .build();

        ReissueResponseDto responseDto = ReissueResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .responseBodyDto(responseBodyDto)
                .build();

        log.info("ReissueResponseDto 구성 완료");
        return responseDto;
    }
}