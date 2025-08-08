package com.ssafy.haeruhand.domain.weather.entity;

import com.ssafy.haeruhand.global.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "weather_warning")
@Entity
public class WeatherWarning extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "weather_warning_id")
    private Long id;

    @Column(name = "region_code", length = 8, nullable = false)
    private String regionCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "warning_type", length = 20, nullable = false)
    private WarningType warningType;

    @Enumerated(EnumType.STRING)
    @Column(name = "warning_level", length = 20)
    private WarningLevel warningLevel;

    @Enumerated(EnumType.STRING)
    @Column(name = "warning_command", length = 20, nullable = false)
    private WarningCommand warningCommand;

    @Column(name = "announced_at", nullable = false)
    private LocalDateTime announcedAt;

    @Column(name = "effective_at")
    private LocalDateTime effectiveAt;

    @Column(name = "expected_end_at")
    private LocalDateTime expectedEndAt;
}
