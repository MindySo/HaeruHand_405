package com.ssafy.haeruhand.domain.weather.client;

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

// https://apis.data.go.kr/1192136/fcstSeaTrip/GetFcstSeaTripApiService?serviceKey=YOf%2F%2BKFSvq%2BDw4VQ2BErbKaJ8Bt0aUejrReWXnxsNJ5XmiWrR%2B2J6fSdsY3%2Bly52C5flIIpn%2FNryvBewtlmAhQ%3D%3D&type=json&numOfRows=300
@Slf4j
@Component
@RequiredArgsConstructor
public class FisheryWeatherFetchClient {

    @Value("${seatrip.api.key}")
    private String serviceKey;

    private final ObjectMapper mapper;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://apis.data.go.kr/1192136/fcstSeaTrip")
            .defaultHeaders(httpHeaders -> {
                httpHeaders.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
                httpHeaders.add(HttpHeaders.USER_AGENT, "haeruhand/1.0");
            })
            .build();

    public JsonNode fetchRaw(int numOfRows) {
        String body = webClient.get()
                .uri(uri -> uri.path("/GetFcstSeaTripApiService")
                        .queryParam("serviceKey", serviceKey)
                        .queryParam("type", "json")
                        .queryParam("numOfRows", numOfRows)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .timeout(Duration.ofSeconds(7))
                .retryWhen(Retry.backoff(2, Duration.ofMillis(400)))
                .block();

        String trimmed = (body == null) ? null : body.trim();
        if (trimmed == null || trimmed.isBlank() || trimmed.startsWith("<")) {
            log.warn("SeaTrip non-JSON response. snippet={}",
                    body == null ? "null" : trimmed.substring(0, Math.min(200, trimmed.length())));
            throw new GlobalException(ErrorStatus.WEATHER_BAD_RESPONSE);
        }

        try {
            return mapper.readTree(trimmed);
        } catch (Exception e) {
            log.warn("SeaTrip JSON parse failed. snippet={}",
                    trimmed.substring(0, Math.min(200, trimmed.length())));
            throw new GlobalException(ErrorStatus.FAST_API_ERROR);
        }
    }
}
