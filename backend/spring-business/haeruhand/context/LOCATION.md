# 버디 실시간 위치 공유 백엔드 개발 명세

> **목적**: Java / Spring Boot 소스 자동 생성용 단일 참조 문서  
> **범위**: 백엔드 API·데이터 모델·보안·실행 흐름 완전 명세 (프런트 상세 UI 제외)  
> **기술 스택**: Spring Boot 3 + MySQL + Redis + WebSocket (STOMP)

## 1. 서비스 시나리오

### 1.1 전체 플로우
1. **User 1** 로그인 상태 → "해루 시작하기" 클릭
2. `POST /api/v1/location/rooms` → 방(row) 생성 + 딥링크 반환
3. 클라이언트가 응답의 `deepLink` 문자열을 QR 코드로 렌더링
4. **User 2** QR 스캔 → OS 딥링크 처리 → 앱 열림
5. `accessToken` 유효성 확인 후 WebSocket CONNECT
6. 첫 참가 이후 모든 좌표를 **5초 간격**으로 `/pub/location.update` 전송
7. 서버가 Redis fan-out → 모든 단말 지도 실시간 갱신
8. 마지막 참가자가 "그만하기" / 앱 종료 → 서버 `onClose` → 방 `is_active=false`, `closed_at=now` → `ROOM_CLOSED` 브로드캐스트

### 1.2 딥링크 형식
```
seafeet://join?code=XYZ123&token=<joinToken>
```

## 2. API 명세

### 2.1 REST API

**Base URL**: `/api/v1`

| 기능 | METHOD | Path | Request Body | Response Body |
|------|--------|------|--------------|---------------|
| 방 생성 | POST | `/location/rooms` | 없음 (빈 요청 본문) | `roomId`, `roomCode`, `deepLink`, `startedAt` |
| 방 상태 조회 | GET | `/location/rooms/{roomCode}` | - | `roomInfo`, `members`, `deepLink`, `isActive` |
| 방 강제 종료 | DELETE | `/location/rooms/{roomCode}` | - | `success`, `closedAt` |

#### 2.1.1 방 생성 API 상세

**Request**:
```json
{}
```

**Response**:
```json
{
  "roomId": 1,
  "roomCode": "XYZ123",
  "deepLink": "seafeet://join?code=XYZ123&token=<joinToken>",
  "startedAt": "2025-08-05T14:00:00+09:00"
}
```

**필드 설명**:
- `roomCode`: 6자리 영숫자 조합 (예: "ABC123", "XYZ789")
   - 대소문자 구분 없음 (내부적으로 대문자로 통일)
   - 중복 방지를 위한 유니크 제약조건
- `deepLink`: QR 코드로 변환될 딥링크 URL
   - 형식: `seafeet://join?code={roomCode}&token={joinToken}`
   - 앱 미설치 시 플레이스토어/앱스토어로 리다이렉트
- `startedAt`: 방 생성 시각

#### 2.1.2 방 상태 조회 API

**GET** `/location/rooms/{roomCode}`

**Response**:
```json
{
  "roomInfo": {
    "roomId": 1,
    "roomCode": "XYZ123",
    "hostUserId": 1,
    "isActive": true,
    "startedAt": "2025-08-05T14:00:00+09:00",
    "elapsedMin": 17,
    "maxMembers": 4,
    "currentMemberCount": 2
  },
  "deepLink": "seafeet://join?code=XYZ123&token=<joinToken>",
  "members": [
    {
      "userId": 1,
      "nickname": "이규민1",
      "color": "#FF0000",
      "isHost": true,
      "joinedAt": "2025-08-05T14:00:00+09:00",
      "lastActiveAt": "2025-08-05T14:17:00+09:00"
    },
    {
      "userId": 2,
      "nickname": "이규민2", 
      "color": "#0084FF",
      "isHost": false,
      "joinedAt": "2025-08-05T14:05:00+09:00",
      "lastActiveAt": "2025-08-05T14:17:00+09:00"
    }
  ]
}
```

**주요 변경점**:
- `deepLink`: 모든 참가자가 다른 사람을 초대할 수 있도록 딥링크 제공
- `maxMembers`: 최대 참가 인원 (4명)
- `currentMemberCount`: 현재 참가자 수

#### 2.1.3 방 강제 종료 API

**DELETE** `/location/rooms/{roomCode}`

**Response**:
```json
{
  "success": true,
  "closedAt": "2025-08-05T14:17:30+09:00"
}
```

**정책**:
- QR 재사용: 딥링크 & roomCode는 생성 1회만 발급, 무제한 사용
- 방 종료: 마지막 WebSocket 세션 종료 시 자동 처리 (모든 사용자가 나가면 방 자동 비활성화)
- 기타 REST API (조회·종료·로그) 생략

### 2.2 WebSocket (STOMP)

| 항목 | 값 |
|------|-----|
| Endpoint | `wss://<host>/api/ws` |
| Protocol | STOMP over WebSocket |
| Ping/Pong | 25초 간격 |

#### 2.2.1 CONNECT 방식

**URL 파라미터**:
```
wss://<host>/api/ws?roomCode=XYZ123
```

**헤더** (테스트 환경에서는 생략 가능):
```
Authorization: Bearer <accessJWT>
join-token: <joinToken>
```

> **참고**: SockJS는 커스텀 헤더를 지원하지 않으므로 roomCode는 URL 파라미터로 전달합니다.

#### 2.2.2 SEND (클라이언트 → 서버)

| Destination | Payload | 설명 |
|-------------|---------|------|
| `/pub/location.join` | `{}` | 앱 최초 진입 시 1회 |
| `/pub/location.update` | 위치 정보 JSON | 5초마다 전송 |
| `/pub/location.leave` | `{}` | 선택사항 (onClose 자동 호출) |

**위치 업데이트 페이로드**:
```json
{
  "latitude": 33.442865,
  "longitude": 126.922899,
  "accuracy": 8.5,
  "sentAt": "2025-08-05T14:17:05+09:00"
}
```

**위치 전송 플로우**:
1. 클라이언트는 GPS/Location API를 통해 현재 위치 획득
2. 5초 간격으로 `/pub/location.update`로 위치 전송
3. 서버는 위치 정보를 저장하고 방의 모든 멤버에게 브로드캐스트
4. 각 클라이언트는 수신한 위치로 지도상 핀 위치 업데이트

#### 2.2.3 SUBSCRIBE (서버 → 클라이언트)

**구독 경로**: `/sub/location.{roomCode}`

**메시지 타입들**:

1. **멤버 목록** (처음 1회):
```json
{
  "type": "MEMBER_LIST",
  "elapsedMin": 17,
  "members": [
    {
      "userId": 1,
      "nickname": "오일우",
      "color": "#FF0000",
      "isHost": true,
      "lastActiveAt": "2025-08-05T14:17:00+09:00"
    },
    {
      "userId": 2,
      "nickname": "이규민",
      "color": "#0084FF", 
      "isHost": false,
      "lastActiveAt": "2025-08-05T14:16:55+09:00"
    }
  ]
}
```

2. **새 참가자**:
```json
{
  "type": "MEMBER_JOINED",
  "userId": 3,
  "nickname": "조예림",
  "color": "#00C851",
  "isHost": false,
  "joinedAt": "2025-08-05T14:17:10+09:00"
}
```

3. **실시간 위치**:
```json
{
  "type": "LOCATION",
  "userId": 2,
  "latitude": 33.442865,
  "longitude": 126.922899,
  "accuracy": 8.5,
  "receivedAt": "2025-08-05T14:17:10+09:00"
}
```

4. **타이머 업데이트** (1분마다):
```json
{
  "type": "TIMER_UPDATE",
  "elapsedMin": 18
}
```

5. **퇴장 알림**:
```json
{
  "type": "MEMBER_LEFT",
  "userId": 2,
  "nickname": "이규민2"
}
```

6. **방 종료**:
```json
{
  "type": "ROOM_CLOSED",
  "reason": "ALL_MEMBERS_LEFT|MANUAL",
  "closedAt": "2025-08-05T15:03:00+09:00",
  "totalDurationMin": 63
}
```

## 3. 데이터 모델

### 3.1 ERD 개념도
```
location_share_room (1) ──── (N) location_share_member
       │                            │
       │                            │
       └──── (N) user_location_log ─┘
```

### 3.2 DDL

#### 3.2.1 방 테이블
```sql
CREATE TABLE location_share_room (
  location_share_room_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  room_code VARCHAR(16) NOT NULL UNIQUE,
  host_user_id BIGINT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  started_at DATETIME NOT NULL,
  closed_at DATETIME NULL,
  INDEX idx_room_code (room_code),
  INDEX idx_host_user (host_user_id)
);

> **참고**: `title`과 `expires_at` 컴럼이 제거되었습니다.
```

#### 3.2.2 멤버 테이블
```sql
CREATE TABLE location_share_member (
  location_share_member_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  location_share_room_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  is_host BOOLEAN DEFAULT FALSE,
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_active_at DATETIME NULL,
  color CHAR(7) NOT NULL, -- HEX 색상 코드 (예: #FF0000)
  UNIQUE KEY uk_room_user (location_share_room_id, user_id),
  FOREIGN KEY (location_share_room_id) 
    REFERENCES location_share_room(location_share_room_id) 
    ON DELETE CASCADE
);
```

**색상 할당 정책**:
```java
// 미리 정의된 색상 팔레트 (최대 4명)
private static final String[] MEMBER_COLORS = {
    "#FF0000", // 빨강 (호스트)
    "#0084FF", // 파랑
    "#00C851", // 초록  
    "#FF6900"  // 주황
};
```

#### 3.2.3 위치 로그 테이블
```sql
CREATE TABLE user_location_log (
  user_location_log_id BIGINT PRIMARY KEY AUTO_INCREMENT,
  location_share_room_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  latitude DECIMAL(9,6) NOT NULL,
  longitude DECIMAL(9,6) NOT NULL,
  accuracy DECIMAL(5,2),
  timestamp DATETIME NOT NULL,
  INDEX idx_room_time (location_share_room_id, timestamp),
  INDEX idx_user_time (user_id, timestamp),
  FOREIGN KEY (location_share_room_id)
    REFERENCES location_share_room(location_share_room_id)
    ON DELETE CASCADE
);
```

## 4. 보안 및 인증

### 4.1 토큰 체계

| 토큰 | 발급 시점 | 클레임 | TTL | 저장소 | 사용 위치 |
|------|-----------|---------|-----|--------|-----------|
| `accessJWT` | Kakao OAuth → 앱 | `sub`(userId), `exp` | 1시간 | 없음 | 모든 REST + WS Authorization |
| `joinToken` | 방 생성 시 서버 | `room`(code), `sub`(방 생성자 userId), `jti`, `exp` | **방이 활성화된 동안** | Redis SET `jti:<uuid>` | WS join-token 헤더 |

### 4.2 joinToken 공유 정책
- **방별 공유 토큰**: 모든 참가자가 동일한 `joinToken` 사용
- **무제한 재사용**: 방이 활성화되어 있는 동안 계속 유효
- **TTL**: 방이 활성 상태인 동안 유효 (방 비활성화 시 무효화)
- **초대 체인**: User1 → User2 → User3/4 등 연쇄 초대 가능

### 4.3 WebSocket 인증 플로우
1. URL 파라미터에서 `roomCode` 추출
2. `room-code` 조회 → `location_share_room.is_active` 검사  
3. (테스트 환경에서는 아래 단계 생략 가능)
   - `accessJWT` 인증 → `userId` 추출
   - `joinToken` 서명·TTL 확인 (`room` claim 일치)
   - Redis `SETNX jti:<uuid>` "used" (선택사항)
4. `location_share_member` UPSERT (없으면 INSERT, 있으면 `last_active_at` 갱신)

## 5. Spring Boot 구현 세부사항

### 5.0 테스트 환경 설정

**CORS 설정** (SecurityConfig.java):
```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOriginPatterns(Arrays.asList("*"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

**DDL Auto 설정** (application-local.yml):
```yaml
jpa:
  hibernate:
    ddl-auto: update  # 테이블 스키마 변경 시 update 사용
```

### 5.1 Security Filter Chain
```java
@Configuration
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/v1/**").authenticated()
                .anyRequest().permitAll())
            .addFilterBefore(jwtAuthFilter, BearerTokenAuthenticationFilter.class)
            .build();
    }
}
```

### 5.2 WebSocket 설정
```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api/ws")
            .addInterceptors(new WsHandshakeInterceptor())
            .setAllowedOrigins("*");
    }
    
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/pub");
        registry.enableStompBrokerRelay("/sub")
            .setRelayHost("redis")
            .setRelayPort(6379);
    }
}
```

### 5.3 WsHandshakeInterceptor 핵심 로직
```java
@Component
public class WsHandshakeInterceptor implements HandshakeInterceptor {
    
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, 
                                 ServerHttpResponse response,
                                 WebSocketHandler wsHandler, 
                                 Map<String, Object> attributes) throws Exception {
        
        // 1. URL 파라미터에서 roomCode 추출
        String roomCode = extractRoomCodeFromUrl(request);
        LocationShareRoom room = roomService.findActiveRoom(roomCode);
        
        // 2. 테스트 환경에서는 임시 사용자 ID 사용
        // TODO: 실제 배포 시 accessJWT 인증 복원 필요
        Long userId = (long) (Math.random() * 4 + 1); // 1~4 순환
        
        // 3. 최대 인원 체크 (4명 제한)
        int currentMemberCount = memberService.getActiveMemberCount(room.getId());
        boolean isExistingMember = memberService.isMemberExists(room.getId(), userId);
        
        if (!isExistingMember && currentMemberCount >= 4) {
            throw new RoomFullException("방 참가 인원이 초과되었습니다. (최대 4명)");
        }
        
        // 4. 멤버 UPSERT (색상 자동 할당)
        memberService.upsertMember(room.getId(), userId);
        
        attributes.put("userId", userId);
        attributes.put("roomCode", roomCode);
        attributes.put("roomId", room.getId());
        
        return true;
    }
    
    private String extractRoomCodeFromUrl(ServerHttpRequest request) {
        String query = request.getURI().getQuery();
        if (query == null) {
            throw new IllegalArgumentException("roomCode parameter is missing");
        }
        
        String[] params = query.split("&");
        for (String param : params) {
            String[] keyValue = param.split("=");
            if (keyValue.length == 2 && "roomCode".equals(keyValue[0])) {
                return keyValue[1];
            }
        }
        
        throw new IllegalArgumentException("roomCode parameter is missing");
    }
}
```

### 5.4 위치 정보 배치 처리기
```java
@Component
public class LocationBatchWriter {
    
    private final BlockingQueue<LocationDto> locationQueue = new LinkedBlockingQueue<>();
    
    @Scheduled(fixedRate = 3000) // 3초마다
    public void flushLocationBatch() {
        List<LocationDto> batch = new ArrayList<>();
        locationQueue.drainTo(batch, 1000); // 최대 1000개
        
        if (batch.isEmpty()) {
            return;
        }
        
        jdbcTemplate.batchUpdate(
            """
            INSERT INTO user_location_log 
            (location_share_room_id, user_id, latitude, longitude, accuracy, timestamp) 
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            batch,
            batch.size(),
            (PreparedStatement ps, LocationDto location) -> {
                ps.setLong(1, location.getRoomId());
                ps.setLong(2, location.getUserId());
                ps.setBigDecimal(3, location.getLatitude());
                ps.setBigDecimal(4, location.getLongitude());
                ps.setBigDecimal(5, location.getAccuracy());
                ps.setTimestamp(6, Timestamp.valueOf(location.getTimestamp()));
            }
        );
    }
    
    public void enqueue(LocationDto location) {
        locationQueue.offer(location);
    }
}
```

## 6. Redis 연동

### 6.1 채널 구조
- **Pub/Sub Topic**: `location.{roomCode}`
- **STOMP 브로드캐스트**: `convertAndSend("/sub/location." + roomCode, message)`

### 6.2 세션 종료 처리
```java
@EventListener
public void handleSessionDisconnect(SessionDisconnectEvent event) {
    String roomCode = (String) event.getSession().getAttributes().get("roomCode");
    Long userId = (Long) event.getSession().getAttributes().get("userId");
    
    // 멤버 제거
    memberService.removeMember(roomCode, userId);
    
    // 남은 멤버 수 확인
    int remainingMembers = memberService.getActiveMemberCount(roomCode);
    
    if (remainingMembers == 0) {
        // 방 종료 처리
        roomService.closeRoom(roomCode);
        
        // ROOM_CLOSED 브로드캐스트
        messagingTemplate.convertAndSend(
            "/sub/location." + roomCode,
            new RoomClosedMessage(LocalDateTime.now())
        );
    } else {
        // MEMBER_LEFT 브로드캐스트
        messagingTemplate.convertAndSend(
            "/sub/location." + roomCode,
            new MemberLeftMessage(userId)
        );
    }
}
```

## 7. 프론트엔드 연동 가이드

### 7.1 화면 구성 및 네비게이션

#### 7.1.1 QR 코드 생성 화면
- **제목**: "버디를 등록하려는 사람에게 QR을 보여주세요"
- **QR 코드**: `deepLink` 문자열을 QR로 렌더링
- **하단 버튼**: "돌아가기" (이전 화면으로)

#### 7.1.2 파티 트래킹 화면 (다중 사용자)
- **상단 제목**: "파티 트래킹"
- **지도 영역**:
   - 모든 멤버의 실시간 위치 표시 (색상별 핀)
   - 좌표 정보 툴팁 (예: "33.442865, 126922899")
   - "아직 타이머" 텍스트 (진행 시간 표시)
- **멤버 리스트**:
   - 하단 고정 영역에 멤버별 색상과 닉네임 표시
   - 최대 4명까지 표시 (스크롤 불필요)
- **액션 버튼**:
   - "함께 해루하기 N분" (현재 진행 시간)
   - "그만하기" (종료 버튼)
- **초대 기능**:
   - 우상단 "+" 버튼으로 QR 코드 재표시 가능
   - 방이 가득 찬 경우(4명) "+" 버튼 비활성화

#### 7.1.3 개인 위치 트래킹 화면
- **상단 제목**: "내 위치 트래킹"
- **지도 영역**: 본인 위치만 표시
- **멤버 리스트**: 본인만 표시
- **액션 버튼**: "해루 시작하기 N분"

#### 7.1.4 종료 확인 모달
- **제목**: "정말 그만하실건가요?"
- **버튼**: "계속하기" / "그만하기"
- **배경**: 반투명 오버레이

### 7.2 딥링크 처리 플로우
```bash
appUrlOpen(deepLink)
 ├─ if (!accessToken) → /login?redirect=deepLink
 └─ else → /tracking/{roomCode}
            └─ connectWebSocket(roomCode, joinToken)
```

### 7.3 실시간 데이터 처리

#### 7.3.1 GPS 위치 수집 및 전송
```javascript
// 1. 위치 권한 요청
navigator.geolocation.getCurrentPosition(
    (position) => {
        const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            sentAt: new Date().toISOString()
        };
        
        // WebSocket으로 위치 전송
        stompClient.send('/pub/location.update', {}, JSON.stringify(location));
    },
    (error) => {
        console.error('GPS 오류:', error);
    },
    {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
);

// 2. 5초 간격 위치 업데이트
let locationInterval;

function startLocationTracking() {
    locationInterval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    sentAt: new Date().toISOString()
                };
                
                stompClient.send('/pub/location.update', {}, JSON.stringify(location));
            },
            (error) => {
                console.error('GPS 업데이트 오류:', error);
            }
        );
    }, 5000); // 5초마다
}

function stopLocationTracking() {
    if (locationInterval) {
        clearInterval(locationInterval);
    }
}
```

#### 7.3.2 다른 사용자 위치 수신 및 표시
```javascript
// 위치 메시지 수신 처리
stompClient.subscribe('/sub/location.' + roomCode, function(message) {
    const data = JSON.parse(message.body);
    
    switch(data.type) {
        case 'LOCATION':
            // 다른 사용자 위치 업데이트
            updateMemberLocation(data.userId, {
                latitude: data.latitude,
                longitude: data.longitude,
                accuracy: data.accuracy
            });
            break;
            
        case 'MEMBER_LIST':
            // 초기 멤버 목록 설정
            data.members.forEach(member => {
                addMemberToMap(member);
            });
            break;
            
        case 'MEMBER_JOINED':
            // 새 멤버 추가
            addMemberToMap(data);
            break;
            
        case 'MEMBER_LEFT':
            // 멤버 제거
            removeMemberFromMap(data.userId);
            break;
    }
});

// 지도 마커 관리
const memberMarkers = new Map();

function updateMemberLocation(userId, location) {
    const marker = memberMarkers.get(userId);
    if (marker) {
        // 기존 마커 위치 업데이트
        marker.setPosition({
            lat: location.latitude,
            lng: location.longitude
        });
    }
}

function addMemberToMap(member) {
    const marker = new google.maps.Marker({
        position: { lat: member.latitude || 0, lng: member.longitude || 0 },
        map: map,
        title: member.nickname,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: member.color,
            fillOpacity: 0.8,
            strokeColor: '#ffffff',
            strokeWeight: 2
        }
    });
    
    memberMarkers.set(member.userId, marker);
}

function removeMemberFromMap(userId) {
    const marker = memberMarkers.get(userId);
    if (marker) {
        marker.setMap(null);
        memberMarkers.delete(userId);
    }
}
```

#### 7.3.3 타이머 업데이트
```javascript
// TIMER_UPDATE 메시지 수신 시
onTimerUpdate(message) {
    const elapsedMin = message.elapsedMin;
    updateTimerDisplay(`함께 해루하기 ${elapsedMin}분`);
}
```

#### 7.3.4 종료 플로우
```javascript
// "그만하기" 버튼 클릭
onExitButtonClick() {
    showConfirmModal("정말 그만하실건가요?", {
        onConfirm: () => {
            websocket.send('/pub/location.leave', {});
            websocket.disconnect();
            navigateToHome();
        },
        onCancel: () => {
            hideConfirmModal();
        }
    });
}
```

### 7.4 GPS 위치 수집 모범 사례

#### 7.4.1 초기화 및 권한 처리
```javascript
// 위치 권한 확인 및 요청
async function initializeLocationTracking() {
    try {
        // 현재 권한 상태 확인
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
        
        if (permissionStatus.state === 'denied') {
            alert('위치 권한이 거부되어 실시간 위치 공유가 불가능합니다.');
            return false;
        }
        
        // 위치 권한 요청
        const position = await getCurrentPosition();
        if (position) {
            startLocationTracking();
            return true;
        }
    } catch (error) {
        console.error('Location initialization failed:', error);
        return false;
    }
}

function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
    });
}
```

#### 7.4.2 백그라운드 위치 추적 (Mobile)
```javascript
// React Native 예시
import BackgroundGeolocation from 'react-native-background-geolocation';

BackgroundGeolocation.configure({
    desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    distanceFilter: 10, // 10미터 이동 시 업데이트
    stopOnTerminate: false,
    startOnBoot: false,
    interval: 5000, // 5초
    fastestInterval: 5000
});

BackgroundGeolocation.on('location', (location) => {
    // WebSocket으로 위치 전송
    sendLocationUpdate(location.coords);
});
```

### 7.5 QR 코드 재표시
- `deepLink` 문자열을 그대로 QR 코드로 렌더링
- 재생성 불필요 (무제한 재사용 가능)

### 7.6 앱 미설치 대응
- 웹 랜딩 페이지 or Firebase Dynamic Links 활용
- 스토어 다운로드 링크 제공

## 8. 운영 고려사항

### 8.1 비즈니스 규칙
- **최대 멤버 수**: 4명 (색상 팔레트 제한)
- **방 종료 조건**: 모든 사용자가 나가면 자동 비활성화 (만료 시간 없음)
- **위치 업데이트 주기**: 5초 (배터리 최적화 고려)
- **타이머 업데이트**: 1분마다 모든 클라이언트에 브로드캐스트
- **비활성 멤버 처리**: 10분간 위치 업데이트 없으면 자동 퇴장
- **QR 코드 공유**: 모든 참가자가 동일한 딥링크로 다른 사람 초대 가능

### 8.2 GPS 위치 처리 상세

#### 8.2.1 클라이언트 GPS 수집
- **위치 권한**: 앱 설치 시 필수 권한 요청
- **정확도 설정**: 고정확도 모드 (enableHighAccuracy: true)
- **타임아웃**: 5초 이내 위치 획듍
- **백그라운드 위치**: iOS/Android 별도 처리 필요

#### 8.2.2 서버 위치 처리
- **실시간 브로드캐스트**: 수신 즉시 방의 모든 멤버에게 전달
- **배치 저장**: 3초마다 DB에 배치 INSERT
- **정확도 필터링**: accuracy > 100m인 경우 무시
- **좌표 검증**: 한국 영토 내 좌표만 허용

#### 8.2.3 클라이언트 수신 처리
- **마커 업데이트**: 수신한 위치로 즉시 마커 이동
- **부드러운 애니메이션**: 마커 이동 시 보간 처리
- **오프라인 표시**: 30초 이상 업데이트 없으면 회색 처리
- **경로 표시**: 옵션으로 이동 경로 표시 가능

### 8.3 모니터링 포인트
- WebSocket 연결 수 및 동시 방 개수
- Redis Pub/Sub 메시지 처리량
- 위치 데이터 배치 처리 지연시간
- 일별 위치 로그 데이터 증가량
- 평균 방 지속 시간 및 참여자 수
- 방 정원 초과 시도 횟수 (4명 제한)
- GPS 정확도 분포 및 오류율

### 8.4 성능 최적화
- **위치 데이터 압축**: 소수점 6자리로 제한 (약 1m 정확도)
- **비활성 방 정리**: 매시간 `is_active=false` 방 정리
- **Redis 메모리 관리**: 방 비활성화 시 관련 데이터 삭제
- **배치 처리**: 위치 로그 3초마다 배치 INSERT (최대 1000건)
- **위치 캐싱**: 최근 위치 Redis에 TTL 30초로 저장

### 8.5 장애 대응
- **WebSocket 재연결**: 3초 간격으로 최대 5회 재시도
- **Redis 장애**: In-memory fallback 모드 전환
- **DB 커넥션 풀**: HikariCP 설정 최적화
- **타임아웃 설정**:
   - WebSocket: 30초
   - HTTP: 10초
   - DB 쿼리: 5초
- **GPS 오류 처리**: 위치 획듍 실패 시 마지막 위치 사용

### 8.6 보안 강화
- **Rate Limiting**:
   - 방 생성: 사용자당 시간당 5개
   - 위치 업데이트: 초당 2회
- **지역 제한**: 한국 내 좌표만 허용
- **악용 방지**: 동일 IP에서 동시 방 생성 제한
- **위치 정보 암호화**: 전송 구간 TLS 적용