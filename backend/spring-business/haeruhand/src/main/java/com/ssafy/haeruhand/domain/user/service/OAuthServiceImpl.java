package com.ssafy.haeruhand.domain.user.service;

import com.ssafy.haeruhand.domain.user.dto.KakaoUserInfoDto;
import com.ssafy.haeruhand.domain.user.entity.User;
import com.ssafy.haeruhand.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuthServiceImpl implements OAuthService {

    private final UserRepository userRepository;

    @Override
    public void processOAuthPostLogin(OAuth2AuthenticationToken token) {
        Map<String, Object> attributes = token.getPrincipal().getAttributes();
        KakaoUserInfoDto userInfo = extractKakaoUserInfo(attributes);

        userRepository.findByKakaoSub(userInfo.getKakaoSub())
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .kakaoSub(userInfo.getKakaoSub())
                            .nickname(userInfo.getNickname())
                            .profileImage(userInfo.getProfile_image())
                            .build();
                    return userRepository.save(newUser);
                });
    }

    private KakaoUserInfoDto extractKakaoUserInfo(Map<String, Object> attributes) {
        KakaoUserInfoDto dto = new KakaoUserInfoDto();

        dto.setKakaoSub((Long) attributes.get("id"));

        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        dto.setNickname((String) profile.get("nickname"));
        dto.setProfile_image((String) profile.get("profile_image_url"));

        return dto;
    }
}
