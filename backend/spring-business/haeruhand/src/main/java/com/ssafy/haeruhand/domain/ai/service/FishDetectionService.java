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
        String objectKey = gcsUtil.extractObjectKey(request.getImageUrl());
        String extension = gcsUtil.extractExtension(objectKey);
        String signedUrl = signedUrlService.createSignedGetUrl(objectKey);

        return requestFishNameFromFastApi(signedUrl, extension)
                .flatMap(apiResponse ->
                        Mono.fromCallable(() -> {
                            try {
                                Optional<FishRestriction> result = fishRestrictionRepository.findBySpeciesName(apiResponse.getFishName());
                                FishRestriction fish = result.orElse(null);

                                FishDetailResponse regulationFish = null;
                                boolean isCurrentlyRestricted = false;

                                if (fish != null) {
                                    isCurrentlyRestricted = fish.isCurrentlyRestricted();
                                    regulationFish = buildFishDetailResponse(fish);
                                }

                                return FishDetectionResponse.builder()
                                        .fishName(apiResponse.getFishName())
                                        .regulationFish(regulationFish)
                                        .isCurrentlyRestricted(isCurrentlyRestricted)
                                        .build();

                            } catch (Exception e) {
                                // 예외 발생 시에도 기본 응답 반환
                                return FishDetectionResponse.builder()
                                        .fishName(apiResponse.getFishName())
                                        .regulationFish(null)
                                        .isCurrentlyRestricted(false)
                                        .build();
                            }
                        }).subscribeOn(Schedulers.boundedElastic())
                );
    }

    private FishDetailResponse buildFishDetailResponse(FishRestriction fish) {
        return FishDetailResponse.builder()
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
                .build();
    }

    public Mono<FishDetectionFastApiResponse> requestFishNameFromFastApi(String signedUrl, String extension){
        FishDetectionFastApiRequest apiRequest = FishDetectionFastApiRequest.builder()
                .imageUrl(signedUrl)
                .mimeType(extension)
                .build();

        return webClient.post()
                .uri("http://localhost:8000/detection/")
                .bodyValue(apiRequest)
                .retrieve()
                .bodyToMono(FishDetectionFastApiResponse.class);

    }

}
