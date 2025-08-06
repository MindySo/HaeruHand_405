package com.ssafy.haeruhand.domain.notification.repository;

import com.ssafy.haeruhand.domain.notification.entity.UserFcmToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserFcmTokenRepository extends JpaRepository<UserFcmToken, Long> {

    @Query("SELECT t FROM UserFcmToken t WHERE t.userId = :userId AND t.isDeleted = false")
    List<UserFcmToken> findActiveTokensByUserId(Long userId);
    Optional<UserFcmToken> findByFcmTokenAndIsDeletedFalse(String fcmToken);
}