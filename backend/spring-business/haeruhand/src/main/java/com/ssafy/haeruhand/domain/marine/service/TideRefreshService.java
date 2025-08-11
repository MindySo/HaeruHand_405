package com.ssafy.haeruhand.domain.marine.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.ssafy.haeruhand.domain.fishery.repository.FisheryRepository;
import com.ssafy.haeruhand.domain.marine.client.TideFetchClient;
import com.ssafy.haeruhand.domain.marine.dto.TideUpsertResultResponse;
import com.ssafy.haeruhand.domain.marine.entity.Tide;
import com.ssafy.haeruhand.domain.marine.repository.TideRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class TideRefreshService {

    private final TideRepository tideRepository;
    private final FisheryRepository fisheryRepository;
    private final TransactionTemplate transactionTemplate;
    private final TideFetchClient tideFetchClient;

    public TideUpsertResultResponse refresh(Optional<LocalDate> date, Optional<String> stationCode) {
        LocalDate targetDate = resolveTargetDate(date);
        List<String> stations = resolveStations(stationCode);

        int success = 0;
        int fail = 0;

        for (String station : stations) {
            boolean ok = processOneStation(targetDate, station);
            if (ok) {
                success++;
                continue;
            }
            fail++;
        }

        return new TideUpsertResultResponse(targetDate, stations.size(), success, fail);
    }

    private LocalDate resolveTargetDate(Optional<LocalDate> date) {
        return date.orElse(LocalDate.now());
    }

    private List<String> resolveStations(Optional<String> stationCode) {
        return stationCode
                .map(String::trim)
                .filter(s -> !s.isEmpty())
                .map(List::of)
                .orElseGet(fisheryRepository::findDistinctStationCodes);
    }

    private boolean processOneStation(LocalDate date, String stationCode) {
        try {
            JsonNode root = tideFetchClient.fetchRaw(stationCode, date);
            TideTimes times = extractTimes(root);
            upsertTransactional(date, stationCode, times);
            return true;
        } catch (Exception e) {
            log.warn("Tide refresh failed. date={}, station={}", date, stationCode, e);
            return false;
        }
    }

    private void upsertTransactional(LocalDate date, String stationCode, TideTimes tideTimes) {
        transactionTemplate.executeWithoutResult(tx -> {
            Tide tide = tideRepository.findByObservationDateAndStationCode(date, stationCode)
                    .orElseGet(() -> Tide.builder()
                            .stationCode(stationCode)
                            .observationDate(date)
                            .build());
            tide.apply(
                    tideTimes.firstHighTideTime,
                    tideTimes.firstLowTideTime,
                    tideTimes.secondHighTideTime,
                    tideTimes.secondLowTideTime
            );

            tideRepository.save(tide);
        });
    }

    private TideTimes extractTimes(JsonNode root) {
        if (root == null || root.get("result") == null) {
            return TideTimes.empty();
        }

        JsonNode data = root.get("result").get("data");
        if (data == null || !data.isArray()) {
            return TideTimes.empty();
        }

        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        List<LocalTime> highs = new ArrayList<>();
        List<LocalTime> lows = new ArrayList<>();

        List<RawPoint> points = new ArrayList<>();
        for (JsonNode node : data) {
            String code = text(node, "hl_code");
            String time = text(node, "tph_time");
            if (code == null || time == null) {
                continue;
            }

            LocalDateTime localDateTime = LocalDateTime.parse(time, timeFormatter);
            points.add(new RawPoint(localDateTime, code));
        }

        points.sort(Comparator.comparing(RawPoint::time));

        for (RawPoint point : points) {
            if ("고조".equals(point.code)) {
                highs.add(point.time.toLocalTime());
            } else if ("저조".equals(point.code)) {
                lows.add(point.time.toLocalTime());
            }
        }

        LocalTime firstHighTideTime = !highs.isEmpty() ? highs.get(0) : null;
        LocalTime secondHighTideTime = highs.size() > 1 ? highs.get(1) : null;
        LocalTime firstLowTideTime = !lows.isEmpty() ? lows.get(0) : null;
        LocalTime secondLowTideTime = lows.size() > 1 ? lows.get(1) : null;

        return new TideTimes(firstHighTideTime, firstLowTideTime, secondHighTideTime, secondLowTideTime);
    }

    private String text(JsonNode node, String field) {
        JsonNode value = node.get(field);
        return (value == null || value.isNull()) ? null : value.asText();
    }

    private record RawPoint(LocalDateTime time, String code) {
    }

    private record TideTimes(LocalTime firstHighTideTime, LocalTime firstLowTideTime, LocalTime secondHighTideTime,
                             LocalTime secondLowTideTime) {
        static TideTimes empty() {
            return new TideTimes(null, null, null, null);
        }
    }
}
