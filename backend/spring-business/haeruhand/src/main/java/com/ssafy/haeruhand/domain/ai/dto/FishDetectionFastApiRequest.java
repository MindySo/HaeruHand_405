package com.ssafy.haeruhand.domain.ai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class FishDetectionFastApiRequest {

    @JsonProperty("image_url")
    private String imageUrl;

    @JsonProperty("mime_type")
    private String mimeType;
}
