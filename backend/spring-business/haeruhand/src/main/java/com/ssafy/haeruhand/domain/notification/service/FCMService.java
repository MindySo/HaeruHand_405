package com.ssafy.haeruhand.domain.notification.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.ssafy.haeruhand.domain.notification.dto.FCMSendResponseDto;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
public class FCMService {

    /**
     * 단일 디바이스에 푸시 알림 전송
     *
     * @param token FCM 토큰
     * @param title 알림 제목
     * @param body 알림 내용
     * @return FCM 전송 응답 DTO
     */
    public FCMSendResponseDto sendNotification(String token, String title, String body) {
        try {
            // 알림 페이로드 구성
            Notification notification = Notification.builder()
                    .setTitle(title)
                    .setBody(body)
                    .build();

            // 메시지 구성
            Message message = Message.builder()
                    .setToken(token)
                    .setNotification(notification)
                    .build();

            // FCM 전송
            String firebaseMessageId = FirebaseMessaging.getInstance().send(message);
            String sentAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            log.info("FCM 전송 성공 - Token: {}, MessageId: {}", maskToken(token), firebaseMessageId);

            return FCMSendResponseDto.of(
                    maskToken(token),
                    title,
                    body,
                    firebaseMessageId,
                    sentAt
            );

        } catch (Exception e) {
            log.error("FCM 전송 실패 - Token: {}, Error: {}", maskToken(token), e.getMessage());
            throw new GlobalException(ErrorStatus.FCM_SEND_FAILED);
        }
    }

    /**
     * 추가 데이터와 함께 알림 전송
     *
     * @param token FCM 토큰
     * @param title 알림 제목
     * @param body 알림 내용
     * @param data 추가 데이터 (key-value)
     * @return FCM 전송 응답 DTO
     */
    public FCMSendResponseDto sendNotificationWithData(String token, String title, String body,
                                                       java.util.Map<String, String> data) {
        try {
            Notification notification = Notification.builder()
                    .setTitle(title)
                    .setBody(body)
                    .build();

            Message.Builder messageBuilder = Message.builder()
                    .setToken(token)
                    .setNotification(notification);

            // 추가 데이터가 있으면 포함
            if (data != null && !data.isEmpty()) {
                messageBuilder.putAllData(data);
            }

            String firebaseMessageId = FirebaseMessaging.getInstance().send(messageBuilder.build());
            String sentAt = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

            log.info("FCM 데이터 포함 전송 성공 - Token: {}, MessageId: {}", maskToken(token), firebaseMessageId);

            return FCMSendResponseDto.of(
                    maskToken(token),
                    title,
                    body,
                    firebaseMessageId,
                    sentAt
            );

        } catch (Exception e) {
            log.error("FCM 데이터 포함 전송 실패 - Token: {}, Error: {}", maskToken(token), e.getMessage());
            throw new GlobalException(ErrorStatus.FCM_SEND_FAILED);
        }
    }

    /**
     * FCM 토큰 유효성 검증
     *
     * @param token 검증할 FCM 토큰
     * @throws GlobalException 토큰이 유효하지 않은 경우
     */
    public void validateToken(String token) {
        if (token == null || token.trim().isEmpty()) {
            throw new GlobalException(ErrorStatus.FCM_TOKEN_INVALID);
        }

        // 기본적인 토큰 형식 검증 (FCM 토큰은 보통 152자 정도)
        if (token.length() < 100) {
            throw new GlobalException(ErrorStatus.FCM_TOKEN_INVALID);
        }
    }

    /**
     * 토큰 마스킹 (로깅 및 응답용)
     * 보안을 위해 토큰의 일부만 표시
     */
    public String maskToken(String token) {
        if (token == null || token.length() < 10) {
            return "INVALID_TOKEN";
        }
        return token.substring(0, 6) + "****" + token.substring(token.length() - 4);
    }
}