package com.ssafy.haeruhand.global.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Slf4j
@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer {

    @Bean(name = "notificationTaskExecutor")
    public Executor notificationTaskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();

        // 기본 스레드 수
        executor.setCorePoolSize(10);

        // 최대 스레드 수
        executor.setMaxPoolSize(30);

        // 큐 용량
        executor.setQueueCapacity(500);

        // 스레드 이름 접두사
        executor.setThreadNamePrefix("notification-async-");

        // 애플리케이션 종료 시 스레드 대기 시간 (초)
        executor.setAwaitTerminationSeconds(60);

        // 애플리케이션 종료 시 진행 중인 작업 완료까지 기다림
        executor.setWaitForTasksToCompleteOnShutdown(true);

        // 거부된 작업 처리 정책: 호출자 스레드에서 실행
        executor.setRejectedExecutionHandler((runnable, executor1) -> {
            log.warn("알림 작업이 거부되었습니다. 호출자 스레드에서 실행합니다.");
            runnable.run();
        });

        executor.initialize();
        log.info("알림 전송용 비동기 실행자 초기화 완료 - CorePool: {}, MaxPool: {}, Queue: {}",
                executor.getCorePoolSize(), executor.getMaxPoolSize(), executor.getQueueCapacity());

        return executor;
    }


    // 기본 비동기 실행자 설정 : @Async에서 executor 지정하지 않을 경우
    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(30);
        executor.setQueueCapacity(500);
        executor.setThreadNamePrefix("default-async-");
        executor.setAwaitTerminationSeconds(30);
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.initialize();

        log.info("기본 비동기 실행자 초기화 완료");
        return executor;
    }

    // 비동기 작업 중 발생한 예외 처리
    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return (throwable, method, objects) -> {
            log.error("비동기 작업 중 예외 발생 - Method: {}, Exception: {}",
                    method.getName(), throwable.getMessage(), throwable);

            // 알림 전송 실패 시 추가 처리 로직 구현
            // 예: 실패한 알림을 DB에 저장하여 재시도
            if (method.getName().contains("notification") || method.getName().contains("fcm")) {
                log.warn("알림 전송 관련 비동기 작업 실패 - 재시도 로직 필요");
                // TODO: 실패한 알림 정보를 저장하고 재시도 큐에 추가
            }
        };
    }
}