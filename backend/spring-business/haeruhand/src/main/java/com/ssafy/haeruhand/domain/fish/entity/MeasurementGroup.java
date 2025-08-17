package com.ssafy.haeruhand.domain.fish.entity;

import java.util.List;

public enum MeasurementGroup {

    FISH("어류", List.of(
            MeasurementType.TOTAL_LENGTH,
            MeasurementType.ANAL_LENGTH,
            MeasurementType.BODY_WIDTH
    )),

    CRUSTACEAN("갑각류", List.of(
            MeasurementType.CARAPACE_WIDTH
    )),

    CEPHALOPOD("오징어류", List.of(
            MeasurementType.OUTER_MANTLE_LENGTH
    )),

    MOLLUSK("패류", List.of(
            MeasurementType.SHELL_LENGTH,
            MeasurementType.SHELL_HEIGHT
    ));

    private final String label;
    private final List<MeasurementType> supportedMeasurementTypes;

    MeasurementGroup(String label, List<MeasurementType> supportedMeasurementTypes) {
        this.label = label;
        this.supportedMeasurementTypes = supportedMeasurementTypes;
    }

    public String label() {
        return label;
    }

    public List<MeasurementType> supportedTypes() {
        return supportedMeasurementTypes;
    }

    public boolean supports(MeasurementType type) {
        return supportedMeasurementTypes.contains(type);
    }

    @Override
    public String toString() {
        return label;
    }
}
