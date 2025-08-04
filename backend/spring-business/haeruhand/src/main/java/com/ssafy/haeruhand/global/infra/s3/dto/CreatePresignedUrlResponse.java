package com.ssafy.haeruhand.global.infra.s3.dto;

public record CreatePresignedUrlResponse(
        String imageUrl,
        String presignedUrl
) {
}
