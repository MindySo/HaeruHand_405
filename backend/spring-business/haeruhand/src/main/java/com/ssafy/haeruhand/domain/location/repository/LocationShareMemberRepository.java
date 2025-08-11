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
    
    Optional<LocationShareMember> findByRoom_IdAndUser_IdAndIsDeletedFalse(Long roomId, Long userId);
    
    List<LocationShareMember> findByRoom_IdAndIsDeletedFalse(Long roomId);
    
    int countByRoom_IdAndIsDeletedFalse(Long roomId);
    
    boolean existsByRoom_IdAndUser_IdAndIsDeletedFalse(Long roomId, Long userId);
    
    @Query("""
        SELECT m.user.id
        FROM LocationShareMember m
        WHERE m.room.id = :roomId
        AND m.user.id != :excludeUserId
        AND m.isDeleted = false
        AND m.room.isActive = true
        """)
    List<Long> findOtherMemberUserIds(
        @Param("roomId") Long roomId,
        @Param("excludeUserId") Long excludeUserId
    );
    
    @Query("""
        SELECT m
        FROM LocationShareMember m
        JOIN FETCH m.user
        WHERE m.room.id = :roomId
        AND m.isDeleted = false
        AND m.room.isActive = true
        """)
    List<LocationShareMember> findByRoomIdAndActiveRoom(@Param("roomId") Long roomId);
}