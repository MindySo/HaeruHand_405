package com.ssafy.haeruhand.domain.weather.client;

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
import java.util.Optional;

// https://apihub.kma.go.kr/api/typ01/url/wrn_now_data_new.php?fe=f&tm=&disp=0&help=1&authKey=afKKqC_WSJ2yiqgv1hid3w
@Slf4j
@Component
@RequiredArgsConstructor
public class WeatherWarningFetchClient {

    @Value("${kma.api.key}")
    private String serviceKey;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://apihub.kma.go.kr")
            .defaultHeaders(httpHeaders -> {
                httpHeaders.add(HttpHeaders.ACCEPT, MediaType.TEXT_PLAIN_VALUE);
                httpHeaders.add(HttpHeaders.USER_AGENT, "haeruhand/1.0");
            })
            .build();

    public String fetchRaw(String basis, String timestamp) {
        try {
            String basisParam = Optional.ofNullable(basis).filter(s -> !s.isBlank()).orElse("f");
            String timestampParam = Optional.ofNullable(timestamp).orElse("");

            String body = webClient.get()
                    .uri(uri -> uri.path("/api/typ01/url/wrn_now_data_new.php")
                            .queryParam("fe", basisParam)
                            .queryParam("tm", timestampParam)
                            .queryParam("disp", "0")
                            .queryParam("help", "0")
                            .queryParam("authKey", serviceKey)
                            .build())
                    .retrieve()
                    .bodyToMono(String.class)
                    .timeout(Duration.ofSeconds(30))
                    .retryWhen(Retry.backoff(2, Duration.ofMillis(300)))
                    .block();

            String trimmed = (body == null) ? null : body.trim();
            if (trimmed == null || trimmed.isBlank() || trimmed.startsWith("<")) {
                log.warn("KMA warning non-text response. basis={}, ts={}, snippet={}",
                        basisParam, timestampParam, trimmed == null ? "null" : trimmed.substring(0, Math.min(200, trimmed.length())));
                throw new GlobalException(ErrorStatus.WEATHER_BAD_RESPONSE);
            }

            if (!trimmed.contains("# REG_UP")) {
                log.warn("KMA warning unexpected format. basis={}, ts={}, snippet={}",
                        basisParam, timestampParam, trimmed.substring(0, Math.min(200, trimmed.length())));
                throw new GlobalException(ErrorStatus.WEATHER_BAD_RESPONSE);
            }
            return trimmed;
        } catch (GlobalException e) {
            throw e;
        } catch (Exception e) {
            log.error("KMA warning API failed", e);
            throw new GlobalException(ErrorStatus.WEATHER_BAD_RESPONSE);
        }
    }
}
