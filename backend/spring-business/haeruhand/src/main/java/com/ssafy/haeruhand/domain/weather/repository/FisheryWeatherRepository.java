package com.ssafy.haeruhand.domain.weather.repository;

import com.ssafy.haeruhand.domain.weather.entity.FisheryWeather;
import com.ssafy.haeruhand.domain.weather.entity.ForecastTimePeriod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface FisheryWeatherRepository extends JpaRepository<FisheryWeather, Long> {

    List<FisheryWeather> findByAreaNameAndForecastDateOrderByForecastTimePeriod(String areaName, LocalDate forecastDate);

    Optional<FisheryWeather> findByAreaNameAndForecastDateAndForecastTimePeriod(
            String areaName, LocalDate forecastDate, ForecastTimePeriod forecastTimePeriod
    );
}
