package com.ssafy.haeruhand.domain.location.dto.internal;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 위치 정보 배치 처리용 내부 DTO
 * LocationUpdateService에서 배치 처리 시 사용
 */
@Data
@Builder
public class LocationBatchDto {
    private Long roomId;
    private Long userId;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private BigDecimal accuracy;
    private LocalDateTime timestamp;
}