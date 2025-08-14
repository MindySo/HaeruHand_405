package com.ssafy.haeruhand.domain.notification.controller;

import com.ssafy.haeruhand.domain.notification.dto.FCMSendRequestDto;
import com.ssafy.haeruhand.domain.notification.dto.FCMSendResponseDto;
import com.ssafy.haeruhand.domain.notification.event.TestEvent;
import com.ssafy.haeruhand.domain.notification.service.FCMService;
import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/test")
@RequiredArgsConstructor
@Tag(name = "FCM notification test", description = "FCM 알림 테스트 API")
public class NotificationTestController {
    
    private final ApplicationEventPublisher eventPublisher;
    private final FCMService fcmService;
    
    @PostMapping("/testevent")
    @Operation(summary = "테스트 이벤트 발행", description = "테스트 이벤트를 발행하여 알림까지 전송합니다.")
    public ResponseEntity<ApiResponse<String>> testAlert(
            @RequestParam Long userId) {
        
        eventPublisher.publishEvent(
            new TestEvent(userId, "testTitle", "testBody", "mapValue")
        );
        
        return ApiResponse.success(SuccessStatus.SEND_FCM_SUCCESS, "이벤트를 발행하였습니다.");
    }

    @PostMapping("/send")
    @Operation(summary = "FCM 알림 전송", description = "FCM 푸시 알림을 전송합니다.")
    public ResponseEntity<ApiResponse<FCMSendResponseDto>> sendTestNotification(
            @RequestBody @Valid FCMSendRequestDto request) {

        // 토큰 유효성 검증
        fcmService.validateToken(request.getToken());

        // FCM 알림 전송
        FCMSendResponseDto response = fcmService.sendNotification(
                request.getToken(),
                request.getTitle(),
                request.getBody()
        );

        return ApiResponse.success(SuccessStatus.SEND_FCM_SUCCESS, response);
    }

    @GetMapping("/ping")
    @Operation(summary = "FCM 서비스 상태 확인", description = "FCM 서비스가 정상 동작하는지 확인합니다.")
    public ResponseEntity<ApiResponse<String>> pingFCMService() {
        return ApiResponse.success(SuccessStatus.OK, "FCM 서비스가 정상 동작 중입니다.");
    }
}