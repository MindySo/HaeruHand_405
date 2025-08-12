package com.ssafy.haeruhand.domain.location.websocket.service;

import com.ssafy.haeruhand.domain.location.dto.internal.MemberJoinResultDto;
import com.ssafy.haeruhand.domain.location.service.LocationShareMemberService;
import com.ssafy.haeruhand.domain.location.websocket.dto.SessionInfo;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Location 도메인 WebSocket 세션 생명주기 관리 서비스
 * 세션 검증, 속성 관리, 연결/해제 이벤트 처리
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class LocationWebSocketSessionService {

    private final LocationShareMemberService memberService;
    private final StringRedisTemplate stringRedisTemplate;

    /**
     * WebSocket 연결 시 세션 초기화 처리 (JTI 중복 연결 체크 포함)
     * @return MemberJoinResultDto
     */
    public MemberJoinResultDto handleConnect(Long userId, String roomCode, Long roomId, String jti) {
        try {
            // Redis JTI 관리 (사용자별 중복 연결 추적)
            if (jti != null) {
                String jtiKey = String.format("jti:%s:user:%d", jti, userId);
                
                // 30분 TTL로 자동 정리, 동일 사용자의 중복 세션 체크
                boolean isNewConnection = stringRedisTemplate.opsForValue()
                        .setIfAbsent(jtiKey, "connected", 30, TimeUnit.MINUTES);
                
                if (!isNewConnection) {
                    log.warn("User {} already connected with JTI {} in room {}", userId, jti, roomCode);
                    throw new GlobalException(ErrorStatus.WEBSOCKET_DUPLICATE_CONNECTION);
                }
                
                log.info("JTI registered in Redis: {} for user: {}", jti, userId);
            }
            
            // 최대 인원 체크 (4명 제한)
            int currentMemberCount = memberService.getActiveMemberCount(roomId);
            boolean isExistingMember = memberService.isMemberExists(roomId, userId);
            
            if (!isExistingMember && currentMemberCount >= 4) {
                log.warn("Room {} is full. Max members: 4, current: {}", roomCode, currentMemberCount);
                throw new GlobalException(ErrorStatus.WEBSOCKET_ROOM_FULL);
            }
            
            // 멤버 UPSERT (색상 자동 할당)
            memberService.upsertMember(roomId, userId);
            
            log.info("WebSocket connection established. User: {}, Room: {}, JTI: {}", userId, roomCode, jti);
            
            return MemberJoinResultDto.success(null, null, userId.toString(), roomCode);
            
        } catch (GlobalException e) {
            log.error("WebSocket connection failed: {} ({})", e.getErrorStatus().getMessage(), e.getErrorStatus().getCode());
            return MemberJoinResultDto.failure(e.getErrorStatus().getMessage());
        } catch (Exception e) {
            log.error("Failed to handle WebSocket connection with unexpected error", e);
            throw new GlobalException(ErrorStatus.WEBSOCKET_CONNECTION_FAILED);
        }
    }

    /**
     * 세션 속성에서 정보 추출 및 검증
     * @return SessionInfo WebSocket 세션 정보
     */
    public SessionInfo extractSessionInfo(Map<String, Object> sessionAttributes) {
        Long userId = (Long) sessionAttributes.get("userId");
        String roomCode = (String) sessionAttributes.get("roomCode");
        Long roomId = (Long) sessionAttributes.get("roomId");
        
        if (userId == null || roomCode == null || roomId == null) {
            throw new GlobalException(ErrorStatus.WEBSOCKET_SESSION_INVALID);
        }
        
        return SessionInfo.builder()
                .userId(userId)
                .roomCode(roomCode)
                .roomId(roomId)
                .build();
    }

    /**
     * 세션 속성 생성
     */
    public void setSessionAttributes(Map<String, Object> attributes, Long userId, String roomCode, Long roomId) {
        attributes.put("userId", userId);
        attributes.put("roomCode", roomCode);
        attributes.put("roomId", roomId);
    }
}