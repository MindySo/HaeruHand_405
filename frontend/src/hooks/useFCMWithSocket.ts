import { useEffect, useRef } from 'react';
import { useFCM } from './useFCM';
import { useLocationSocket } from '../stores/useLocationSocket';

export const useFCMWithSocket = (userId: number) => {
  const {
    initializeFCM,
    handleForegroundMessage,
    isRegistered,
    error,
    tokenId,
    deleteToken,
    sendNotification,
    checkFCMService,
  } = useFCM();

  const { connected } = useLocationSocket();
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // 소켓 연결 상태에 따라 FCM 초기화
  useEffect(() => {
    const setupFCM = async () => {
      // 소켓이 연결되어 있고 FCM이 등록되지 않은 경우에만 초기화
      if (connected && !isRegistered) {
        console.log('소켓 연결됨, FCM 초기화 시작...');
        const success = await initializeFCM(userId);
        if (success) {
          console.log('FCM 초기화 성공');
        } else {
          console.error('FCM 초기화 실패:', error);
        }
      }
    };

    setupFCM();
  }, [connected, isRegistered, userId, initializeFCM, error]);

  // 포그라운드 메시지 핸들러 설정
  useEffect(() => {
    if (connected && isRegistered) {
      // 기존 구독 해제
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }

      // 새로운 구독 설정
      unsubscribeRef.current = handleForegroundMessage((payload) => {
        console.log('FCM 포그라운드 메시지 수신:', payload);
        // 여기에 추가적인 메시지 처리 로직을 추가할 수 있습니다
      });
    }

    // 클린업
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [connected, isRegistered, handleForegroundMessage]);

  // Service Worker 등록
  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
          console.log('Service Worker 등록 성공:', registration);
        } catch (error) {
          console.error('Service Worker 등록 실패:', error);
        }
      }
    };

    registerServiceWorker();
  }, []);

  return {
    isRegistered,
    error,
    connected,
    tokenId,
    deleteToken,
    sendNotification,
    checkFCMService,
  };
};
