// src/pages/TrackingSharePage.tsx
import { Button, Text } from '../../components/atoms';
import styles from './TrackingSharePage.module.css';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { useLocationSocket } from '../../stores/useLocationSocket';

type CreateRoomResp = {
  is_success: boolean;
  data?: { roomId: number; roomCode: string; deepLink: string; startedAt: string | number[] };
  message?: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;
const makeWsUrl = () => {
  const u = new URL(API_BASE, location.origin);
  const scheme = u.protocol === 'https:' ? 'wss' : 'ws';
  return `${scheme}://${u.host}/api/v1/ws`;
};
const WS_URL = makeWsUrl();

const getAccessToken = () =>
  sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || '';

export default function TrackingSharePage() {
  const navigate = useNavigate();
  const { connect } = useLocationSocket();
  const [deepLink, setDeepLink] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const isInitializedRef = useRef(false);

  const handleBackButtonClick = () => navigate({ to: '/buddy' });

  const extractJoinToken = (link: string): string | null => {
    try {
      const url = new URL(link.replace('seafeet://', 'http://'));
      return url.searchParams.get('token');
    } catch {
      return null;
    }
  };

  const getSelectedFisheryId = (): number => {
    try {
      const raw = localStorage.getItem('selectedFishery');
      if (raw) {
        const f = JSON.parse(raw);
        return Number(f.id) || 0;
      }
    } catch {}
    return 1; // 기본값 (테스트 HTML과 동일하게 1 사용 가능)
  };

  useEffect(() => {
    // 이미 초기화되었으면 중복 실행 방지
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const initializeRoom = async () => {
      const saved = sessionStorage.getItem('locationRoom');
      const isHost = sessionStorage.getItem('isLocationRoomHost') === 'true';
      const token = getAccessToken();

      console.log('방 초기화 시작:', { saved: !!saved, isHost, hasToken: !!token });

      // tryConnect 함수를 여기서 정의하여 token에 접근할 수 있도록 함
      const tryConnect = async (roomCode: string, joinToken: string) => {
        if (!token) return;

        // 연결 상태 확인 후 연결되지 않은 경우에만 연결 시도
        const { connected } = useLocationSocket.getState?.() ?? {};
        if (connected) {
          console.log('이미 연결되어 있습니다.');
          return;
        }

        try {
          await connect({ wsUrl: WS_URL, accessToken: token, room: { roomCode, joinToken } });
          console.log('Share 페이지에서 WebSocket 연결 성공');
        } catch (e) {
          // 연결 실패해도 QR 공유는 가능하게 그대로 둔다.
          console.warn('WS connect from /share failed (continue showing QR):', e);
        }
      };

      // 방 재사용
      if (saved && isHost) {
        try {
          const { roomCode, deepLink, joinToken } = JSON.parse(saved);
          if (roomCode && deepLink) {
            console.log('기존 방 재사용:', roomCode);
            setRoomCode(roomCode);
            setDeepLink(deepLink);
            if (joinToken) {
              tryConnect(roomCode, joinToken);
            }
            return; // 여기서 확실히 종료
          }
        } catch (error) {
          console.error('저장된 방 정보 파싱 오류:', error);
        }
      }

      // 새 방 생성 (방 재사용이 안 된 경우에만)
      if (!token) {
        alert('로그인이 필요합니다.');
        navigate({ to: '/login' });
        return;
      }

      console.log('새 방 생성 시작');
      try {
        const fisheryId = getSelectedFisheryId();
        const resp = await fetch(`${API_BASE}/v1/location/rooms`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ fisheryId }),
        });

        const rawText = await resp.text();
        if (!resp.ok) {
          let msg = rawText;
          try {
            const p = JSON.parse(rawText);
            msg = p.message || p.error || rawText;
          } catch {}
          throw new Error(`HTTP ${resp.status} - ${msg}`);
        }

        const data: CreateRoomResp = JSON.parse(rawText);
        if (!data.is_success || !data.data) throw new Error(data.message || '방 생성 실패');

        const { roomId, roomCode, deepLink } = data.data;
        setDeepLink(deepLink);
        setRoomCode(roomCode);

        const joinToken = extractJoinToken(deepLink) || '';

        // 세션 저장
        sessionStorage.setItem(
          'locationRoom',
          JSON.stringify({ roomId, roomCode, deepLink, joinToken }),
        );
        sessionStorage.setItem('isLocationRoomHost', 'true');
        sessionStorage.setItem('hostRoomCode', roomCode);

        // 테스트 HTML과 동일: 생성 즉시 WS 연결 시도
        if (joinToken) tryConnect(roomCode, joinToken);
      } catch (error) {
        console.error('방 생성 오류:', error);
        alert((error as any)?.message || '방을 생성할 수 없습니다. 다시 시도해 주세요.');
        navigate({ to: '/buddy' });
      }
    };

    initializeRoom();
  }, []); // 의존성 배열은 비워두되, 내부에서 중복 실행 방지

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBackButtonClick}>
          <img src="/backButton.svg" alt="뒤로가기" className={styles.backButtonIcon} />
        </button>
      </div>

      <div className={styles.titleSection}>
        <Text size="xl" weight="bold" color="dark">
          친구에게 QR을 보여주세요
        </Text>
        <div className={styles.subtitleSection}>
          <Text size="md" weight="regular" color="dark">
            서로의 위치를 확인하고,
          </Text>
          <Text size="md" weight="regular" color="dark">
            더 안전하게 해루질할 수 있어요
          </Text>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.qrSection}>
          {deepLink ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 16,
                background: '#fff',
                borderRadius: 12,
                border: '2px solid #e0e0e0',
                margin: '0 auto',
              }}
            >
              <QRCode value={deepLink} size={220} level="M" bgColor="#FFFFFF" fgColor="#000000" />
            </div>
          ) : (
            <div
              style={{
                width: 220,
                height: 220,
                background: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
                margin: '0 auto',
              }}
            >
              <Text size="md" color="gray">
                QR 코드 로딩 중...
              </Text>
            </div>
          )}

          {roomCode && (
            <div className={styles.qrInfo}>
              <Text size="sm" weight="regular" color="gray">
                방 코드: {roomCode}
              </Text>
            </div>
          )}
        </div>
      </div>

      <div className={styles.buttonSection}>
        <Button size="large" variant="primary" fullWidth onClick={handleBackButtonClick}>
          돌아가기
        </Button>
      </div>
    </div>
  );
}
