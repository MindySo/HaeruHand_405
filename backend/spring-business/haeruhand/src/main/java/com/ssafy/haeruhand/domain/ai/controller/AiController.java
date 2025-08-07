package com.ssafy.haeruhand.domain.ai.controller;

import com.ssafy.haeruhand.domain.ai.dto.FishDetectionRequest;
import com.ssafy.haeruhand.domain.ai.dto.FishDetectionResponse;
import com.ssafy.haeruhand.domain.ai.service.FishDetectionService;
import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/v1/seafood-detect")
@RequiredArgsConstructor
public class AiController {
    private final FishDetectionService service;

    @PostMapping
    public Mono<ResponseEntity<ApiResponse<FishDetectionResponse>>> detectFish(@RequestBody FishDetectionRequest request){
        return service.detectFish(request)
                .map(response -> ApiResponse.success(SuccessStatus.OK, response));
    }
}
