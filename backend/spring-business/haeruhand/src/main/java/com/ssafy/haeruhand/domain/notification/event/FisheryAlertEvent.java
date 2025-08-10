package com.ssafy.haeruhand.domain.notification.event;

import java.util.Map;

/**
 * 어장 정체 알림 이벤트
 * 30분 이상 같은 어장에 머물고 있는 사용자 감지 시 발생
 */
public class FisheryAlertEvent extends BaseNotificationEvent {
    
    public FisheryAlertEvent(Long userId, Long roomId, String fisheryUserName) {
        super(
            userId,
            "⚠️ 어장 알림",
            fisheryUserName + "님이 30분 이상 같은 어장에 머물고 있습니다. 확인이 필요합니다.",
            Map.of(
                "type", "SAFETY_ALERT",
                "roomId", String.valueOf(roomId),
                "alertType", "FISHERY"
            )
        );
    }
    
    @Override
    public String getNotificationType() {
        return "FISHERY_ALERT";
    }
}