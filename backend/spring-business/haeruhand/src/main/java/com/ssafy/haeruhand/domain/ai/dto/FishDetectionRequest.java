package com.ssafy.haeruhand.domain.ai.dto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FishDetectionRequest {
    private String imageUrl;
}
