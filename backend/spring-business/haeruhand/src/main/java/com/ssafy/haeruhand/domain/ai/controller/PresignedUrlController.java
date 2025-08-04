package com.ssafy.haeruhand.domain.ai.controller;

import com.ssafy.haeruhand.global.infra.s3.dto.CreatePresignedUrlRequest;
import com.ssafy.haeruhand.global.infra.s3.dto.CreatePresignedUrlResponse;
import com.ssafy.haeruhand.global.infra.s3.service.PresignedUrlService;
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
@RequestMapping("/api/v1/storage/presigned-urls")
@RequiredArgsConstructor
public class PresignedUrlController {

    private final PresignedUrlService presignedUrlService;

    /**
     * Presigned URL을 생성하여 반환합니다.
     *
     * @param request 이미지 타입 및 확장자를 담은 요청 DTO
     * @return imageUrl(업로드 후 접근 URL) + presignedUrl(S3 업로드용 서명 URL)
     */
    @PostMapping
    public ResponseEntity<ApiResponse<CreatePresignedUrlResponse>> creatPresignedUrl
    (@Valid @RequestBody CreatePresignedUrlRequest request){
        CreatePresignedUrlResponse response = presignedUrlService.create(
                request.type(), request.imageExtension()
        );
        return ApiResponse.success(SuccessStatus.OK, response);
    }

}
