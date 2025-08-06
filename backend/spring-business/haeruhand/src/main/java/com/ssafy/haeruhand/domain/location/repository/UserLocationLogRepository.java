package com.ssafy.haeruhand.domain.location.repository;

import com.ssafy.haeruhand.domain.location.entity.UserLocationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserLocationLogRepository extends JpaRepository<UserLocationLog, Long> {
    
    List<UserLocationLog> findByRoomIdAndTimestampAfter(Long roomId, LocalDateTime after);
    
    List<UserLocationLog> findByUserIdAndTimestampBetween(Long userId, LocalDateTime start, LocalDateTime end);
}