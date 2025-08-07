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

    @Enum
}
