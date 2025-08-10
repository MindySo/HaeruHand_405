package com.ssafy.haeruhand.domain.weather.repository;

import com.ssafy.haeruhand.domain.weather.entity.FisheryWeather;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface FisheryWeatherRepository extends JpaRepository<FisheryWeather, Long> {

    List<FisheryWeather> findByAreaNameAndForecastDateOrderByForecastTimePeriod(String areaName, LocalDate forecastDate);
}
