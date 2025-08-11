package com.ssafy.haeruhand.domain.notification.event;

import java.util.Map;

/**
 * 해루질 종료 알림 이벤트
 * 종료 30분 전 발생
 */
public class FishingEndAlertEvent extends BaseNotificationEvent {
    
    public FishingEndAlertEvent(Long userId, Long roomId, String fisheryName) {
        super(
            userId,
            "⏰ 해루질 종료 알림",
            fisheryName + "의 해루질 종료 시간이 30분 남았습니다. 안전하게 귀가 준비하세요.",
            Map.of(
                "type", "FISHING_END_ALERT",
                "roomId", String.valueOf(roomId),
                "alertType", "FISHING_END"
            )
        );
    }
    
    @Override
    public String getNotificationType() {
        return "FISHING_END_ALERT";
    }
}