package com.ssafy.haeruhand.domain.location.service;

import com.ssafy.haeruhand.domain.location.entity.LocationShareMember;
import com.ssafy.haeruhand.domain.location.entity.LocationShareRoom;
import com.ssafy.haeruhand.domain.location.repository.LocationShareMemberRepository;
import com.ssafy.haeruhand.domain.location.repository.LocationShareRoomRepository;
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

    private static final String[] MEMBER_COLORS = {
        "#FF0000", // 빨강 (호스트)
        "#0084FF", // 파랑
        "#00C851", // 초록
        "#FF6900"  // 주황
    };

    public int getActiveMemberCount(Long roomId) {
        return memberRepository.countActiveMembers(roomId);
    }

    public boolean isMemberExists(Long roomId, Long userId) {
        return memberRepository.existsByRoomIdAndUserId(roomId, userId);
    }

    @Transactional
    public LocationShareMember upsertMember(Long roomId, Long userId) {
        // 기존 멤버인지 확인
        return memberRepository.findByRoomIdAndUserId(roomId, userId)
                .map(member -> {
                    // 기존 멤버면 last_active_at 업데이트
                    member.updateLastActiveAt();
                    return member;
                })
                .orElseGet(() -> {
                    // 새 멤버면 추가
                    LocationShareRoom room = roomRepository.findById(roomId)
                            .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 방입니다."));
                    
                    // 색상 할당 (현재 멤버 수에 따라)
                    int currentCount = memberRepository.countActiveMembers(roomId);
                    String color = MEMBER_COLORS[Math.min(currentCount, MEMBER_COLORS.length - 1)];
                    
                    LocationShareMember newMember = LocationShareMember.builder()
                            .room(room)
                            .userId(userId)
                            .isHost(false)
                            .color(color)
                            .lastActiveAt(LocalDateTime.now())
                            .build();
                    
                    return memberRepository.save(newMember);
                });
    }

    @Transactional
    public void removeMember(String roomCode, Long userId) {
        LocationShareRoom room = roomRepository.findByRoomCode(roomCode)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 방입니다."));
        
        memberRepository.deleteByRoomIdAndUserId(room.getId(), userId);
        log.info("Member removed. User: {}, Room: {}", userId, roomCode);
    }

    public List<LocationShareMember> getMembersByRoomId(Long roomId) {
        return memberRepository.findByRoomId(roomId);
    }
}