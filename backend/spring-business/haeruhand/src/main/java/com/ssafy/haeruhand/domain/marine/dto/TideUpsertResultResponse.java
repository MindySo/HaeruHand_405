package com.ssafy.haeruhand.domain.marine.dto;

import java.time.LocalDate;

public record TideUpsertResultResponse(
        LocalDate date,
        int requested,
        int success,
        int fail
) {
}
