package com.ssafy.haeruhand.domain.ai.dto;

import com.ssafy.haeruhand.domain.fish.dto.FishDetailResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FishDetectionResponse {
    private String fishName;
    private FishDetailResponse regulationFish;
}
