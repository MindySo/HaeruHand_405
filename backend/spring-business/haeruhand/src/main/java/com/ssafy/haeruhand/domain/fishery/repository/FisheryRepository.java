package com.ssafy.haeruhand.domain.fishery.repository;

import com.ssafy.haeruhand.domain.fishery.entity.Fishery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FisheryRepository extends JpaRepository<Fishery, Long> {

    List<Fishery> findAllByIsDeletedFalse();

    Optional<Fishery> findByIdAndIsDeletedFalse(Long id);

    @Query("select distinct f.stationCode from Fishery f where f.stationCode is not null")
    List<String> findDistinctStationCodes();
}
