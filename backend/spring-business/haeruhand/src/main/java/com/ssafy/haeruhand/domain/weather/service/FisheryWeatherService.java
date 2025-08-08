package com.ssafy.haeruhand.domain.weather.service;

import com.ssafy.haeruhand.domain.weather.dto.FisheryWeatherResponse;
import com.ssafy.haeruhand.domain.weather.entity.FisheryWeather;
import com.ssafy.haeruhand.domain.weather.repository.FisheryWeatherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FisheryWeatherService {

    private final FisheryWeatherRepository fisheryWeatherRepository;

    public List<FisheryWeatherResponse> getFisheryWeatherByDate(LocalDate date) {
        LocalDate targetDate = date != null ? date : LocalDate.now();
        List<FisheryWeather> weathers = fisheryWeatherRepository.findByForecastDateOrderByForecastTimePeriod(targetDate);
        return weathers.stream()
                .map(FisheryWeatherResponse::from)
                .toList();
    }
}
