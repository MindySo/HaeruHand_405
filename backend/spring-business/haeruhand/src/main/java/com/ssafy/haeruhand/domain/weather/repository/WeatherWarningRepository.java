package com.ssafy.haeruhand.domain.weather.repository;

import com.ssafy.haeruhand.domain.weather.entity.WeatherWarning;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WeatherWarningRepository extends JpaRepository<WeatherWarning, Long> {

    Page<WeatherWarning> findAllByOrderByAnnouncedAtDesc(Pageable pageable);

    Page<WeatherWarning> findByRegionCodeOrderByAnnouncedAtDesc(String regionCode, Pageable pageable);
}
