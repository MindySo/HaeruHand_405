package com.ssafy.haeruhand.domain.weather.entity;

import java.util.Arrays;
import java.util.Optional;

public enum WarningType {

    STRONG_WIND("W", "강풍"),
    HEAVY_RAIN("R", "호우"),
    COLD_WAVE("C", "한파"),
    DRY_WEATHER("D", "건조"),
    STORM_SURGE("O", "해일"),
    TSUNAMI("N", "지진해일"),
    HIGH_WAVE("V", "풍랑"),
    TYPHOON("T", "태풍"),
    HEAVY_SNOW("S", "대설"),
    YELLOW_DUST("Y", "황사"),
    HEAT_WAVE("H", "폭염"),
    FOG("F", "안개");

    private final String code;
    private final String label;

    WarningType(String code, String label) {
        this.code = code;
        this.label = label;
    }

    public String code() {
        return code;
    }

    public String label() {
        return label;
    }

    public static Optional<WarningType> fromCode(String code) {
        return Arrays.stream(values())
                .filter(wt -> wt.code.equalsIgnoreCase(code))
                .findFirst();
    }

    @Override
    public String toString() {
        return label + " (" + code + ")";
    }
}
