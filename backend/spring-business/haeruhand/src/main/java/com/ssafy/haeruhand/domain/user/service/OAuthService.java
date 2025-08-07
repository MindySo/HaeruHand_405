package com.ssafy.haeruhand.domain.user.service;

import com.ssafy.haeruhand.domain.user.dto.IssueRequestDto;
import com.ssafy.haeruhand.domain.user.dto.IssueResponseDto;
import com.ssafy.haeruhand.domain.user.dto.ReissueResponseDto;
import com.ssafy.haeruhand.domain.user.dto.UserInfoDto;
import jakarta.servlet.http.HttpServletResponse;

public interface OAuthService {
    IssueResponseDto authorizeKakaoAndIssueToken(IssueRequestDto request, HttpServletResponse response);
    ReissueResponseDto reissueToken(String refreshToken);
    UserInfoDto getUserInfo(String accessToken);
}
