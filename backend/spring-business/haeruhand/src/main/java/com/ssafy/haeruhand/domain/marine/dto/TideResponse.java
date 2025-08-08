package com.ssafy.haeruhand.domain.marine.dto;

import com.ssafy.haeruhand.domain.marine.entity.Tide;
import lombok.Builder;

import java.time.LocalDate;
import java.time.LocalTime;

@Builder
public record TideResponse(
        Long id,
        String stationCode,
        LocalDate observationDate,
        LocalTime firstHighTideTime,
        LocalTime firstLowTideTime,
        LocalTime secondHighTideTime,
        LocalTime secondLowTideTime,
        LocalTime fishingStartTime,
        LocalTime fishingEndTime
) {

    public static TideResponse from(Tide tide) {
        return TideResponse.builder()
                .id(tide.getId())
                .stationCode(tide.getStationCode())
                .observationDate(tide.getObservationDate())
                .firstHighTideTime(tide.getFirstHighTideTime())
                .firstLowTideTime(tide.getFirstLowTideTime())
                .secondHighTideTime(tide.getSecondHighTideTime())
                .secondLowTideTime(tide.getSecondLowTideTime())
                .fishingStartTime(tide.getFishingStartTime().orElse(null))
                .fishingEndTime(tide.getFishingEndTime().orElse(null))
                .build();
    }
}