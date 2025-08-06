package com.ssafy.haeruhand.domain.fish.entity;

import java.util.Arrays;
import java.util.Optional;

public enum MeasurementType {

    TOTAL_LENGTH("TOTAL_LENGTH", "전장"),
    ANAL_LENGTH("ANAL_LENGTH", "항문장"),
    BODY_WIDTH("BODY_WIDTH", "체반폭"),
    CARAPACE_WIDTH("CARAPACE_WIDTH", "두흉갑장"),
    OUTER_MANTLE_LENGTH("OUTER_MANTLE_LENGTH", "외투장"),
    SHELL_LENGTH("SHELL_LENGTH", "각장"),
    SHELL_HEIGHT("SHELL_HEIGHT", "각고");

    private final String code;
    private final String label;

    MeasurementType(String code, String label) {
        this.code = code;
        this.label = label;
    }

    public String code() {
        return code;
    }

    public String label() {
        return label;
    }

    public static Optional<MeasurementType> fromCode(String code) {
        return Arrays.stream(values())
                .filter(mt -> mt.code.equalsIgnoreCase(code))
                .findFirst();
    }

    @Override
    public String toString() {
        return label + " (" + code + ")";
    }
}
