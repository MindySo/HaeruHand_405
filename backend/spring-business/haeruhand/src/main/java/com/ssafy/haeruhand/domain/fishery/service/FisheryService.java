package com.ssafy.haeruhand.domain.fishery.service;

import com.ssafy.haeruhand.domain.fishery.dto.FisheryResponse;
import com.ssafy.haeruhand.domain.fishery.entity.Fishery;
import com.ssafy.haeruhand.domain.fishery.repository.FisheryRepository;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FisheryService {

    private final FisheryRepository fisheryRepository;

    public List<FisheryResponse> getAllFisheries() {
        log.debug("모든 어장 조회 요청");

        List<Fishery> fisheries = fisheryRepository.findAllByIsDeletedFalse();

        log.info("어장 조회 완료 - 총 {}개", fisheries.size());

        return fisheries.stream()
                .map(this::mapToResponse)
                .toList();
    }

    public FisheryResponse getFisheryById(Long id) {
        log.debug("어장 ID {} 조회 요청", id);

        Fishery fishery = fisheryRepository.findByIdAndIsDeletedFalse(id)
                .orElseThrow(() -> {
                    log.warn("어장을 찾을 수 없음 - ID: {}", id);
                    return new GlobalException(ErrorStatus.NOT_FOUND);
                });

        log.info("어장 조회 완료 - ID: {}, Name: {}", fishery.getId(), fishery.getName());

        return mapToResponse(fishery);
    }

    private FisheryResponse mapToResponse(Fishery fishery) {
        return new FisheryResponse(
                fishery.getId(),
                fishery.getName(),
                fishery.getAddress(),
                fishery.getLatitude(),
                fishery.getLongitude(),
                fishery.getStationCode(),
                fishery.getRegionCode(),
                fishery.getAreaName()
        );
    }
}
