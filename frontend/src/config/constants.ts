// FCM 관련 상수
export const FCM_CONFIG = {
  // TODO: Firebase 콘솔에서 VAPID 키를 가져와서 설정하세요
  VAPID_KEY: import.meta.env.VITE_FIREBASE_VAPID_KEY,

  // 알림 아이콘 경로 - 해루핸 앱 아이콘으로 변경
  NOTIFICATION_ICON: '/haeruhand_app.png',

  // 알림 태그
  NOTIFICATION_TAG: 'fcm-notification',
} as const;

// API 엔드포인트
export const API_ENDPOINTS = {
  FCM_TOKEN_REGISTER: '/v1/notifications/tokens',
  FCM_TOKEN_UPDATE: (tokenId: number) => `/v1/notifications/tokens/${tokenId}`,
  FCM_TOKEN_DELETE: (tokenId: number) => `/v1/notifications/tokens/${tokenId}`,
  FCM_SEND_NOTIFICATION: '/v1/notifications/send',
  FCM_PING: '/v1/notifications/ping',
} as const;
