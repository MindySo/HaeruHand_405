package com.ssafy.haeruhand.domain.weather.controller;

import com.ssafy.haeruhand.domain.weather.dto.FisheryWeatherResponse;
import com.ssafy.haeruhand.domain.weather.service.FisheryWeatherService;
import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@Tag(name = "어장 날씨 조회", description = "어장 날씨 정보 조회 관련 API")
@RestController
@RequestMapping("/v1/weather/fishery")
@RequiredArgsConstructor
public class FisheryWeatherController {

    private final FisheryWeatherService fisheryWeatherService;

    @Operation(summary = "날짜별 어장 날씨 조회", description = "특정 날짜의 어장 날씨 정보를 조회합니다 (오전/오후 두 개). 날짜가 없으면 오늘 날짜를 기준으로 합니다")
    @GetMapping
    public ResponseEntity<ApiResponse<List<FisheryWeatherResponse>>> getFisheryWeatherByDate(
            @Parameter(description = "조회할 날짜 (YYYY-MM-DD 형식, 없으면 오늘 날짜)", example = "2025-08-08")
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<FisheryWeatherResponse> weathers = fisheryWeatherService.getFisheryWeatherByDate(date);
        return ApiResponse.success(SuccessStatus.OK, weathers);
    }
}
