package com.ssafy.haeruhand.global.exception;

import com.ssafy.haeruhand.global.base.BaseErrorStatus;
import lombok.Getter;

@Getter
public class GlobalException extends RuntimeException {
    protected final BaseErrorStatus errorStatus;

    public GlobalException(BaseErrorStatus errorStatus) {
        super(errorStatus.getMessage());
        this.errorStatus = errorStatus;
    }
}
