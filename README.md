# 🎣 해루핸 (Haeruhand) - 안전한 해루질 서비스

<div align="center">
  <img src="https://img.shields.io/badge/Spring%20Boot-3.5.4-brightgreen?style=for-the-badge&logo=springboot" alt="Spring Boot">
  <img src="https://img.shields.io/badge/Java-17-blue?style=for-the-badge&logo=openjdk" alt="Java">
  <img src="https://img.shields.io/badge/MySQL-8.0-orange?style=for-the-badge&logo=mysql" alt="MySQL">
  <img src="https://img.shields.io/badge/Redis-7.2-red?style=for-the-badge&logo=redis" alt="Redis">
  <br>
  <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Capacitor-7.4.2-119EFF?style=for-the-badge&logo=capacitor" alt="Capacitor">
</div>

## 📋 목차
- [프로젝트 소개](#-프로젝트-소개)
- [핵심 기능](#-핵심-기능)
- [시스템 아키텍처](#-시스템-아키텍처)
- [기술 스택](#-기술-스택)
- [API 명세](#-api-명세)
- [개발팀](#-개발팀)

## 🎯 프로젝트 소개

해루핸(Haeruhand)는 해루질을 하고 싶어하는 초보자를 위한 종합 스마트 서비스 플랫폼입니다. 실시간 위치 공유, AI 기반 어종 판별, 금어기 정보 제공, 해양 기상 정보 등 해루질에 필요한 모든 정보를 한 곳에서 제공합니다.

### 프로젝트 목표
- 안전한 해루질 활동 지원을 위한 실시간 위치 공유 시스템
- AI 기술을 활용한 즉각적인 어종 판별 및 금어기 정보 제공
- 해양 기상 특보 알림을 통한 사고 예방
- 해루질 관련 법규 준수를 위한 정보 제공

## 🚀 핵심 기능

### 1. 🗺️ 실시간 위치 공유 시스템
- **WebSocket/STOMP 기반 실시간 통신**
- 최대 4명까지 동시 위치 공유
- 호스트 기반 방 관리 시스템
- 딥링크를 통한 간편한 방 참가
- 멤버별 색상 구분 시스템

### 2. 🤖 AI 어종 판별 시스템
- **FastAPI AI 서버 연동**
- 이미지 업로드 → 어종 자동 판별
- 판별된 어종의 금어기 정보 즉시 제공

### 3. 🚫 금어기 정보 관리
- **어종별 포획 금지 기간 DB**
- 지역별(권역별) 차별화된 금어기 적용
- 최소 체장/체중 제한 정보 제공
- 실시간 금어기 위반 여부 판별

### 4. 📱 푸시 알림 시스템
- **Firebase Cloud Messaging (FCM) 기반**
- 동료 이탈 알림
- 해양 기상 특보 알림
- 다중 디바이스 지원

### 5. 🌊 해양 정보 제공
- **조수 정보** (만조/간조 시간)
- **기상 특보** (강풍, 풍랑 등)
- **어장 정보** (위치, 편의시설)

### 6. 🔐 보안 인증 시스템
- **Kakao OAuth 2.0 소셜 로그인**
- JWT 기반 인증 (Access Token + Refresh Token)
- Redis 기반 토큰 관리

## 🏗️ 시스템 아키텍처

```mermaid
여기 예림이가 그린 아키텍처 추가
```

### 백엔드 아키텍처 - 도메인 중심 설계 (DDD)
```
backend/spring-business/haeruhand/
└── src/main/java/com/ssafy/haeruhand/
    ├── domain/
    │   ├── user/          # 사용자 관리
    │   ├── location/      # 실시간 위치 공유
    │   ├── fish/          # 어종 및 금어기
    │   ├── ai/            # AI 어종 판별
    │   ├── notification/  # 푸시 알림
    │   ├── fishery/       # 어장 정보
    │   ├── marine/        # 해양 정보
    │   └── weather/       # 날씨 정보
    └── global/            # 공통 설정 및 유틸리티
        ├── config/        # 설정 클래스
        ├── jwt/           # JWT 관련
        ├── websocket/     # WebSocket 설정
        └── exception/     # 예외 처리
```

### 프론트엔드 아키텍처 - Atomic Design Pattern
```
frontend/
└── src/
    ├── components/
    │   ├── atoms/          # 기본 UI 요소
    │   │   ├── Button/
    │   │   ├── Input/
    │   │   ├── Text/
    │   │   └── Icon/
    │   └── molecules/      # 복합 컴포넌트
    │       ├── Card/
    │       ├── Form/
    │       ├── Header/
    │       └── Modal/
    ├── pages/              # 페이지 컴포넌트
    │   ├── MainPage/       # 메인 화면
    │   ├── LoginPage/      # 로그인
    │   ├── WeatherAlertPage/ # 날씨 알림
    │   ├── LocationSharePage/ # 위치 공유
    │   ├── FishDetectPage/ # 어종 판별
    │   ├── FisheryMapPage/ # 어장 지도
    │   └── NotificationPage/ # 알림 설정
    ├── routes/             # 라우팅 설정
    ├── api/                # API 통신
    ├── hooks/              # 커스텀 훅
    ├── stores/             # 전역 상태 관리
    ├── types/              # TypeScript 타입 정의
    └── utils/              # 유틸리티 함수
```

## 🛠️ 기술 스택

### Backend
- **Spring Boot 3.5.4** - 최신 버전 적용
- **Java 17** - LTS 버전
- **Spring Data JPA** - ORM
- **Spring Security** - 보안
- **Spring WebSocket** - 실시간 통신
- **MySQL** - 주 데이터베이스
- **Redis** - 캐싱 및 세션 관리
- **Firebase Admin SDK** - FCM 푸시 알림
- **Google Cloud Storage** - 이미지 저장소
- **Kakao OAuth 2.0** - 소셜 로그인
- **FastAPI** - AI 서버 연동
- **Swagger/OpenAPI 3.0** - API 문서화
- **Lombok** - 코드 간소화
- **JWT (io.jsonwebtoken)** - 토큰 관리

### Frontend
- **React 19.1.0** - 최신 버전 UI 라이브러리
- **TypeScript 5.8.3** - 타입 안정성
- **Vite 7.0.4** - 빠른 빌드 도구
- **Capacitor 7.4.2** - 크로스 플랫폼 모바일 앱
- **TanStack Router** - 타입 안전 라우팅
- **TanStack Query** - 서버 상태 관리
- **Zustand** - 클라이언트 상태 관리
- **Axios** - HTTP 클라이언트
- **CSS Modules** - 스타일 캡슐화
- **React Hook Form** - 폼 관리
- **Framer Motion** - 애니메이션
- **Socket.io Client** - WebSocket 통신

## 📡 API 명세

### 인증 관련 API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/user/issue/kakao` | 카카오 OAuth 로그인 |
| POST | `/v1/user/reissue` | 토큰 재발급 |
| GET | `/v1/user/userinfo` | 사용자 정보 조회 |

### 위치 공유 API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/location/rooms` | 위치 공유 방 생성 |
| GET | `/v1/location/rooms/{roomCode}` | 방 정보 조회 |
| DELETE | `/v1/location/rooms/{roomCode}` | 방 강제 종료 |

### WebSocket 엔드포인트
| Endpoint | Description |
|----------|-------------|
| `/v1/ws` | WebSocket 연결 |
| `/pub/location.join` | 방 참가 |
| `/pub/location.update` | 위치 업데이트 |
| `/pub/location.leave` | 방 퇴장 |
| `/sub/location.{roomCode}` | 방 구독 |

### AI 어종 판별 API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/seafood-detect` | 어종 판별 요청 |
| POST | `/v1/storage/signed-urls` | 이미지 업로드 URL 생성 |

### 알림 관련 API
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/notifications/tokens` | FCM 토큰 등록 |
| PUT | `/v1/notifications/tokens/{tokenId}` | FCM 토큰 갱신 |
| DELETE | `/v1/notifications/tokens/{tokenId}` | FCM 토큰 삭제 |

## 🔐 보안 및 인증

### JWT 토큰 구조
```json
{
  "accessToken": {
    "expiry": "1시간",
    "usage": "API 요청 인증"
  },
  "refreshToken": {
    "expiry": "7일",
    "usage": "Access Token 갱신",
    "storage": "Redis"
  },
  "joinToken": {
    "expiry": "30분",
    "usage": "위치 공유 방 참가"
  }
}
```

### 보안 특징
- **Redis 기반** Refresh Token 관리

### API 문서
서버 실행 후 Swagger UI 접속:
```
http://i13a405.p.ssafy.io/api/swagger-ui/index.html
```

## 📱 모바일 앱 지원

### 크로스 플랫폼 지원
- **Capacitor 7.4.2** 기반 하이브리드 앱
- **iOS/Android** 네이티브 앱 빌드 지원
- **Progressive Web App (PWA)** 대응

### 네이티브 기능 연동
- **GPS/위치 서비스** - 실시간 위치 추적
- **카메라** - 어종 촬영 및 판별
- **푸시 알림** - FCM 연동
- **딥링크** - 앱 간 연동 (`seafeet://`)
- **로컬 스토리지** - 오프라인 데이터 저장

## 📊 성능 최적화

### 백엔드 최적화
- **STOMP 프로토콜** 사용으로 메시지 라우팅 효율화
- **배치 처리**를 통한 위치 데이터 저장 최적화
- **@Async** 어노테이션을 통한 FCM 알림 비동기 전송

### 프론트엔드 최적화
- **Code Splitting** - 라우트 기반 코드 분할
- **Lazy Loading** - 컴포넌트 지연 로딩
- **이미지 최적화** - WebP 포맷 및 responsive images
- **Virtual Scrolling** - 대량 데이터 렌더링 최적화
- **React.memo** - 불필요한 리렌더링 방지

## 🔄 CI/CD

### Jekins

## 👥 개발팀

### 팀 구성
- **백엔드 개발** - Spring Boot, WebSocket, JWT, FCM
- **프론트엔드 개발** - React, TypeScript, Capacitor
- **AI/ML** - FastAPI, 어종 판별 모델
- **DevOps** - Jenkins, Docker, AWS

---

<div align="center">
  <sub>Built with ❤️ by SSAFY A405 Team</sub>
</div>