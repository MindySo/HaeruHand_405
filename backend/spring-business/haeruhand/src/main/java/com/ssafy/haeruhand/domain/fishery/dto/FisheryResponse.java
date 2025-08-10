package com.ssafy.haeruhand.domain.fishery.dto;

import java.math.BigDecimal;

public record FisheryResponse(
        Long id,
        String name,
        String address,
        BigDecimal latitude,
        BigDecimal longitude,
        String stationCode,
        String regionCode,
        String areaName
) {
}
