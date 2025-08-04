package com.ssafy.haeruhand.global.infra.s3.service;

import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.infra.s3.dto.CreatePresignedUrlResponse;
import com.ssafy.haeruhand.global.infra.s3.property.AwsS3Property;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PresignedUrlService {

    private final S3Presigner.Builder presignerBuilder;
    private final AwsS3Property s3Property;

    /**
     * 사전 서명된 URL(Presigned URL)을 생성한다.
     * @param type "profile" 또는 "post" 등 이미지 종류
     * @param imageExtension 이미지 확장자 (jpeg, jpg, png 등)
     * @return 실제 업로드 URL, presigned URL
     */
    public CreatePresignedUrlResponse create(String type, String imageExtension){

         String imageName = createImageName(imageExtension);
         String path = getPath(type);

         String fullKey = path + imageName;
         String imageUrl = s3Property.imageUrlPrefix() + fullKey;
         String presignedUrl = createPresignedUrl(fullKey);

         return new CreatePresignedUrlResponse(imageUrl, presignedUrl);
    }

    private String createImageName(String extension){
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + extension;
    }

    private String getPath(String type){
        AwsS3Property.Path path = s3Property.imagePath();
        return switch (type.toLowerCase()){
            case "ai" -> path.ai();
            default -> throw new GlobalException(ErrorStatus.UNSUPPORTED_IMAGE_TYPE);
        };
    }

    private String createPresignedUrl(String key){
        try(S3Presigner presigner = presignerBuilder.build()){
            PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                    .signatureDuration(Duration.ofMinutes(s3Property.presignedUrlExpiresMinutes()))
                    .putObjectRequest(b -> b.bucket(s3Property.bucket()).key(key).build())
                    .build();
            PresignedPutObjectRequest presignedPutObjectRequest = presigner.presignPutObject(presignRequest);
            return presignedPutObjectRequest.url().toExternalForm();
        }
    }
}
