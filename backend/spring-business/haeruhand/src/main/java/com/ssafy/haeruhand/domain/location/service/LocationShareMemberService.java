package com.ssafy.haeruhand.domain.location.service;

import com.ssafy.haeruhand.domain.location.entity.LocationShareMember;
import com.ssafy.haeruhand.domain.location.entity.LocationShareRoom;
import com.ssafy.haeruhand.domain.location.repository.LocationShareMemberRepository;
import com.ssafy.haeruhand.domain.location.repository.LocationShareRoomRepository;
import com.ssafy.haeruhand.domain.user.entity.User;
import com.ssafy.haeruhand.domain.user.repository.UserRepository;
import com.ssafy.haeruhand.domain.location.enums.MemberColor;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LocationShareMemberService {

    private final LocationShareMemberRepository memberRepository;
    private final LocationShareRoomRepository roomRepository;
    private final UserRepository userRepository;


    public int getActiveMemberCount(Long roomId) {
        return memberRepository.countByRoom_IdAndIsDeletedFalse(roomId);
    }

    public boolean isMemberExists(Long roomId, Long userId) {
        return memberRepository.existsByRoom_IdAndUser_IdAndIsDeletedFalse(roomId, userId);
    }

    @Transactional
    public void upsertMember(Long roomId, Long userId) {
        // 기존 멤버인지 확인
        memberRepository.findByRoom_IdAndUser_IdAndIsDeletedFalse(roomId, userId)
                .map(member -> {
                    // 기존 멤버면 last_active_at 업데이트
                    member.updateLastActiveAt();
                    return member;
                })
                .orElseGet(() -> {
                    // 새 멤버면 추가
                    LocationShareRoom room = roomRepository.findById(roomId)
                            .orElseThrow(() -> new GlobalException(ErrorStatus.WEBSOCKET_ROOM_NOT_FOUND));

                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new GlobalException(ErrorStatus.USER_NOT_FOUND));

                    // 색상 할당 (현재 멤버 수에 따라)
                    int currentCount = memberRepository.countByRoom_IdAndIsDeletedFalse(roomId);
                    String color = MemberColor.getColorByIndex(currentCount);

                    LocationShareMember newMember = LocationShareMember.builder()
                            .room(room)
                            .user(user)
                            .isHost(false)
                            .color(color)
                            .lastActiveAt(LocalDateTime.now())
                            .build();

                    return memberRepository.save(newMember);
                });
    }

    @Transactional
    public void removeMember(String roomCode, Long userId) {
        LocationShareRoom room = roomRepository.findByRoomCodeAndIsDeletedFalse(roomCode)
                .orElseThrow(() -> new GlobalException(ErrorStatus.WEBSOCKET_ROOM_NOT_FOUND));
        
        LocationShareMember member = memberRepository.findByRoom_IdAndUser_IdAndIsDeletedFalse(room.getId(), userId)
                .orElseThrow(() -> new GlobalException(ErrorStatus.WEBSOCKET_MEMBER_NOT_FOUND));
        
        member.softDelete();
        log.debug("Member removed. User: {}, Room: {}", userId, roomCode);
    }

    public List<LocationShareMember> getMembersByRoomId(Long roomId) {
        return memberRepository.findByRoom_IdAndIsDeletedFalse(roomId);
    }
}