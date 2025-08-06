package com.ssafy.haeruhand.domain.ai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FishDetectionFastApiResponse {
    @JsonProperty("fish_name")
    private String fishName;

}
