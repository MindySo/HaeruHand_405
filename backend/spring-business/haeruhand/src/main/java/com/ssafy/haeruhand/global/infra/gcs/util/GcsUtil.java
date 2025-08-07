package com.ssafy.haeruhand.global.infra.gcs.util;

import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.infra.gcs.property.GcsProperty;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GcsUtil {
    private final GcsProperty gcsProperty;
    private static final String GCS_BASE_URL_PREFIX = "https://storage.googleapis.com";

    public String extractObjectKey(String imageUrl) {
        String prefix = GCS_BASE_URL_PREFIX + "/" + gcsProperty.bucket() + "/";
        if(!imageUrl.startsWith(prefix)){
            throw new GlobalException(ErrorStatus.INVALID_IMAGE_URL);
        }
        return imageUrl.substring(prefix.length());
    }

    public String extractExtension(String objectKey) {
        int lastDot = objectKey.lastIndexOf(".");
        if(lastDot == -1){
            throw new GlobalException(ErrorStatus.NO_EXTENSION);
        }
        return objectKey.substring(lastDot + 1).toLowerCase();
    }
}
