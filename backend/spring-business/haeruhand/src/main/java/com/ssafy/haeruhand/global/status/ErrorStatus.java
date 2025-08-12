package com.ssafy.haeruhand.global.status;

import com.ssafy.haeruhand.global.base.BaseErrorStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorStatus implements BaseErrorStatus {
    BAD_REQUEST(HttpStatus.BAD_REQUEST, 400, "잘못된 요청입니다."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, 401, "인증이 필요합니다."),
    FORBIDDEN(HttpStatus.FORBIDDEN, 403, "접근 권한이 없습니다."),
    NOT_FOUND(HttpStatus.NOT_FOUND, 404, "요청한 자원을 찾을 수 없습니다."),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, 405, "허용되지 않은 메소드입니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 500, "서버 내부 오류입니다."),

    // user
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, 404, "존재하지 않는 유저입니다."),

    // email
    EMAIL_FORMAT_INVALID(HttpStatus.BAD_REQUEST, 400, "올바르지 않은 이메일 형식입니다."),
    USER_EMAIL_FORBIDDEN(HttpStatus.FORBIDDEN, 403, "유저가 이메일에 대해 접근 권한이 없습니다."),
    EMAIL_NOT_FOUND(HttpStatus.NOT_FOUND, 404, "존재하지 않는 이메일입니다."),

    // oauth
    OAUTH_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 500, "SNS로그인 오류입니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, 401, "유효하지 않은 토큰입니다."),
    OAUTH_TOKEN_ERROR(HttpStatus.BAD_REQUEST, 400, "OAuth 토큰 발급에 실패했습니다."),
    PROFILE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 500, "유저정보 불러오기 오류입니다."),
    USER_CREATE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 500, "사용자 생성에 실패했습니다."),

    // gcs
    UNSUPPORTED_IMAGE_TYPE(HttpStatus.BAD_REQUEST, 400, "지원하지 않는 이미지 업로드 타입입니다."),
    INVALID_IMAGE_URL(HttpStatus.BAD_REQUEST, 400, "image url이 잘못되었습니다."),
    NO_EXTENSION(HttpStatus.BAD_REQUEST, 400, "확장자가 없습니다."),

    // fast api
    FAST_API_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 500, "FAST API 서버 오류입니다."),
    GCS_URL_PROCESSING_ERROR(HttpStatus.BAD_REQUEST, 400, "GCS URL 처리 중 오류가 발생했습니다"),
    FAST_API_TIMEOUT(HttpStatus.GATEWAY_TIMEOUT, 504, "Fast Api 응답 시간이 초과되었습니다"),
    FAST_API_CLIENT_ERROR(HttpStatus.BAD_REQUEST, 400, "Fast API 요청 오류입니다."),
    FAST_API_SERVICE_UNAVAILABLE(HttpStatus.SERVICE_UNAVAILABLE, 503,"Fast Api 서버가 이용 불가능 합니다."),

    // FCM
    FCM_TOKEN_INVALID(HttpStatus.BAD_REQUEST, 400, "유효하지 않은 FCM 토큰입니다."),
    FCM_TOKEN_NOT_FOUND(HttpStatus.NOT_FOUND, 404, "등록되지 않은 FCM 토큰입니다."),
    FCM_SEND_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, 500, "FCM 알림 전송에 실패했습니다."),
    FCM_TOKEN_DUPLICATE(HttpStatus.CONFLICT, 409, "이미 등록된 FCM 토큰입니다."),
    INVALID_DEVICE_TYPE(HttpStatus.BAD_REQUEST, 400, "지원하지 않는 디바이스 타입입니다."),

    // websocket
    WEBSOCKET_AUTH_FAILED(HttpStatus.UNAUTHORIZED, 401, "WebSocket 인증에 실패했습니다."),
    WEBSOCKET_INVALID_HEADER(HttpStatus.BAD_REQUEST, 400, "필수 헤더가 누락되었거나 형식이 올바르지 않습니다."),
    WEBSOCKET_SESSION_INVALID(HttpStatus.BAD_REQUEST, 400, "유효하지 않은 세션 정보입니다."),
    WEBSOCKET_ROOM_FULL(HttpStatus.CONFLICT, 409, "방 참가 인원이 초과되었습니다."),
    WEBSOCKET_ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, 404, "활성화된 방을 찾을 수 없습니다."),
    WEBSOCKET_MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, 404, "멤버 정보를 찾을 수 없습니다."),
    WEBSOCKET_CONNECTION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, 500, "WebSocket 연결 처리 중 오류가 발생했습니다."),
    WEBSOCKET_DUPLICATE_CONNECTION(HttpStatus.CONFLICT, 409, "이미 같은 토큰으로 연결된 사용자입니다."),
    WEBSOCKET_EVENT_PROCESSING_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, 500, "WebSocket 이벤트 처리 중 오류가 발생했습니다."),

    // 조석
    TIDE_NOT_FOUND(HttpStatus.NOT_FOUND, 404, "조석 정보를 찾을 수 없습니다."),
    KHOA_BAD_RESPONSE(HttpStatus.BAD_GATEWAY, 502, "KHOA 응답이 올바르지 않습니다."),

    // 어장
    FISHERY_NOT_FOUND(HttpStatus.NOT_FOUND, 404, "존재하지 않는 어장입니다."),

    // 해양
    WEATHER_BAD_RESPONSE(HttpStatus.BAD_GATEWAY, 502, "해양여행예보 API 응답이 올바르지 않습니다."),

    // location
    LOCATION_ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, 404, "위치 공유 방을 찾을 수 없습니다."),
    LOCATION_MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, 404, "위치 공유 멤버를 찾을 수 없습니다."),
    LOCATION_USER_NOT_FOUND(HttpStatus.NOT_FOUND, 404, "위치 정보를 가진 사용자를 찾을 수 없습니다."),
    LOCATION_PROCESSING_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, 500, "위치 정보 처리 중 오류가 발생했습니다.");

    private final HttpStatus httpStatus;
    private final Integer code;
    private final String message;
}
