package com.ssafy.haeruhand.domain.notification.event;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "notificationType"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = TestEvent.class, name = "BUDDY_OUT_OF_RANGE"),
        @JsonSubTypes.Type(value = FisheryAlertEvent.class, name = "FISHERY_ALERT"),
        @JsonSubTypes.Type(value = FishingEndAlertEvent.class, name = "FISHING_END_ALERT"),
        @JsonSubTypes.Type(value = TestEvent.class, name = "TEST"),
        @JsonSubTypes.Type(value = WeatherAlertEvent.class, name = "WEATHER_ALERT")
})
public abstract class BaseNotificationEvent {

    private Long userId;
    private String title;
    private String body;
    private LocalDateTime occurredAt;
    private Map<String, String> additionalData;   // 프론트에 정보 제공(push 클릭 시 페이지 이동을 위한 정보 제공)

    protected BaseNotificationEvent(Long userId, String title, String body, Map<String, String> additionalData) {
        this.userId = userId;
        this.title = title;
        this.body = body;
        this.occurredAt = LocalDateTime.now();
        this.additionalData = additionalData;
    }

    @JsonIgnore
    public abstract String getNotificationType();
}