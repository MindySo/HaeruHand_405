package com.ssafy.haeruhand.global.config;

import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class ResilienceConfig {

    private final CircuitBreakerRegistry cbRegistry;

    @Bean
    public CircuitBreaker fastapiAiCircuitBreaker(){
        return cbRegistry.circuitBreaker("fastapi-ai");
    }
}
