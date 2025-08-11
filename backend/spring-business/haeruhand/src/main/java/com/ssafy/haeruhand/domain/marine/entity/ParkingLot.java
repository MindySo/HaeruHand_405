package com.ssafy.haeruhand.domain.marine.entity;

import com.ssafy.haeruhand.global.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "parking_lot")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class ParkingLot extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "parking_lot_id")
    private Long id;

    @Column(name = "parking_center_id", nullable = false, length = 50)
    private String parkingCenterId;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @Column(name = "latitude", nullable = false, precision = 9, scale = 6)
    private BigDecimal latitude;

    @Column(name = "longitude", nullable = false, precision = 9, scale = 6)
    private BigDecimal longitude;

    @Column(name = "total_space", nullable = false)
    private Integer totalSpace;

    @Column(name = "weekday_open_time", length = 6)
    private LocalTime weekdayOpenTime;

    @Column(name = "weekday_close_time", length = 6)
    private LocalTime weekdayCloseTime;

    @Column(name = "holiday_open_time", length = 6)
    private LocalTime holidayOpenTime;

    @Column(name = "holiday_close_time", length = 6)
    private LocalTime holidayCloseTime;

    @Column(name = "base_time_minutes")
    private Integer baseTimeMinutes;

    @Column(name = "base_fee")
    private Integer baseFee;

    @Column(name = "unit_time_minutes")
    private Integer unitTimeMinutes;

    @Column(name = "unit_fee")
    private Integer unitFee;

    @Column(name = "daily_max_fee")
    private Integer dailyMaxFee;

    @Column(name = "monthly_fee")
    private Integer monthlyFee;

    @Column(name = "registration_date", nullable = false)
    private LocalDateTime registrationDate;
}
