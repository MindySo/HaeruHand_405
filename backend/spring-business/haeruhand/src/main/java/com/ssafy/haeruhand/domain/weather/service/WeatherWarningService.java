package com.ssafy.haeruhand.domain.weather.service;

import com.ssafy.haeruhand.domain.user.entity.User;
import com.ssafy.haeruhand.domain.user.repository.UserRepository;
import com.ssafy.haeruhand.domain.weather.dto.WarningCheckNewResponse;
import com.ssafy.haeruhand.domain.weather.dto.WeatherWarningResponse;
import com.ssafy.haeruhand.domain.weather.entity.UserWarningReadStatus;
import com.ssafy.haeruhand.domain.weather.entity.WeatherWarning;
import com.ssafy.haeruhand.domain.weather.entity.WarningCommand;
import com.ssafy.haeruhand.domain.weather.entity.WarningType;
import com.ssafy.haeruhand.domain.weather.repository.UserWarningReadStatusRepository;
import com.ssafy.haeruhand.domain.weather.repository.WeatherWarningRepository;
import com.ssafy.haeruhand.global.exception.GlobalException;
import com.ssafy.haeruhand.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WeatherWarningService {

    private final UserWarningReadStatusRepository userWarningReadStatusRepository;
    private final WeatherWarningRepository weatherWarningRepository;
    private final UserRepository userRepository;

    public Page<WeatherWarningResponse> getAllWeatherWarnings(Pageable pageable) {
        Page<WeatherWarning> warnings = weatherWarningRepository.findAllByOrderByAnnouncedAtDesc(pageable);
        return warnings.map(WeatherWarningResponse::from);
    }

    public Page<WeatherWarningResponse> getWeatherWarningsByRegion(String regionCode, Pageable pageable) {
        Page<WeatherWarning> warnings = weatherWarningRepository.findByRegionCodeOrderByAnnouncedAtDesc(regionCode, pageable);
        return warnings.map(WeatherWarningResponse::from);
    }

    @Transactional
    public void markAllAsRead(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new GlobalException(ErrorStatus.USER_NOT_FOUND));

        UserWarningReadStatus readStatus = userWarningReadStatusRepository.findByUserId(userId)
                .orElse(UserWarningReadStatus.builder()
                        .user(user)
                        .lastReadAt(LocalDateTime.now())
                        .build());

        readStatus.markAsRead();
        userWarningReadStatusRepository.save(readStatus);
    }

    public WarningCheckNewResponse checkNewWarnings(Long userId) {
        Optional<UserWarningReadStatus> readStatusOptional = userWarningReadStatusRepository.findByUserId(userId);

        if (readStatusOptional.isEmpty()) {
            return WarningCheckNewResponse.of(true);
        }

        UserWarningReadStatus readStatus = readStatusOptional.get();
        LocalDateTime lastReadAt = readStatus.getLastReadAt();

        boolean hasNewWarnings = weatherWarningRepository.existsByCreatedAtAfter(lastReadAt);

        return WarningCheckNewResponse.of(hasNewWarnings);
    }
}
