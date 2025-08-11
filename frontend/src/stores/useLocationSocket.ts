// src/stores/useLocationSocket.ts
import { create } from 'zustand';

type Room = { roomCode: string; joinToken: string };
type Member = {
  userId: number;
  nickname: string;
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  color?: string;
  lastUpdateTime?: string | null;
};

type State = {
  connected: boolean;
  room?: Room;
  stomp?: any;
  members: Record<number, Member>;
};

type Actions = {
  connect: (args: { wsUrl: string; accessToken: string; room: Room }) => Promise<void>;
  disconnect: () => void;
  sendLocation: (loc: { latitude: number; longitude: number; accuracy?: number }) => void;

  // 화면에서 교체하는 콜백 (마커 업데이트 등)
  setOnMemberUpdate: (cb?: (m: Member) => void) => void;
  getMembers: () => Member[];
  clearMembers: () => void;
};

export const useLocationSocket = create<State & { onMemberUpdate?: (m: Member) => void } & Actions>(
  (set, get) => ({
    connected: false,
    members: {},

    async connect({ wsUrl, accessToken, room }) {
      // 이미 연결돼 있으면 재사용
      const s = get();
      if (s.connected && s.stomp) {
        console.log('이미 연결된 소켓이 있습니다.');
        return;
      }

      // STOMP 로드 체크
      const StompLib = (window as any).Stomp;
      if (!StompLib) {
        console.error('STOMP 라이브러리가 로드되지 않았습니다.');
        throw new Error('STOMP 라이브러리가 로드되지 않았습니다.');
      }

      console.log('WebSocket 연결 시작:', wsUrl);
      console.log('방 정보:', room);

      const socket = new WebSocket(wsUrl);
      const client = StompLib.over(socket);
      client.debug = null;

      // STOMP CONNECT
      await new Promise<void>((resolve, reject) => {
        client.connect(
          {
            Authorization: `Bearer ${accessToken}`,
            'room-code': room.roomCode,
            'join-token': room.joinToken,
          },
          () => {
            console.log('STOMP 연결 성공');
            resolve();
          },
          (err: any) => {
            console.error('STOMP 연결 실패:', err);
            reject(err);
          },
        );
      });

      // 구독: 공용 위치 업데이트
      client.subscribe(`/sub/location.${room.roomCode}`, (msg: any) => {
        try {
          const payload = JSON.parse(msg.body);
          if (payload?.type === 'LOCATION_UPDATE' && payload.data) {
            const m: Member = {
              userId: payload.data.userId,
              nickname: payload.data.nickname || `User ${payload.data.userId}`,
              latitude: payload.data.latitude,
              longitude: payload.data.longitude,
              accuracy: payload.data.accuracy,
              lastUpdateTime: new Date().toLocaleTimeString(),
            };
            // 화면 콜백
            get().onMemberUpdate?.(m);
            // 멤버 병합
            set((s) => ({
              members: { ...s.members, [m.userId]: { ...(s.members[m.userId] || {}), ...m } },
            }));
          }
        } catch (error) {
          console.error('위치 업데이트 메시지 파싱 오류:', error);
        }
      });

      // 구독: 개인 채널(멤버 리스트 등)
      client.subscribe(`/user/sub/location.${room.roomCode}`, (msg: any) => {
        try {
          const payload = JSON.parse(msg.body);
          if (payload?.type === 'MEMBER_LIST' && payload.data?.members) {
            const merged: Record<number, Member> = {};
            payload.data.members.forEach((mm: any) => {
              merged[mm.userId] = {
                userId: mm.userId,
                nickname: mm.nickname,
                latitude: mm.latitude,
                longitude: mm.longitude,
                color: mm.color,
                lastUpdateTime: mm.lastUpdateTime || null,
              };
            });
            set({ members: merged });
          }
        } catch (error) {
          console.error('멤버 리스트 메시지 파싱 오류:', error);
        }
      });

      // JOIN
      client.send('/pub/location.join', {}, '{}');

      set({ connected: true, stomp: client, room });
    },

    disconnect() {
      const { stomp } = get();
      try {
        stomp?.disconnect?.(() => {
          console.log('WebSocket 연결 해제됨');
        });
      } catch (error) {
        console.error('WebSocket 해제 오류:', error);
      }
      set({ connected: false, stomp: undefined, room: undefined, members: {} });
    },

    sendLocation(loc) {
      const { stomp } = get();
      if (stomp?.connected) {
        stomp.send(
          '/pub/location.update',
          {},
          JSON.stringify({ ...loc, accuracy: loc.accuracy ?? 5.0 }),
        );
      }
    },

    setOnMemberUpdate(cb) {
      (get() as any).onMemberUpdate = cb;
    },

    getMembers() {
      return Object.values(get().members);
    },

    clearMembers() {
      set({ members: {} });
    },
  }),
);
