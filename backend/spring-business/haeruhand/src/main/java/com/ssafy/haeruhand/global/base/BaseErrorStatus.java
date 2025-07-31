package com.ssafy.haeruhand.global.base;

import org.springframework.http.HttpStatus;

public interface BaseErrorStatus {
    HttpStatus getHttpStatus();
    Integer getCode();
    String getMessage();
}
