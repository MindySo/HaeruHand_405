package com.ssafy.haeruhand.domain.weather.entity;

import com.ssafy.haeruhand.global.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "fishery_weather")
@Entity
public class FisheryWeather extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fishery_weather_id")
    private Long id;

    @Column(name = "forecast_date", nullable = false)
    private LocalDate forecastDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "forecast_time_period", length = 10, nullable = false)
    private ForecastTimePeriod forecastTimePeriod;

    @Column(name = "average_air_temperature", precision = 4, scale = 1)
    private BigDecimal averageAirTemperature;

    @Column(name = "average_water_temperature", precision = 4, scale = 1)
    private BigDecimal averageWaterTemperature;

    @Column(name = "average_wave_height", precision = 4, scale = 1)
    private BigDecimal averageWaveHeight;

    @Column(name = "average_wind_speed", precision = 4, scale = 1)
    private BigDecimal averageWindSpeed;

    @Column(name = "weather_description", length = 30)
    private String weatherDescription;

    @Column(name = "sea_travel_index", length = 10)
    private String seaTravelIndex;
}
