import { useState, useEffect, useCallback } from 'react';
import { messaging, getToken, onMessage } from '../config/firebase';
import { apiClient } from '../apis/apiClient';
import { FCM_CONFIG, API_ENDPOINTS } from '../config/constants';

interface FCMTokenData {
  tokenId: number;
  maskedToken: string;
  isActive: boolean;
  lastUsedAt: string;
}

interface FCMTokenResponse {
  is_success: boolean;
  code: number;
  message: string;
  data: FCMTokenData;
}

interface FCMNotificationData {
  maskedToken: string;
  title: string;
  body: string;
  firebaseMessageId: string;
  sentAt: string;
}

interface FCMNotificationResponse {
  is_success: boolean;
  code: number;
  message: string;
  data: FCMNotificationData;
}

interface FCMNotificationRequest {
  token: string;
  title: string;
  body: string;
}

export const useFCM = () => {
  const [token, setToken] = useState<string | null>(null);
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 알림 권한 요청
  const requestNotificationPermission = useCallback(async (): Promise<boolean> => {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setError('알림 권한이 필요합니다');
        return false;
      }
      return true;
    } catch (err) {
      setError('알림 권한 요청 중 오류가 발생했습니다');
      return false;
    }
  }, []);

  // FCM 토큰 생성
  const generateToken = useCallback(async (): Promise<string | null> => {
    try {
      const currentToken = await getToken(messaging, {
        vapidKey: FCM_CONFIG.VAPID_KEY,
      });

      if (currentToken) {
        setToken(currentToken);
        return currentToken;
      } else {
        setError('토큰을 생성할 수 없습니다');
        return null;
      }
    } catch (err) {
      setError('토큰 생성 중 오류가 발생했습니다');
      return null;
    }
  }, []);

  // 백엔드에 토큰 등록
  const registerToken = useCallback(async (userId: number, fcmToken: string): Promise<boolean> => {
    try {
      const response = await apiClient.post<FCMTokenResponse>(
        API_ENDPOINTS.FCM_TOKEN_REGISTER,
        {
          fcmToken: fcmToken,
        },
        {
          headers: {
            'X-User-Id': userId.toString(),
          },
        },
      );

      if (response.is_success) {
        setIsRegistered(true);
        setTokenId(response.data.tokenId);
        return true;
      } else {
        setError(response.message || '토큰 등록에 실패했습니다');
        return false;
      }
    } catch (err) {
      setError('토큰 등록 중 오류가 발생했습니다');
      return false;
    }
  }, []);

  // FCM 토큰 갱신
  const updateToken = useCallback(
    async (fcmToken: string): Promise<boolean> => {
      if (!tokenId) {
        setError('토큰 ID가 없습니다');
        return false;
      }

      try {
        const response = await apiClient.put<FCMTokenResponse>(
          API_ENDPOINTS.FCM_TOKEN_UPDATE(tokenId),
          {
            fcmToken: fcmToken,
          },
        );

        if (response.is_success) {
          setTokenId(response.data.tokenId);
          return true;
        } else {
          setError(response.message || '토큰 갱신에 실패했습니다');
          return false;
        }
      } catch (err) {
        setError('토큰 갱신 중 오류가 발생했습니다');
        return false;
      }
    },
    [tokenId],
  );

  // FCM 토큰 삭제
  const deleteToken = useCallback(async (): Promise<boolean> => {
    if (!tokenId) {
      setError('토큰 ID가 없습니다');
      return false;
    }

    try {
      const response = await apiClient.delete<{
        is_success: boolean;
        code: number;
        message: string;
        data: {};
      }>(API_ENDPOINTS.FCM_TOKEN_DELETE(tokenId));

      if (response.is_success) {
        setIsRegistered(false);
        setTokenId(null);
        setToken(null);
        return true;
      } else {
        setError(response.message || '토큰 삭제에 실패했습니다');
        return false;
      }
    } catch (err) {
      setError('토큰 삭제 중 오류가 발생했습니다');
      return false;
    }
  }, [tokenId]);

  // FCM 알림 전송
  const sendNotification = useCallback(
    async (notification: FCMNotificationRequest): Promise<FCMNotificationData | null> => {
      try {
        const response = await apiClient.post<FCMNotificationResponse>(
          API_ENDPOINTS.FCM_SEND_NOTIFICATION,
          notification,
        );

        if (response.is_success) {
          return response.data;
        } else {
          setError(response.message || '알림 전송에 실패했습니다');
          return null;
        }
      } catch (err) {
        setError('알림 전송 중 오류가 발생했습니다');
        return null;
      }
    },
    [],
  );

  // FCM 서비스 상태 확인
  const checkFCMService = useCallback(async (): Promise<boolean> => {
    try {
      const response = await apiClient.get<{
        is_success: boolean;
        code: number;
        message: string;
        data: string;
      }>(API_ENDPOINTS.FCM_PING);

      if (response.is_success) {
        console.log('FCM 서비스 상태:', response.data);
        return true;
      } else {
        setError(response.message || 'FCM 서비스 상태 확인에 실패했습니다');
        return false;
      }
    } catch (err) {
      setError('FCM 서비스 상태 확인 중 오류가 발생했습니다');
      return false;
    }
  }, []);

  // FCM 초기화 (권한 요청 + 토큰 생성 + 등록 또는 갱신)
  const initializeFCM = useCallback(
    async (userId: number): Promise<boolean> => {
      try {
        // 1. 알림 권한 요청
        const hasPermission = await requestNotificationPermission();
        if (!hasPermission) return false;

        // 2. FCM 토큰 생성
        const fcmToken = await generateToken();
        if (!fcmToken) return false;

        // 3. 기존 토큰이 있으면 갱신, 없으면 새로 등록
        let isRegistered: boolean;
        if (tokenId) {
          isRegistered = await updateToken(fcmToken);
        } else {
          isRegistered = await registerToken(userId, fcmToken);
        }

        return isRegistered;
      } catch (err) {
        setError('FCM 초기화 중 오류가 발생했습니다');
        return false;
      }
    },
    [requestNotificationPermission, generateToken, registerToken, updateToken, tokenId],
  );

  // 포그라운드 메시지 수신 처리
  const handleForegroundMessage = useCallback((callback?: (payload: any) => void) => {
    return onMessage(messaging, (payload) => {
      console.log('포그라운드 메시지 수신:', payload);

      const title = payload.notification?.title || '알림';
      const body = payload.notification?.body || '새로운 메시지';

      // 브라우저 알림 표시
      if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification(title, {
            body: body,
            icon: FCM_CONFIG.NOTIFICATION_ICON,
            tag: FCM_CONFIG.NOTIFICATION_TAG,
            requireInteraction: true,
          });
        });
      }

      // 콜백 실행
      callback?.(payload);
    });
  }, []);

  return {
    token,
    tokenId,
    isRegistered,
    error,
    initializeFCM,
    handleForegroundMessage,
    requestNotificationPermission,
    generateToken,
    registerToken,
    updateToken,
    deleteToken,
    sendNotification,
    checkFCMService,
  };
};
