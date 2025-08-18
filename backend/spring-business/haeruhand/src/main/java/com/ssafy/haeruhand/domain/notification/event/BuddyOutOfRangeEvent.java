package com.ssafy.haeruhand.domain.notification.event;

import lombok.NoArgsConstructor;

import java.util.Map;

@NoArgsConstructor
public class BuddyOutOfRangeEvent extends BaseNotificationEvent {

    private static final String NOTIFICATION_TYPE = "BUDDY_OUT_OF_RANGE";

    public BuddyOutOfRangeEvent(Long userId, Long buddyId, String buddyNickname, String distance) {
        super(
            userId,
            "🚨 안전 거리 이탈",
            "현재 그룹에서 " + distance + "m 떨어져 있습니다. 안전을 위해 그룹과 합류하세요.",
            Map.of(
                "type", NOTIFICATION_TYPE,
                "buddyId", String.valueOf(buddyId),
                "distance", distance,
                "action", "VIEW_TEAM_LOCATION"
            )
        );
    }

    @Override
    public String getNotificationType() {
        return NOTIFICATION_TYPE;
    }
}
