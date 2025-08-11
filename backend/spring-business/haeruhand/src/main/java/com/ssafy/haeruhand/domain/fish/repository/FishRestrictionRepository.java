package com.ssafy.haeruhand.domain.fish.repository;


import com.ssafy.haeruhand.domain.fish.entity.FishRestriction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface FishRestrictionRepository extends JpaRepository<FishRestriction, Long> {

    Optional<FishRestriction> findBySpeciesName(String speciesName);
}
