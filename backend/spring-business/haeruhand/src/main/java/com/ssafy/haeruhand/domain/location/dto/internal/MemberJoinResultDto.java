package com.ssafy.haeruhand.domain.location.dto.internal;

import com.ssafy.haeruhand.domain.location.dto.websocket.LocationMessage;
import lombok.Builder;
import lombok.Getter;

/**
 * 멤버 참가 결과 DTO
 * LocationRoomEventService의 멤버 참가 처리 결과를 담는 내부 DTO
 */
@Getter
@Builder
public class MemberJoinResultDto {
    private final boolean success;
    private final String errorMessage;
    private final LocationMessage memberListMessage;
    private final LocationMessage joinedMessage;
    private final String targetUserId;
    private final String roomCode;

    /**
     * 성공적인 멤버 참가 결과 생성
     */
    public static MemberJoinResultDto success(LocationMessage memberListMessage, LocationMessage joinedMessage, 
                                           String targetUserId, String roomCode) {
        return MemberJoinResultDto.builder()
                .success(true)
                .memberListMessage(memberListMessage)
                .joinedMessage(joinedMessage)
                .targetUserId(targetUserId)
                .roomCode(roomCode)
                .build();
    }

    /**
     * 실패한 멤버 참가 결과 생성
     */
    public static MemberJoinResultDto failure(String errorMessage) {
        return MemberJoinResultDto.builder()
                .success(false)
                .errorMessage(errorMessage)
                .build();
    }
}