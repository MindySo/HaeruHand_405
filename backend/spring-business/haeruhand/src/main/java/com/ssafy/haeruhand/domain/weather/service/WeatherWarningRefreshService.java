package com.ssafy.haeruhand.domain.weather.service;

import com.ssafy.haeruhand.domain.weather.client.WeatherWarningFetchClient;
import com.ssafy.haeruhand.domain.weather.dto.WeatherWarningUpsertResultResponse;
import com.ssafy.haeruhand.domain.weather.entity.RegionSeaArea;
import com.ssafy.haeruhand.domain.weather.entity.WarningType;
import com.ssafy.haeruhand.domain.weather.repository.WeatherWarningRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class WeatherWarningRefreshService {

    private final WeatherWarningFetchClient fetchClient;
    private final WeatherWarningRepository warningRepository;

    private static final Set<String> JEJU_SEA_REGION_CODES =
            Arrays.stream(RegionSeaArea.values())
                    .map(RegionSeaArea::code)
                    .collect(Collectors.toUnmodifiableSet());

    private static final DateTimeFormatter KST_DATETIME_FORMATTER = DateTimeFormatter.ofPattern("yyyyMMddHHmm");

    public WeatherWarningUpsertResultResponse refresh(Optional<String> basicOpt, Optional<String> timestampOpt) {
        String basic = basicOpt.filter(s -> !s.isBlank()).orElse("f");
        String timestamp = timestampOpt.orElse("");
        LocalDateTime baseline = timestamp.isBlank() ? LocalDateTime.now() : parseKstTimestampOrNull(timestamp);

        String responseBody = fetchClient.fetchRaw(basic, timestamp);
        List<WarningRow> parsedRows = parseResponse(responseBody);

        int requested = 0, success = 0, fail = 0;

        for (WarningRow row : parsedRows) {
            if (!JEJU_SEA_REGION_CODES.contains(row.regionCode())) {
                continue;
            }

            requested++;
            try {
            }
        }


        for (ParsedRow row : rows) {
            if (!TARGET_REGIONS.contains(row.regId)) {
                continue;
            }


        }
    }

    private LocalDateTime parseKstTimestampOrNull(String timestamp) {
        if (timestamp == null || timestamp.isBlank()) {
            return null;
        }
        try {
            return parseKstTimestamp(timestamp);
        } catch (Exception ignored) {
            return null;
        }
    }

    private LocalDateTime parseKstTimestamp(String timestamp) {
        return LocalDateTime.parse(timestamp, KST_DATETIME_FORMATTER);
    }

    private List<WarningRow> parseResponse(String responseBody) {
        List<WarningRow> rows = new ArrayList<>();
        String[] lines = responseBody.split("\\R");

    }

    private record WarningRow(
            String regionCode,
            String announcedAt,
            String effectiveAt,
            String expectedEndAt,
            String warningTypeLabel,
            String warningLevelLabel,
            String warningCommandLabel
    ) {}
}
