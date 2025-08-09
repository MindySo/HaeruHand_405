package com.ssafy.haeruhand.domain.marine.controller;

import com.ssafy.haeruhand.domain.marine.dto.TideResponse;
import com.ssafy.haeruhand.domain.marine.service.TideService;
import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@Tag(name = "조석 조회", description = "조석 정보 조회 관련 API")
@RestController
@RequestMapping("/v1/tides")
@RequiredArgsConstructor
public class TideController {

    private final TideService tideService;

    @Operation(summary = "특정 날짜와 관측소의 조석 조회", description = "특정 날짜와 관측소의 조석 정보를 조회합니다. 날짜가 없으면 오늘 날짜를 기준으로 합니다")
    @GetMapping("/station/{stationCode}")
    public ResponseEntity<ApiResponse<TideResponse>> getTideByDateAndStation(
            @Parameter(description = "관측소 코드", required = true, example = "DT_0004")
            @PathVariable String stationCode,
            @Parameter(description = "조회할 날짜 (YYYY-MM-DD 형식, 없으면 오늘 날짜)", example = "2025-08-08")
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        TideResponse tide = tideService.getTideByDateAndStation(date, stationCode);
        return ApiResponse.success(SuccessStatus.OK, tide);
    }
}
