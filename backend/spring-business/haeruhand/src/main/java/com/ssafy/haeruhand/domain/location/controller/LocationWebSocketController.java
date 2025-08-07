package com.ssafy.haeruhand.domain.location.controller;

import com.ssafy.haeruhand.domain.location.dto.internal.MemberJoinResultDto;
import com.ssafy.haeruhand.domain.location.dto.response.RoomInfoResponse;
import com.ssafy.haeruhand.domain.location.dto.websocket.LocationMessage;
import com.ssafy.haeruhand.domain.location.dto.websocket.LocationUpdateRequest;
import com.ssafy.haeruhand.domain.location.service.LocationRoomEventService;
import com.ssafy.haeruhand.domain.location.service.LocationUpdateService;
import com.ssafy.haeruhand.global.websocket.service.LocationWebSocketMessageService;
import com.ssafy.haeruhand.global.websocket.service.WebSocketSessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class LocationWebSocketController {

    private final WebSocketSessionService sessionService;
    private final LocationRoomEventService roomEventService;
    private final LocationWebSocketMessageService messageService;
    private final LocationUpdateService locationUpdateService;

    @MessageMapping("/location.join")
    public void handleJoin(@Header("simpSessionAttributes") Map<String, Object> sessionAttributes) {
        try {
            // 세션 정보 추출
            RoomInfoResponse.RoomInfo sessionInfo = 
                    sessionService.extractSessionInfo(sessionAttributes);
            
            log.info("User {} joining room {}", sessionInfo.getHostUserId(), sessionInfo.getRoomCode());
            
            // 멤버 참가 처리
            MemberJoinResultDto joinResult = 
                    roomEventService.handleMemberJoin(sessionInfo.getHostUserId(), 
                            sessionInfo.getRoomCode(), sessionInfo.getRoomId());
            
            if (!joinResult.isSuccess()) {
                log.error("Failed to handle member join: {}", joinResult.getErrorMessage());
                return;
            }
            
            // 멤버 목록 전송 (새 참가자에게만)
            messageService.sendToUser(joinResult.getTargetUserId(), 
                    joinResult.getRoomCode(), joinResult.getMemberListMessage());
            
            // 참가 알림 브로드캐스트
            messageService.broadcastMemberJoined(joinResult.getRoomCode(), joinResult.getJoinedMessage());
            
        } catch (Exception e) {
            log.error("Error handling join message", e);
        }
    }

    @MessageMapping("/location.update")
    public void handleLocationUpdate(@Header("simpSessionAttributes") Map<String, Object> sessionAttributes,
                                    @Payload LocationUpdateRequest request) {
        try {
            // 세션 정보 추출
            RoomInfoResponse.RoomInfo sessionInfo = 
                    sessionService.extractSessionInfo(sessionAttributes);
            
            // 위치 정보를 배치 처리기에 추가
            locationUpdateService.enqueueLocation(sessionInfo.getRoomId(), 
                    sessionInfo.getHostUserId(), request);
            
            // 위치 업데이트 메시지 생성 및 브로드캐스트
            LocationMessage locationMessage = roomEventService.createLocationUpdateMessage(
                    sessionInfo.getHostUserId(), request.getLatitude(), 
                    request.getLongitude(), request.getAccuracy());
            
            messageService.broadcastLocationUpdate(sessionInfo.getRoomCode(), 
                    sessionInfo.getHostUserId().toString(), locationMessage);
            
        } catch (Exception e) {
            log.error("Error handling location update", e);
        }
    }

    @MessageMapping("/location.leave")
    public void handleLeave(@Header("simpSessionAttributes") Map<String, Object> sessionAttributes) {
        try {
            // 세션 정보 추출
            RoomInfoResponse.RoomInfo sessionInfo = 
                    sessionService.extractSessionInfo(sessionAttributes);
            
            log.info("User {} leaving room {}", sessionInfo.getHostUserId(), sessionInfo.getRoomCode());
            
            // 멤버 제거 및 방 종료 처리는 SessionDisconnectEvent에서 처리
            // 여기서는 명시적 퇴장 의도만 로깅
            
        } catch (Exception e) {
            log.error("Error handling leave message", e);
        }
    }
}