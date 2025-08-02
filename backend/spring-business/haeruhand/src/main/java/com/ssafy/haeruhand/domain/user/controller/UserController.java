package com.ssafy.haeruhand.domain.user.controller;

import com.ssafy.haeruhand.domain.user.service.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final OAuthService oAuthService;

    @GetMapping("/login/success")
    public String loginSuccess(OAuth2AuthenticationToken token) {
        oAuthService.processOAuthPostLogin(token);
        return "로그인 성공";
    }
}
