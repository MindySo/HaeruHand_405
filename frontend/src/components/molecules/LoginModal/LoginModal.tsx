import { useNavigate, useSearch } from '@tanstack/react-router';
import theme from '../../../theme';
import { Button, Text } from '../../atoms';
import styles from './LoginModal.module.css';
import { useEffect, useRef } from 'react';
import { useKakaoLogin } from '../../../hooks/useKakaoLogin';
import { useAuth } from '../../../hooks/useAuth';
import { createPortal } from 'react-dom';

interface LoginModalProps {
  message: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({ message }) => {
  const search = useSearch as { code?: string };
  const { loginWithKakao, isLoading } = useKakaoLogin();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const hasProcessed = useRef(false); // 렌더링마다 초기화되지 않도록 useRef 사용

  // 이미 로그인된 경우, 모달은 안 띄우고 페이지는 그대로 유지
  if (isAuthenticated()) {
    return null;
  }

  // 메인 페이지로 이동하는 함수
  const goToMainPage = () => {
    navigate({ to: '/main' });
  };

  // URL에서 카카오 인증 코드 확인 및 처리
  useEffect(() => {
    if (search.code && !hasProcessed.current) {
      hasProcessed.current = true;
      loginWithKakao(search.code);
    }
  }, [search.code, loginWithKakao]);

  const handleKakaoLoginClick = () => {
    if (isLoading) return; // 로딩 중 중복 클릭 방지
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
    window.location.href = kakaoLoginUrl;
  };

  return createPortal(
    <div>
      {/* 오버레이(화면 전체를 덮는 흐린 배경 및 클릭 시 메인 페이지 이동) */}
      <div className={styles.overlay} onClick={goToMainPage} />

      {/* 모달 창 */}
      <div className={styles.modalWindow}>
        {/* 1. 닫기 버튼 (메인 페이지 이동) */}
        <button className={styles.closeButton}>
          <img
            src="/closeButtonGray.svg"
            alt="메인페이지 이동"
            className={styles.closeButtonIcon}
            onClick={goToMainPage}
          />
        </button>

        <div className={styles.content}>
          {/* 2. 안내 문구 */}
          <Text
            style={{
              marginTop: theme.spacing.md,
              padding: `${theme.spacing.lg} 0 ${theme.spacing.xs}`,
            }}
            align="center"
            size="xxl"
          >
            {message}하려면
          </Text>
          <Text
            style={{
              marginBottom: theme.spacing.md,
              padding: `0 0 ${theme.spacing.lg}`,
            }}
            align="center"
            size="xxl"
          >
            로그인이 필요해요!
          </Text>

          {/* 3. 버튼 */}
          <div className={styles.buttons}>
            <Button variant="kakao" onClick={handleKakaoLoginClick} disabled={isLoading}>
              {isLoading ? '로그인 중...' : '카카오로 시작하기'}
            </Button>
            <Button variant="secondary" onClick={goToMainPage}>
              메인페이지로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
