package com.ssafy.haeruhand.domain.weather.service;

import com.ssafy.haeruhand.domain.weather.client.WeatherWarningFetchClient;
import com.ssafy.haeruhand.domain.weather.dto.WeatherWarningUpsertResultResponse;
import com.ssafy.haeruhand.domain.weather.entity.*;
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

    public WeatherWarningUpsertResultResponse refresh(Optional<String> basisOpt, Optional<String> timestampOpt) {
        String basis = basisOpt.filter(s -> !s.isBlank()).orElse("f");
        String timestamp = timestampOpt.orElse("");
        LocalDateTime baseline = timestamp.isBlank() ? LocalDateTime.now() : parseKstTimestampOrNull(timestamp);

        String responseBody = fetchClient.fetchRaw(basis, timestamp);
        List<WarningRow> parsedRows = parseResponse(responseBody);

        int requested = 0, success = 0, fail = 0;

        for (WarningRow row : parsedRows) {
            if (!JEJU_SEA_REGION_CODES.contains(row.regionCode())) {
                continue;
            }

            Optional<WarningType> warningType = WarningType.fromLabel(row.warningTypeLabel());
            Optional<WarningLevel> warningLevel =
                    Optional.ofNullable(row.warningLevelLabel())
                            .filter(s -> !s.isBlank())
                            .flatMap(WarningLevel::fromLabel);
            Optional<WarningCommand> warningCommand = WarningCommand.fromLabel(row.warningCommandLabel());
            LocalDateTime announcedAt = parseKstTimestampOrNull(row.announcedAtText());
            LocalDateTime effectiveAt = parseKstTimestampOrNull(row.effectiveAtText());
            LocalDateTime expectedEndAt = parseKstTimestampOrNull(row.expectedEndAtText());

            if (warningType.isEmpty() || warningCommand.isEmpty() || announcedAt == null) {
                continue;
            }

            requested++;
            try {
                upsertWarning(
                        row.regionCode(),
                        warningType.get(),
                        warningLevel.orElse(null),
                        warningCommand.get(),
                        announcedAt,
                        effectiveAt,
                        expectedEndAt
                );
                success++;
            } catch (Exception ex) {
                log.warn("WeatherWarning upsert failed. regionCode={}, announcedAt={}, type={}, command={}",
                        row.regionCode(), announcedAt, warningType.orElse(null), warningCommand.orElse(null), ex);
                fail++;
            }
        }

        return new WeatherWarningUpsertResultResponse(baseline, requested, success, fail);
    }

    private void upsertWarning(String regionCode,
                               WarningType warningType,
                               WarningLevel warningLevel,
                               WarningCommand warningCommand,
                               LocalDateTime announcedAt,
                               LocalDateTime effectiveAt,
                               LocalDateTime expectedEndAt) {
        WeatherWarning existing = warningRepository
                .findTopByRegionCodeAndAnnouncedAtAndWarningTypeAndWarningCommandOrderByIdDesc(
                        regionCode, announcedAt, warningType, warningCommand)
                .orElse(null);

        WeatherWarning toSave = WeatherWarning.builder()
                .id(existing == null ? null : existing.getId())
                .regionCode(regionCode)
                .warningType(warningType)
                .warningLevel(warningLevel)
                .warningCommand(warningCommand)
                .announcedAt(announcedAt)
                .effectiveAt(effectiveAt)
                .expectedEndAt(expectedEndAt)
                .build();

        warningRepository.save(toSave);
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
        boolean inDataSection = false;

        for (String line : lines) {
            String trimmed = line.trim();

            if (trimmed.startsWith("# REG_UP")) {
                inDataSection = true;
                continue;
            }
            if (!inDataSection) {
                continue;
            }
            if (trimmed.isBlank() || trimmed.startsWith("#")) {
                continue;
            }

            if (!trimmed.startsWith("S")) {
                continue;
            }

            if (trimmed.endsWith(",=")) {
                trimmed = trimmed.substring(0, trimmed.length() - 2);
            }

            String[] columns = trimmed.split("\\s*,\\s*", -1);
            if (columns.length < 10) {
                continue;
            }

            WarningRow row = new WarningRow(
                    nonNullTrim(columns[2]), // regionCode
                    nonNullTrim(columns[4]), // announcedAtText
                    nonNullTrim(columns[5]), // effectiveAtText
                    nonNullTrim(columns[9]), // expectedEndAtText
                    nonNullTrim(columns[6]), // warningTypeLabel
                    nonNullTrim(columns[7]), // warningLevelLabel
                    nonNullTrim(columns[8]) // commandLabel
            );
            rows.add(row);
        }

        return rows;
    }

    private String nonNullTrim(String value) {
        return value == null ? "" : value.trim();
    }

    private record WarningRow(
            String regionCode,
            String announcedAtText,
            String effectiveAtText,
            String expectedEndAtText,
            String warningTypeLabel,
            String warningLevelLabel,
            String warningCommandLabel
    ) {}
}
