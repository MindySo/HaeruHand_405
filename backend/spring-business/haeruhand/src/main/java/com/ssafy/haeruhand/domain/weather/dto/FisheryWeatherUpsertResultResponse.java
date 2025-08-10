package com.ssafy.haeruhand.domain.weather.dto;

import java.time.LocalDate;

public record FisheryWeatherUpsertResultResponse(LocalDate date, int requested, int success, int fail) {
}
