package com.ssafy.haeruhand.global.infra.gcs.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;


public record CreateSignedUrlRequest(
        @NotBlank(message = "이미지 타입은 필수입니다.")
        @Pattern(regexp = "^(ai)", message = "이미지 타입은 ai여야 합니다.")
        String type,

        @NotBlank(message = "이미지 확장자는 필수입니다.")
        @Pattern(regexp = "^(jpeg|jpg|png|gif|bmp)$", message = "지원하지 않는 이미지 확장자입니다.")
        String imageExtension
) {
}