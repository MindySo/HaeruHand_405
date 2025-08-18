package com.ssafy.haeruhand.domain.marine.repository;

import com.ssafy.haeruhand.domain.marine.entity.Tide;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface TideRepository extends JpaRepository<Tide, Long> {

    Optional<Tide> findByObservationDateAndStationCode(LocalDate observationDate, String stationCode);
}
