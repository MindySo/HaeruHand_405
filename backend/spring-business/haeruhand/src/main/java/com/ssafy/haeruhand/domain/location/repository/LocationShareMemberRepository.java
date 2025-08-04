package com.ssafy.haeruhand.domain.location.repository;

import com.ssafy.haeruhand.domain.location.entity.LocationShareMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocationShareMemberRepository extends JpaRepository<LocationShareMember, Long> {
    
    Optional<LocationShareMember> findByRoomIdAndUserId(Long roomId, Long userId);
    
    List<LocationShareMember> findByRoomId(Long roomId);
    
    @Query("SELECT COUNT(m) FROM LocationShareMember m WHERE m.room.id = :roomId")
    int countActiveMembers(@Param("roomId") Long roomId);
    
    boolean existsByRoomIdAndUserId(Long roomId, Long userId);
    
    void deleteByRoomIdAndUserId(Long roomId, Long userId);
}