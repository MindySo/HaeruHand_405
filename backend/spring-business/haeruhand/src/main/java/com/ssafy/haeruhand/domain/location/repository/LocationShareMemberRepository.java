package com.ssafy.haeruhand.domain.location.repository;

import com.ssafy.haeruhand.domain.location.entity.LocationShareMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocationShareMemberRepository extends JpaRepository<LocationShareMember, Long> {
    
    Optional<LocationShareMember> findByRoom_IdAndUser_IdAndIsDeletedFalse(Long roomId, Long userId);
    
    List<LocationShareMember> findByRoom_IdAndIsDeletedFalse(Long roomId);
    
    int countByRoom_IdAndIsDeletedFalse(Long roomId);
    
    boolean existsByRoom_IdAndUser_IdAndIsDeletedFalse(Long roomId, Long userId);
    
}