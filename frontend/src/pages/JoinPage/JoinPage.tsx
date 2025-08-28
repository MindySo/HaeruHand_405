import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../hooks/useAuth';
import { Text } from '../../components/atoms';
import styles from './JoinPage.module.css';

export default function JoinPage() {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roomCode = params.get('code');
    const token = params.get('token');

    if (!roomCode || !token) {
      console.error('필수 파라미터가 없습니다:', { roomCode, token });
      navigate({ to: '/main' });
      return;
    }

    // 로그인 상태 확인
    const isLoggedIn = isAuthenticated();

    // 세션에 정보 저장하고 이동하는 함수
    const saveAndNavigate = () => {
      if (isLoggedIn) {
        // 로그인 상태: 바로 방 참여
        const deepLink = `https://haeruhand.o-r.kr/join?code=${roomCode}&token=${token}`;
        sessionStorage.setItem(
          'locationRoom',
          JSON.stringify({ roomId: null, roomCode, deepLink, joinToken: token }),
        );
        sessionStorage.setItem('isLocationRoomHost', 'false');
        sessionStorage.removeItem('hostRoomCode');
        navigate({ to: '/buddy' });
      } else {
        // 비로그인 상태: pendingDeepLink 저장 후 로그인으로
        sessionStorage.setItem('pendingDeepLink', JSON.stringify({
          url: `https://haeruhand.o-r.kr/join?code=${roomCode}&token=${token}`,
          code: roomCode,
          token: token,
          timestamp: Date.now()
        }));
        navigate({ to: '/login' });
      }
    };

    // 모바일 디바이스 감지
    const isMobile = /Android|iPhone/i.test(navigator.userAgent);
    const isApp = (window as any).Capacitor !== undefined;

    // 모바일 브라우저에서 접속한 경우 앱으로 리다이렉트 시도
    if (isMobile && !isApp) {
      setIsRedirecting(true);
      
      // 앱으로 리다이렉트 시도
      const appUrl = `seafeet://join?code=${roomCode}&token=${encodeURIComponent(token)}`;
      const startTime = Date.now();
      
      // 먼저 location.href로 시도 (더 직접적)
      window.location.href = appUrl;
      
      // 2초 후 페이지가 여전히 활성화되어 있으면 앱이 없는 것으로 판단
      setTimeout(() => {
        // 페이지가 아직 활성화되어 있고, 시간이 충분히 지났으면 웹에서 계속
        if (!document.hidden && Date.now() - startTime > 1900) {
          console.log('앱이 설치되지 않음 - 웹에서 처리');
          setIsRedirecting(false);
          saveAndNavigate();
        }
      }, 2000);
    } else {
      // PC 또는 이미 앱 내부인 경우 바로 진행
      saveAndNavigate();
    }
  }, [navigate, isAuthenticated]);

  // 앱으로 리다이렉트 중일 때 표시할 UI
  if (isRedirecting) {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <img src="/haeruhand_logo.svg" alt="해루핸 로고" className={styles.logo} />
          <div className={styles.loadingSpinner}></div>
          <Text size="lg" align="center">
            해루핸 앱으로 이동 중...
          </Text>
          <Text size="sm" color="gray" align="center">
            앱이 설치되어 있지 않다면 잠시 후 웹에서 계속됩니다
          </Text>
        </div>
      </div>
    );
  }

  // 일반 로딩 상태
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src="/haeruhand_logo.svg" alt="해루핸 로고" className={styles.logo} />
        <div className={styles.loadingSpinner}></div>
        <Text size="lg" align="center">
          방에 참여하는 중...
        </Text>
        <Text size="sm" color="gray" align="center">
          잠시만 기다려주세요
        </Text>
      </div>
    </div>
  );
}
