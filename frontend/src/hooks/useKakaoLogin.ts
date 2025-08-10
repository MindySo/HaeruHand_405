import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

interface KakaoLoginResponse {
  is_success: boolean;
  data: {
    user: any;
    accessTokenExpiresIn: string;
  };
  message?: string;
}

interface KakaoLoginRequest {
  code: string;
}

const kakaoLoginApi = async (code: string): Promise<KakaoLoginResponse> => {
  const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/v1/user/issue/kakao`;

  console.log('API 요청 URL:', apiUrl);
  console.log('카카오 인증 코드:', code);

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  console.log('응답 상태:', response.status);
  console.log('응답 헤더:', Object.fromEntries(response.headers.entries()));

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log('받아온 데이터:', data);

  return data;
};

export const useKakaoLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: kakaoLoginApi,
    onSuccess: (data) => {
      if (data.is_success) {
        console.log('로그인 성공!');
        console.log('사용자 정보:', data.data.user);
        console.log('토큰 만료 시간:', data.data.accessTokenExpiresIn);

        // 토큰을 세션 스토리지에 저장
        sessionStorage.setItem('accessToken', data.data.accessTokenExpiresIn.toString());
        sessionStorage.setItem('userInfo', JSON.stringify(data.data.user));

        console.log('토큰과 사용자 정보를 세션 스토리지에 저장했습니다.');

        // LocationSelectionPage로 이동
        setTimeout(() => {
          console.log('LocationSelectionPage로 이동합니다...');
          navigate({ to: '/map' });
        }, 1000);
      } else {
        console.error('로그인 실패:', data.message);
        throw new Error(data.message || '로그인에 실패했습니다.');
      }
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      console.error('에러 상세 정보:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      });
    },
  });

  const loginWithKakao = (code: string) => {
    console.log('로그인 처리 시작...');
    mutation.mutate(code);
  };

  return {
    loginWithKakao,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};
