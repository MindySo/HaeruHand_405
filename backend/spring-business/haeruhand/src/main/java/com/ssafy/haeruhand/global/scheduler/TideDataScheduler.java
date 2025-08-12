package com.ssafy.haeruhand.global.scheduler;

import com.ssafy.haeruhand.domain.marine.dto.TideUpsertResultResponse;
import com.ssafy.haeruhand.domain.marine.service.TideRefreshService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.support.CronExpression;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

/**
 * 조석 데이터 전용 스케줄러
 */
@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(prefix = "scheduler.tide", name = "enabled", havingValue = "true", matchIfMissing = true)
public class TideDataScheduler {

    private final TideRefreshService tideRefreshService;
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @PostConstruct
    public void init() {
        log.info("╔══════════════════════════════════════╗");
        log.info("║        조석 스케줄러 초기화 완료        ║");
        log.info("╠══════════════════════════════════════╣");
        log.info("║ 📅 오늘 조석:    매일 02:00 (KST)     ║");
        log.info("║ 📅 내일 조석:    매일 23:00 (KST)     ║");
        log.info("║ 📅 월간 조석:    매월 1일 01:00       ║");
        log.info("║ 🔧 상태:        활성화됨              ║");
        log.info("║ 🏷️  빈 이름:     tideDataScheduler    ║");
        log.info("╚══════════════════════════════════════╝");

        showNextExecutionTimes();
    }

    /**
     * 오늘 조석 데이터 갱신
     * 매일 새벽 2시 실행
     */
    @Scheduled(cron = "${scheduler.tide.today-cron:0 0 2 * * ?}")
    public void refreshTodayTide() {
        executeJob("TideRefreshToday", () -> {
            TideUpsertResultResponse result = tideRefreshService.refreshToday(Optional.empty());

            return String.format("오늘 조석 갱신 완료: 요청=%d, 성공=%d, 실패=%d",
                    result.requested(), result.success(), result.fail());
        });
    }

    /**
     * 월간 조석 데이터 대량 갱신
     * 매월 1일 새벽 1시 실행 - 다음 달 전체 데이터
     */
    @Scheduled(cron = "${scheduler.tide.monthly-cron:0 0 1 1 * ?}")
    public void refreshMonthlyTide() {
        executeJob("TideRefreshMonthly", () -> {
            int months = 1;
            TideUpsertResultResponse result = tideRefreshService.refreshNextMonths(months, Optional.empty());

            return String.format("월간 조석 갱신 완료 (%d개월): 요청=%d, 성공=%d, 실패=%d",
                    months, result.requested(), result.success(), result.fail());
        });
    }

    /**
     * 내일 조석 데이터 미리 갱신
     * 매일 밤 11시 실행
     */
    @Scheduled(cron = "${scheduler.tide.tomorrow-cron:0 0 23 * * ?}")
    public void refreshTomorrowTide() {
        executeJob("TideRefreshTomorrow", () -> {
            TideUpsertResultResponse result = tideRefreshService.refreshTomorrow(Optional.empty());

            return String.format("내일 조석 갱신 완료: 요청=%d, 성공=%d, 실패=%d",
                    result.requested(), result.success(), result.fail());
        });
    }

    /**
     * 수동 전체 갱신 (관리자용)
     */
    public void manualRefreshAll() {
        log.info("=== 조석 데이터 수동 전체 갱신 시작 ===");

        try {
            // 오늘 + 내일 + 다음 달
            refreshTodayTide();
            refreshTomorrowTide();
            refreshMonthlyTide();

            log.info("=== 조석 데이터 수동 전체 갱신 완료 ===");
        } catch (Exception e) {
            log.error("=== 조석 데이터 수동 전체 갱신 실패 ===", e);
            throw e;
        }
    }

    /**
     * 초기 데이터 로드 (최초 1회, 관리자 수동 실행)
     */
    public void initialDataLoad() {
        executeJob("TideInitialLoad", () -> {
            log.info("조석 데이터 초기 로드 시작 (3개월치)");

            // 오늘부터 3개월치 데이터 로드
            TideUpsertResultResponse result = tideRefreshService.refreshNextMonths(3, Optional.empty());

            return String.format("조석 초기 데이터 로드 완료 (3개월): 요청=%d, 성공=%d, 실패=%d",
                    result.requested(), result.success(), result.fail());
        });
    }

    /**
     * 특정 기간 수동 갱신 (관리자용)
     */
    public void manualRefreshDateRange(String startDateStr, String endDateStr) {
        executeJob("TideManualRefreshRange", () -> {
            LocalDate startDate = LocalDate.parse(startDateStr);
            LocalDate endDate = LocalDate.parse(endDateStr);

            log.info("조석 데이터 기간 갱신 시작: {} ~ {}", startDate, endDate);

            TideUpsertResultResponse result = tideRefreshService.refreshDateRange(startDate, endDate, Optional.empty());

            return String.format("조석 기간 갱신 완료 (%s~%s): 요청=%d, 성공=%d, 실패=%d",
                    startDate, endDate, result.requested(), result.success(), result.fail());
        });
    }

    /**
     * 스케줄러 작업 실행 및 로깅 (DB 저장 없음)
     */
    private void executeJob(String jobName, SchedulerTask task) {
        LocalDateTime startTime = LocalDateTime.now();
        long startMs = System.currentTimeMillis();

        log.info("=== {} 시작: {} ===", jobName, startTime.format(FORMATTER));

        try {
            String result = task.execute();
            long durationMs = System.currentTimeMillis() - startMs;

            log.info("=== {} 성공: {} (실행시간: {}ms) ===",
                    jobName, result, durationMs);

        } catch (Exception e) {
            long durationMs = System.currentTimeMillis() - startMs;

            log.error("=== {} 실패: {} (실행시간: {}ms) ===",
                    jobName, e.getMessage(), durationMs, e);

            // 런타임 예외로 다시 던져서 스케줄러가 인지할 수 있도록
            throw new RuntimeException(jobName + " 실행 실패: " + e.getMessage(), e);
        }
    }

    @FunctionalInterface
    private interface SchedulerTask {
        String execute() throws Exception;
    }

    private void showNextExecutionTimes() {
        try {
            CronExpression todayCron = CronExpression.parse("0 0 2 * * ?");
            CronExpression tomorrowCron = CronExpression.parse("0 0 23 * * ?");
            CronExpression monthlyCron = CronExpression.parse("0 0 1 1 * ?");

            LocalDateTime now = LocalDateTime.now();

            log.info("⏰ 다음 실행 예정 시간:");
            log.info("   - 오늘 조석: {}", todayCron.next(now));
            log.info("   - 내일 조석: {}", tomorrowCron.next(now));
            log.info("   - 월간 조석: {}", monthlyCron.next(now));

        } catch (Exception e) {
            log.warn("다음 실행 시간 계산 실패", e);
        }
    }
}
