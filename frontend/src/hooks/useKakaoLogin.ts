import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

interface KakaoLoginResponseBody {
  is_success: boolean;
  data: {
    user: any;
    // 서버가 바디에 만료값만 넣어줄 수도 있음
    accessTokenExpiresIn?: number | string;
  };
  message?: string;
}

type KakaoLoginResult = {
  body: KakaoLoginResponseBody;
  accessToken?: string;
  refreshToken?: string;
  expiresInSec?: number; // 초 단위(헤더 or 바디 기반)
};

const extractBearer = (value: string | null) => {
  if (!value) return '';
  // ex) "Bearer eyJhbGciOi..."
  const parts = value.split(' ');
  if (parts.length === 2 && /^Bearer$/i.test(parts[0])) return parts[1];
  return value; // 혹시 "eyJ..."만 오는 경우 대비
};

const kakaoLoginApi = async (code: string): Promise<KakaoLoginResult> => {
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/v1/user/issue/kakao`;

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // 쿠키로 토큰을 주는 서버라면 ↓ 주석 해제 + 서버 CORS에 credentials 허용 필요
    // credentials: 'include',
    body: JSON.stringify({ code }),
  });

  const accessHeader =
    response.headers.get('Authorization') || response.headers.get('authorization');
  const refreshHeader =
    response.headers.get('X-Refresh-Token') || response.headers.get('x-refresh-token');
  const expiresHeader =
    response.headers.get('X-Access-Token-Expires-In') ||
    response.headers.get('x-access-token-expires-in');

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`HTTP ${response.status} ${response.statusText} ${errText}`);
  }

  const body: KakaoLoginResponseBody = await response.json();

  const accessToken = extractBearer(accessHeader);
  const refreshToken = refreshHeader || '';
  const expiresInSec = expiresHeader
    ? Number(expiresHeader)
    : body.data?.accessTokenExpiresIn
      ? Number(body.data.accessTokenExpiresIn)
      : undefined;

  return { body, accessToken, refreshToken, expiresInSec };
};

export const useKakaoLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: kakaoLoginApi,
    onSuccess: ({ body, accessToken, refreshToken, expiresInSec }) => {
      if (!body.is_success) {
        throw new Error(body.message || '카카오 로그인 실패');
      }

      // 1) user 저장
      sessionStorage.setItem('userInfo', JSON.stringify(body.data.user));

      // 2) access / refresh 저장 (헤더 우선)
      if (accessToken && accessToken.length > 20) {
        sessionStorage.setItem('accessToken', accessToken);
      } else {
        // 서버가 바디에 토큰을 줄 수도 있으니 필요시 여기에 대체 경로 추가
        // sessionStorage.setItem('accessToken', body.data.accessToken);
      }

      if (refreshToken) {
        sessionStorage.setItem('refreshToken', refreshToken);
      }

      // 3) 만료 시각 저장 (밀리초 타임스탬프)
      if (typeof expiresInSec === 'number' && !Number.isNaN(expiresInSec)) {
        const expiresAt = Date.now() + expiresInSec * 1000;
        sessionStorage.setItem('accessTokenExpiresAt', String(expiresAt));
      }

      // 4) 토큰이 완전히 저장된 후 네비게이션 (약간의 지연)
      setTimeout(() => {
        navigate({ to: '/map' });
      }, 100);
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      alert(error instanceof Error ? error.message : '로그인에 실패했습니다.');
    },
  });

  const loginWithKakao = (code: string) => {
    mutation.mutate(code);
  };

  return {
    loginWithKakao,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
