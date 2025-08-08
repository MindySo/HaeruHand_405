package com.ssafy.haeruhand.domain.weather.service;

import com.ssafy.haeruhand.domain.weather.dto.WeatherWarningResponse;
import com.ssafy.haeruhand.domain.weather.entity.WeatherWarning;
import com.ssafy.haeruhand.domain.weather.entity.WarningCommand;
import com.ssafy.haeruhand.domain.weather.entity.WarningType;
import com.ssafy.haeruhand.domain.weather.repository.WeatherWarningRepository;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WeatherWarningService {

    private final WeatherWarningRepository weatherWarningRepository;

    public Page<WeatherWarningResponse> getAllWeatherWarnings(Pageable pageable) {
        Page<WeatherWarning> warnings = weatherWarningRepository.findAllByOrderByAnnouncedAtDesc(pageable);
        return warnings.map(WeatherWarningResponse::from);
    }

    public Page<WeatherWarningResponse> getWeatherWarningsByRegion(String regionCode, Pageable pageable) {
        Page<WeatherWarning> warnings = weatherWarningRepository.findByRegionCodeOrderByAnnouncedAtDesc(regionCode, pageable);
        return warnings.map(WeatherWarningResponse::from);
    }
}
