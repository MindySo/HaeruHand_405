package com.ssafy.haeruhand.domain.notification.event;

import java.util.Map;

public class TestEvent extends BaseNotificationEvent {

    private static final String NOTIFICATION_TYPE = "TEST";

    public TestEvent(Long userId, String value1, String value2, String value3) {
        super(
                userId,
                "testTitle : " + value1,
                "testBody : " + value2,
            Map.of(
                "type", NOTIFICATION_TYPE,
                "mapKey", value3
            )
        );
    }

    @Override
    public String getNotificationType() {
        return NOTIFICATION_TYPE;
    }
}
