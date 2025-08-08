package com.ssafy.haeruhand.domain.marine.service;

import com.ssafy.haeruhand.domain.marine.dto.TideResponse;
import com.ssafy.haeruhand.domain.marine.entity.Tide;
import com.ssafy.haeruhand.domain.marine.repository.TideRepository;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TideService {

    private final TideRepository tideRepository;

    public TideResponse getTideByDateAndStation(LocalDate date, String stationCode) {
        LocalDate targetDate = date != null ? date : LocalDate.now();
        Tide tide = tideRepository.findByObservationDateAndStationCode(targetDate, stationCode)
                .orElseThrow(() -> new GlobalException(ErrorStatus.TIDE_NOT_FOUND));
        return TideResponse.from(tide);
    }
}
