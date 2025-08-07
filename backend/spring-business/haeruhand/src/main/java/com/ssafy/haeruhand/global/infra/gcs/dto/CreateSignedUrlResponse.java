package com.ssafy.haeruhand.global.infra.gcs.dto;

public record CreateSignedUrlResponse(
        String imageUrl,
        String signedUrl
) {
}