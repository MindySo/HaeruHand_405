package com.ssafy.haeruhand.domain.weather.controller;

import com.ssafy.haeruhand.domain.weather.dto.WeatherWarningUpsertResultResponse;
import com.ssafy.haeruhand.domain.weather.service.WeatherWarningRefreshService;
import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Tag(
        name = "WeatherWarning 갱신",
        description = "KMA 특보 API에서 텍스트를 가져와 제주 4개 권역(동/서/남/북)만 필터링하여 DB(WeatherWarning)에 업서트"
)
@RestController
@RequestMapping("/v1/weather/warnings")
@RequiredArgsConstructor
public class WeatherWarningRefreshController {

    private final WeatherWarningRefreshService weatherWarningRefreshService;

    @Operation(
            summary = "WeatherWarning 데이터 갱신",
            description = "기준(fe)은 미지정 시 'f'(발표 기준), 기준시각(tm)은 미지정 시 현재 기준으로 호출합니다. "
                    + "응답을 파싱 후 제주 동/서/남/북(REG_ID: L1090800/L1090600/L1090900/L1090700)만 저장합니다."
    )
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<WeatherWarningUpsertResultResponse>> refresh(
            @Parameter(description = "기준 선택: f=발표, e=발효 (미지정 시 f)", example = "f")
            @RequestParam(required = false) Optional<String> fe,
            @Parameter(description = "기준시각(YYYYMMDDHHmm). 미지정 시 현재 기준", example = "202508111200")
            @RequestParam(required = false) Optional<String> tm
    ) {
        WeatherWarningUpsertResultResponse result = weatherWarningRefreshService.refresh(fe, tm);
        return ApiResponse.success(SuccessStatus.OK, result);
    }
}
