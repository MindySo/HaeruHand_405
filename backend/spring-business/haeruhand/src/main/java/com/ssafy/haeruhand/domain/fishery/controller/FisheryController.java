package com.ssafy.haeruhand.domain.fishery.controller;

import com.ssafy.haeruhand.domain.fishery.dto.FisheryResponse;
import com.ssafy.haeruhand.domain.fishery.service.FisheryService;
import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "어장 관리", description = "어장 조회 관련 API")
@RestController
@RequestMapping("/v1/fisheries")
@RequiredArgsConstructor
public class FisheryController {

    private final FisheryService fisheryService;

    @Operation(summary = "모든 어장 조회", description = "등록된 모든 어장 목록을 조회합니다")
    @GetMapping
    public ResponseEntity<ApiResponse<List<FisheryResponse>>> getAllFishery() {
        List<FisheryResponse> fisheries = fisheryService.getAllFisheries();
        return ApiResponse.success(SuccessStatus.OK, fisheries);
    }

    @Operation(summary = "어장 상세 조회", description = "ID로 특정 어장의 상세 정보를 조회합니다")
    @GetMapping("/{fisheryId}")
    public ResponseEntity<ApiResponse<FisheryResponse>> getFisheryById(
            @Parameter(description = "어장 ID", required = true)
            @PathVariable Long fisheryId) {
        FisheryResponse fishery = fisheryService.getFisheryById(fisheryId);
        return ApiResponse.success(SuccessStatus.OK, fishery);
    }
}
