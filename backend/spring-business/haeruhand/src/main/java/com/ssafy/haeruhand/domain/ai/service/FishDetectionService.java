package com.ssafy.haeruhand.domain.ai.service;

import com.ssafy.haeruhand.domain.ai.dto.FishDetectionFastApiRequest;
import com.ssafy.haeruhand.domain.ai.dto.FishDetectionFastApiResponse;
import com.ssafy.haeruhand.domain.ai.dto.FishDetectionRequest;
import com.ssafy.haeruhand.domain.ai.dto.FishDetectionResponse;
import com.ssafy.haeruhand.domain.fish.dto.FishDetailResponse;
import com.ssafy.haeruhand.domain.fish.entity.FishRestriction;
import com.ssafy.haeruhand.domain.fish.repository.FishRestrictionRepository;
import com.ssafy.haeruhand.global.config.WebClientConfig;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.infra.gcs.service.SignedUrlService;
import com.ssafy.haeruhand.global.infra.gcs.util.GcsUtil;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.reactor.circuitbreaker.operator.CircuitBreakerOperator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Scheduler;
import reactor.core.scheduler.Schedulers;

import java.time.Duration;
import java.util.Optional;
import java.util.concurrent.TimeoutException;

@Slf4j
@Service
@RequiredArgsConstructor
public class FishDetectionService {
    private final GcsUtil gcsUtil;
    private final SignedUrlService signedUrlService;
    private final WebClient webClient;
    private final FishRestrictionRepository fishRestrictionRepository;

    @Qualifier("fastapiAiCircuitBreaker")
    private final CircuitBreaker fastapiAiCircuitBreaker;
    public Mono<FishDetectionResponse> detectFish(FishDetectionRequest request) {

        return Mono.fromCallable(()->{
                    String objectKey = gcsUtil.extractObjectKey(request.getImageUrl());
                    String extension = gcsUtil.extractExtension(objectKey);
                    String signedUrl = signedUrlService.createSignedGetUrl(objectKey);
                    return FishDetectionFastApiRequest.builder()
                            .imageUrl(signedUrl)
                            .mimeType(extension)
                            .build();
                })
                .subscribeOn(Schedulers.boundedElastic())
                .onErrorMap(throwable -> {
                    log.error("GCS URL 처리 중 오류 발생: ", throwable);
                    return new GlobalException(ErrorStatus.GCS_URL_PROCESSING_ERROR);
                })
                .flatMap(this::requestFishNameFromFastApi)
                .doOnNext(apiResponse -> log.info("FastAPI 응답 받음 - 어종명: '{}'", apiResponse.getFishName()))
                .flatMap(this::processFishDetectionResult)
                .doOnNext(response -> {
                    log.info("최종 응답 생성 완료 - 어종: '{}', 금어기: {}, 규제정보: {}",
                            response.getFishName(),
                            response.isCurrentlyRestricted(),
                            response.getRegulationFish() != null ? "있음" : "없음");
                    log.info("=== Fish Detection 완료 ===");
                });
    }

    private FishDetailResponse buildFishDetailResponse(FishRestriction fish) {
        log.debug("FishDetailResponse 빌드 시작 - 어종: {}", fish.getSpeciesName());
        return FishDetailResponse.builder()
                .speciesName(fish.getSpeciesName())
                .restrictionRegion(fish.getRestrictionRegion().label())
                .restrictionStartDate(fish.getRestrictionStartDate())
                .restrictionEndDate(fish.getRestrictionEndDate())
                .minimumLengthCentimeter(fish.getMinimumLengthCentimeter())
                .minimumWeightGram(fish.getMinimumWeightGram())
                .measurementType(fish.getMeasurementType() != null ? fish.getMeasurementType().label() : null)
                .lawAnnouncementDate(fish.getLawAnnouncementDate())
                .note(fish.getNote())
                .imageUrl(fish.getImageUrl())
                .build();
    }


    private Mono<FishDetectionResponse> processFishDetectionResult(FishDetectionFastApiResponse apiResponse) {
        log.info("DB 조회 및 응답 생성 시작 - 어종: '{}'", apiResponse.getFishName());

        return Mono.fromCallable(() -> fishRestrictionRepository.findBySpeciesName(apiResponse.getFishName()))
                .subscribeOn(Schedulers.boundedElastic())
                .map(result -> {
                    log.info("DB 조회 완료 - 결과: {}", result.isPresent() ? "데이터 있음" : "데이터 없음");

                    FishRestriction fish = result.orElse(null);
                    FishDetailResponse regulationFish = null;
                    boolean isCurrentlyRestricted = false;

                    if (fish != null) {
                        log.info("어종 정보 찾음: {}", fish.getSpeciesName());
                        isCurrentlyRestricted = fish.isCurrentlyRestricted();
                        log.info("현재 금어기 여부: {}", isCurrentlyRestricted);
                        regulationFish = buildFishDetailResponse(fish);
                        log.info("규제 정보 객체 생성 완료");
                    } else {
                        log.info("어종 정보 없음 - 기본값으로 응답 생성");
                    }

                    return FishDetectionResponse.builder()
                            .fishName(apiResponse.getFishName())
                            .regulationFish(regulationFish)
                            .isCurrentlyRestricted(isCurrentlyRestricted)
                            .build();
                });
    }


    public Mono<FishDetectionFastApiResponse> requestFishNameFromFastApi(FishDetectionFastApiRequest apiRequest){

        return webClient.post()
                .uri("http://i13a405.p.ssafy.io/ai/detection/")
                .bodyValue(apiRequest)
                .retrieve()
                .onStatus(HttpStatusCode::is4xxClientError, resp ->{
                    return Mono.error(new GlobalException(ErrorStatus.FAST_API_CLIENT_ERROR));
                })
                .onStatus(HttpStatusCode::is5xxServerError, resp ->{
                    return Mono.error(new GlobalException(ErrorStatus.FAST_API_ERROR));
                })
                .bodyToMono(FishDetectionFastApiResponse.class)
                .timeout(Duration.ofSeconds(30))
                .transformDeferred(CircuitBreakerOperator.of(fastapiAiCircuitBreaker))
                .doOnNext(response -> {
                    log.info("FastAPI 호출 성공 - 응답 받음");
                })
                .onErrorMap(io.github.resilience4j.circuitbreaker.CallNotPermittedException.class,
                        e -> new GlobalException(ErrorStatus.FAST_API_SERVICE_UNAVAILABLE))
                .onErrorMap(java.util.concurrent.TimeoutException.class, error -> {
                    log.error("FastAPI 호출 타임아웃: ", error);
                    return new GlobalException(ErrorStatus.FAST_API_TIMEOUT);
                })
                .onErrorMap(ex -> !(ex instanceof GlobalException), ex -> {
                    log.error("FastAPI 호출 실패(표준화되지 않은 예외)", ex);
                    return new GlobalException(ErrorStatus.FAST_API_ERROR);
                });
    }

}
