import { useState } from 'react';
import { Button } from '../../components/atoms';
import { Text } from '../../components/atoms';
import { WarningBanner, WeatherWidgets } from '../../components/molecules';
import { useNavigate } from '@tanstack/react-router';
import { useFisheries, FISHERY_ID_BY_LOCATION, findFisheryById } from '../../hooks/useFisheries';
import styles from './LocationSelectPage.module.css';

// 지역 정보 타입 정의
interface LocationInfo {
  id: string;
  name: string;
  displayName: string; // MainPage에 표시될 이름
}

const locations: LocationInfo[] = [
  { id: 'gueom', name: '구업', displayName: '구업어촌계유어장' },
  { id: 'gonae', name: '고내', displayName: '고내어촌계유어장' },
  { id: 'aewol', name: '애월', displayName: '애월3리 어촌계' },
  { id: 'suwon', name: '수원', displayName: '수원어촌계유어장' },
];

const LocationSelectPage = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const navigate = useNavigate();

  // 어장 데이터 가져오기
  const { data: fisheriesData, isLoading, error } = useFisheries();

  const handleLocationClick = (locationId: string) => {
    setSelectedLocation(locationId);

    // 어장 데이터가 로드되었을 때만 콘솔 출력
    if (fisheriesData?.data) {
      const fisheryId = FISHERY_ID_BY_LOCATION[locationId];
      if (fisheryId) {
        const fishery = findFisheryById(fisheriesData.data, fisheryId);
        if (fishery) {
          console.log(`${locationId} 선택 - 어장 정보:`, fishery);
        } else {
          console.log(`${locationId} 선택 - 해당 ID(${fisheryId})의 어장을 찾을 수 없습니다.`);
        }
      }
    }
  };

  const handleStartHarvesting = () => {
    // 지역이 선택되지 않았으면 처리하지 않음
    if (!selectedLocation) {
      alert('지역을 선택해주세요!');
      return;
    }

    // 선택된 지역 정보를 localStorage에 저장
    const selectedLocationInfo = locations.find((loc) => loc.id === selectedLocation);
    if (selectedLocationInfo) {
      localStorage.setItem('selectedLocation', JSON.stringify(selectedLocationInfo));
    }

    // MainPage로 이동
    navigate({ to: '/main' });
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Text size="xl" weight="bold" color="dark" className={styles.title}>
          오늘은 어디서 해루질 해볼까요?
        </Text>
        <Text size="md" weight="regular" color="dark" className={styles.subtitle}>
          지역에 맞는 날씨와 주의사항을 알려드릴게요
        </Text>
      </div>

      {/* Map Section */}
      <div className={styles.mapSection}>
        <img src="/jeju_map.svg" alt="제주도 지도" className={styles.map} />
      </div>

      {/* Location Buttons */}
      <div className={styles.locationButtons}>
        {locations.map((location) => (
          <button
            key={location.id}
            className={`${styles.locationButton} ${
              selectedLocation === location.id ? styles.selected : ''
            }`}
            onClick={() => handleLocationClick(location.id)}
            disabled={isLoading} // 데이터 로딩 중에는 버튼 비활성화
          >
            {location.name}
          </button>
        ))}
      </div>

      {/* 로딩 상태 표시 */}
      {isLoading && (
        <div className={styles.loadingMessage}>
          <Text size="md" color="gray">
            어장 정보를 불러오는 중...
          </Text>
        </div>
      )}

      {/* 에러 상태 표시 */}
      {error && (
        <div className={styles.errorMessage}>
          <Text size="md" color="red">
            어장 정보를 불러올 수 없습니다.
          </Text>
        </div>
      )}

      {/* Bottom Button */}
      <div className={styles.buttonSection}>
        <div className={styles.infoSection}>
          <WarningBanner
            type="호우주의보"
            date="07월 24일 22시 00분"
            location="서울"
            variant="info"
            className={styles.bannerSection}
          />
          <WeatherWidgets
            items={[
              {
                icon: (
                  <img
                    src="/sunIcon.svg"
                    alt="태양 아이콘"
                    style={{ width: '24px', height: '24px' }}
                  />
                ),
                subtitle: '현재 날씨',
                data: '32.7℃ / 맑음',
              },
              {
                icon: (
                  <img
                    src="/normal.svg"
                    alt="위험도 보통"
                    style={{ width: '24px', height: '24px' }}
                  />
                ),
                subtitle: '위험도',
                data: '보통',
              },
            ]}
          />
        </div>
        <Button
          size="large"
          variant="primary"
          fullWidth
          onClick={handleStartHarvesting}
          disabled={!selectedLocation || isLoading} // 지역이 선택되지 않거나 로딩 중이면 버튼 비활성화
        >
          해루하러 가기
        </Button>
      </div>
    </div>
  );
};

export default LocationSelectPage;
