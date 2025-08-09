package com.ssafy.haeruhand.domain.weather.dto;

import com.ssafy.haeruhand.domain.weather.entity.WeatherWarning;
import com.ssafy.haeruhand.domain.weather.entity.WarningCommand;
import com.ssafy.haeruhand.domain.weather.entity.WarningLevel;
import com.ssafy.haeruhand.domain.weather.entity.WarningType;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record WeatherWarningResponse(
        Long id,
        String regionCode,
        String warningType,
        String warningLevel,
        String warningCommand,
        LocalDateTime announcedAt,
        LocalDateTime effectiveAt,
        LocalDateTime expectedEndAt,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static WeatherWarningResponse from(WeatherWarning weatherWarning) {
        return WeatherWarningResponse.builder()
                .id(weatherWarning.getId())
                .regionCode(weatherWarning.getRegionCode())
                .warningType(weatherWarning.getWarningType().label())
                .warningLevel(weatherWarning.getWarningLevel().label())
                .warningCommand(weatherWarning.getWarningCommand().label())
                .announcedAt(weatherWarning.getAnnouncedAt())
                .effectiveAt(weatherWarning.getEffectiveAt())
                .expectedEndAt(weatherWarning.getExpectedEndAt())
                .createdAt(weatherWarning.getCreatedAt())
                .updatedAt(weatherWarning.getUpdatedAt())
                .build();
    }
}
