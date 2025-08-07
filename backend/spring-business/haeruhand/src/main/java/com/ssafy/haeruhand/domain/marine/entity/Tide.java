package com.ssafy.haeruhand.domain.marine.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "tide")
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


}
