package com.ssafy.haeruhand.domain.location.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "location_share_member",
       uniqueConstraints = {
           @UniqueConstraint(columnNames = {"location_share_room_id", "user_id"})
       })
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class LocationShareMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_share_member_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_share_room_id", nullable = false)
    private LocationShareRoom room;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "is_host")
    @Builder.Default
    private Boolean isHost = false;

    @Column(name = "joined_at")
    @Builder.Default
    private LocalDateTime joinedAt = LocalDateTime.now();

    @Column(name = "last_active_at")
    private LocalDateTime lastActiveAt;

    @Column(name = "color", nullable = false, length = 7)
    private String color;

    public void updateLastActiveAt() {
        this.lastActiveAt = LocalDateTime.now();
    }
}