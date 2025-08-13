package com.ssafy.haeruhand.domain.weather.controller;

import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.scheduler.WeatherWarningDataScheduler;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Tag(name = "기상특보 스케줄러 관리", description = "기상특보 데이터 수동 갱신 API")
@RestController
@RequestMapping("/v1/admin/scheduler/weather-warning")
@RequiredArgsConstructor
public class WeatherWarningSchedulerController {

    private final WeatherWarningDataScheduler weatherWarningDataScheduler;

    @Operation(summary = "기상특보 데이터 수동 갱신")
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<Map<String, String>>> refresh() {
        try {
            weatherWarningDataScheduler.manualRefresh();
            return ApiResponse.success(SuccessStatus.OK,
                    Map.of("message", "기상특보 데이터 갱신이 완료되었습니다."));
        } catch (Exception e) {
            return ApiResponse.success(SuccessStatus.OK,
                    Map.of("message", "기상특보 데이터 갱신 중 오류: " + e.getMessage()));
        }
    }
}