import { Button, Text } from '../../components/atoms';
import styles from './TrackingSharePage.module.css';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

type CreateRoomResp = {
  is_success: boolean;
  data?: {
    roomId: number;
    roomCode: string;
    deepLink: string;
    startedAt: string | number[];
  };
  message?: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;

// 토큰: 형식 가드 제거(백엔드 토큰 포맷 변경 대비)
const getAccessToken = () =>
  sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || '';

export default function TrackingSharePage() {
  const navigate = useNavigate();
  const [deepLink, setDeepLink] = useState('');
  const [roomCode, setRoomCode] = useState('');

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
    return 0;
  };

  useEffect(() => {
    const createRoom = async () => {
      const token = getAccessToken();
      if (!token) {
        alert('로그인이 필요합니다.');
        navigate({ to: '/login' });
        return;
      }

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

        const joinToken = extractJoinToken(deepLink);
        // 호스트가 사용할 세션 저장
        sessionStorage.setItem(
          'locationRoom',
          JSON.stringify({ roomId, roomCode, deepLink, joinToken }),
        );
        sessionStorage.setItem('isLocationRoomHost', 'true');
        sessionStorage.setItem('hostRoomCode', roomCode);

        console.log(
          '[share] locationRoom saved:',
          JSON.parse(sessionStorage.getItem('locationRoom')!),
        );
      } catch (e: any) {
        console.error('방 생성 에러', e);
        alert(e?.message || '방을 생성할 수 없습니다. 다시 시도해 주세요.');
        navigate({ to: '/buddy' });
      }
    };

    createRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
