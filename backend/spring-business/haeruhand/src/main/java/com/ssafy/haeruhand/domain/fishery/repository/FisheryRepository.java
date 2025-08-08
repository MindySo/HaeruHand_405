package com.ssafy.haeruhand.domain.fishery.repository;

import com.ssafy.haeruhand.domain.fishery.entity.Fishery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FisheryRepository extends JpaRepository<Fishery, Long> {

    List<Fishery> findAllByIsDeletedFalse();

    Optional<Fishery> findByIdAndIsDeletedFalse(Long id);
}
