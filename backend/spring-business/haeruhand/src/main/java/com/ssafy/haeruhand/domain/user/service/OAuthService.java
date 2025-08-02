package com.ssafy.haeruhand.domain.user.service;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;

public interface OAuthService {
    void processOAuthPostLogin(OAuth2AuthenticationToken token);
}
