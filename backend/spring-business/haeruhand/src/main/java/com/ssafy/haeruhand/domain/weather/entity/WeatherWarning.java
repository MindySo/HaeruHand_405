package com.ssafy.haeruhand.domain.weather.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "weather_warning")
@Entity
public class WeatherWarning {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "weather_warning_id")
    private Long id;

    // 특보

    // 수준

    // 해당 지역

    // 발표 시각

    // 발효 시각

    // 해제예고
}
