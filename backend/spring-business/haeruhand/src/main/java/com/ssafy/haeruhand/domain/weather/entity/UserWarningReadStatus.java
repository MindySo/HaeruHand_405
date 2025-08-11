package com.ssafy.haeruhand.domain.weather.entity;

import com.ssafy.haeruhand.domain.user.entity.User;
import com.ssafy.haeruhand.global.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Table(name = "user_warning_read_status")
@Entity
public class UserWarningReadStatus extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_warning_read_status_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "last_read_at", nullable = false)
    private LocalDateTime lastReadAt;

    public void markAsRead() {
        this.lastReadAt = LocalDateTime.now();
    }
}
