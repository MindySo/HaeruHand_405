package com.ssafy.haeruhand.domain.notification.event;

import java.util.Map;

public class BuddyOutOfRangeEvent extends BaseNotificationEvent {

    private static final String NOTIFICATION_TYPE = "BUDDY_OUT_OF_RANGE";

    public BuddyOutOfRangeEvent(Long userId, Long buddyId, String buddyNickname) {
        super(
            userId,
            "팀원이 너무 멀어졌어요!",
            buddyNickname + "님이 너무 멀리 떨어져 있어요. 함께 움직여 주세요.",
            Map.of(
                "type", NOTIFICATION_TYPE,
                "buddyId", String.valueOf(buddyId),
                "action", "VIEW_TEAM_LOCATION"
            )
        );
    }

    @Override
    public String getNotificationType() {
        return NOTIFICATION_TYPE;
    }
}
