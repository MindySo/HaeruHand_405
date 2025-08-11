package com.ssafy.haeruhand.domain.weather.entity;

import java.util.Arrays;
import java.util.Optional;

public enum WarningCommand {

    ISSUE("1", "발표"),
    MAINTAIN("2", "대치"),
    CANCEL("3", "해제"),
    MAINTAIN_CANCEL("4", "대치해제"),
    EXTEND("5", "연장"),
    CHANGE("6", "변경"),
    CHANGE_CANCEL("7", "변경해제");

    private final String code;
    private final String label;

    WarningCommand(String code, String label) {
        this.code = code;
        this.label = label;
    }

    public String code() {
        return code;
    }

    public String label() {
        return label;
    }

    public static Optional<WarningCommand> fromCode(String code) {
        return Arrays.stream(values())
                .filter(wc -> wc.code.equalsIgnoreCase(code))
                .findFirst();
    }

    public static Optional<WarningCommand> fromLabel(String label) {
        if (label == null || label.isBlank()) {
            return Optional.empty();
        }
        return Arrays.stream(values())
                .filter(command -> command.label.equals(label.trim()))
                .findFirst();
    }

    @Override
    public String toString() {
        return label + " (" + code + ")";
    }
}
