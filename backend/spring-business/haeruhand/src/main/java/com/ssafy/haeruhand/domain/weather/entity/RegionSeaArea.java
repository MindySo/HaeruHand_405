package com.ssafy.haeruhand.domain.weather.entity;

import java.util.Arrays;
import java.util.Optional;

public enum RegionSeaArea {

    JEJU_NORTH("S1323100", "제주도북부앞바다"),
    JEJU_EAST ("S1323200", "제주도동부앞바다"),
    JEJU_SOUTH("S1323300", "제주도남부앞바다"),
    JEJU_WEST ("S1323400", "제주도서부앞바다");

    private final String code;
    private final String label;

    RegionSeaArea(String code, String label) {
        this.code = code;
        this.label = label;
    }

    public String code() {
        return code;
    }

    public String label() {
        return label;
    }

    public static Optional<RegionSeaArea> fromCode(String code) {
        return Arrays.stream(values())
                .filter(rsa -> rsa.code.equalsIgnoreCase(code))
                .findFirst();
    }

    @Override
    public String toString() {
        return label + " (" + code + ")";
    }
}
