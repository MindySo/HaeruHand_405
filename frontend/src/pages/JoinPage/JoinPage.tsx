import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

export default function JoinPage() {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roomCode = params.get('code');
    const token = params.get('token');

    if (!roomCode || !token) {
      alert('code/token이 없습니다.');
      navigate({ to: '/main' });
      return;
    }

    // 세션에 정보 저장하고 이동하는 함수
    const saveAndNavigate = () => {
      const deepLink = `seafeet://join?code=${roomCode}&token=${token}`;
      sessionStorage.setItem(
        'locationRoom',
        JSON.stringify({ roomId: null, roomCode, deepLink, joinToken: token }),
      );
      // 참여자는 호스트가 아님
      sessionStorage.setItem('isLocationRoomHost', 'false');
      sessionStorage.removeItem('hostRoomCode');

      navigate({ to: '/buddy' });
    };

    // 모바일 디바이스 감지
    const isMobile = /Android|iPhone/i.test(navigator.userAgent);
    const isApp = (window as any).Capacitor !== undefined;

    // 모바일 브라우저에서 접속한 경우 앱으로 리다이렉트 시도
    if (isMobile && !isApp) {
      setIsRedirecting(true);
      
      // 앱으로 리다이렉트 시도
      const appUrl = `seafeet://join?code=${roomCode}&token=${token}`;
      const startTime = Date.now();
      
      // iframe을 통한 앱 실행 시도 (더 안정적)
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = appUrl;
      document.body.appendChild(iframe);
      
      // 1.5초 후 페이지가 여전히 활성화되어 있으면 앱이 없는 것으로 판단
      setTimeout(() => {
        document.body.removeChild(iframe);
        
        // 페이지가 아직 활성화되어 있고, 시간이 충분히 지났으면 웹에서 계속
        if (Date.now() - startTime > 1400) {
          setIsRedirecting(false);
          saveAndNavigate();
        }
      }, 1500);
    } else {
      // PC 또는 이미 앱 내부인 경우 바로 진행
      saveAndNavigate();
    }
  }, [navigate]);

  // 앱으로 리다이렉트 중일 때 표시할 UI
  if (isRedirecting) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '18px', marginBottom: '10px' }}>
          앱으로 이동 중...
        </div>
        <div style={{ fontSize: '14px', color: '#666' }}>
          앱이 설치되어 있지 않다면 잠시 후 웹에서 계속됩니다
        </div>
      </div>
    );
  }

  return null;
}
