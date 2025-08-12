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
        WITH user_averages AS (
            SELECT 
                user_id,
                location_share_room_id,
                AVG(latitude) as avg_lat,
                AVG(longitude) as avg_lon,
                COUNT(*) as log_count,
                MIN(timestamp) as first_log,
                MAX(timestamp) as last_log
            FROM user_location_log
            WHERE timestamp > :since
            GROUP BY user_id, location_share_room_id
            HAVING COUNT(*) >= 150
                AND TIMESTAMPDIFF(MINUTE, MIN(timestamp), MAX(timestamp)) >= 25
        )
        SELECT DISTINCT ul.user_id, ul.location_share_room_id
        FROM user_location_log ul
        INNER JOIN location_share_room lsr 
            ON ul.location_share_room_id = lsr.location_share_room_id
        INNER JOIN user_averages ua
            ON ul.user_id = ua.user_id 
            AND ul.location_share_room_id = ua.location_share_room_id
        WHERE lsr.is_active = true
            AND ul.timestamp > :since
        GROUP BY ul.user_id, ul.location_share_room_id, ua.avg_lat, ua.avg_lon
        HAVING MAX(
            SQRT(POW(ul.latitude - ua.avg_lat, 2) + 
                 POW(ul.longitude - ua.avg_lon, 2))
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
        INNER JOIN (
            SELECT user_id, MAX(timestamp) as max_timestamp
            FROM user_location_log
            WHERE location_share_room_id = :roomId
            AND timestamp > DATE_SUB(NOW(), INTERVAL 5 MINUTE)
            GROUP BY user_id
        ) latest ON ul.user_id = latest.user_id 
            AND ul.timestamp = latest.max_timestamp
            AND ul.location_share_room_id = :roomId
        """, nativeQuery = true)
    List<Object[]> findLatestLocationsByRoom(@Param("roomId") Long roomId);
}