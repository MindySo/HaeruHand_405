package com.ssafy.haeruhand.domain.fishery.entity;

import com.ssafy.haeruhand.global.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "fishery")
@Entity
public class Fishery extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fishery_id")
    private Long id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    @Column(name = "latitude", nullable = false, precision = 9, scale = 6)
    private BigDecimal latitude;

    @Column(name = "longitude", nullable = false, precision = 9, scale = 6)
    private BigDecimal longitude;

    @Column(name = "station_code", length = 20)
    private String stationCode;

    @Column(name = "region_code", length = 8, nullable = false)
    private String regionCode;

    @Column(name = "area_name", length = 50, nullable = false) // ★ 추가
    private String areaName;
}
