package com.ssafy.haeruhand.domain.weather.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record WeatherWarningUpsertResultResponse(LocalDateTime date, int requested, int success, int fail) {
}
