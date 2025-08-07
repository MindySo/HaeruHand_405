package com.ssafy.haeruhand.domain.location.entity;

import com.ssafy.haeruhand.domain.user.entity.User;
import com.ssafy.haeruhand.global.domain.BaseEntity;
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
public class LocationShareMember extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_share_member_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_share_room_id", nullable = false)
    private LocationShareRoom room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

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

    // 편의 메서드: User의 ID를 반환
    public Long getUserId() {
        return user != null ? user.getId() : null;
    }

    public void updateLastActiveAt() {
        this.lastActiveAt = LocalDateTime.now();
    }
}