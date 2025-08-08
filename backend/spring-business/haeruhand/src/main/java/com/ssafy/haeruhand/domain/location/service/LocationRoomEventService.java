package com.ssafy.haeruhand.domain.location.service;

import com.ssafy.haeruhand.domain.location.dto.internal.MemberJoinResultDto;
import com.ssafy.haeruhand.domain.location.dto.internal.MemberLeaveResultDto;
import com.ssafy.haeruhand.domain.location.dto.websocket.LocationMessage;
import com.ssafy.haeruhand.domain.location.entity.LocationShareMember;
import com.ssafy.haeruhand.domain.location.entity.LocationShareRoom;
import com.ssafy.haeruhand.domain.user.entity.User;
import com.ssafy.haeruhand.domain.user.repository.UserRepository;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 위치 공유 방 이벤트 비즈니스 로직 서비스
 * 멤버 참가/퇴장 처리, 방 상태 변경, 이벤트 발행
 */
@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LocationRoomEventService {

    private final LocationShareMemberService memberService;
    private final LocationShareRoomService roomService;
    private final UserRepository userRepository;

    /**
     * 멤버 참가 처리 및 관련 메시지 생성
     */
    public MemberJoinResultDto handleMemberJoin(Long userId, String roomCode, Long roomId) {
        try {
            // 현재 멤버 목록 조회
            List<LocationShareMember> members = memberService.getMembersByRoomId(roomId);
            
            // 멤버 정보 변환
            List<LocationMessage.MemberInfo> memberInfos = convertToMemberInfos(members);
            
            // 경과 시간 계산
            LocationShareRoom room = roomService.findActiveRoom(roomCode);
            long elapsedMin = ChronoUnit.MINUTES.between(room.getStartedAt(), LocalDateTime.now());
            
            // 멤버 목록 메시지 생성
            LocationMessage memberListMessage = LocationMessage.builder()
                    .type(LocationMessage.MessageType.MEMBER_LIST)
                    .elapsedMin(elapsedMin)
                    .members(memberInfos)
                    .build();
            
            // 새 참가자 정보 조회
            User newUser = userRepository.findById(userId)
                    .orElseThrow(() -> new GlobalException(ErrorStatus.USER_NOT_FOUND));
            
            LocationShareMember newMember = members.stream()
                    .filter(m -> m.getUser().getId().equals(userId))
                    .findFirst()
                    .orElseThrow(() -> new GlobalException(ErrorStatus.WEBSOCKET_MEMBER_NOT_FOUND));
            
            // 참가 알림 메시지 생성
            LocationMessage joinedMessage = LocationMessage.builder()
                    .type(LocationMessage.MessageType.MEMBER_JOINED)
                    .userId(userId)
                    .nickname(newUser.getNickname())
                    .color(newMember.getColor())
                    .isHost(newMember.getIsHost())
                    .joinedAt(newMember.getJoinedAt())
                    .build();
            
            log.info("Member join processed. User: {}, Room: {}", userId, roomCode);
            return MemberJoinResultDto.success(memberListMessage, joinedMessage, userId.toString(), roomCode);
            
        } catch (GlobalException e) {
            log.error("Failed to handle member join: {} ({})", e.getErrorStatus().getMessage(), e.getErrorStatus().getCode());
            return MemberJoinResultDto.failure(e.getErrorStatus().getMessage());
        } catch (Exception e) {
            log.error("Failed to handle member join with unexpected error", e);
            throw new GlobalException(ErrorStatus.WEBSOCKET_EVENT_PROCESSING_FAILED);
        }
    }

    /**
     * 멤버 퇴장 및 방 종료 처리
     */
    @Transactional
    public MemberLeaveResultDto handleMemberLeave(Long userId, String roomCode) {
        try {
            // 사용자 정보 조회
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new GlobalException(ErrorStatus.USER_NOT_FOUND));
            
            // 멤버 제거
            memberService.removeMember(roomCode, userId);
            
            // 방 정보 조회 및 남은 멤버 수 확인
            LocationShareRoom room = roomService.findActiveRoom(roomCode);
            int remainingMembers = memberService.getActiveMemberCount(room.getId());
            
            if (remainingMembers == 0) {
                // 방 종료 처리
                roomService.closeRoom(roomCode);
                
                // 경과 시간 계산
                long totalDurationMin = ChronoUnit.MINUTES.between(room.getStartedAt(), LocalDateTime.now());
                
                // 방 종료 메시지 생성
                LocationMessage roomClosedMessage = LocationMessage.builder()
                        .type(LocationMessage.MessageType.ROOM_CLOSED)
                        .reason(LocationMessage.CloseReason.ALL_MEMBERS_LEFT)
                        .closedAt(LocalDateTime.now())
                        .totalDurationMin(totalDurationMin)
                        .build();
                
                log.info("Room {} closed. Total duration: {} minutes", roomCode, totalDurationMin);
                return MemberLeaveResultDto.roomClosed(roomClosedMessage, roomCode);
                
            } else {
                // 멤버 퇴장 메시지 생성
                LocationMessage memberLeftMessage = LocationMessage.builder()
                        .type(LocationMessage.MessageType.MEMBER_LEFT)
                        .userId(userId)
                        .nickname(user.getNickname())
                        .build();
                
                log.info("Member {} left room {}. Remaining members: {}", 
                        user.getNickname(), roomCode, remainingMembers);
                return MemberLeaveResultDto.memberLeft(memberLeftMessage, roomCode);
            }
            
        } catch (GlobalException e) {
            log.error("Failed to handle member leave: {} ({})", e.getErrorStatus().getMessage(), e.getErrorStatus().getCode());
            return MemberLeaveResultDto.failure(e.getErrorStatus().getMessage());
        } catch (Exception e) {
            log.error("Failed to handle member leave with unexpected error", e);
            throw new GlobalException(ErrorStatus.WEBSOCKET_EVENT_PROCESSING_FAILED);
        }
    }

    /**
     * 위치 업데이트 메시지 생성
     */
    public LocationMessage createLocationUpdateMessage(Long userId, BigDecimal latitude, BigDecimal longitude, BigDecimal accuracy) {
        return LocationMessage.builder()
                .type(LocationMessage.MessageType.LOCATION)
                .userId(userId)
                .latitude(latitude)
                .longitude(longitude)
                .accuracy(accuracy)
                .receivedAt(LocalDateTime.now())
                .build();
    }

    /**
     * LocationShareMember 목록을 LocationMessage.MemberInfo 목록으로 변환
     */
    private List<LocationMessage.MemberInfo> convertToMemberInfos(List<LocationShareMember> members) {
        return members.stream()
                .map(member -> {
                    User user = userRepository.findById(member.getUser().getId())
                            .orElseThrow(() -> new GlobalException(ErrorStatus.USER_NOT_FOUND));
                    
                    return LocationMessage.MemberInfo.builder()
                            .userId(member.getUser().getId())
                            .nickname(user.getNickname())
                            .color(member.getColor())
                            .isHost(member.getIsHost())
                            .lastActiveAt(member.getLastActiveAt())
                            .build();
                })
                .collect(Collectors.toList());
    }

}