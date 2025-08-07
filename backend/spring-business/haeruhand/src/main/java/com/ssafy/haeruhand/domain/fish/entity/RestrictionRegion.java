package com.ssafy.haeruhand.domain.fish.entity;

import java.util.Arrays;
import java.util.Optional;

public enum RestrictionRegion {

    JEJU("JEJU", "제주 본섬"),
    JEJU_CHUJA("JEJU_CHUJA", "제추 추자도"),
    NATIONAL("NATIONAL", "전국");

    private final String code;
    private final String label;

    RestrictionRegion(String code, String label) {
        this.code = code;
        this.label = label;
    }

    public String code() {
        return code;
    }

    public String label() {
        return label;
    }

    public static Optional<RestrictionRegion> fromCode(String code) {
        return Arrays.stream(values())
                .filter(region -> region.code.equalsIgnoreCase(code))
                .findFirst();
    }

    @Override
    public String toString() {
        return label + " (" + code + ")";
    }
}
