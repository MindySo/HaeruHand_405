package com.ssafy.haeruhand.domain.weather.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.ssafy.haeruhand.domain.fishery.repository.FisheryRepository;
import com.ssafy.haeruhand.domain.weather.client.FisheryWeatherFetchClient;
import com.ssafy.haeruhand.domain.weather.dto.FisheryWeatherUpsertResultResponse;
import com.ssafy.haeruhand.domain.weather.entity.FisheryWeather;
import com.ssafy.haeruhand.domain.weather.entity.ForecastTimePeriod;
import com.ssafy.haeruhand.domain.weather.repository.FisheryWeatherRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class FisheryWeatherRefreshService {

    private final FisheryWeatherRepository fisheryWeatherRepository;
    private final FisheryRepository fisheryRepository;
    private final TransactionTemplate transactionTemplate;
    private final FisheryWeatherFetchClient fisheryWeatherFetchClient;

    public FisheryWeatherUpsertResultResponse refresh(Optional<LocalDate> date, Optional<String> areaName, int numOfRows) {
        LocalDate targetDate = resolveTargetDate(date);
        List<String> areas = resolveAreas(areaName);

        int success = 0;
        int fail = 0;
        int requested = 0;

        JsonNode items = fetchItemsOrNull(numOfRows);
        if (items == null || !items.isArray() || !items.elements().hasNext()) {
            log.warn("fetch items is null or empty");
            return new FisheryWeatherUpsertResultResponse(targetDate, 0, 0, 0);
        }

        for (String area : areas) {
            try {
                for (JsonNode item : items) {
                    String itemArea = text(item, "sareaDtlNm");
                    if (!area.equals(itemArea)) {
                        continue;
                    }

                    LocalDate itemDate = parseDate(text(item, "predcYmd"));
                    if (itemDate == null || !itemDate.equals(targetDate)) {
                        continue;
                    }

                    ForecastTimePeriod period = ForecastTimePeriod.fromLabel((text(item, "predcNoonSeCd"))).orElse(null);
                    if (period == null) {
                        continue;
                    }

                    BigDecimal air = dec(item, "avgArtmp");
                    BigDecimal water = dec(item, "avgWtem");
                    BigDecimal wave = dec(item, "avgWvhgt");
                    BigDecimal wind = dec(item, "avgWspd");
                    String weather = text(item, "weather");
                    String index = text(item, "totalIndex");

                    requested++;
                    upsertTransactional(area, itemDate, period, air, water, wave, wind, weather, index);
                    success++;
                }
            } catch (Exception e) {
                log.warn("FisheryWeather refresh failed. date={}, area={}", targetDate, area, e);
                fail++;
            }
        }

        return new FisheryWeatherUpsertResultResponse(targetDate, requested, success, fail);
    }

    private LocalDate resolveTargetDate(Optional<LocalDate> date) {
        return date.orElse(LocalDate.now());
    }

    private List<String> resolveAreas(Optional<String> areaName) {
        return areaName
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(List::of)
                .orElseGet(fisheryRepository::findDistinctAreaNames);
    }

    private JsonNode fetchItemsOrNull(int numOfRows) {
        try {
            JsonNode root = fisheryWeatherFetchClient.fetchRaw(numOfRows);
            return root.path("response").path("body").path("items").path("item");
        } catch (Exception e) {
            log.warn("fishery weather fetch failed.", e);
            return null;
        }
    }

    private void upsertTransactional(String area,
                                     LocalDate date,
                                     ForecastTimePeriod period,
                                     BigDecimal air,
                                     BigDecimal water,
                                     BigDecimal wave,
                                     BigDecimal wind,
                                     String weather,
                                     String index) {
        transactionTemplate.executeWithoutResult(tx -> {
            FisheryWeather fisheryWeather = fisheryWeatherRepository
                    .findByAreaNameAndForecastDateAndForecastTimePeriod(area, date, period)
                    .orElseGet(() -> FisheryWeather.builder()
                            .areaName(area)
                            .forecastDate(date)
                            .forecastTimePeriod(period)
                            .build());
            fisheryWeather.apply(air, water, wave, wind, weather, index);
            fisheryWeatherRepository.save(fisheryWeather);
        });
    }

    private static String text(JsonNode node, String field) {
        JsonNode value = node.get(field);
        return (value == null || value.isNull()) ? null : value.asText();
    }

    private static BigDecimal dec(JsonNode node, String field) {
        String string = text(node, field);
        if (string == null || string.isBlank()) {
            return null;
        }
        try {
            return new BigDecimal(string);
        } catch (Exception e) {
            return null;
        }
    }

    private static LocalDate parseDate(String date) {
        if (date == null || date.isBlank()) {
            return null;
        }
        try {
            if (date.length() == 10) {
                return LocalDate.parse(date);
            }
            if (date.length() == 8) {
                return LocalDate.parse(date, DateTimeFormatter.BASIC_ISO_DATE);
            }
        } catch (Exception ignored) {}
        return null;
    }
}
