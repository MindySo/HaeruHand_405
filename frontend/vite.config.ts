// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      // 로컬에서 /api 로 들어오는 요청/웹소켓을
      // 원격 서버(haeruhand.o-r.kr)로 프록시
      '/api': {
        target: 'http://haeruhand.o-r.kr',
        changeOrigin: true,
        ws: true,
        // 서버가 경로에 이미 /api 를 기대하므로 rewrite는 생략
        // (만약 서버가 /v1 로 바로 시작한다면 ↓ 주석 해제)
        // rewrite: (path) => path.replace(/^\/api/, ''),
        // target이 https + 사설 인증서라면 ↓ 주석 해제
        // secure: false,
      },
    },
  },
});
