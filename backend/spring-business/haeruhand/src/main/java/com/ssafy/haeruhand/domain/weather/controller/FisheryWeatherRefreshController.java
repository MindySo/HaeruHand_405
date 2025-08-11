package com.ssafy.haeruhand.domain.weather.controller;

import com.ssafy.haeruhand.domain.weather.dto.FisheryWeatherUpsertResultResponse;
import com.ssafy.haeruhand.domain.weather.service.FisheryWeatherRefreshService;
import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Optional;

@Tag(name = "FisheryWeather 갱신", description = "해양여행예보에서 어장 날씨를 가져와 DB(FisheryWeather)를 갱신")
@RestController
@RequestMapping("/v1/weather/fishery")
@RequiredArgsConstructor
public class FisheryWeatherRefreshController {

    private final FisheryWeatherRefreshService fisheryWeatherRefreshService;

    @Operation(
            summary = "FisheryWeather 데이터 갱신",
            description = "date가 없으면 오늘, area가 없으면 Fishery의 모든 area_name 대상으로 갱신합니다. "
                    + "원천 응답에서 해당 날짜/지역만 추려 업서트합니다."
    )
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<FisheryWeatherUpsertResultResponse>> refresh(
            @Parameter(description = "조회할 날짜 (YYYY-MM-DD 형식, 없으면 오늘)", example = "2025-08-10")
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> date,
            @Parameter(description = "지역명(area_name), 없으면 전체 distinct area_name 대상", example = "제주북서")
            @RequestParam(required = false) Optional<String> area,
            @Parameter(description = "원천 API 호출 시 불러올 행 수", example = "300")
            @RequestParam(required = false, defaultValue = "300") int numOfRows
    ) {
        FisheryWeatherUpsertResultResponse result = fisheryWeatherRefreshService.refresh(date, area, numOfRows);
        return ApiResponse.success(SuccessStatus.OK, result);
    }
}
