package com.ssafy.haeruhand.domain.location.repository;

import com.ssafy.haeruhand.domain.location.entity.LocationShareRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface LocationShareRoomRepository extends JpaRepository<LocationShareRoom, Long> {
    
    Optional<LocationShareRoom> findByRoomCode(String roomCode);
    
    Optional<LocationShareRoom> findByRoomCodeAndIsActiveTrue(String roomCode);
    
    List<LocationShareRoom> findByIsActiveTrueAndExpiresAtBefore(LocalDateTime now);
    
    boolean existsByRoomCode(String roomCode);
}