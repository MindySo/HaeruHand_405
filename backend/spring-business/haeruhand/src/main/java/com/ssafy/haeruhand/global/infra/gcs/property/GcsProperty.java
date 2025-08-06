package com.ssafy.haeruhand.global.infra.gcs.property;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "gcs.storage")
public record GcsProperty(
        String bucket,
        Path imagePath,
        int signedUrlExpiresMinutes
){ public record  Path(String ai){}
}