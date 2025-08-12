import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

export default function JoinPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roomCode = params.get('code');
    const token = params.get('token');

    if (!roomCode || !token) {
      alert('code/token이 없습니다.');
      navigate({ to: '/main' });
      return;
    }

    const deepLink = `seafeet://join?code=${roomCode}&token=${token}`;
    sessionStorage.setItem(
      'locationRoom',
      JSON.stringify({ roomId: null, roomCode, deepLink, joinToken: token }),
    );
    // 참여자는 호스트가 아님
    sessionStorage.setItem('isLocationRoomHost', 'false');
    sessionStorage.removeItem('hostRoomCode');

    navigate({ to: '/buddy' });
  }, [navigate]);

  return null;
}
