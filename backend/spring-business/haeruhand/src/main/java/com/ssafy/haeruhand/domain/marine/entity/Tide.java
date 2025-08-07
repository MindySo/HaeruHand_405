package com.ssafy.haeruhand.domain.marine.entity;

import jakarta.persistence.*;
import lombok.*;

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


}
