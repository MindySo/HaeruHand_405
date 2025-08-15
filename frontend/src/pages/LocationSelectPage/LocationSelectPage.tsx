import { useState, useMemo, useEffect } from 'react';
import { Button } from '../../components/atoms';
import { Text } from '../../components/atoms';
import { WarningBanner, WeatherWidgets } from '../../components/molecules';
import { useNavigate } from '@tanstack/react-router';
import { useFisheries, FISHERY_ID_BY_LOCATION, findFisheryById } from '../../hooks/useFisheries';
import { useWeatherFishery } from '../../hooks/useWeatherFishery';
import { useAuth } from '../../hooks/useAuth';
import {
  useWeatherWarningsByRegion,
  transformWeatherWarnings,
} from '../../hooks/useWeatherWarnings';
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
  { id: 'aewol', name: '애월', displayName: '애월어촌계유어장' },
  { id: 'suwon', name: '수원', displayName: '수원어촌계유어장' },
];

const LocationSelectPage = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // 어장 데이터 가져오기 (로그인 완료 후에만)
  const {
    data: fisheriesData,
    isLoading: fisheriesLoading,
    error: fisheriesError,
  } = useFisheries();

  // 날씨 데이터 가져오기 (로그인 완료 후에만)
  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useWeatherFishery();

  // 특보 데이터 가져오기 (MainPage와 동일)
  const {
    data: warningsData,
    isLoading: warningsLoading,
    error: warningsError,
  } = useWeatherWarningsByRegion('L1090700');

  // 로그인 상태 확인 및 리다이렉트
  useEffect(() => {
    if (!isAuthenticated()) {
      console.log('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate({ to: '/login' });
      return;
    }

    console.log('로그인 상태 확인됨, API 호출 시작');
  }, [isAuthenticated, navigate]);

  // 현재 시간에 따른 날씨 데이터 선택
  const currentWeatherData = useMemo(() => {
    if (!weatherData?.data || weatherData.data.length === 0) return null;

    const now = new Date();
    const currentHour = now.getHours();

    // 오전: 0-11시, 오후: 12-23시
    const timePeriod = currentHour < 12 ? '오전' : '오후';

    return (
      weatherData.data.find((item) => item.forecastTimePeriod === timePeriod) || weatherData.data[0]
    );
  }, [weatherData]);

  // 최신 특보 정보 (MainPage와 동일한 로직)
  const latestWarning = useMemo(() => {
    if (!warningsData?.data || warningsData.data.length === 0) return null;

    const transformedWarnings = transformWeatherWarnings(warningsData.data);
    return transformedWarnings[0]; // 가장 최신 특보
  }, [warningsData]);

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

    // 날씨 데이터가 로드되었을 때만 콘솔 출력
    if (weatherData?.data) {
      console.log(`${locationId} 선택 - 날씨 정보:`, weatherData.data);
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

    // 선택된 어장 정보를 localStorage에 저장
    if (fisheriesData?.data) {
      const fisheryId = FISHERY_ID_BY_LOCATION[selectedLocation];
      if (fisheryId) {
        const fishery = findFisheryById(fisheriesData.data, fisheryId);
        if (fishery) {
          localStorage.setItem('selectedFishery', JSON.stringify(fishery));
        }
      }
    }

    // 현재 날씨 정보를 localStorage에 저장
    if (currentWeatherData) {
      localStorage.setItem('currentWeather', JSON.stringify(currentWeatherData));
    }

    // 전체 날씨 데이터를 localStorage에 저장
    if (weatherData?.data) {
      localStorage.setItem('weatherData', JSON.stringify(weatherData.data));
    }

    // MainPage로 이동
    navigate({ to: '/main' });
  };

  // 로딩 상태 통합 (로그인 상태도 고려)
  const isLoading = !isAuthenticated() || fisheriesLoading || weatherLoading;
  const hasError = fisheriesError || weatherError;

  // 로그인되지 않은 상태면 로딩 표시
  if (!isAuthenticated()) {
    return (
      <div className={styles.container}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Text size="lg" color="gray">
            로그인 확인 중...
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* A. 고정된 영역 */}
      <div className={styles.fixedContent}>
        {/* Header */}
        <div className={styles.header}>
          <Text size="xl" weight="bold" color="dark" className={styles.title}>
            오늘은 어디서 해루질 해볼까요?
          </Text>
          <Text size="md" weight="regular" color="dark" className={styles.subtitle}>
            지역에 맞는 날씨와 주의사항을 알려드릴게요
          </Text>
        </div>
      </div>

      {/* B. 스크롤 가능한 영역 */}
      <div className={styles.scrollContent}>
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
              disabled={isLoading}
            >
              {location.name}
            </button>
          ))}
        </div>

        {/* 로딩 상태 표시 */}
        {isLoading && (
          <div className={styles.loadingMessage}>
            <Text size="md" color="gray">
              정보를 불러오는 중...
            </Text>
          </div>
        )}

        {/* 에러 상태 표시 */}
        {hasError && (
          <div className={styles.errorMessage}>
            <Text size="md" color="warning">
              정보를 불러올 수 없습니다.
            </Text>
          </div>
        )}

        {/* Bottom Button */}
        <div className={styles.buttonSection}>
          <div className={styles.infoSection}>
            {/* 특보 배너 - MainPage와 동일한 로직 */}
            <div className={styles.warningBanner}>
              {warningsLoading ? (
                <WarningBanner
                  type={'정보' as any}
                  date="특보 정보 로딩 중..."
                  location=""
                  variant="info"
                  suffix=""
                />
              ) : warningsError ? (
                <WarningBanner
                  type={'정보' as any}
                  date="특보 정보를 불러올 수 없습니다"
                  location=""
                  variant="info"
                  suffix=""
                />
              ) : latestWarning ? (
                <WarningBanner
                  type={latestWarning.type as any}
                  date={latestWarning.date}
                  location={latestWarning.location}
                  variant="latest"
                  suffix="발효"
                />
              ) : (
                <WarningBanner
                  type="정보"
                  date="현재 발효 중인 특보가 없습니다"
                  location=""
                  variant="info"
                  suffix=""
                />
              )}
            </div>
            <WeatherWidgets
              items={[
                {
                  icon: (
                    <img
                      src="/seaTemp.svg"
                      alt="수온 아이콘"
                      style={{ width: '24px', height: '24px' }}
                    />
                  ),
                  subtitle: '현재 날씨',
                  data: currentWeatherData
                    ? `${currentWeatherData.averageWaterTemperature}℃ / ${currentWeatherData.weatherDescription}`
                    : '32.7℃ / 맑음',
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
                  data: currentWeatherData?.seaTravelIndex || '보통',
                },
              ]}
            />
          </div>
          <Button
            size="large"
            variant="primary"
            fullWidth
            onClick={handleStartHarvesting}
            disabled={!selectedLocation || isLoading}
          >
            해루하러 가기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocationSelectPage;
