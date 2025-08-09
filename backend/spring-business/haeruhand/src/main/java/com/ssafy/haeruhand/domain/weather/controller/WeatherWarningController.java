package com.ssafy.haeruhand.domain.weather.controller;

import com.ssafy.haeruhand.domain.weather.dto.WeatherWarningResponse;
import com.ssafy.haeruhand.domain.weather.service.WeatherWarningService;
import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "기상특보 조회", description = "기상특보 조회 관련 API")
@RestController
@RequestMapping("/v1/weather/warnings")
@RequiredArgsConstructor
public class WeatherWarningController {

    private final WeatherWarningService weatherWarningService;

    @Operation(summary = "모든 기상특보 조회", description = "등록된 모든 기상특보 목록을 최신순으로 조회합니다 (페이지네이션)")
    @GetMapping
    public ResponseEntity<ApiResponse<Page<WeatherWarningResponse>>> getAllWeatherWarnings(
            @Parameter(description = "페이지 번호 (0부터 시작)", example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "페이지 크기", example = "10")
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<WeatherWarningResponse> warnings = weatherWarningService.getAllWeatherWarnings(pageable);
        return ApiResponse.success(SuccessStatus.OK, warnings);
    }

    @Operation(summary = "지역별 기상특보 조회", description = "특정 지역의 기상특보 목록을 조회합니다 (페이지네이션)")
    @GetMapping("/region/{regionCode}")
    public ResponseEntity<ApiResponse<Page<WeatherWarningResponse>>> getWeatherWarningsByRegion(
            @Parameter(description = "지역코드", required = true, example = "S1323100")
            @PathVariable String regionCode,
            @Parameter(description = "페이지 번호 (0부터 시작)", example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "페이지 크기", example = "10")
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<WeatherWarningResponse> warnings = weatherWarningService.getWeatherWarningsByRegion(regionCode, pageable);
        return ApiResponse.success(SuccessStatus.OK, warnings);
    }
}
