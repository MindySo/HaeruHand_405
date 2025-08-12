package com.ssafy.haeruhand.domain.weather.controller;

import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.scheduler.FisheryWeatherDataScheduler;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "어업기상 스케줄러 관리", description = "어업기상 데이터 수동 갱신 API")
@RestController
@RequestMapping("/v1/admin/scheduler/fishery-weather")
@RequiredArgsConstructor
public class FisheryWeatherSchedulerController {

    private final FisheryWeatherDataScheduler fisheryWeatherDataScheduler;

    @Operation(summary = "어업기상 데이터 수동 갱신 (7일치)")
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<Map<String, String>>> refresh() {
        try {
            fisheryWeatherDataScheduler.manualRefresh();
            return ApiResponse.success(SuccessStatus.OK,
                    Map.of("message", "어업기상 데이터 갱신이 완료되었습니다 (7일치)."));
        } catch (Exception e) {
            return ApiResponse.success(SuccessStatus.OK,
                    Map.of("message", "어업기상 데이터 갱신 중 오류: " + e.getMessage()));
        }
    }
}