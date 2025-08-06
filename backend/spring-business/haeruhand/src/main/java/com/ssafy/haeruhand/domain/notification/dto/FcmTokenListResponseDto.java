
package com.ssafy.haeruhand.domain.notification.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class FcmTokenListResponseDto {
    
    private int totalCount;
    private int activeCount;
    private List<FcmTokenResponseDto> tokens;
}