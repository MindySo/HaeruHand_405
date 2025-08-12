package com.ssafy.haeruhand.global.scheduler;

import com.ssafy.haeruhand.domain.weather.dto.WeatherWarningUpsertResultResponse;
import com.ssafy.haeruhand.domain.weather.service.WeatherWarningRefreshService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.support.CronExpression;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

/**
 * 기상특보 데이터 전용 스케줄러
 * 주간/야간 시간대별 차등 갱신
 */
@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(prefix = "scheduler.weather-warning", name = "enabled", havingValue = "true", matchIfMissing = true)
public class WeatherWarningDataScheduler {

    private final WeatherWarningRefreshService weatherWarningRefreshService;
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @PostConstruct
    public void init() {
        log.info("╔══════════════════════════════════════╗");
        log.info("║      기상특보 스케줄러 초기화 완료      ║");
        log.info("╠══════════════════════════════════════╣");
        log.info("║ 🚨 주간 갱신:    06-22시 (5분마다)    ║");
        log.info("║ 🌙 야간 갱신:    23,0-5시 (15분마다) ║");
        log.info("║ 🔧 상태:        활성화됨              ║");
        log.info("║ 🏷️  빈 이름:     weatherWarningDataScheduler ║");
        log.info("╚══════════════════════════════════════╝");

        showNextExecutionTimes();
    }

    /**
     * 기상특보 주간 갱신 (고빈도)
     * 주간 시간대(06-22시) 5분마다 - 어업 활동 시간대
     */
    @Scheduled(cron = "${scheduler.weather-warning.peak-hours-cron:0 */5 6-22 * * ?}")
    public void refreshWeatherWarningDaytime() {
        executeJob("WeatherWarningDaytimeRefresh", "주간 갱신 (5분 주기)", () -> {
            WeatherWarningUpsertResultResponse result = weatherWarningRefreshService.refresh(
                    Optional.of("f"),
                    Optional.empty()
            );

            return String.format("기상특보 주간 갱신 완료: 요청=%d, 성공=%d, 실패=%d",
                    result.requested(), result.success(), result.fail());
        });
    }

    /**
     * 기상특보 야간 갱신 (저빈도)
     * 야간 시간대(23시, 0-5시) 15분마다 - 활동 감소 시간대
     */
    @Scheduled(cron = "${scheduler.weather-warning.night-hours-cron:0 */15 0-5,23 * * ?}")
    public void refreshWeatherWarningNighttime() {
        executeJob("WeatherWarningNighttimeRefresh", "야간 갱신 (15분 주기)", () -> {
            WeatherWarningUpsertResultResponse result = weatherWarningRefreshService.refresh(
                    Optional.of("f"),
                    Optional.empty()
            );

            return String.format("기상특보 야간 갱신 완료: 요청=%d, 성공=%d, 실패=%d",
                    result.requested(), result.success(), result.fail());
        });
    }

    /**
     * 수동 갱신 (관리자용)
     */
    public void manualRefresh() {
        log.info("=== 기상특보 데이터 수동 갱신 시작 ===");

        try {
            executeJob("WeatherWarningManualRefresh", "수동 갱신", () -> {
                WeatherWarningUpsertResultResponse result = weatherWarningRefreshService.refresh(
                        Optional.of("f"),
                        Optional.empty()
                );

                return String.format("기상특보 수동 갱신 완료: 요청=%d, 성공=%d, 실패=%d",
                        result.requested(), result.success(), result.fail());
            });

            log.info("=== 기상특보 데이터 수동 갱신 완료 ===");
        } catch (Exception e) {
            log.error("=== 기상특보 데이터 수동 갱신 실패 ===", e);
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

    /**
     * 다음 실행 예정 시간 표시
     */
    private void showNextExecutionTimes() {
        try {
            CronExpression daytimeCron = CronExpression.parse("0 */5 6-22 * * ?");
            CronExpression nighttimeCron = CronExpression.parse("0 */15 0-5,23 * * ?");

            LocalDateTime now = LocalDateTime.now();

            log.info("⏰ 다음 실행 예정 시간:");
            log.info("   - 주간 갱신 (5분): {}", daytimeCron.next(now));
            log.info("   - 야간 갱신 (15분): {}", nighttimeCron.next(now));

        } catch (Exception e) {
            log.warn("다음 실행 시간 계산 실패", e);
        }
    }

    @FunctionalInterface
    private interface SchedulerTask {
        String execute() throws Exception;
    }
}