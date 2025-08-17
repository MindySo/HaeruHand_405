package com.ssafy.haeruhand.domain.ai.controller;

import com.ssafy.haeruhand.global.infra.gcs.dto.CreateSignedUrlRequest;
import com.ssafy.haeruhand.global.infra.gcs.dto.CreateSignedUrlResponse;
import com.ssafy.haeruhand.global.infra.gcs.service.SignedUrlService;
import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/storage/signed-urls")
@RequiredArgsConstructor
public class SignedUrlController {

    private final SignedUrlService service;

    @PostMapping
    public ResponseEntity<ApiResponse<CreateSignedUrlResponse>> creatPresignedUrl
            (@Valid @RequestBody CreateSignedUrlRequest request){
        CreateSignedUrlResponse response = service.create(
                request.type(), request.imageExtension()
        );
        return ApiResponse.success(SuccessStatus.OK, response);
    }
}
