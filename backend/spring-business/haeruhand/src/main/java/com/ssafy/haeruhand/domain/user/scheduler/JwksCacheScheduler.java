package com.ssafy.haeruhand.domain.user.scheduler;

import com.ssafy.haeruhand.domain.user.service.JwksService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwksCacheScheduler {
    
    private final JwksService jwksService;
    
    @Scheduled(fixedRate = 1800000) // 30분
    public void refreshJwksCache() {
        try {
            log.info("JWKS 캐시 주기적 갱신 시작");
            
            String[] commonKids = {
                "3f96980381e451efad0d2ddd30e3d3",
                "9f252dadd5f233f93d2fa528d12fea"
            };
            
            for (String kid : commonKids) {
                try {
                    // 기존 캐시 삭제 후 새로 로드
                    jwksService.evictKey(kid);
                    jwksService.getPublicKey(kid);
                    log.debug("키 갱신 완료 - kid: {}", kid);
                } catch (Exception e) {
                    log.warn("키 갱신 실패 - kid: {}, error: {}", kid, e.getMessage());
                }
            }
            
            log.info("JWKS 캐시 주기적 갱신 완료");
        } catch (Exception e) {
            log.error("JWKS 캐시 갱신 실패 - error: {}", e.getMessage());
        }
    }
}