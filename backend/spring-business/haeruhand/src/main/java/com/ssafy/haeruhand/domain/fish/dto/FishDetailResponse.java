package com.ssafy.haeruhand.domain.fish.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FishDetailResponse {
    private String speciesName;
    private String restrictionRegion;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate restrictionStartDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate restrictionEndDate;
    private BigDecimal minimumLengthCentimeter;
    private BigDecimal minimumWeightGram;
    private String measurementType;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate lawAnnouncementDate;
    private String note;
    private String imageUrl;
}
