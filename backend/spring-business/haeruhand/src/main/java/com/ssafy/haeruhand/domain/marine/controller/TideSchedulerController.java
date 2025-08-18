package com.ssafy.haeruhand.domain.marine.controller;

import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.scheduler.TideDataScheduler;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "조석 스케줄러 관리", description = "조석 데이터 수동 갱신 API")
@RestController
@RequestMapping("/v1/admin/scheduler/tide")
@RequiredArgsConstructor
public class TideSchedulerController {

    private final TideDataScheduler tideDataScheduler;

    @Operation(summary = "오늘 조석 데이터 수동 갱신")
    @PostMapping("/refresh-today")
    public ResponseEntity<ApiResponse<Map<String, String>>> refreshToday() {
        try {
            tideDataScheduler.refreshTodayTide();
            return ApiResponse.success(SuccessStatus.OK,
                    Map.of("message", "오늘 조석 데이터 갱신이 완료되었습니다."));
        } catch (Exception e) {
            return ApiResponse.success(SuccessStatus.OK,
                    Map.of("message", "조석 데이터 갱신 중 오류: " + e.getMessage()));
        }
    }

    @Operation(summary = "월간 조석 데이터 수동 갱신")
    @PostMapping("/refresh-monthly")
    public ResponseEntity<ApiResponse<Map<String, String>>> refreshMonthly() {
        try {
            tideDataScheduler.refreshMonthlyTide();
            return ApiResponse.success(SuccessStatus.OK,
                    Map.of("message", "월간 조석 데이터 갱신이 완료되었습니다."));
        } catch (Exception e) {
            return ApiResponse.success(SuccessStatus.OK,
                    Map.of("message", "월간 조석 데이터 갱신 중 오류: " + e.getMessage()));
        }
    }

    @Operation(summary = "조석 데이터 전체 수동 갱신")
    @PostMapping("/refresh-all")
    public ResponseEntity<ApiResponse<Map<String, String>>> refreshAll() {
        try {
            tideDataScheduler.manualRefreshAll();
            return ApiResponse.success(SuccessStatus.OK,
                    Map.of("message", "조석 데이터 전체 갱신이 완료되었습니다."));
        } catch (Exception e) {
            return ApiResponse.success(SuccessStatus.OK,
                    Map.of("message", "조석 데이터 전체 갱신 중 오류: " + e.getMessage()));
        }
    }

    @Operation(summary = "조석 데이터 초기 로드 (3개월)")
    @PostMapping("/initial-load")
    public ResponseEntity<ApiResponse<Map<String, String>>> initialLoad() {
        try {
            tideDataScheduler.initialDataLoad();
            return ApiResponse.success(SuccessStatus.OK,
                    Map.of("message", "조석 데이터 초기 로드가 완료되었습니다."));
        } catch (Exception e) {
            return ApiResponse.success(SuccessStatus.OK,
                    Map.of("message", "조석 데이터 초기 로드 중 오류: " + e.getMessage()));
        }
    }
}
