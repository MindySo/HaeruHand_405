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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
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

    public Mono<FishDetectionResponse> detectFish(FishDetectionRequest request) {
        log.info("=== Fish Detection 시작 ===");
        log.info("요청 이미지 URL: {}", request.getImageUrl());

        String objectKey = gcsUtil.extractObjectKey(request.getImageUrl());
        String extension = gcsUtil.extractExtension(objectKey);
        String signedUrl = signedUrlService.createSignedGetUrl(objectKey);

        log.info("추출된 objectKey: {}, 확장자: {}", objectKey, extension);

        return requestFishNameFromFastApi(signedUrl, extension)
                .doOnNext(apiResponse -> {
                    log.info("FastAPI 응답 받음 - 어종명: '{}'", apiResponse.getFishName());
                })
                .flatMap(apiResponse ->
                        Mono.fromCallable(() -> {
                            log.info("DB 조회 및 응답 생성 시작 - 어종: '{}'", apiResponse.getFishName());
                            try {
                                Optional<FishRestriction> result = fishRestrictionRepository.findBySpeciesName(apiResponse.getFishName());
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

                                FishDetectionResponse response = FishDetectionResponse.builder()
                                        .fishName(apiResponse.getFishName())
                                        .regulationFish(regulationFish)
                                        .isCurrentlyRestricted(isCurrentlyRestricted)
                                        .build();

                                log.info("최종 응답 생성 완료 - 어종: '{}', 금어기: {}, 규제정보: {}",
                                        response.getFishName(),
                                        response.isCurrentlyRestricted(),
                                        response.getRegulationFish() != null ? "있음" : "없음");
                                log.info("=== Fish Detection 완료 ===");

                                return response;

                            } catch (Exception e) {
                                log.error("DB 조회 또는 응답 생성 중 예외 발생: ", e);
                                FishDetectionResponse errorResponse = FishDetectionResponse.builder()
                                        .fishName(apiResponse.getFishName())
                                        .regulationFish(null)
                                        .isCurrentlyRestricted(false)
                                        .build();
                                log.info("예외 처리 - 기본 응답 반환: {}", errorResponse.getFishName());
                                return errorResponse;
                            }
                        }).subscribeOn(Schedulers.boundedElastic())
                )
                .doOnError(error -> {
                    log.error("Fish Detection 전체 프로세스 중 오류 발생: ", error);
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

    public Mono<FishDetectionFastApiResponse> requestFishNameFromFastApi(String signedUrl, String extension){
        log.info("FastAPI 호출 시작 - endpoint: /detection/");
        log.debug("요청 데이터 - mimeType: {}", extension);

        FishDetectionFastApiRequest apiRequest = FishDetectionFastApiRequest.builder()
                .imageUrl(signedUrl)
                .mimeType(extension)
                .build();

        return webClient.post()
                .uri("http://i13a405.p.ssafy.io/ai/detection/")
                .bodyValue(apiRequest)
                .retrieve()
                .bodyToMono(FishDetectionFastApiResponse.class)
                .doOnNext(response -> {
                    log.info("FastAPI 호출 성공 - 응답 받음");
                })
                .doOnError(error -> {
                    log.error("FastAPI 호출 실패: ", error);
                });
    }

}
