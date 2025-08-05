package com.ssafy.haeruhand.domain.notification.repository;

import com.ssafy.haeruhand.domain.notification.entity.UserFcmToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFcmTokenRepository extends JpaRepository<UserFcmToken, Long> {

}