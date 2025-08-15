import { useState, useEffect, useMemo } from 'react';
import { Badge, Text } from '../../components/atoms';
import {
  HarvestButton,
  InfoButton,
  TrackingButton,
  WarningBanner,
  WeatherWidgets,
} from '../../components/molecules';
import { useTides, formatTimeArray } from '../../hooks/useTides';
import {
  useWeatherWarningsByRegion,
  transformWeatherWarnings,
} from '../../hooks/useWeatherWarnings';
import styles from './MainPage.module.css';
import { InfoModal } from '../../components/molecules/InfoModal/InfoModal';
import { useNavigate } from '@tanstack/react-router';
import { useKakaoMap } from '../../hooks/useKakaoMap';

// 특보 배너 props
export interface WarningBannerProps {
  type: '풍랑주의보' | '폭염주의보' | '태풍주의보' | '해파리주의보' | '호우주의보' | '폭염 특보';
  date: string;
  location: string;
  className?: string;
  variant?: 'latest' | 'past' | 'info';
}

interface LocationInfo {
  id: string;
  name: string;
  displayName: string;
}

export const MainPage = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(null);
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [selectedFishery, setSelectedFishery] = useState<any>(null);
  const [hasNewWarning, setHasNewWarning] = useState<boolean>(false);
  const [categorySelect, setCategorySelect] = useState<string | null>(null);

  // 조석 데이터 가져오기 (기본 stationCode: DT_0004)
  const { data: tidesData, isLoading: tidesLoading, error: tidesError } = useTides('DT_0004');

  // 특보 데이터 가져오기 (L1090700 지역)
  const {
    data: warningsData,
    isLoading: warningsLoading,
    error: warningsError,
  } = useWeatherWarningsByRegion('L1090700', 0, 20);

  // 모달 창 띄우기 state
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const openInfoModal = () => setIsInfoModalOpen(true);
  const closeInfoModal = () => setIsInfoModalOpen(false);

  // 컴포넌트 마운트 시 localStorage에서 데이터 가져오기
  useEffect(() => {
    const savedLocation = localStorage.getItem('selectedLocation');
    if (savedLocation) {
      try {
        const locationInfo = JSON.parse(savedLocation);
        setSelectedLocation(locationInfo);
      } catch (error) {
        console.error('저장된 지역 정보를 파싱할 수 없습니다:', error);
        setSelectedLocation({
          id: 'aewol',
          name: '애월',
          displayName: '애월3리 어촌계',
        });
      }
    } else {
      setSelectedLocation({
        id: 'aewol',
        name: '애월',
        displayName: '애월3리 어촌계',
      });
    }

    // 날씨 데이터 가져오기
    const savedWeatherData = localStorage.getItem('weatherData');
    if (savedWeatherData) {
      try {
        const weather = JSON.parse(savedWeatherData);
        setWeatherData(weather);
      } catch (error) {
        console.error('저장된 날씨 데이터를 파싱할 수 없습니다:', error);
      }
    }

    // 어장 데이터 가져오기
    const savedFishery = localStorage.getItem('selectedFishery');
    if (savedFishery) {
      try {
        const fishery = JSON.parse(savedFishery);
        setSelectedFishery(fishery);
      } catch (error) {
        console.error('저장된 어장 데이터를 파싱할 수 없습니다:', error);
      }
    }
  }, []);

  // 새로운 특보 감지
  useEffect(() => {
    if (!warningsData?.data || warningsData.data.length === 0) {
      setHasNewWarning(false);
      return;
    }

    // 현재 최신 특보 정보
    const currentLatestWarning = warningsData.data[0];

    // currentLatestWarning이 유효한지 확인
    if (
      !currentLatestWarning ||
      !currentLatestWarning.warningType ||
      !currentLatestWarning.warningLevel ||
      !currentLatestWarning.announcedAt
    ) {
      setHasNewWarning(false);
      return;
    }

    const currentWarningKey = `${currentLatestWarning.warningType}${currentLatestWarning.warningLevel}_${currentLatestWarning.announcedAt.join('_')}`;

    // localStorage에서 마지막으로 확인한 특보 정보 가져오기
    const lastCheckedWarning = localStorage.getItem('lastCheckedWarning');

    if (lastCheckedWarning !== currentWarningKey) {
      // 새로운 특보가 있음
      setHasNewWarning(true);
    } else {
      // 새로운 특보 없음
      setHasNewWarning(false);
    }
  }, [warningsData]);

  // 특보 페이지로 이동 시 마지막 확인 시간 업데이트
  const handleWeatherAlertClick = () => {
    if (warningsData?.data && warningsData.data.length > 0) {
      const currentLatestWarning = warningsData.data[0];

      // currentLatestWarning이 유효한지 확인
      if (
        currentLatestWarning &&
        currentLatestWarning.warningType &&
        currentLatestWarning.warningLevel &&
        currentLatestWarning.announcedAt
      ) {
        const currentWarningKey = `${currentLatestWarning.warningType}${currentLatestWarning.warningLevel}_${currentLatestWarning.announcedAt.join('_')}`;
        localStorage.setItem('lastCheckedWarning', currentWarningKey);
        setHasNewWarning(false);
      }
    }
    navigate({ to: '/weather' });
  };

  // 카카오 지도
  const { searchConvenienceStore, searchParkingLot, searchToilet, loading } =
    useKakaoMap(selectedFishery);

  //
  const handleCategoryClick = (category: string, searchFunc: () => void) => {
    setCategorySelect(category); // 어떤 버튼을 눌렀는지 상태에 저장
    searchFunc(); // 기존 카카오맵 검색 실행
  };

  // 현재 시간에 따른 수온 데이터 선택
  const currentWaterTemperature = useMemo(() => {
    if (!weatherData || weatherData.length === 0) return '22.7℃';

    const now = new Date();
    const currentHour = now.getHours();

    // 오전: 0-11시, 오후: 12-23시
    const timePeriod = currentHour < 12 ? '오전' : '오후';

    const currentWeather = weatherData.find((item) => item.forecastTimePeriod === timePeriod);
    return currentWeather ? `${currentWeather.averageWaterTemperature}℃` : '22.7℃';
  }, [weatherData]);

  // 최신 특보 데이터 (첫 번째 항목)
  const latestWarning = useMemo(() => {
    if (!warningsData?.data || warningsData.data.length === 0) return null;

    const alerts = transformWeatherWarnings(warningsData.data);
    return alerts.length > 0 ? alerts[0] : null;
  }, [warningsData]);

  // 위치 트래킹 버튼 클릭 핸들러
  const handleTrackingClick = () => {
    navigate({ to: '/buddy' });
  };

  const handleAnalysisButtonClick = () => {
    navigate({ to: '/photo' });
  };

  const handleBackButtonClick = () => {
    // localStorage에서 모든 관련 데이터 삭제
    localStorage.removeItem('selectedLocation');
    localStorage.removeItem('selectedFishery');
    localStorage.removeItem('currentWeather');
    localStorage.removeItem('weatherData');

    navigate({ to: '/map' });
  };

  // 해루 가능 시간 계산
  const fishingTimeDisplay = tidesData?.data
    ? `${formatTimeArray(tidesData.data.fishingStartTime)} ~ ${formatTimeArray(tidesData.data.fishingEndTime)}`
    : tidesError
      ? '준비중' // 에러 발생 시 '준비중' 표시
      : '09:10 ~ 11:00'; // 기본값

  return (
    <div className={styles.container}>
      {/* A. 고정된 영역 */}
      <div className={styles.fixedContent}>
        {/* a-1. 헤더 */}
        <div className={styles.header}>
          <img src="/haeruhand_logo.svg" alt="해루핸 로고" className={styles.logo} />
          <button className={styles.bellButton} onClick={handleWeatherAlertClick}>
            <img src="/bell.svg" alt="특보 조회" className={styles.bellIcon} />
            {hasNewWarning && <div className={styles.bellMarker} />}
          </button>
        </div>

        {/* a-2. 어장 이름(뒤로가기) */}
        <div className={styles.backButtonContainer}>
          <button className={styles.backButton} onClick={handleBackButtonClick}>
            <img src="/backButton.svg" alt="뒤로가기" className={styles.backButtonIcon} />
          </button>
          <Text size="xl" weight="bold" color="dark">
            {selectedLocation?.displayName || '애월3리 어촌계'}
          </Text>
        </div>
      </div>

      {/* B. 스크롤 가능한 영역 */}
      <div className={styles.scrollContent}>
        {/* b-1. 특보 배너 */}
        <div className={styles.warningBanner} onClick={handleWeatherAlertClick}>
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
        {/* b-2. 위젯: 해루 가능 시간, 현재 수온 */}
        <div className={styles.weatherWidgets}>
          <WeatherWidgets
            items={[
              {
                icon: (
                  <img
                    src="/wave.svg"
                    alt="파도 아이콘"
                    style={{ width: '24px', height: '24px' }}
                  />
                ),
                subtitle: '해루 가능 시간',
                data: tidesLoading ? '로딩 중...' : fishingTimeDisplay,
              },
              {
                icon: (
                  <img
                    src="/seaTemp.svg"
                    alt="수온 아이콘"
                    style={{ width: '24px', height: '24px' }}
                  />
                ),
                subtitle: '현재 수온',
                data: currentWaterTemperature,
              },
            ]}
          />
        </div>
        {/* b-3. 지도 */}
        <div className={styles.mapContainer}>
          <div className={styles.map}>
            {selectedFishery ? (
              <div id="main-map" className={styles.kakaoMap} />
            ) : (
              <div className={styles.mapPlaceholder}>
                <Text size="md" color="gray">
                  지도 로딩 중...
                </Text>
              </div>
            )}
            {/* 카테고리 버튼 */}
            <div className={styles.categorySearch}>
              <button
                className={styles.categoryButton}
                onClick={() => handleCategoryClick('convenienceStore', searchConvenienceStore)}
              >
                <Badge
                  variant={categorySelect === 'convenienceStore' ? 'primary' : 'neutral'}
                  size="medium"
                  style={{ borderRadius: '100px' }}
                >
                  <img src="/convenienceStoreIcon.svg" alt="편의점" className={styles.badgeIcon} />
                  편의점
                </Badge>
              </button>
              <button
                className={styles.categoryButton}
                onClick={() => handleCategoryClick('parkingLot', searchParkingLot)}
              >
                <Badge
                  variant={categorySelect === 'parkingLot' ? 'primary' : 'neutral'}
                  size="medium"
                  style={{ borderRadius: '100px' }}
                >
                  <img src="/parkingIcon.svg" alt="주차장" className={styles.badgeIcon} />
                  주차장
                </Badge>
              </button>
              <button
                className={styles.categoryButton}
                onClick={() => handleCategoryClick('toilet', searchToilet)}
              >
                <Badge
                  variant={categorySelect === 'toilet' ? 'primary' : 'neutral'}
                  size="medium"
                  style={{ borderRadius: '100px' }}
                >
                  <img src="/toiletIcon.svg" alt="화장실" className={styles.badgeIcon} />
                  화장실
                </Badge>
              </button>
            </div>
          </div>
        </div>
        {/* b-4. 수확물 확인하기 */}
        <div className={styles.harvestButton}>
          <HarvestButton onClick={handleAnalysisButtonClick} />
        </div>
        {/* b-5. 버튼: 채집 안내서, 위치 트래킹 */}
        <div className={styles.buttons}>
          <InfoButton onClick={openInfoModal} />
          <TrackingButton onClick={handleTrackingClick} />
        </div>
        {/* 채집 안내서 모달(InfoModal) 로직 */}-
        {isInfoModalOpen && <InfoModal onClose={closeInfoModal} />}
      </div>
    </div>
  );
};
