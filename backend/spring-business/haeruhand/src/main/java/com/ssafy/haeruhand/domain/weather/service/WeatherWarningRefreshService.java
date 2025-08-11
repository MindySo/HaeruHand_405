package com.ssafy.haeruhand.domain.weather.service;

import com.ssafy.haeruhand.domain.weather.client.WeatherWarningFetchClient;
import com.ssafy.haeruhand.domain.weather.repository.WeatherWarningRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class WeatherWarningRefreshService {

    // 제주도동부 "L1090800"
    // 제주도서부 "L1090600"
    // 제주도남부 "L1090900"
    // 제주도북부 "L1090700"
    // 제주도동부앞바다 "S1323200"
    // 제주도서부앞바다 "S1323400"
    // 제주도남부앞바다 "S1323300"
    // 제주도북부앞바다 "S1323100"

    private final WeatherWarningFetchClient weatherWarningFetchClient;
    private final WeatherWarningRepository weatherWarningRepository;

    private static final Set<String> TARGET_REGIONS = Set.of(

    );
}
