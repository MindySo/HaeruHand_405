import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router.ts';
import { App as CapApp } from '@capacitor/app';

// QueryClient 인스턴스 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Capacitor 앱 딥링크 핸들러
if ((window as any).Capacitor) {
  CapApp.addListener('appUrlOpen', ({ url }) => {
    console.log('App opened with URL:', url);

    try {
      // seafeet://join?code=ABC&token=xyz 처리
      if (url.includes('seafeet://join')) {
        const urlObj = new URL(url);
        const code = urlObj.searchParams.get('code');
        const token = urlObj.searchParams.get('token');

        if (code && token) {
          // 세션에 저장
          sessionStorage.setItem(
            'locationRoom',
            JSON.stringify({
              roomId: null,
              roomCode: code,
              deepLink: url,
              joinToken: token,
            }),
          );
          sessionStorage.setItem('isLocationRoomHost', 'false');
          sessionStorage.removeItem('hostRoomCode');

          // BuddyTrackingPage로 이동
          router.navigate({ to: '/buddy' });
        }
      }

      // 기존 OAuth 처리
      const u = new URL(url);
      if (u.hostname === 'oauth' && u.pathname === '/callback') {
        const accessToken = u.searchParams.get('accessToken');
        const refreshToken = u.searchParams.get('refreshToken');
        const memberId = u.searchParams.get('memberId');

        if (accessToken && refreshToken) {
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);
          if (memberId) {
            sessionStorage.setItem('memberId', memberId);
          }
          router.navigate({ to: '/main' });
        }
      }
    } catch (error) {
      console.error('딥링크 처리 오류:', error);
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
