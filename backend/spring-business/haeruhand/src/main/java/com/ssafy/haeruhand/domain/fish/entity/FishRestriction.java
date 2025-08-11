package com.ssafy.haeruhand.domain.fish.entity;

import com.ssafy.haeruhand.global.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "fish_restriction")
@Entity
public class FishRestriction extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fish_restriction_id")
    private Long id;

    @Column(name = "species_name", nullable = false, length = 50)
    private String speciesName;

    @Enumerated(EnumType.STRING)
    @Column(name = "restriction_region", nullable = false, length = 30)
    private RestrictionRegion restrictionRegion;

    @Column(name = "restriction_start_date", nullable = false)
    private LocalDate restrictionStartDate;

    @Column(name = "restriction_end_date", nullable = false)
    private LocalDate restrictionEndDate;

    @Column(name = "minimum_length_centimeter", precision = 5, scale = 2)
    private BigDecimal minimumLengthCentimeter;

    @Column(name = "minimum_weight_gram", precision = 6, scale = 1)
    private BigDecimal minimumWeightGram;

    @Enumerated(EnumType.STRING)
    @Column(name = "measurement_type", length = 30)
    private MeasurementType measurementType;

    @Column(name = "law_announcement_date")
    private LocalDate lawAnnouncementDate;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

    @Column(name = "image_url", length = 255)
    private String imageUrl;

    /**
     * 오늘(LocalDate.now 기준)이 금어기·금지체장 적용 기간인지 여부
     */
    public boolean isCurrentlyRestricted() {
        return isRestrictedOn(LocalDate.now());
    }

    /**
     * 주어진 날짜(date)가 금어기·금지체장 적용 기간인지 여부
     *
     * @param date 검사할 날짜
     * @return true = 금어기(포획 금지), false = 금어기 아님
     */
    public boolean isRestrictedOn(LocalDate date) {
        return !date.isBefore(restrictionStartDate) && !date.isAfter(restrictionEndDate);
    }
}
