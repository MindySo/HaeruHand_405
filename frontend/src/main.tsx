// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';

// ✅ 추가: 딥링크 콜백 처리
import { App as CapApp } from '@capacitor/app';

CapApp.addListener('appUrlOpen', ({ url }) => {
  try {
    // ex) haeru://oauth/callback?code=XXXX
    const u = new URL(url);
    if (u.hostname === 'oauth' && u.pathname === '/callback') {
      const code = u.searchParams.get('code');
      if (code) {
        // 로그인 페이지로 code 전달
        router.navigate({ to: '/login', search: { code } });
      }
    }
  } catch {}
});

// ---- 기존 코드 그대로 ----
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
    mutations: { retry: 1 },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
