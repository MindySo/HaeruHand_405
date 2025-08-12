package com.ssafy.haeruhand.domain.weather.controller;

import com.ssafy.haeruhand.domain.weather.dto.WarningCheckNewResponse;
import com.ssafy.haeruhand.domain.weather.dto.WeatherWarningResponse;
import com.ssafy.haeruhand.domain.weather.service.WeatherWarningService;
import com.ssafy.haeruhand.global.jwt.JwtProvider;
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

@Tag(name = "기상특보 조회", description = "기상특보 조회 및 읽음 관리 API")
@RestController
@RequestMapping("/v1/weather/warnings")
@RequiredArgsConstructor
public class WeatherWarningController {

    private final WeatherWarningService weatherWarningService;
    private final JwtProvider jwtProvider;

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
            @Parameter(description = "지역코드", required = true, example = "L1090700")
            @PathVariable String regionCode,
            @Parameter(description = "페이지 번호 (0부터 시작)", example = "0")
            @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "페이지 크기", example = "10")
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<WeatherWarningResponse> warnings = weatherWarningService.getWeatherWarningsByRegion(regionCode, pageable);
        return ApiResponse.success(SuccessStatus.OK, warnings);
    }

    @Operation(
            summary = "특보 전체 읽음 처리",
            description = "사용자의 모든 특보를 읽음 처리합니다. 특보 목록 조회 시 호출됩니다."
    )
    @PostMapping("/read-all")
    public ResponseEntity<ApiResponse<Void>> markAllAsRead(
            @RequestHeader("Authorization") String bearerToken) {
        String accessToken = bearerToken.replace("Bearer ", "");
        Long userId = jwtProvider.validateAndGetUserId(accessToken);
        weatherWarningService.markAllAsRead(userId);
        return ApiResponse.success(SuccessStatus.OK);
    }

    @Operation(
            summary = "특보 새로 있음 여부",
            description = "마지막 읽은 시간 이후 새로운 특보가 있는지 확인합니다."
    )
    @GetMapping("/check-new")
    public ResponseEntity<ApiResponse<WarningCheckNewResponse>> checkNewAlerts(
            @RequestHeader("Authorization") String bearerToken) {
        String accessToken = bearerToken.replace("Bearer ", "");
        Long userId = jwtProvider.validateAndGetUserId(accessToken);
        WarningCheckNewResponse response = weatherWarningService.checkNewWarnings(userId);
        return ApiResponse.success(SuccessStatus.OK, response);
    }
}
