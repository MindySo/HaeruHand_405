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

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;

@Slf4j
@Component
@RequiredArgsConstructor
public class FisheryWeatherFetchClient {

    @Value("${seatrip.api.key}")
    private String serviceKey;

    private final ObjectMapper mapper;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://apis.data.go.kr")
            .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
            .defaultHeader(HttpHeaders.USER_AGENT, "haeruhand/1.0")
            .build();

    public JsonNode fetchRaw(int numOfRows) {
        final boolean alreadyEncoded = serviceKey != null && serviceKey.contains("%");
        final String encodedKey = alreadyEncoded
                ? serviceKey
                : URLEncoder.encode(serviceKey, StandardCharsets.UTF_8);

        String fullUrl = "https://apis.data.go.kr/1192136/fcstSeaTrip/GetFcstSeaTripApiService"
                + "?type=json"
                + "&numOfRows=" + numOfRows
                + "&serviceKey=" + encodedKey;

        try {
            log.info("Fetching weather data: {}", maskKeyInUrl(fullUrl));

            String response = webClient.get()
                    .uri(URI.create(fullUrl))
                    .retrieve()
                    .bodyToMono(String.class)
                    .timeout(Duration.ofSeconds(15))
                    .retryWhen(Retry.backoff(2, Duration.ofMillis(800)))
                    .block();

            if (response != null) {
                log.info("Raw response snippet: {}", response.substring(0, Math.min(200, response.length())));
            }

            validateResponse(response);
            return parseJson(response);

        } catch (Exception e) {
            log.error("Weather API call failed", e);
            throw new GlobalException(ErrorStatus.WEATHER_BAD_RESPONSE);
        }
    }

    private void validateResponse(String response) {
        String trimmed = (response == null) ? null : response.trim();
        if (trimmed == null || trimmed.isEmpty()) {
            log.warn("Empty response from API");
            throw new GlobalException(ErrorStatus.WEATHER_BAD_RESPONSE);
        }

        if (trimmed.startsWith("<")) {
            log.warn("SeaTrip returned XML response (likely auth/error). snippet={}",
                    trimmed.substring(0, Math.min(200, trimmed.length())));
            throw new GlobalException(ErrorStatus.WEATHER_BAD_RESPONSE);
        }
    }

    private JsonNode parseJson(String response) {
        try {
            return mapper.readTree(response);
        } catch (Exception e) {
            log.error("JSON parse failed. snippet={}",
                    response.substring(0, Math.min(200, response.length())), e);
            throw new GlobalException(ErrorStatus.WEATHER_BAD_RESPONSE);
        }
    }

    private String maskKeyInUrl(String url) {
        int idx = url.indexOf("serviceKey=");
        if (idx < 0) return url;
        int end = url.indexOf('&', idx);
        String key = (end > 0) ? url.substring(idx + 11, end) : url.substring(idx + 11);
        if (key.length() <= 8) return url.replace(key, "****");
        String masked = key.substring(0, 4) + "****" + key.substring(key.length() - 4);
        return url.replace(key, masked);
    }
}
