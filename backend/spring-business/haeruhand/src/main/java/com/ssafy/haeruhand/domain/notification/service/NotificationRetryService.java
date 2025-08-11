package com.ssafy.haeruhand.domain.notification.service;

import com.ssafy.haeruhand.domain.notification.entity.UserFcmToken;
import com.ssafy.haeruhand.domain.notification.event.BaseNotificationEvent;

import java.util.Set;

public interface NotificationRetryService {
    void scheduleRetry(BaseNotificationEvent event, UserFcmToken token, Exception exception, int currentAttempt);
    Set<String> getReadyRetryTasks(int limit);
    boolean startProcessing(String taskJson);
    void completeProcessing(String taskJson, boolean success);
    void incrementFailureCount(Long userId, Long tokenId);
    Long getFailureCount(Long userId, Long tokenId);
    void cleanup();
}