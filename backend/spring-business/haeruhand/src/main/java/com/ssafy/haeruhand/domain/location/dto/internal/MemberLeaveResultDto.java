package com.ssafy.haeruhand.domain.location.dto.internal;

import com.ssafy.haeruhand.domain.location.dto.websocket.LocationMessage;
import lombok.Builder;
import lombok.Getter;

/**
 * 멤버 퇴장 결과 DTO
 * LocationRoomEventService의 멤버 퇴장 처리 결과를 담는 내부 DTO
 */
@Getter
@Builder
public class MemberLeaveResultDto {
    private final boolean success;
    private final String errorMessage;
    private final LocationMessage message;
    private final String roomCode;
    private final boolean roomClosed;

    /**
     * 멤버 퇴장 결과 생성 (방 유지)
     */
    public static MemberLeaveResultDto memberLeft(LocationMessage message, String roomCode) {
        return MemberLeaveResultDto.builder()
                .success(true)
                .message(message)
                .roomCode(roomCode)
                .roomClosed(false)
                .build();
    }

    /**
     * 방 종료 결과 생성 (모든 멤버 퇴장)
     */
    public static MemberLeaveResultDto roomClosed(LocationMessage message, String roomCode) {
        return MemberLeaveResultDto.builder()
                .success(true)
                .message(message)
                .roomCode(roomCode)
                .roomClosed(true)
                .build();
    }

    /**
     * 실패한 멤버 퇴장 결과 생성
     */
    public static MemberLeaveResultDto failure(String errorMessage) {
        return MemberLeaveResultDto.builder()
                .success(false)
                .errorMessage(errorMessage)
                .roomClosed(false)
                .build();
    }
}