package com.ssafy.haeruhand.domain.marine.client;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.util.retry.Retry;

import java.time.Duration;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
@RequiredArgsConstructor
public class TideFetchClient {

    @Value("${khoa.api.key}")
    private String serviceKey;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("http://www.khoa.go.kr/api/oceangrid")
            .defaultHeaders(httpHeaders -> httpHeaders.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE))
            .build();

    public JsonNode fetchRaw(String stationCode, LocalDate date) {
        String dateString = date.format(DateTimeFormatter.BASIC_ISO_DATE);
        return webClient.get()
                .uri(uri -> uri.path("/tideObsPreTab/search.do")
                        .queryParam("ServiceKey", serviceKey)
                        .queryParam("ObsCode", stationCode)
                        .queryParam("Date", dateString)
                        .queryParam("ResultType", "json")
                        .build())
                .retrieve()
                .bodyToMono(JsonNode.class)
                .timeout(Duration.ofSeconds(5))
                .retryWhen(Retry.backoff(2, Duration.ofMillis(300)))
                .block();
    }
}
