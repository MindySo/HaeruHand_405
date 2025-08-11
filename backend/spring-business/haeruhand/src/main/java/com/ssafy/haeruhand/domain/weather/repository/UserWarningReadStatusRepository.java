package com.ssafy.haeruhand.domain.weather.repository;

import com.ssafy.haeruhand.domain.weather.entity.UserWarningReadStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserWarningReadStatusRepository extends JpaRepository<UserWarningReadStatus, Long> {

    Optional<UserWarningReadStatus> findByUserId(Long userId);
}
