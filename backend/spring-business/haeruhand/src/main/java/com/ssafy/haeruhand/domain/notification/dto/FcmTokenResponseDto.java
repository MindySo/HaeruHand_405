package com.ssafy.haeruhand.domain.notification.dto;

import com.ssafy.haeruhand.domain.notification.entity.UserFcmToken;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class FcmTokenResponseDto {

    private Long tokenId;
    private String maskedToken;
    private Boolean isActive;
    private LocalDateTime lastUsedAt;

    public static FcmTokenResponseDto from(UserFcmToken entity) {
        FcmTokenResponseDto dto = new FcmTokenResponseDto();
        dto.tokenId = entity.getId();
        dto.maskedToken = maskToken(entity.getFcmToken());
        dto.isActive = entity.getIsActive();
        dto.lastUsedAt = entity.getLastUsedAt();
        return dto;
    }

    private static String maskToken(String token) {
        if (token == null || token.length() < 10) {
            return "INVALID_TOKEN";
        }
        return token.substring(0, 6) + "****" + token.substring(token.length() - 4);
    }
}