package com.ssafy.haeruhand.global.scheduler;

import com.ssafy.haeruhand.domain.weather.dto.FisheryWeatherUpsertResultResponse;
import com.ssafy.haeruhand.domain.weather.service.FisheryWeatherRefreshService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

/**
 * 어업기상 데이터 전용 스케줄러
 * 공공 API 한 번 호출로 7일치 데이터 모두 조회
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class FisheryWeatherDataScheduler {

    private final FisheryWeatherRefreshService fisheryWeatherRefreshService;
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @PostConstruct
    public void init() {
        log.info("╔══════════════════════════════════════╗");
        log.info("║      어업기상 스케줄러 초기화 완료      ║");
        log.info("╠══════════════════════════════════════╣");
        log.info("║ 📅 주요 갱신:    05:00, 11:00, 17:00  ║");
        log.info("║ 📅 야간 갱신:    매일 00:30           ║");
        log.info("║ 🔧 특징:        한 번 호출로 7일치    ║");
        log.info("║ 🏷️  빈 이름:     fisheryWeatherDataScheduler ║");
        log.info("╚══════════════════════════════════════╝");
    }

    /**
     * 어업기상 주요 갱신 (7일치 전체)
     * 매일 5시, 11시, 17시 - 기상청 예보 발표 시점
     * 한 번 호출로 오늘 포함 7일치 데이터 모두 갱신
     */
    @Scheduled(cron = "0 0 5,11,17 * * ?")
    public void refreshFisheryWeather() {
        executeJob("FisheryWeatherRefresh", "매일 5시/11시/17시 주요 갱신 (7일치)", () -> {
            FisheryWeatherUpsertResultResponse result = fisheryWeatherRefreshService.refresh(
                    Optional.empty(), // 오늘 날짜 기준으로 7일치 조회
                    Optional.empty(), // 모든 지역
                    1000 // 충분한 데이터 양
            );

            return String.format("어업기상 갱신 완료 (7일치): 요청=%d, 성공=%d, 실패=%d",
                    result.requested(), result.success(), result.fail());
        });
    }

    /**
     * 어업기상 야간 갱신 (7일치 전체)
     * 매일 00시 30분 - 야간 시간대 추가 갱신
     * 낮 시간 갱신과 동일하지만 안정성을 위한 추가 갱신
     */
    @Scheduled(cron = "0 30 0 * * ?")
    public void refreshFisheryWeatherNightly() {
        executeJob("FisheryWeatherNightlyRefresh", "매일 00:30 야간 갱신 (7일치)", () -> {
            FisheryWeatherUpsertResultResponse result = fisheryWeatherRefreshService.refresh(
                    Optional.empty(), // 오늘 날짜 기준으로 7일치 조회
                    Optional.empty(), // 모든 지역
                    1000 // 충분한 데이터 양
            );

            return String.format("어업기상 야간 갱신 완료 (7일치): 요청=%d, 성공=%d, 실패=%d",
                    result.requested(), result.success(), result.fail());
        });
    }

    /**
     * 수동 갱신 (관리자용)
     * 어업기상은 한 번 호출로 7일치이므로 단순함
     */
    public void manualRefresh() {
        log.info("=== 어업기상 데이터 수동 갱신 시작 ===");

        try {
            executeJob("FisheryWeatherManualRefresh", "수동 갱신 (7일치)", () -> {
                FisheryWeatherUpsertResultResponse result = fisheryWeatherRefreshService.refresh(
                        Optional.empty(),
                        Optional.empty(),
                        1000
                );

                return String.format("어업기상 수동 갱신 완료 (7일치): 요청=%d, 성공=%d, 실패=%d",
                        result.requested(), result.success(), result.fail());
            });

            log.info("=== 어업기상 데이터 수동 갱신 완료 ===");
        } catch (Exception e) {
            log.error("=== 어업기상 데이터 수동 갱신 실패 ===", e);
            throw e;
        }
    }

    /**
     * 스케줄러 작업 실행 및 로깅
     */
    private void executeJob(String jobName, String description, SchedulerTask task) {
        LocalDateTime startTime = LocalDateTime.now();
        long startMs = System.currentTimeMillis();

        log.info("🚀 [{}] {} - {}", jobName, description, startTime.format(FORMATTER));

        try {
            String result = task.execute();
            long durationMs = System.currentTimeMillis() - startMs;

            log.info("✅ [{}] 성공: {} (실행시간: {}ms)", jobName, result, durationMs);

        } catch (Exception e) {
            long durationMs = System.currentTimeMillis() - startMs;
            log.error("❌ [{}] 실패: {} (실행시간: {}ms)", jobName, e.getMessage(), durationMs, e);
            throw new RuntimeException(jobName + " 실행 실패: " + e.getMessage(), e);
        }
    }

    @FunctionalInterface
    private interface SchedulerTask {
        String execute() throws Exception;
    }
}