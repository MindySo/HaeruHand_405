package com.ssafy.haeruhand.domain.location.repository;

import com.ssafy.haeruhand.domain.location.entity.LocationShareMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocationShareMemberRepository extends JpaRepository<LocationShareMember, Long> {
    
    Optional<LocationShareMember> findByRoomIdAndUserIdAndIsDeletedFalse(Long roomId, Long userId);
    
    List<LocationShareMember> findByRoomIdAndIsDeletedFalse(Long roomId);
    
    int countByRoomIdAndIsDeletedFalse(Long roomId);
    
    boolean existsByRoomIdAndUserIdAndIsDeletedFalse(Long roomId, Long userId);
    
}