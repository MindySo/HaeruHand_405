package com.ssafy.haeruhand.domain.weather.dto;

import com.ssafy.haeruhand.domain.weather.entity.FisheryWeather;
import com.ssafy.haeruhand.domain.weather.entity.ForecastTimePeriod;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
public record FisheryWeatherResponse(
        Long id,
        String areaName,
        LocalDate forecastDate,
        String forecastTimePeriod,
        BigDecimal averageAirTemperature,
        BigDecimal averageWaterTemperature,
        BigDecimal averageWaveHeight,
        BigDecimal averageWindSpeed,
        String weatherDescription,
        String seaTravelIndex,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static FisheryWeatherResponse from(FisheryWeather fisheryWeather) {
        return FisheryWeatherResponse.builder()
                .id(fisheryWeather.getId())
                .areaName(fisheryWeather.getAreaName())
                .forecastDate(fisheryWeather.getForecastDate())
                .forecastTimePeriod(fisheryWeather.getForecastTimePeriod().label())
                .averageAirTemperature(fisheryWeather.getAverageAirTemperature())
                .averageWaterTemperature(fisheryWeather.getAverageWaterTemperature())
                .averageWaveHeight(fisheryWeather.getAverageWaveHeight())
                .averageWindSpeed(fisheryWeather.getAverageWindSpeed())
                .weatherDescription(fisheryWeather.getWeatherDescription())
                .seaTravelIndex(fisheryWeather.getSeaTravelIndex())
                .createdAt(fisheryWeather.getCreatedAt())
                .updatedAt(fisheryWeather.getUpdatedAt())
                .build();
    }
}
