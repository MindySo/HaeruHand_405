import React, { useEffect, useRef } from 'react';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { Button, Text } from '../../components/atoms';
import { theme } from '../../theme';
import { useKakaoLogin } from '../../hooks/useKakaoLogin';
import { useAuth } from '../../hooks/useAuth';
import styles from './LoginPage.module.css';

export const LoginPage: React.FC = () => {
  const search = useSearch({ from: '/login' }) as { code?: string };
  const { loginWithKakao, isLoading } = useKakaoLogin();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isProcessedRef = useRef(false);

  // 이미 인증된 사용자는 LocationSelect 페이지로 리다이렉트
  useEffect(() => {
    if (isAuthenticated()) {
      console.log('이미 로그인된 사용자');
      navigate({ to: '/map' });
      return;
    }

    // URL에서 카카오 인증 코드 확인 및 처리
    if (search.code && !isProcessedRef.current) {
      isProcessedRef.current = true;
      console.log('카카오 인증 코드 처리 시작:', search.code);
      loginWithKakao(search.code);
    }
  }, [search.code, isAuthenticated, navigate, loginWithKakao]);

  const handleKakaoLoginClick = () => {
    console.log('카카오 로그인 시작...');
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
    console.log('카카오 로그인 URL:', kakaoLoginUrl);
    window.location.href = kakaoLoginUrl;
  };

  // 이미 인증된 상태라면 로딩 표시
  if (isAuthenticated()) {
    return <div>리다이렉트 중...</div>;
  }

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
            disabled={isLoading}
          >
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>K</span>
            {isLoading ? '로그인 중...' : '카카오로 시작하기'}
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
