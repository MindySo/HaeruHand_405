package com.ssafy.haeruhand.domain.weather.entity;

import java.util.Arrays;
import java.util.Optional;

public enum ForecastTimePeriod {

    MORNING("AM", "오전"),
    AFTERNOON("PM", "오후"),
    ALL("ALL", "일");

    private final String code;
    private final String label;

    ForecastTimePeriod(String code, String label) {
        this.code = code;
        this.label = label;
    }

    public String code() {
        return code;
    }

    public String label() {
        return label;
    }

    public static Optional<ForecastTimePeriod> fromCode(String code) {
        return Arrays.stream(values())
                .filter(period -> period.code.equalsIgnoreCase(code))
                .findFirst();
    }

    public static Optional<ForecastTimePeriod> fromLabel(String label) {
        if (label == null || label.isBlank()) {
            return Optional.empty();
        }
        return Arrays.stream(values())
                .filter(period -> period.label.equals(label.trim()))
                .findFirst();
    }

    @Override
    public String toString() {
        return label + " (" + code + ")";
    }
}
