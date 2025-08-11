// src/pages/BuddyTrackingPage.tsx
import { Button, Text } from '../../components/atoms';
import styles from './BuddyTrackingPage.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useLocationSocket } from '../../stores/useLocationSocket';

type UserInfo = {
  userId: number;
  nickname: string;
  profileImageUrl?: string;
  kakaoSub?: string | number;
};
type Member = {
  userId: number;
  nickname: string;
  latitude?: number;
  longitude?: number;
  color?: string;
  accuracy?: number | null;
  lastUpdateTime?: string | null;
};
type RoomInfo = {
  roomId: number | null;
  roomCode: string;
  deepLink: string;
  joinToken: string | null;
};

declare global {
  interface Window {
    kakao: any;
    Stomp?: any;
  }
}

const API_BASE = import.meta.env.VITE_API_BASE_URL as string;
const makeWsUrl = () => {
  const u = new URL(API_BASE, location.origin);
  const scheme = u.protocol === 'https:' ? 'wss' : 'ws';
  return `${scheme}://${u.host}/api/v1/ws`;
};
const WS_URL = makeWsUrl();

console.log('[API_BASE]', API_BASE);
console.log('[WS_URL]', WS_URL);

const getAccessToken = () =>
  sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || '';

const clearRoomSession = () => {
  sessionStorage.removeItem('locationRoom');
  sessionStorage.removeItem('isLocationRoomHost');
  sessionStorage.removeItem('hostRoomCode');
};

export default function BuddyTrackingPage() {
  const navigate = useNavigate();
  const {
    connected,
    connect,
    disconnect,
    sendLocation,
    setOnMemberUpdate,
    getMembers,
    clearMembers,
  } = useLocationSocket();

  const mapRef = useRef<any>(null);
  const myMarkerRef = useRef<any>(null);
  const memberMarkersRef = useRef<Map<number, any>>(new Map());
  const geoWatchIdRef = useRef<number | null>(null);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  const loadUserInfo = (): UserInfo | null => {
    try {
      const raw = sessionStorage.getItem('userInfo') || localStorage.getItem('userInfo');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };
  const loadRoomFromStorage = (): RoomInfo | null => {
    try {
      const raw = sessionStorage.getItem('locationRoom');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };
  const extractJoinToken = (deepLink: string): string | null => {
    try {
      const url = new URL(deepLink.replace('seafeet://', 'http://'));
      return url.searchParams.get('token');
    } catch {
      return null;
    }
  };

  // -------- 지도 보조 --------
  const destroyMapOnly = () => {
    try {
      if (geoWatchIdRef.current != null) {
        navigator.geolocation.clearWatch(geoWatchIdRef.current);
        geoWatchIdRef.current = null;
      }
      memberMarkersRef.current.forEach((m) => m.setMap && m.setMap(null));
      memberMarkersRef.current.clear();
      if (myMarkerRef.current?.setMap) myMarkerRef.current.setMap(null);
      myMarkerRef.current = null;
    } catch {}
  };

  const relayoutMap = () => {
    if (!mapRef.current) return;
    mapRef.current.relayout();
    const pos = myMarkerRef.current?.getPosition();
    if (pos) mapRef.current.setCenter(pos);
  };

  const upsertMemberMarker = (member: Member) => {
    if (!mapRef.current || member.userId === userInfo?.userId) return;
    if (member.latitude == null || member.longitude == null) return;

    const key = member.userId;
    const latLng = new window.kakao.maps.LatLng(member.latitude, member.longitude);

    let marker = memberMarkersRef.current.get(key);
    if (!marker) {
      const color = member.color || '#2196F3';
      const markerImage = new window.kakao.maps.MarkerImage(
        `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <circle cx="9" cy="9" r="8" fill="${color}" stroke="black" stroke-width="2"/>
          </svg>
        `)}`,
        new window.kakao.maps.Size(18, 18),
      );
      marker = new window.kakao.maps.Marker({
        map: mapRef.current,
        position: latLng,
        image: markerImage,
      });
      memberMarkersRef.current.set(key, marker);
    } else {
      marker.setPosition(latLng);
    }
  };

  // -------- 스크립트 로드 + 지도 + (있으면) 소켓 연결 --------
  useEffect(() => {
    const ensureScripts = async () => {
      await new Promise<void>((resolve) => {
        if (window.kakao?.maps) return resolve();
        const s = document.createElement('script');
        s.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`;
        s.async = true;
        s.onload = () => resolve();
        document.head.appendChild(s);
      });
      await new Promise<void>((resolve) => {
        if (window.Stomp) return resolve();
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/stompjs@2.3.3/lib/stomp.min.js';
        s.async = true;
        s.onload = () => resolve();
        document.head.appendChild(s);
      });
    };

    (async () => {
      await ensureScripts();

      const u = loadUserInfo();
      setUserInfo(u);

      // 지도 초기화
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        if (!container) return;
        mapRef.current = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(33.4996, 126.5312),
          level: 8,
        });

        // 페이지 표시 시 relayout
        const onShow = () => setTimeout(relayoutMap, 100);
        window.addEventListener('pageshow', onShow);

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            const ll = new window.kakao.maps.LatLng(latitude, longitude);
            mapRef.current.setCenter(ll);
            myMarkerRef.current = new window.kakao.maps.Marker({
              map: mapRef.current,
              position: ll,
            });

            // 위치 추적 + 전송
            geoWatchIdRef.current = navigator.geolocation.watchPosition(
              (p) => {
                const ll2 = new window.kakao.maps.LatLng(p.coords.latitude, p.coords.longitude);
                myMarkerRef.current?.setPosition(ll2);
                sendLocation({
                  latitude: p.coords.latitude,
                  longitude: p.coords.longitude,
                  accuracy: 5,
                });
              },
              (err) => console.error('GPS watch error', err?.message),
              { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 },
            );
          },
          () => {},
        );
      });

      // 화면 콜백: 멤버 업데이트 시 마커/상태 갱신
      setOnMemberUpdate((m) => {
        upsertMemberMarker(m);
        setMembers((prev) => {
          const map = new Map(prev.map((p) => [p.userId, p]));
          map.set(m.userId, { ...(map.get(m.userId) || {}), ...m });
          return Array.from(map.values());
        });
      });

      // 세션에 방 있으면 즉시 연결 시도 (테스트 HTML과 동일하게 바로 붙음)
      const saved = loadRoomFromStorage();
      if (saved?.roomCode) {
        const token = getAccessToken();
        if (token) {
          const room = {
            roomCode: saved.roomCode,
            joinToken: saved.joinToken || extractJoinToken(saved.deepLink) || '',
          };
          try {
            await connect({ wsUrl: WS_URL, accessToken: token, room });
            // 기존 멤버 스냅샷을 마커로 반영
            const snapshot = getMembers();
            setMembers(snapshot);
            snapshot.forEach(upsertMemberMarker);
          } catch (e) {
            console.error('WS connect fail', e);
          }
        }
      }
    })();

    // 언마운트: 지도/워치만 정리 (소켓은 유지)
    return () => {
      destroyMapOnly();
      setOnMemberUpdate(undefined);
    };
  }, [connect, sendLocation, setOnMemberUpdate, getMembers]);

  // 뒤로가기: 소켓 유지
  const handleBackButtonClick = () => {
    destroyMapOnly();
    navigate({ to: '/main' });
  };

  // 그만하기: 방 삭제 + 소켓 종료
  const closeRoomIfHost = async () => {
    try {
      const isHost = sessionStorage.getItem('isLocationRoomHost') === 'true';
      const roomCode = sessionStorage.getItem('hostRoomCode');
      const token = getAccessToken();
      if (isHost && roomCode && token) {
        await fetch(`${API_BASE}/v1/location/rooms/${roomCode}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => {});
      }
    } catch {}
  };

  const endSharing = async () => {
    destroyMapOnly();
    await closeRoomIfHost();
    disconnect();
    clearRoomSession();
    clearMembers();
    navigate({ to: '/main' });
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          position: 'fixed',
          top: 8,
          right: 8,
          zIndex: 9999,
          background: 'rgba(0,0,0,0.55)',
          color: '#fff',
          padding: '4px 8px',
          borderRadius: 6,
          fontSize: 11,
        }}
      >
        WS: {connected ? '🟢' : '🔴'} / members: {members.length}
      </div>

      <div id="map" className={styles.map} />
      <div className={styles.wrapper}>
        <button className={styles.backButton} onClick={handleBackButtonClick}>
          <img src="/backButton.svg" alt="뒤로가기" className={styles.backButtonIcon} />
        </button>

        <div className={styles.buddyList}>
          <div style={{ marginBottom: 6 }}>
            <Text size="xs" weight="regular" color="white">
              참여자 {members.length}명
            </Text>
          </div>
          {members.map((m) => (
            <div key={m.userId} className={styles.buddy}>
              <div className={styles.dot} style={{ backgroundColor: m.color || '#4fc1ff' }} />
              <Text size="sm" weight="regular" color="white">
                {m.nickname}
              </Text>
            </div>
          ))}
        </div>

        <div className={styles.buttonSection}>
          <Button
            size="large"
            variant="primary"
            fullWidth
            onClick={() => navigate({ to: '/share' })}
          >
            QR 공유하기
          </Button>
          <div style={{ height: 8 }} />
          <Button size="large" variant="secondary" fullWidth onClick={endSharing}>
            그만하기
          </Button>
        </div>
      </div>
    </div>
  );
}
