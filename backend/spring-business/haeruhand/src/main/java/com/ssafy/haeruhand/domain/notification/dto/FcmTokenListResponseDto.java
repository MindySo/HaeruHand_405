
package com.ssafy.haeruhand.domain.notification.dto;

import com.ssafy.haeruhand.domain.notification.entity.UserFcmToken;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FcmTokenListResponseDto {
    
    private int totalCount;
    private int activeCount;
    private List<FcmTokenResponseDto> tokens;
    
    public static FcmTokenListResponseDto of(List<UserFcmToken> entities) {
        FcmTokenListResponseDto dto = new FcmTokenListResponseDto();
        dto.totalCount = entities.size();
        dto.tokens = entities.stream()
                .map(FcmTokenResponseDto::from)
                .collect(java.util.stream.Collectors.toList());
        return dto;
    }
}