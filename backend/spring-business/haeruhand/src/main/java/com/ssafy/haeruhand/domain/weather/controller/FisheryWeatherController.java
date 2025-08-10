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

    @Operation(
            summary = "날짜별 지역 날씨 조회",
            description = "지정한 지역(area_name)과 날짜에 대한 어장 날씨를 조회합니다. "
                    + "하루에 오전/오후 또는 일일(ALL) 1~2건이 반환됩니다. "
                    + "파라미터가 없으면 기본값: 오늘 / '제주북서'."
    )
    @GetMapping
    public ResponseEntity<ApiResponse<List<FisheryWeatherResponse>>> getFisheryWeatherByDate(
            @Parameter(description = "조회할 날짜 (YYYY-MM-DD 형식, 없으면 오늘 날짜)", example = "2025-08-08")
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @Parameter(description = "지역명, 없으면 '제주북서' 기본값", example = "제주북서")
            @RequestParam(required = false, defaultValue = "제주북서") String area
    ) {
        List<FisheryWeatherResponse> weathers = fisheryWeatherService.getFisheryWeatherByDate(area, date);
        return ApiResponse.success(SuccessStatus.OK, weathers);
    }
}
