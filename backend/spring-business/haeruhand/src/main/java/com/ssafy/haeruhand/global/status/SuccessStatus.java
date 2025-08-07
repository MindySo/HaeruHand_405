package com.ssafy.haeruhand.global.status;

import com.ssafy.haeruhand.global.base.BaseSuccessStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum SuccessStatus implements BaseSuccessStatus {

    OK(HttpStatus.OK, 200, "요청이 성공적으로 처리되었습니다."),
    CHAT_SUCCESS(HttpStatus.OK, 200, "AI와의 대화가 성공적으로 완료되었습니다."),
    LOGIN_SUCCESS(HttpStatus.OK, 200, "로그인이 성공적으로 완료되었습니다."),

    GET_EMAIL_PERIOD_SUCCESS(HttpStatus.OK, 200, "이메일 전송 주기 조회가 성공적으로 완료되었습니다."),
    PATCH_EMAIL_PERIOD_SUCCESS(HttpStatus.OK, 200, "이메일 전송 주기 수정이 성공적으로 완료되었습니다."),

    GET_EMAIL_LIST_SUCCESS(HttpStatus.OK, 200, "이메일 리스트 조회가 성공적으로 완료되었습니다."),
    POST_EMAIL_SUCCESS(HttpStatus.OK, 200, "이메일 추가가 성공적으로 완료되었습니다."),
    PATCH_EMAIL_SUCCESS(HttpStatus.OK, 200, "이메일 수정이 성공적으로 완료되었습니다."),
    DELETE_EMAIL_SUCCESS(HttpStatus.OK, 200, "이메일 삭제가 성공적으로 완료되었습니다."),

    TOKEN_REISSUE_SUCCESS(HttpStatus.OK, 200, "토큰 재발급이 성공적으로 완료되었습니다."),

    SEND_FCM_SUCCESS(HttpStatus.OK, 200, "FCM 알림 전송이 성공적으로 완료되었습니다."),
    REGISTER_FCM_TOKEN_SUCCESS(HttpStatus.CREATED, 201, "FCM 토큰 등록이 성공적으로 완료되었습니다."),
    UPDATE_FCM_TOKEN_SUCCESS(HttpStatus.OK, 200, "FCM 토큰 갱신이 성공적으로 완료되었습니다."),
    DELETE_FCM_TOKEN_SUCCESS(HttpStatus.OK, 200, "FCM 토큰 삭제가 성공적으로 완료되었습니다.");

    private final HttpStatus httpStatus;
    private final Integer code;
    private final String message;
}
