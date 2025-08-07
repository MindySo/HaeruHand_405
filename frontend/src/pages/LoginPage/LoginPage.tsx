import React, { useEffect } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Button, Text } from '../../components/atoms';
import { theme } from '../../theme';
import styles from './LoginPage.module.css';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: '/login' });

  // URL에서 카카오 인증 코드 확인
  useEffect(() => {
    const code = search.code as string;
    if (code) {
      // 카카오 인증 코드가 있으면 로그인 처리
      handleKakaoLogin(code);
    }
  }, [search.code]);

  const handleKakaoLogin = async (code: string) => {
    try {
      console.log('카카오 인증 코드:', code);
      console.log('로그인 처리 시작...');

      const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/v1/user/issue/kakao`;
      console.log('🌐 API 요청 URL:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
        }),
      });

      console.log('📡 응답 상태:', response.status);
      console.log('📡 응답 헤더:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('📊 받아온 데이터:', data);

      if (data.is_success) {
        console.log('✅ 로그인 성공!');
        console.log('👤 사용자 정보:', data.data.user);
        console.log('⏰ 토큰 만료 시간:', data.data.accessTokenExpiresIn);

        // 토큰을 로컬 스토리지에 저장 (나중에 사용)
        localStorage.setItem('accessToken', data.data.accessTokenExpiresIn.toString());
        localStorage.setItem('userInfo', JSON.stringify(data.data.user));

        console.log('💾 토큰과 사용자 정보를 로컬 스토리지에 저장했습니다.');

        // LocationSelectionPage로 이동
        setTimeout(() => {
          console.log('📍 LocationSelectionPage로 이동합니다...');
          navigate({ to: '/location-select' });
        }, 1000);
      } else {
        console.error('❌ 로그인 실패:', data.message);
        throw new Error(data.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('❌ 로그인 실패:', error);
      console.error('🚫 에러 상세 정보:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const handleKakaoLoginClick = () => {
    console.log('🔐 카카오 로그인 시작...');

    // 카카오 로그인 URL로 리다이렉트
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;

    console.log('🌐 카카오 로그인 URL:', kakaoLoginUrl);
    window.location.href = kakaoLoginUrl;
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* 로고 */}
        <div className={styles.logo}>
          <Text size="hero" weight="bold" color="main">
            해루핸
          </Text>
          <Text size="md" color="gray" style={{ marginTop: theme.spacing.sm }}>
            안전한 해루질을 위한 스마트 가이드
          </Text>
        </div>

        {/* 로그인 버튼 */}
        <div className={styles.loginSection}>
          <Button
            variant="primary"
            size="large"
            onClick={handleKakaoLoginClick}
            className={styles.kakaoButton}
          >
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>K</span>
            카카오로 시작하기
          </Button>
        </div>

        {/* 약관 동의 */}
        <div className={styles.terms}>
          <Text size="xs" color="gray" align="center">
            로그인 시{' '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>서비스 이용약관</span>
            과{' '}
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
              개인정보 처리방침
            </span>
            에 동의하게 됩니다.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
