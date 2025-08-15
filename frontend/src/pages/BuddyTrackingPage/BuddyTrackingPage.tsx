// src/pages/BuddyTrackingPage.tsx
import { Button, Text } from '../../components/atoms';
import styles from './BuddyTrackingPage.module.css';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../hooks/useAuth';
import { LoginModal } from '../../components/molecules/LoginModal/LoginModal';
import { useLocationSocket } from '../../stores/useLocationSocket';
import { useFCMWithSocket } from '../../hooks/useFCMWithSocket'; // 추가

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

// GPS 권한 확인 함수 추가
const checkGeolocationPermission = async (): Promise<boolean> => {
  if (!navigator.geolocation) {
    console.error('Geolocation이 지원되지 않습니다.');
    return false;
  }

  // 권한 상태 확인 (Chrome, Firefox 등)
  if (navigator.permissions) {
    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      console.log('GPS 권한 상태:', permission.state);
      return permission.state === 'granted';
    } catch (error) {
      console.log('권한 확인 실패, 직접 시도:', error);
    }
  }

  return true; // 권한 확인이 안되면 직접 시도
};

// GPS 위치 획득 함수 개선
const getCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    // 먼저 빠른 모드로 시도
    navigator.geolocation.getCurrentPosition(
      resolve,
      (error) => {
        console.log('빠른 GPS 실패, 정확도 높은 모드로 재시도:', error);
        // 실패하면 정확도 높은 모드로 재시도
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000, // 10초
          maximumAge: 60000, // 1분
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 5000, // 5초
        maximumAge: 300000, // 5분
      },
    );
  });
};

const BuddyTrackingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
    connected,
    connect,
    disconnect,
    sendLocation,
    setOnMemberUpdate,
    getMembers,
    clearMembers,
  } = useLocationSocket();

  // FCM 훅 추가
  const { isRegistered: fcmRegistered, error: fcmError } = useFCMWithSocket(1); // 사용자 ID 1로 테스트

  const mapRef = useRef<any>(null);
  const myMarkerRef = useRef<any>(null);
  const memberMarkersRef = useRef<Map<number, { marker: any; overlay: any }>>(new Map());
  const geoWatchIdRef = useRef<number | null>(null);
  const isInitializedRef = useRef(false);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [members, setMembers] = useState<Member[]>([]);

  // 첫 번째 위치 업데이트 여부를 추적하는 상태 추가
  const [hasMovedToLocation, setHasMovedToLocation] = useState(false);

  const loadUserInfo = (): UserInfo | null => {
    try {
      const sessionUserInfo = sessionStorage.getItem('userInfo');
      const localUserInfo = localStorage.getItem('userInfo');
      console.log('sessionStorage userInfo:', sessionUserInfo);
      console.log('localStorage userInfo:', localUserInfo);

      const raw = sessionUserInfo || localUserInfo;
      const parsed = raw ? JSON.parse(raw) : null;
      console.log('파싱된 userInfo:', parsed);
      return parsed;
    } catch (error) {
      console.error('userInfo 파싱 오류:', error);
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
      memberMarkersRef.current.forEach((m) => {
        m.marker.setMap && m.marker.setMap(null);
        m.overlay.setMap && m.overlay.setMap(null);
      });
      memberMarkersRef.current.clear();
      // 기본 마커 정리 부분 제거 (기본 마커를 사용하지 않으므로)
      // if (myMarkerRef.current?.setMap) myMarkerRef.current.setMap(null);
      // myMarkerRef.current = null;
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

      // 마커 이미지 생성 (원형 마커)
      const markerImage = new window.kakao.maps.MarkerImage(
        `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <circle cx="9" cy="9" r="8" fill="${color}" stroke="black" stroke-width="2"/>
          </svg>
        `)}`,
        new window.kakao.maps.Size(18, 18),
      );

      // 커스텀 오버레이로 이름 표시 - 위치 조정
      const nameOverlay = new window.kakao.maps.CustomOverlay({
        position: latLng,
        content: `
          <div style="
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
            white-space: nowrap;
            margin-bottom: 8px;
            text-align: center;
          ">
            ${member.nickname}
          </div>
        `,
        yAnchor: 1.2, // 1에서 1.2로 변경하여 라벨을 위로 올림
      });

      marker = new window.kakao.maps.Marker({
        map: mapRef.current,
        position: latLng,
        image: markerImage,
      });

      // 마커와 오버레이를 함께 저장
      memberMarkersRef.current.set(key, { marker, overlay: nameOverlay });

      // 오버레이를 지도에 추가
      nameOverlay.setMap(mapRef.current);
    } else {
      // 기존 마커가 있으면 위치만 업데이트
      marker.marker.setPosition(latLng);
      marker.overlay.setPosition(latLng);
    }
  };

  // 지도 중심 이동 함수 수정 - 로컬 변수 사용
  const moveMapToMyLocation = (member: Member, currentUserInfo?: UserInfo | null) => {
    console.log('moveMapToMyLocation 호출:', member);
    console.log('userInfo:', userInfo);
    console.log('currentUserInfo:', currentUserInfo);
    console.log('mapRef.current:', mapRef.current);

    // userInfo가 아직 업데이트되지 않았으면 로컬 변수 사용
    const effectiveUserInfo = currentUserInfo || userInfo;

    // 아직 지도 이동을 하지 않았고, 위치 정보가 있으면 이동
    if (!hasMovedToLocation && member.latitude && member.longitude && mapRef.current) {
      const myLatLng = new window.kakao.maps.LatLng(member.latitude, member.longitude);
      mapRef.current.setCenter(myLatLng);
      setHasMovedToLocation(true);
      console.log('지도 중심을 첫 번째 위치로 이동:', myLatLng);
    } else {
      console.log('지도 이동 조건 불만족:', {
        hasMovedToLocation,
        hasLatitude: !!member.latitude,
        hasLongitude: !!member.longitude,
        hasMapRef: !!mapRef.current,
      });
    }
  };

  // -------- 스크립트 로드 + 지도 + (있으면) 소켓 연결 --------
  useEffect(() => {
    // 이미 초기화되었으면 중복 실행 방지
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

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
      console.log('설정할 userInfo:', u);
      setUserInfo(u);

      // 지도 초기화 부분 수정
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        if (!container) return;
        mapRef.current = new window.kakao.maps.Map(container, {
          center: new window.kakao.maps.LatLng(33.4996, 126.5312),
          level: 2, // 더 확대 (4 → 2)
        });

        // 페이지 표시 시 relayout
        const onShow = () => setTimeout(relayoutMap, 100);
        window.addEventListener('pageshow', onShow);

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            const ll = new window.kakao.maps.LatLng(latitude, longitude);
            mapRef.current.setCenter(ll);

            // 기본 마커 생성하지 않음 (삭제)
            // myMarkerRef.current = new window.kakao.maps.Marker({
            //   map: mapRef.current,
            //   position: ll,
            // });

            // 즉시 위치 전송 추가
            sendLocation({
              latitude,
              longitude,
              accuracy: pos.coords.accuracy || 5,
            });

            // 위치 추적 + 전송
            geoWatchIdRef.current = navigator.geolocation.watchPosition(
              (p) => {
                const ll2 = new window.kakao.maps.LatLng(p.coords.latitude, p.coords.longitude);
                // 기본 마커 업데이트하지 않음
                // myMarkerRef.current?.setPosition(ll2);
                sendLocation({
                  latitude: p.coords.latitude,
                  longitude: p.coords.longitude,
                  accuracy: p.coords.accuracy || 5,
                });
              },
              (err) => console.error('GPS watch error', err?.message),
              { enableHighAccuracy: true, maximumAge: 3000, timeout: 5000 },
            );
          },
          (err) => {
            console.error('GPS 초기화 실패:', err);
          },
        );
      });

      // 화면 콜백: 멤버 업데이트 시 마커/상태 갱신
      // 멤버 업데이트 콜백 수정
      setOnMemberUpdate((m) => {
        console.log('멤버 업데이트 콜백 호출:', m);

        // 지도 중심 이동 먼저 처리 (로컬 변수 전달)
        moveMapToMyLocation(m, u);

        // 마커 생성/업데이트
        upsertMemberMarker(m);

        setMembers((prev) => {
          console.log('이전 멤버들:', prev);
          const map = new Map(prev.map((p) => [p.userId, p]));
          map.set(m.userId, { ...(map.get(m.userId) || {}), ...m });
          const newMembers = Array.from(map.values());
          console.log('새로운 멤버들:', newMembers);
          return newMembers;
        });
      });

      // 세션에 방 있으면 즉시 연결 시도
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

            // 연결 후 즉시 현재 위치 전송
            setTimeout(async () => {
              try {
                const hasPermission = await checkGeolocationPermission();
                if (!hasPermission) {
                  console.log('GPS 권한이 없습니다.');
                  return;
                }

                const pos = await getCurrentLocation();
                sendLocation({
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                  accuracy: pos.coords.accuracy || 5,
                });
              } catch (err) {
                console.error('연결 후 GPS 획득 실패:', err);
                // GPS 실패 시에는 위치 전송하지 않음
              }
            }, 500);

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
      {!isAuthenticated() && <LoginModal message="위치 트래킹을 시작" />}
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
        WS: {connected ? '🟢' : '🔴'} / FCM: {fcmRegistered ? '🟢' : '🔴'} / members:{' '}
        {members.length}
      </div>

      {/* FCM 오류 표시 */}
      {fcmError && (
        <div
          style={{
            position: 'fixed',
            top: 40,
            right: 8,
            zIndex: 9999,
            background: 'rgba(255,0,0,0.8)',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: 6,
            fontSize: 11,
          }}
        >
          FCM 오류: {fcmError}
        </div>
      )}

      <div id="map" className={styles.map} />
      <div className={styles.wrapper}>
        <button className={styles.backButton} onClick={handleBackButtonClick}>
          <img src="/backButton.svg" alt="뒤로가기" className={styles.backButtonIcon} />
        </button>

        <div className={styles.buddyList}>
          <div>
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
          <Button size="large" variant="secondary" fullWidth onClick={endSharing}>
            그만하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuddyTrackingPage;
