package com.ssafy.haeruhand.domain.location.enums;

public enum MemberColor {
    HOST("#FF0000", "빨강"),
    BLUE("#0084FF", "파랑"), 
    GREEN("#00C851", "초록"),
    ORANGE("#FF6900", "주황");
    
    private final String colorCode;
    private final String description;
    
    MemberColor(String colorCode, String description) {
        this.colorCode = colorCode;
        this.description = description;
    }
    
    public String getColorCode() {
        return colorCode;
    }
    
    public String getDescription() {
        return description;
    }
    
    public static String getColorByIndex(int index) {
        MemberColor[] colors = values();
        return colors[Math.min(index, colors.length - 1)].getColorCode();
    }
    
    public static int getMaxMembers() {
        return values().length;
    }
}