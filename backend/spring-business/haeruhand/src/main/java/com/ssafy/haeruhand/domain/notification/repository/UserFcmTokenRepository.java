package com.ssafy.haeruhand.domain.notification.repository;

import com.ssafy.haeruhand.domain.notification.entity.UserFcmToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserFcmTokenRepository extends JpaRepository<UserFcmToken, Long> {

    List<UserFcmToken> findActiveTokensByUserId(Long userId);

    Optional<UserFcmToken> findByFcmTokenAndIsDeletedFalse(String fcmToken);
}