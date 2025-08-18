import { useCallback, useEffect, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

type ReissueBody = {
  is_success: boolean;
  code: number;
  message: string;
  data?: {
    // 서버가 바디에 만료초만 줄 수도 있음
    accessTokenExpiresIn?: number;
  };
};

const extractBearer = (value: string | null) => {
  if (!value) return '';
  const parts = value.split(' ');
  if (parts.length === 2 && /^Bearer$/i.test(parts[0])) return parts[1];
  return value;
};

const getAccessToken = () =>
  sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || '';

const getRefreshToken = () =>
  sessionStorage.getItem('refreshToken') || localStorage.getItem('refreshToken') || '';

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 인증 상태를 useMemo로 캐싱하여 불필요한 재계산 방지
  const authState = useMemo(() => {
    const token = getAccessToken();
    const userInfo = sessionStorage.getItem('userInfo') || localStorage.getItem('userInfo');
    const isAuth = Boolean(token && userInfo);

    // 개발 환경에서만 한 번씩 로그 출력
    if (import.meta.env.DEV && isAuth) {
      console.log('Auth check:', { hasToken: !!token, hasUserInfo: !!userInfo });
    }

    return { isAuth, token, userInfo };
  }, []);

  // 토큰 재발급 mutation
  const reissueToken = useMutation({
    mutationFn: async () => {
      const refreshToken = getRefreshToken();
      if (!refreshToken) throw new Error('Refresh token not found');

      const resp = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/user/reissue`, {
        method: 'POST',
        headers: {
          'X-Refresh-Token': refreshToken,
          Accept: 'application/json',
        },
        // credentials: 'include', // 쿠키 사용시
      });

      const accessHeader = resp.headers.get('Authorization') || resp.headers.get('authorization');
      const refreshHeader =
        resp.headers.get('X-Refresh-Token') || resp.headers.get('x-refresh-token');
      const expiresHeader =
        resp.headers.get('X-Access-Token-Expires-In') ||
        resp.headers.get('x-access-token-expires-in');

      const raw = await resp.text();
      let body: ReissueBody | undefined;
      try {
        body = raw ? (JSON.parse(raw) as ReissueBody) : undefined;
      } catch {
        // 바디가 없을 수도 있음(헤더만 갱신)
      }

      if (!resp.ok) {
        const msg = body?.message || raw || resp.statusText;
        throw new Error(`Token reissue failed: ${msg}`);
      }

      const nextAccess = extractBearer(accessHeader);
      const nextRefresh = refreshHeader || getRefreshToken();
      const expiresInSec = expiresHeader
        ? Number(expiresHeader)
        : (body?.data?.accessTokenExpiresIn ?? undefined);

      if (nextAccess && nextAccess.length > 20) {
        sessionStorage.setItem('accessToken', nextAccess);
      }
      if (nextRefresh) {
        sessionStorage.setItem('refreshToken', nextRefresh);
      }
      if (typeof expiresInSec === 'number' && !Number.isNaN(expiresInSec)) {
        const expiresAt = Date.now() + expiresInSec * 1000;
        sessionStorage.setItem('accessTokenExpiresAt', String(expiresAt));
      }

      return true;
    },
  });

  const logout = useCallback(() => {
    sessionStorage.clear();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessTokenExpiresAt');
    queryClient.clear();
    navigate({ to: '/login' });
  }, [navigate, queryClient]);

  // 인증 상태 확인 함수 - 캐시된 값 반환
  const isAuthenticated = useCallback(() => {
    return authState.isAuth;
  }, [authState.isAuth]);

  // 토큰 만료 체크는 5분마다만 실행
  useEffect(() => {
    const checkTokenExpiration = async () => {
      const expiresAtStr =
        sessionStorage.getItem('accessTokenExpiresAt') ||
        localStorage.getItem('accessTokenExpiresAt');
      if (!expiresAtStr) return;

      const expiresAt = Number(expiresAtStr);
      if (Number.isNaN(expiresAt)) return;

      // 만료 1분 전부터 미리 재발급
      const now = Date.now();
      if (now >= expiresAt - 60_000) {
        try {
          await reissueToken.mutateAsync();
        } catch (e) {
          console.error('Token reissue failed:', e);
          logout();
        }
      }
    };

    // 최초 1회 + 5분마다 체크
    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [reissueToken, logout]);

  return {
    isAuthenticated,
    logout,
    reissueToken: reissueToken.mutateAsync,
  };
};
