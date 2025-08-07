import { Button, Text } from '../../components/atoms';
import styles from './BuddyTrackingPage.module.css';
import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

const buddyData = [
  { name: '이규민', latitude: 37.501, longitude: 127.0368861, color: 'red' },
  { name: '오일우', latitude: 37.5027861, longitude: 127.0368861, color: 'blue' },
  { name: '조예림', latitude: 37.5030861, longitude: 127.0368861, color: 'yellow' },
  { name: '김채은', latitude: 37.5040861, longitude: 127.0368861, color: 'green' },
];

const Buddy = ({ name, color }: { name: string; color: string }) => {
  return (
    <div className={styles.buddy}>
      <div className={styles.dot} style={{ backgroundColor: color }} />
      <Text size="sm" weight="regular" color="white">
        {name}
      </Text>
    </div>
  );
};

const BuddyTrackingPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const container = document.getElementById('map');

            if (!container) {
              console.error('Map container not found');
              return;
            }

            const options = {
              center: new window.kakao.maps.LatLng(latitude, longitude),
              level: 3,
            };
            const map = new window.kakao.maps.Map(container, options);

            // 내 위치 마커
            new window.kakao.maps.Marker({
              map,
              position: new window.kakao.maps.LatLng(latitude, longitude),
            });

            // buddy 마커
            buddyData.forEach((buddy) => {
              const position = new window.kakao.maps.LatLng(buddy.latitude, buddy.longitude);

              const markerImage = new window.kakao.maps.MarkerImage(
                `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                    <circle cx="9" cy="9" r="8" fill="${buddy.color}" stroke="black" stroke-width="2" overflow="visible"/>
                  </svg>
                `)}`,
                new window.kakao.maps.Size(18, 18),
              );

              new window.kakao.maps.Marker({
                map,
                position,
                image: markerImage,
              });
            });
          },
          (error) => {
            console.error('위치 정보를 가져오는 데 실패했습니다:', error);
          },
        );
      });
    };

    document.head.appendChild(script);
  }, []);

  const navigate = useNavigate();

  const buddyButtonClick = () => {
    navigate({ to: '/tracking-share' });
  };

  const handleBackButtonClick = () => {
    navigate({ to: '/main' });
  };

  return (
    <div className={styles.container}>
      <div id="map" className={styles.map} />
      <div className={styles.wrapper}>
        <button className={styles.backButton} onClick={handleBackButtonClick}>
          <img src="/backButton.svg" alt="뒤로가기" className={styles.backButtonIcon} />
        </button>
        <div className={styles.buddyList}>
          {buddyData.map((buddy) => (
            <Buddy key={buddy.name} name={buddy.name} color={buddy.color} />
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
};

export default BuddyTrackingPage;
