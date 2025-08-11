package com.ssafy.haeruhand.global.infra.gcs.service;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.HttpMethod;
import com.google.cloud.storage.Storage;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.infra.gcs.dto.CreateSignedUrlResponse;
import com.ssafy.haeruhand.global.infra.gcs.property.GcsProperty;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.net.URL;
import java.time.Duration;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class SignedUrlService {

    private final Storage storage;
    private final GcsProperty gcsProperty;

    public CreateSignedUrlResponse create(String type, String imageExtension){
        String imageName = createImageName(imageExtension);
        String path = getPath(type);

        String fullKey = path + imageName;

        // GCS의 Public URL은 고정된 형식으로 조합합니다.
        String imageUrl = String.format("https://storage.googleapis.com/%s/%s", gcsProperty.bucket(), fullKey);
        String signedUrl = createSignedUrl(fullKey);

        return new CreateSignedUrlResponse(imageUrl, signedUrl);
    }

    private String createImageName(String extension) {
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + extension;
    }

    private String getPath(String type){
        GcsProperty.Path path = gcsProperty.imagePath();
        return switch (type.toLowerCase()){
            case "ai" -> path.ai();
            default -> throw new GlobalException(ErrorStatus.UNSUPPORTED_IMAGE_TYPE);
        };
    }

    private String createSignedUrl(String key){
        BlobInfo blobInfo = BlobInfo.newBuilder(gcsProperty.bucket(), key).build();

        URL signedUrl = storage.signUrl(
                blobInfo,
                gcsProperty.signedUrlExpiresMinutes(),
                TimeUnit.MINUTES,
                Storage.SignUrlOption.withV4Signature(),
                Storage.SignUrlOption.httpMethod(HttpMethod.PUT)
        );
        return signedUrl.toExternalForm();


    }

    public String createSignedGetUrl(String objectKey){
        BlobInfo blobInfo = BlobInfo.newBuilder(
                gcsProperty.bucket(), objectKey
        ).build();
        URL signedUrl = storage.signUrl(
                blobInfo,
                gcsProperty.signedUrlExpiresMinutes(),
                TimeUnit.MINUTES,
                Storage.SignUrlOption.withV4Signature(),
                Storage.SignUrlOption.httpMethod(HttpMethod.GET)
        );

        return signedUrl.toExternalForm();
    }


}
