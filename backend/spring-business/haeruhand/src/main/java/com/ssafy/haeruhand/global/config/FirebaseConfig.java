//package com.ssafy.haeruhand.global.config;
//
//import com.google.auth.oauth2.GoogleCredentials;
//import com.google.firebase.FirebaseApp;
//import com.google.firebase.FirebaseOptions;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.io.ClassPathResource;
//
//import javax.annotation.PostConstruct;
//import java.io.IOException;
//
//@Configuration
//public class FirebaseConfig {
//
//    @Value("${firebase.service-account-key}")
//    private String serviceAccountKeyPath;
//
//    @PostConstruct
//    public void initialize() {
//        try {
//            if (FirebaseApp.getApps().isEmpty()) {
//                ClassPathResource serviceAccount = new ClassPathResource(serviceAccountKeyPath);
//
//                FirebaseOptions options = FirebaseOptions.builder()
//                        .setCredentials(GoogleCredentials.fromStream(serviceAccount.getInputStream()))
//                        .build();
//
//                FirebaseApp.initializeApp(options);
//                System.out.println("Firebase 초기화 완료");
//            }
//        } catch (IOException e) {
//            System.err.println("Firebase 초기화 실패: " + e.getMessage());
//            throw new RuntimeException("Firebase 초기화 실패", e);
//        }
//    }
//}