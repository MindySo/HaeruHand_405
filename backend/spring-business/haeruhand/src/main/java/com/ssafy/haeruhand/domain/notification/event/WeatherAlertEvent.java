package com.ssafy.haeruhand.domain.notification.event;

import lombok.NoArgsConstructor;

import java.util.Map;

@NoArgsConstructor
public class WeatherAlertEvent extends BaseNotificationEvent {

    private static final String NOTIFICATION_TYPE = "WEATHER_ALERT";

    public WeatherAlertEvent(Long userId, String regionName, String alertLevel) {
        super(
                userId,
                "🚨 안전 거리 이탈",
                "현재 그룹에서 500m 떨어져 있습니다. 안전을 위해 그룹과 합류하세요.",
                Map.of(
                        "type", NOTIFICATION_TYPE,
                        "action", "VIEW_TEAM_LOCATION"
                )
        );
    }

    @Override
    public String getNotificationType() {
        return NOTIFICATION_TYPE;
    }
}