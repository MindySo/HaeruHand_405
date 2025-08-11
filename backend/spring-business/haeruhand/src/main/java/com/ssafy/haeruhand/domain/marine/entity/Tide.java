package com.ssafy.haeruhand.domain.marine.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;
import java.util.Optional;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(
        name = "tide",
        uniqueConstraints = @UniqueConstraint(columnNames = {"station_code", "observation_date"})
)
@Entity
public class Tide {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tide_id")
    private Long id;

    @Column(name = "station_code", nullable = false, length = 20)
    private String stationCode;

    @Column(name = "observation_date", nullable = false)
    private LocalDate observationDate;

    @Column(name = "first_high_tide_time")
    private LocalTime firstHighTideTime;

    @Column(name = "first_low_tide_time")
    private LocalTime firstLowTideTime;

    @Column(name = "second_high_tide_time")
    private LocalTime secondHighTideTime;

    @Column(name = "second_low_tide_time")
    private LocalTime secondLowTideTime;

    public Optional<LocalTime> getFishingStartTime() {
        return Optional.ofNullable(firstLowTideTime)
                .map(time -> time.minusHours(2));
    }

    public Optional<LocalTime> getFishingEndTime() {
        return Optional.ofNullable(firstLowTideTime)
                .map(time -> time.plusHours(2));
    }

    public void apply(LocalTime firstHighTideTime,
                      LocalTime firstLowTideTime,
                      LocalTime secondHighTideTime,
                      LocalTime secondLowTideTime) {
        this.firstHighTideTime = firstHighTideTime;
        this.firstLowTideTime = firstLowTideTime;
        this.secondHighTideTime = secondHighTideTime;
        this.secondLowTideTime = secondLowTideTime;
    }
}
