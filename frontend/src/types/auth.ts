// 카카오 로그인 요청 타입
export interface KakaoLoginRequest {
  code: string;
}

// 카카오 로그인 응답 타입
export interface KakaoLoginResponse {
  is_success: boolean;
  code: number;
  message: string;
  data: {
    accessTokenExpiresIn: number;
    user: {
      userId: number;
      kakaoSub: number;
      nickname: string;
      profileImageUrl: string;
    };
  };
}

// 토큰 재발급 응답 타입
export interface TokenReissueResponse {
  is_success: boolean;
  code: number;
  message: string;
  data: {
    accessTokenExpiresIn: number;
  };
}

// 유저 정보 응답 타입
export interface UserInfoResponse {
  is_success: boolean;
  code: number;
  message: string;
  data: {
    userId: number;
    kakaoSub: number;
    nickname: string;
    profileImageUrl: string;
  };
}

// 유저 정보 타입
export interface User {
  userId: number;
  kakaoSub: number;
  nickname: string;
  profileImageUrl: string;
}

// 인증 상태 타입
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// 카카오 SDK 타입
declare global {
  interface Window {
    Kakao: {
      init: (appKey: string) => void;
      Auth: {
        authorize: (options: { redirectUri: string }) => void;
        getAccessToken: () => string | null;
        getRefreshToken: () => string | null;
        setAccessToken: (token: string) => void;
        setRefreshToken: (token: string) => void;
        logout: () => void;
      };
      API: {
        request: (options: {
          url: string;
          success: (response: any) => void;
          fail: (error: any) => void;
        }) => void;
      };
    };
  }
}
