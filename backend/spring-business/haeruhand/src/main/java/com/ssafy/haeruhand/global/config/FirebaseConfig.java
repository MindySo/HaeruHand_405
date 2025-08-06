package com.ssafy.haeruhand.global.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import javax.annotation.PostConstruct;
import java.io.IOException;

@Slf4j
@Configuration
public class FirebaseConfig {

    @Value("${firebase.service-account-key}")
    private String serviceAccountKeyPath;

    @PostConstruct
    public void initialize() {
        try {
            if (FirebaseApp.getApps().isEmpty()) {
                ClassPathResource serviceAccount = new ClassPathResource(serviceAccountKeyPath);

                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount.getInputStream()))
                        .build();

                FirebaseApp.initializeApp(options);
                log.info("Firebase 초기화 완료");
            } else {
                log.info("Firebase가 이미 초기화되어 있습니다.");
            }
        } catch (IOException e) {
            log.error("Firebase 초기화 실패: {}", e.getMessage());
            throw new GlobalException(ErrorStatus.INTERNAL_SERVER_ERROR);
        }
    }
}