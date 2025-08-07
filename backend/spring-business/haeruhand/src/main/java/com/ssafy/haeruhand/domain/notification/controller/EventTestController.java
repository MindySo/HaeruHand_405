package com.ssafy.haeruhand.domain.notification.controller;

import com.ssafy.haeruhand.domain.notification.event.TestEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/test")
@RequiredArgsConstructor
public class EventTestController {
    
    private final ApplicationEventPublisher eventPublisher;
    
    @PostMapping("/test-alert")
    public ResponseEntity<String> testAlert(
            @RequestParam Long userId) {
        
        eventPublisher.publishEvent(
            new TestEvent(userId, "testTitle", "testBody", "mapValue")
        );
        
        return ResponseEntity.ok("이벤트 발행 완료");
    }
}