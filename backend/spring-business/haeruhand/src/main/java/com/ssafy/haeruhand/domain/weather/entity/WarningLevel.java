package com.ssafy.haeruhand.domain.weather.entity;

import java.util.Arrays;
import java.util.Optional;

public enum WarningLevel {

    PRELIMINARY("1", "예비특보"),
    ADVISORY("2", "주의보"),
    WARNING("3", "경보");

    private final String code;
    private final String label;

    WarningLevel(String code, String label) {
        this.code = code;
        this.label = label;
    }

    public String code() {
        return code;
    }

    public String label() {
        return label;
    }

    public static Optional<WarningLevel> fromCode(String code) {
        return Arrays.stream(values())
                .filter(wl -> wl.code.equalsIgnoreCase(code))
                .findFirst();
    }

    @Override
    public String toString() {
        return label + " (" + code + ")";
    }
}
