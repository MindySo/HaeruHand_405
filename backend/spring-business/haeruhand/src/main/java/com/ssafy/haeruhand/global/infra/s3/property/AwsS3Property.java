package com.ssafy.haeruhand.global.infra.s3.property;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "cloud.aws.s3")
public record AwsS3Property (
    String bucket,
    Path imagePath,
    String imageUrlPrefix,
    int presignedUrlExpiresMinutes
){ public record  Path(String ai){}
}

