import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

interface TokenReissueResponse {
  is_success: boolean;
  code: number;
  message: string;
  data: {
    accessTokenExpiresIn: number;
  };
}

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 토큰 재발급 API 호출
  const { mutate: reissueToken } = useMutation({
    mutationFn: async () => {
      const refreshToken = sessionStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('Refresh token not found');

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/user/reissue`, {
        method: 'POST',
        headers: {
          'X-Refresh-Token': refreshToken,
        },
      });

      if (!response.ok) {
        throw new Error('Token reissue failed');
      }

      const data: TokenReissueResponse = await response.json();
      return data;
    },
    onSuccess: (data) => {
      if (data.is_success) {
        sessionStorage.setItem('accessToken', data.data.accessTokenExpiresIn.toString());
      }
    },
    onError: () => {
      // 토큰 재발급 실패 시 세션 스토리지 클리어
      sessionStorage.clear();
      navigate({ to: '/login' });
    },
  });

  // 로그아웃
  const logout = () => {
    sessionStorage.clear();
    queryClient.clear(); // React Query 캐시 클리어
    navigate({ to: '/login' });
  };

  // 인증 상태 확인
  const isAuthenticated = () => {
    const accessToken = sessionStorage.getItem('accessToken');
    const userInfo = sessionStorage.getItem('userInfo');
    return !!(accessToken && userInfo);
  };

  // 토큰 만료 여부 확인 및 재발급
  useEffect(() => {
    const checkTokenExpiration = async () => {
      const accessToken = sessionStorage.getItem('accessToken');
      if (!accessToken) return;

      try {
        // accessTokenExpiresIn이 현재 시간보다 이전이면 토큰 재발급
        const expiresIn = parseInt(accessToken, 10);
        if (Date.now() >= expiresIn) {
          await reissueToken();
        }
      } catch (error) {
        console.error('Token reissue failed:', error);
        logout();
      }
    };

    // 주기적으로 토큰 상태 확인 (5분마다)
    const interval = setInterval(checkTokenExpiration, 5 * 60 * 1000);

    // 컴포넌트 마운트 시 최초 1회 실행
    checkTokenExpiration();

    return () => clearInterval(interval);
  }, []);

  return {
    isAuthenticated,
    logout,
    reissueToken,
  };
};
