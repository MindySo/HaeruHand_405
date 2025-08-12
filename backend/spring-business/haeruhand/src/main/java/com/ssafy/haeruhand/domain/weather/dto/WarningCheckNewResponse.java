package com.ssafy.haeruhand.domain.weather.dto;

import lombok.Builder;

@Builder
public record WarningCheckNewResponse(
        boolean hasNewWarnings
) {
    public static WarningCheckNewResponse of(boolean hasNewWarnings) {
        return WarningCheckNewResponse.builder()
                .hasNewWarnings(hasNewWarnings)
                .build();
    }
}
