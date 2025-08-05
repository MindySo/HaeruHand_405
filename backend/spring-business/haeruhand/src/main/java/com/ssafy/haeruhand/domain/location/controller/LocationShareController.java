package com.ssafy.haeruhand.domain.location.controller;

import com.ssafy.haeruhand.domain.location.dto.response.CloseRoomResponse;
import com.ssafy.haeruhand.domain.location.dto.response.CreateRoomResponse;
import com.ssafy.haeruhand.domain.location.dto.response.RoomInfoResponse;
import com.ssafy.haeruhand.domain.location.service.LocationShareRoomService;
import com.ssafy.haeruhand.global.response.ApiResponse;
import com.ssafy.haeruhand.global.status.SuccessStatus;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@Tag(name = "위치 공유", description = "실시간 위치 공유 관련 API")
@RestController
@RequestMapping("/api/v1/location")
@RequiredArgsConstructor
public class LocationShareController {

    private final LocationShareRoomService roomService;

    @Operation(summary = "방 생성", description = "위치 공유를 위한 방을 생성합니다")
    @PostMapping("/rooms")
    public ResponseEntity<ApiResponse<CreateRoomResponse>> createRoom() {
        
        // 테스트용 임시 사용자 ID (실제 배포 시 Authentication에서 추출)
        Long userId = 1L;
        CreateRoomResponse response = roomService.createRoom(userId);
        
        return ApiResponse.success(SuccessStatus.OK, response);
    }

    @Operation(summary = "방 정보 조회", description = "방 코드로 방 정보를 조회합니다")
    @GetMapping("/rooms/{roomCode}")
    public ResponseEntity<ApiResponse<RoomInfoResponse>> getRoomInfo(@PathVariable String roomCode) {
        RoomInfoResponse response = roomService.getRoomInfo(roomCode);
        return ApiResponse.success(SuccessStatus.OK, response);
    }

    @Operation(summary = "방 강제 종료", description = "활성화된 방을 강제로 종료합니다")
    @DeleteMapping("/rooms/{roomCode}")
    public ResponseEntity<ApiResponse<CloseRoomResponse>> closeRoom(@PathVariable String roomCode) {
        CloseRoomResponse response = roomService.closeRoom(roomCode);
        return ApiResponse.success(SuccessStatus.OK, response);
    }
}