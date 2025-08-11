package com.ssafy.haeruhand.domain.location.repository;

import com.ssafy.haeruhand.domain.location.entity.UserLocationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserLocationLogRepository extends JpaRepository<UserLocationLog, Long> {
    /**
     * GPS 정체 사용자 조회
     * 지정된 시간 이후 특정 반경 내에서만 움직인 사용자 찾기
     * @param since 확인 시작 시간
     * @param radiusMeters 정체 판단 반경 (미터)
     * @return [userId, roomId] 배열 리스트
     */
    @Query(value = """
        SELECT DISTINCT ul.user_id, ul.location_share_room_id
        FROM user_location_log ul
        INNER JOIN location_share_room lsr 
            ON ul.location_share_room_id = lsr.location_share_room_id
        WHERE lsr.is_active = true
        AND ul.timestamp > :since
        GROUP BY ul.user_id, ul.location_share_room_id
        HAVING COUNT(DISTINCT ul.user_location_log_id) >= 3
        AND MAX(
            SQRT(
                POW(ul.latitude - (
                    SELECT AVG(ul2.latitude) 
                    FROM user_location_log ul2 
                    WHERE ul2.user_id = ul.user_id 
                    AND ul2.location_share_room_id = ul.location_share_room_id
                    AND ul2.timestamp > :since
                ), 2) +
                POW(ul.longitude - (
                    SELECT AVG(ul2.longitude) 
                    FROM user_location_log ul2 
                    WHERE ul2.user_id = ul.user_id 
                    AND ul2.location_share_room_id = ul.location_share_room_id
                    AND ul2.timestamp > :since
                ), 2)
            )
        ) * 111000 < :radiusMeters
        """, nativeQuery = true)
    List<Object[]> findStationaryUsers(
        @Param("since") LocalDateTime since,
        @Param("radiusMeters") double radiusMeters
    );
    
    /**
     * 룸의 모든 사용자 최신 위치 조회
     * 5분 이내 위치만 유효한 것으로 판단
     * @param roomId 룸 ID
     * @return [userId, latitude, longitude, timestamp] 배열 리스트
     */
    @Query(value = """
        SELECT ul.user_id, ul.latitude, ul.longitude, ul.timestamp
        FROM user_location_log ul
        WHERE ul.location_share_room_id = :roomId
        AND ul.timestamp = (
            SELECT MAX(ul2.timestamp)
            FROM user_location_log ul2
            WHERE ul2.user_id = ul.user_id
            AND ul2.location_share_room_id = :roomId
            AND ul2.timestamp > DATE_SUB(NOW(), INTERVAL 5 MINUTE)
        )
        """, nativeQuery = true)
    List<Object[]> findLatestLocationsByRoom(@Param("roomId") Long roomId);
}