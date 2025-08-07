package com.ssafy.haeruhand.domain.ai.service;

import com.ssafy.haeruhand.domain.ai.dto.FishDetectionFastApiRequest;
import com.ssafy.haeruhand.domain.ai.dto.FishDetectionFastApiResponse;
import com.ssafy.haeruhand.domain.ai.dto.FishDetectionRequest;
import com.ssafy.haeruhand.domain.ai.dto.FishDetectionResponse;
import com.ssafy.haeruhand.domain.fish.dto.FishDetailResponse;
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

@Slf4j
@Service
@RequiredArgsConstructor
public class FishDetectionService {
    private final GcsUtil gcsUtil;
    private final SignedUrlService signedUrlService;
    private final WebClient webClient;
    private final FishRestrictionRepository fishRestrictionRepository;

    public Mono<FishDetectionResponse> detectFish(FishDetectionRequest request){
        String objectKey = gcsUtil.extractObjectKey(request.getImageUrl());
        String extension = gcsUtil.extractExtension(objectKey);
        String signedUrl = signedUrlService.createSignedGetUrl(objectKey);

        return requestFishNameFromFastApi(signedUrl, extension)
                .doOnNext(apiResponse -> {
                    log.info("FastAPI 응답 받음 - 어종명: {}", apiResponse.getFishName());
                })
                .flatMap(apiResponse ->
                        Mono.fromCallable(() -> {
                                    log.info("DB에서 어종 정보 조회 시작: {}", apiResponse.getFishName());
                                    return fishRestrictionRepository.findBySpeciesName(apiResponse.getFishName())
                                            .orElse(null);
                                })
                                .subscribeOn(Schedulers.boundedElastic())
                                .doOnNext(fish -> {
                                    if (fish != null) {
                                        log.info("DB에서 어종 정보 찾음: {}", fish.getSpeciesName());
                                        log.info("현재 금어기 여부: {}", fish.isCurrentlyRestricted());
                                    } else {
                                        log.info("DB에서 어종 정보를 찾을 수 없음");
                                    }
                                })
                                .map(fish -> {
                                    FishDetectionResponse response = FishDetectionResponse.builder()
                                            .fishName(apiResponse.getFishName())
                                            .regulationFish(fish != null ? FishDetailResponse.builder()
                                                    .speciesName(fish.getSpeciesName())
                                                    .restrictionRegion(fish.getRestrictionRegion().label())
                                                    .restrictionStartDate(fish.getRestrictionStartDate())
                                                    .restrictionEndDate(fish.getRestrictionEndDate())
                                                    .minimumLengthCentimeter(fish.getMinimumLengthCentimeter())
                                                    .minimumWeightGram(fish.getMinimumWeightGram())
                                                    .measurementType(fish.getMeasurementType().label())
                                                    .lawAnnouncementDate(fish.getLawAnnouncementDate())
                                                    .note(fish.getNote())
                                                    .imageUrl(fish.getImageUrl())
                                                    .build() : null)
                                            .isCurrentlyRestricted(fish != null && fish.isCurrentlyRestricted())
                                            .build();

                                    log.info("최종 응답 생성 완료 - 어종: {}, 금어기: {}",
                                            response.getFishName(), response.isCurrentlyRestricted());
                                    log.info("=== Fish Detection 완료 ===");

                                    return response;
                                })
                )
                .doOnError(error -> {
                    log.error("Fish Detection 중 오류 발생: ", error);
                });
    }

    public Mono<FishDetectionFastApiResponse> requestFishNameFromFastApi(String signedUrl, String extension){
        FishDetectionFastApiRequest apiRequest = FishDetectionFastApiRequest.builder()
                .imageUrl(signedUrl)
                .mimeType(extension)
                .build();

        return webClient.post()
                .uri("http://i13a405.p.ssafy.io/ai/detection/")
                .bodyValue(apiRequest)
                .retrieve()
                .bodyToMono(FishDetectionFastApiResponse.class);

    }

}
