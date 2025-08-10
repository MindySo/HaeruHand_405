package com.ssafy.haeruhand.domain.marine.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.util.retry.Retry;

import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Slf4j
@Component
@RequiredArgsConstructor
public class TideFetchClient {

    @Value("${khoa.api.key}")
    private String serviceKey;

    private final ObjectMapper mapper;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://www.khoa.go.kr/api/oceangrid")
            .defaultHeaders(httpHeaders -> {
                httpHeaders.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
                httpHeaders.add(HttpHeaders.USER_AGENT, "haeruhand/1.0");
            })
            .build();

    public JsonNode fetchRaw(String stationCode, LocalDate date) {
        String dateString = date.format(DateTimeFormatter.BASIC_ISO_DATE);

        String body = webClient.get()
                .uri(uri -> uri.path("/tideObsPreTab/search.do")
                        .queryParam("ServiceKey", serviceKey)
                        .queryParam("ObsCode", stationCode)
                        .queryParam("Date", dateString)
                        .queryParam("ResultType", "json")
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .timeout(Duration.ofSeconds(7))
                .retryWhen(Retry.backoff(2, Duration.ofMillis(400)))
                .block();

        String trimmed = (body == null) ? null : body.trim();
        if (trimmed == null || trimmed.isBlank() || trimmed.startsWith("<")) {
            log.warn("KHOA non-JSON response. obs={}, date={}, snippet={}",
                    stationCode, dateString, body == null ? "null" : trimmed.substring(0, Math.min(200, trimmed.length())));
            throw new GlobalException(ErrorStatus.KHOA_BAD_RESPONSE);
        }

        try {
            return mapper.readTree(trimmed);
        } catch (Exception e) {
            log.warn("KHOA JSON parse failed. obs={}, date={}, snippet={}",
                    stationCode, dateString, trimmed.substring(0, Math.min(200, trimmed.length())));
            throw new GlobalException(ErrorStatus.KHOA_BAD_RESPONSE);
        }
    }
}
