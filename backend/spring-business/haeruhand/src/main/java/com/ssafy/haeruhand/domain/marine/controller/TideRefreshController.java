package com.ssafy.haeruhand.domain.marine.controller;

import com.ssafy.haeruhand.domain.marine.dto.TideUpsertResultResponse;
import com.ssafy.haeruhand.domain.marine.service.TideRefreshService;
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

@Tag(name = "조석 갱신", description = "외부 KHOA API에서 조석 정보를 가져와 DB를 갱신")
@RestController
@RequestMapping("/v1/tides")
@RequiredArgsConstructor
public class TideRefreshController {

    private final TideRefreshService tideRefreshService;

    @Operation(summary = "조석 데이터 갱신", description = "date가 없으면 오늘, stationCode 없으면 Fishery의 모든 station_code 대상으로 갱신")
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<TideUpsertResultResponse>> refresh(
            @Parameter(example = "2025-08-08")
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Optional<LocalDate> date,
            @Parameter(example = "DT_0004")
            @RequestParam(required = false) Optional<String> stationCode
    ) {
        TideUpsertResultResponse result = tideRefreshService.refresh(date, stationCode);
        return ApiResponse.success(SuccessStatus.OK, result);
    }
}
