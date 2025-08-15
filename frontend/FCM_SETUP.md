# FCM (Firebase Cloud Messaging) 설정 가이드

## 📋 설정 순서

### 1. Firebase 패키지 설치

```bash
npm install firebase
```

### 2. Firebase 콘솔에서 VAPID 키 가져오기

1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. 프로젝트 선택: `haeruhand-e75bf`
3. 프로젝트 설정 → 클라우드 메시징 탭
4. 웹 푸시 인증서에서 VAPID 키 복사
5. `src/config/constants.ts` 파일의 `VAPID_KEY` 값을 업데이트

### 3. 설정 파일 확인

- ✅ `src/config/firebase.ts` - Firebase 초기화
- ✅ `src/hooks/useFCM.ts` - FCM 토큰 관리 훅
- ✅ `src/hooks/useFCMWithSocket.ts` - 소켓과 연동된 FCM 훅
- ✅ `public/firebase-messaging-sw.js` - Service Worker (백그라운드 알림)
- ✅ `src/config/constants.ts` - FCM 관련 상수

### 4. 사용 방법

#### 기본 사용법

```tsx
import { useFCMWithSocket } from './hooks/useFCMWithSocket';

function App() {
  const { isRegistered, error, connected } = useFCMWithSocket(userId);

  // 소켓이 연결되면 자동으로 FCM이 초기화됩니다
  return (
    <div>
      {error && <div>FCM 오류: {error}</div>}
      {isRegistered && <div>FCM 등록 완료!</div>}
    </div>
  );
}
```

#### 수동으로 FCM 초기화

```tsx
import { useFCM } from './hooks/useFCM';

function MyComponent() {
  const {
    initializeFCM,
    handleForegroundMessage,
    updateToken,
    deleteToken,
    sendNotification,
    checkFCMService,
    tokenId,
    isRegistered,
  } = useFCM();

  const handleLogin = async (userId: number) => {
    const success = await initializeFCM(userId);
    if (success) {
      console.log('FCM 초기화 성공');
    }
  };

  const handleTokenUpdate = async (newToken: string) => {
    const success = await updateToken(newToken);
    if (success) {
      console.log('토큰 갱신 성공');
    }
  };

  const handleLogout = async () => {
    const success = await deleteToken();
    if (success) {
      console.log('토큰 삭제 성공');
    }
  };

  const handleSendNotification = async () => {
    const result = await sendNotification({
      token: 'fcm-token-here',
      title: '테스트 알림',
      body: '이것은 테스트 알림입니다.',
    });

    if (result) {
      console.log('알림 전송 성공:', result);
    }
  };

  const handleCheckService = async () => {
    const isHealthy = await checkFCMService();
    if (isHealthy) {
      console.log('FCM 서비스가 정상 동작 중입니다');
    }
  };

  return (
    <div>
      <button onClick={() => handleLogin(123)}>FCM 초기화</button>
      {isRegistered && (
        <>
          <button onClick={() => handleTokenUpdate('new-token')}>토큰 갱신</button>
          <button onClick={handleLogout}>토큰 삭제</button>
          <button onClick={handleSendNotification}>알림 전송</button>
          <button onClick={handleCheckService}>서비스 상태 확인</button>
        </>
      )}
    </div>
  );
}
```

## 🔧 주요 기능

### 1. 소켓 연결 상태에 따른 자동 초기화

- WebSocket이 연결되면 자동으로 FCM 토큰을 생성하고 백엔드에 등록
- 소켓 연결이 끊어지면 FCM 메시지 수신도 중단

### 2. 포그라운드/백그라운드 알림 지원

- **포그라운드**: 앱이 활성화된 상태에서 알림 수신
- **백그라운드**: 앱이 비활성화된 상태에서 Service Worker를 통한 알림 수신

### 3. 토큰 자동 갱신

- 로그인 시마다 새로운 FCM 토큰 생성
- 기존 토큰은 백엔드에서 자동으로 무효화

## ⚠️ 주의사항

### HTTPS 필수

- FCM은 HTTPS 환경에서만 동작 (localhost 제외)
- 개발 환경에서는 `localhost`에서도 동작

### Service Worker 위치

- `firebase-messaging-sw.js` 파일은 반드시 루트 디렉토리(`public/`)에 위치해야 함

### VAPID 키 설정

- Firebase 콘솔에서 VAPID 키를 가져와서 `constants.ts`에 설정해야 함
- 설정하지 않으면 FCM 토큰 생성이 실패함

## 🐛 문제 해결

### 알림 권한이 거부된 경우

```tsx
// 브라우저 설정에서 알림 권한을 수동으로 허용해야 함
// Chrome: 설정 → 개인정보 보호 및 보안 → 사이트 설정 → 알림
```

### Service Worker 등록 실패

```tsx
// 브라우저 개발자 도구 → Application → Service Workers에서 확인
// 파일 경로가 올바른지 확인
```

### FCM 토큰 생성 실패

```tsx
// 1. VAPID 키가 올바르게 설정되었는지 확인
// 2. Firebase 프로젝트 설정이 올바른지 확인
// 3. 네트워크 연결 상태 확인
```

## 📝 API 엔드포인트

### FCM 토큰 등록

```
POST /v1/notifications/tokens
Headers: {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {accessToken}',
  'X-User-Id': '{userId}'
}
Body: {
  fcmToken: 'string'
}
Response: {
  "is_success": true,
  "code": 0,
  "message": "string",
  "data": {
    "tokenId": 0,
    "maskedToken": "string",
    "isActive": true,
    "lastUsedAt": "2025-08-12T13:25:33.543Z"
  }
}
```

### FCM 토큰 갱신

```
PUT /v1/notifications/tokens/{tokenId}
Headers: {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {accessToken}'
}
Body: {
  fcmToken: 'string'
}
Response: {
  "is_success": true,
  "code": 0,
  "message": "string",
  "data": {
    "tokenId": 0,
    "maskedToken": "string",
    "isActive": true,
    "lastUsedAt": "2025-08-12T13:25:33.540Z"
  }
}
```

### FCM 토큰 삭제

```
DELETE /v1/notifications/tokens/{tokenId}
Headers: {
  'Authorization': 'Bearer {accessToken}'
}
Response: {
  "is_success": true,
  "code": 0,
  "message": "string",
  "data": {}
}
```

### FCM 알림 전송

```
POST /v1/notifications/send
Headers: {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer {accessToken}'
}
Body: {
  "token": "string",
  "title": "string",
  "body": "string"
}
Response: {
  "is_success": true,
  "code": 0,
  "message": "string",
  "data": {
    "maskedToken": "string",
    "title": "string",
    "body": "string",
    "firebaseMessageId": "string",
    "sentAt": "string"
  }
}
```

### FCM 서비스 상태 확인

```
GET /v1/notifications/ping
Headers: {
  'Authorization': 'Bearer {accessToken}'
}
Response: {
  "is_success": true,
  "code": 0,
  "message": "string",
  "data": "string"
}
```

## 🔄 업데이트 로그

- **v1.0.0**: 초기 FCM 설정 및 소켓 연동
- 소켓 연결 상태에 따른 자동 FCM 초기화
- 포그라운드/백그라운드 알림 지원
- 토큰 자동 갱신 로직
