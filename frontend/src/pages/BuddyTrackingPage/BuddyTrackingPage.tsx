import { Button, Text } from '../../components/atoms';
import styles from './BuddyTrackingPage.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

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

const API_BASE =
  location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? '/api'
    : `${location.origin}/api`;

// WS_URL: 항상 현재 오리진 + /api/v1/ws
const WS_URL = `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/api/v1/ws`;

console.log('[WS_URL]', WS_URL);

console.log('[WS_URL]', WS_URL, import.meta.env.MODE, import.meta.env.VITE_API_BASE_URL);

const getAccessToken = () =>
  sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken') || '';

const clearRoomSession = () => {
  sessionStorage.removeItem('locationRoom');
  sessionStorage.removeItem('isLocationRoomHost');
  sessionStorage.removeItem('hostRoomCode');
};

const Buddy = ({ name, color = '#4fc1ff' }: { name: string; color?: string }) => (
  <div className={styles.buddy}>
    <div className={styles.dot} style={{ backgroundColor: color }} />
    <Text size="sm" weight="regular" color="white">
      {name}
    </Text>
  </div>
);

export default function BuddyTrackingPage() {
  const navigate = useNavigate();

  const mapRef = useRef<any>(null);
  const myMarkerRef = useRef<any>(null);
  const memberMarkersRef = useRef<Map<number, any>>(new Map());
  const stompRef = useRef<any>(null);
  const geoWatchIdRef = useRef<number | null>(null);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [wsConnected, setWsConnected] = useState(false);

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

  const fetchRoomInfo = async (roomCode: string) => {
    const token = getAccessToken();
    if (!token) return { room: null as RoomInfo | null, members: [] as Member[] };
    const resp = await fetch(`${API_BASE}/v1/location/rooms/${roomCode}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    });
    if (!resp.ok) return { room: null, members: [] };
    const data = await resp.json();
    if (!data?.is_success || !data.data) return { room: null, members: [] };

    const { roomInfo, deepLink, members } = data.data;
    const joinToken = extractJoinToken(deepLink);
    const room: RoomInfo = {
      roomId: roomInfo.roomId,
      roomCode: roomInfo.roomCode,
      deepLink,
      joinToken,
    };
    const list: Member[] = (members || []).map((m: any) => ({
      userId: m.userId,
      nickname: m.nickname,
      latitude: m.latitude,
      longitude: m.longitude,
      color: m.color,
      lastUpdateTime: m.lastActiveAt || m.joinedAt || null,
    }));
    return { room, members: list };
  };

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

  const teardownConnection = () => {
    try {
      if (stompRef.current?.connected) stompRef.current.disconnect(() => setWsConnected(false));
    } catch {}
    if (geoWatchIdRef.current != null) {
      navigator.geolocation.clearWatch(geoWatchIdRef.current);
      geoWatchIdRef.current = null;
    }
    memberMarkersRef.current.forEach((m) => m.setMap && m.setMap(null));
    memberMarkersRef.current.clear();
    if (myMarkerRef.current?.setMap) myMarkerRef.current.setMap(null);
    myMarkerRef.current = null;
    setMembers([]);
  };

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

    ensureScripts().then(async () => {
      const u = loadUserInfo();
      setUserInfo(u);

      const stored = loadRoomFromStorage();
      if (stored?.roomCode) {
        const { room, members } = await fetchRoomInfo(stored.roomCode);
        const effectiveRoom: RoomInfo = room ?? {
          ...stored,
          joinToken: stored.joinToken || extractJoinToken(stored.deepLink),
        };

        const me: Member = { userId: u?.userId ?? -1, nickname: u?.nickname ?? '나' };
        const byId = new Map<number, Member>([[me.userId, me]]);
        members.forEach((m) => byId.set(m.userId, m));
        setMembers(Array.from(byId.values()));

        initMapAndConnect(effectiveRoom);
      } else {
        initMapOnly();
      }
    });

    // 언마운트: 연결만 정리 (세션/방 삭제는 ‘뒤로가기’ 때)
    return () => {
      teardownConnection();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 탭 닫힘 대응(연결만 정리)
  useEffect(() => {
    const onLeave = () => {
      try {
        teardownConnection();
      } catch {}
    };
    window.addEventListener('pagehide', onLeave);
    window.addEventListener('beforeunload', onLeave);
    return () => {
      window.removeEventListener('pagehide', onLeave);
      window.removeEventListener('beforeunload', onLeave);
    };
  }, []);

  const initMapOnly = () => {
    window.kakao.maps.load(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const container = document.getElementById('map');
          if (!container) return;
          const map = new window.kakao.maps.Map(container, {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 3,
          });
          mapRef.current = map;
          myMarkerRef.current = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(latitude, longitude),
          });
          geoWatchIdRef.current = navigator.geolocation.watchPosition(
            (p) => {
              const ll = new window.kakao.maps.LatLng(p.coords.latitude, p.coords.longitude);
              myMarkerRef.current?.setPosition(ll);
            },
            () => {},
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 },
          );
          const u = loadUserInfo();
          setMembers([{ userId: u?.userId ?? -1, nickname: u?.nickname ?? '나' }]);
        },
        () => {},
      );
    });
  };

  const initMapAndConnect = (r: RoomInfo) => {
    window.kakao.maps.load(() => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const container = document.getElementById('map');
          if (!container) return;
          const map = new window.kakao.maps.Map(container, {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 3,
          });
          mapRef.current = map;
          myMarkerRef.current = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(latitude, longitude),
          });
          geoWatchIdRef.current = navigator.geolocation.watchPosition(
            (p) => {
              const ll = new window.kakao.maps.LatLng(p.coords.latitude, p.coords.longitude);
              myMarkerRef.current?.setPosition(ll);
              sendLocation({
                latitude: p.coords.latitude,
                longitude: p.coords.longitude,
                accuracy: 5.0,
              });
            },
            (err) => console.error('GPS watch error', err?.message),
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 },
          );
          connectWebSocket(r);
        },
        (err) => {
          console.error('getCurrentPosition error', err?.message);
          connectWebSocket(r);
        },
      );
    });
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
            <circle cx="9" cy="9" r="8" fill="${color}" stroke="black" stroke-width="2" overflow="visible"/>
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

  const connectWebSocket = (r: RoomInfo) => {
    const token = getAccessToken();
    if (!token) {
      alert('로그인이 필요합니다. (토큰 오류)');
      navigate({ to: '/login' });
      return;
    }
    const join = r.joinToken || extractJoinToken(r.deepLink) || '';

    // WS 접속 URL에 joinToken을 쿼리로 붙이기
    const wsUrl = join ? `${WS_URL}?token=${encodeURIComponent(join)}` : WS_URL;
    const socket = new WebSocket(wsUrl);
    const stomp = window.Stomp!.over(socket);
    stomp.debug = null;
    stompRef.current = stomp;

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      'room-code': r.roomCode,
      'join-token': join,
    };

    stomp.connect(
      headers,
      async () => {
        setWsConnected(true);

        stomp.subscribe(`/sub/location.${r.roomCode}`, (msg: any) => {
          try {
            const data = JSON.parse(msg.body);
            if (data?.type === 'LOCATION_UPDATE' && data.data) {
              setMembers((prev) => {
                const m: Member = {
                  userId: data.data.userId,
                  nickname:
                    prev.find((p) => p.userId === data.data.userId)?.nickname ||
                    data.data.nickname ||
                    `User ${data.data.userId}`,
                  latitude: data.data.latitude,
                  longitude: data.data.longitude,
                  accuracy: data.data.accuracy,
                  lastUpdateTime: new Date().toLocaleTimeString(),
                };
                const map = new Map(prev.map((p) => [p.userId, p]));
                map.set(m.userId, { ...(map.get(m.userId) || {}), ...m });
                const merged = Array.from(map.values());
                upsertMemberMarker(m);
                return merged;
              });
            }
          } catch {}
        });

        stomp.subscribe(`/user/sub/location.${r.roomCode}`, (msg: any) => {
          try {
            const data = JSON.parse(msg.body);
            if (data?.type === 'MEMBER_LIST' && data.data?.members) {
              const list: Member[] = data.data.members.map((mm: any) => ({
                userId: mm.userId,
                nickname: mm.nickname,
                latitude: mm.latitude,
                longitude: mm.longitude,
                color: mm.color,
                lastUpdateTime: mm.lastUpdateTime || null,
              }));
              const me: Member = {
                userId: userInfo?.userId || -1,
                nickname: userInfo?.nickname || '나',
              };
              const byId = new Map<number, Member>([[me.userId, me]]);
              list.forEach((m) => byId.set(m.userId, m));
              const merged = Array.from(byId.values());
              setMembers(merged);
              merged.forEach((m) => upsertMemberMarker(m));
            }
          } catch {}
        });

        stomp.send('/pub/location.join', {}, '{}');

        try {
          const info = await fetchRoomInfo(r.roomCode);
          if (info.members.length) {
            setMembers((prev) => {
              const byId = new Map<number, Member>(prev.map((p) => [p.userId, p]));
              info.members.forEach((m) =>
                byId.set(m.userId, { ...(byId.get(m.userId) || {}), ...m }),
              );
              const merged = Array.from(byId.values());
              merged.forEach((m) => upsertMemberMarker(m));
              return merged;
            });
          }
        } catch {}
      },
      (err: any) => {
        setWsConnected(false);
        console.error('STOMP connect error', err);
      },
    );
  };

  const sendLocation = (loc: { latitude: number; longitude: number; accuracy?: number }) => {
    try {
      if (stompRef.current?.connected) {
        stompRef.current.send(
          '/pub/location.update',
          {},
          JSON.stringify({ ...loc, accuracy: loc.accuracy ?? 5.0 }),
        );
      }
    } catch {}
  };

  const buddyButtonClick = () => navigate({ to: '/share' });

  const handleBackButtonClick = async () => {
    teardownConnection();
    await closeRoomIfHost();
    clearRoomSession();
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
        WS: {wsConnected ? '🟢' : '🔴'} / members: {members.length}
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
            <Buddy key={m.userId} name={m.nickname} color={m.color} />
          ))}
        </div>

        <div className={styles.buttonSection}>
          <Button size="large" variant="primary" fullWidth onClick={buddyButtonClick}>
            함께 해루하기
          </Button>
        </div>
      </div>
    </div>
  );
}
