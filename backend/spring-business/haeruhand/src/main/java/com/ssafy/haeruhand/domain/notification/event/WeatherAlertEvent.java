package com.ssafy.haeruhand.domain.notification.event;

import lombok.NoArgsConstructor;

import java.util.Map;

@NoArgsConstructor
public class WeatherAlertEvent extends BaseNotificationEvent {

    private static final String NOTIFICATION_TYPE = "WEATHER_ALERT";

    public WeatherAlertEvent(Long userId, String regionName, String alertLevel) {
        super(
            userId,
            "기상 특보가 발령됐어요 ⚠️",
            regionName + " 지역에 " + alertLevel + " 특보가 발령됐습니다. 안전에 유의하세요.",
            Map.of(
                "type", NOTIFICATION_TYPE,
                "region", regionName,
                "level", alertLevel,
                "action", "VIEW_WEATHER_INFO"
            )
        );
    }

    @Override
    public String getNotificationType() {
        return NOTIFICATION_TYPE;
    }
}