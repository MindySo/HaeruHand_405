package com.ssafy.haeruhand.domain.location.repository;

import com.ssafy.haeruhand.domain.location.entity.LocationShareMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocationShareMemberRepository extends JpaRepository<LocationShareMember, Long> {
    
    Optional<LocationShareMember> findByRoomIdAndUserIdAndIsDeletedFalse(Long roomId, Long userId);
    
    List<LocationShareMember> findByRoomIdAndIsDeletedFalse(Long roomId);
    
    @Query("SELECT COUNT(m) FROM LocationShareMember m WHERE m.room.id = :roomId AND m.isDeleted = false")
    int countActiveMembers(@Param("roomId") Long roomId);
    
    boolean existsByRoomIdAndUserIdAndIsDeletedFalse(Long roomId, Long userId);
    
    @Query("UPDATE LocationShareMember m SET m.isDeleted = true WHERE m.room.id = :roomId AND m.userId = :userId")
    @Modifying
    void softDeleteByRoomIdAndUserId(@Param("roomId") Long roomId, @Param("userId") Long userId);
}