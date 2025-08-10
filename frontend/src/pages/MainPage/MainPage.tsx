import { useState, useEffect } from 'react';
import { Badge, Text } from '../../components/atoms';
import {
  HarvestButton,
  InfoButton,
  TrackingButton,
  WarningBanner,
  WeatherWidgets,
} from '../../components/molecules';
import styles from './MainPage.module.css';
import { InfoModal } from '../../components/molecules/InfoModal/InfoModal';
import { useNavigate } from '@tanstack/react-router';

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

  // 모달 창 띄우기 state
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const openInfoModal = () => setIsInfoModalOpen(true);
  const closeInfoModal = () => setIsInfoModalOpen(false);

  // 컴포넌트 마운트 시 localStorage에서 선택된 지역 정보 가져오기
  useEffect(() => {
    const savedLocation = localStorage.getItem('selectedLocation');
    if (savedLocation) {
      try {
        const locationInfo = JSON.parse(savedLocation);
        setSelectedLocation(locationInfo);
      } catch (error) {
        console.error('저장된 지역 정보를 파싱할 수 없습니다:', error);
        // 기본값 설정
        setSelectedLocation({
          id: 'aewol',
          name: '애월',
          displayName: '애월3리 어촌계',
        });
      }
    } else {
      // 저장된 정보가 없으면 기본값 설정
      setSelectedLocation({
        id: 'aewol',
        name: '애월',
        displayName: '애월3리 어촌계',
      });
    }
  }, []);

  // 위치 트래킹 버튼 클릭 핸들러
  const handleTrackingClick = () => {
    navigate({ to: '/buddy' });
  };

  const handleAnalysisButtonClick = () => {
    navigate({ to: '/photo' });
  };

  const handleWeatherAlertClick = () => {
    navigate({ to: '/weather' });
  };

  const handleBackButtonClick = () => {
    // localStorage에서 선택된 지역 정보 삭제
    localStorage.removeItem('selectedLocation');
    navigate({ to: '/map' });
  };

  // -------------------------------------------------------------------------------------
  // [메인 페이지 반환]
  return (
    <div className={styles.container}>
      {/* A. 고정된 영역 */}
      <div className={styles.fixedContent}>
        {/* a-1. 헤더 */}
        <div className={styles.header}>
          <Text size="xl">해루핸 로고</Text>
          {/* 종 모양 아이콘(특보 조회 페이지 이동) */}
          <button className={styles.bellButton} onClick={handleWeatherAlertClick}>
            <img src="/bell.svg" alt="특보 조회" className={styles.bellIcon} />
            {/* 폴링 시 표시할 마커(빨간 점)-> state로 수정 예정 */}
            <div className={styles.bellMarker} />
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
        {/* b-1. 특보 배너 -> 임시 데이터(나중에 설정해놓은 props로 받기) */}
        <div className={styles.warningBanner} onClick={handleWeatherAlertClick}>
          <WarningBanner
            type="호우주의보"
            date="08월 06일 22시 00분"
            location="안양"
            variant="info"
          />
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
                data: '09:10 ~ 11:00',
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
                data: '22.7℃',
              },
            ]}
          />
        </div>

        {/* b-3. 지도 */}
        <div className={styles.mapContainer}>
          <div className={styles.map}>
            {/* 뱃지 */}
            <div className={styles.mapBadges}>
              <Badge variant="neutral" size="small" style={{ borderRadius: '100px' }}>
                <div className={styles.badgeMarker1} />
                채집 가능구역
              </Badge>
              <Badge variant="neutral" size="small" style={{ borderRadius: '100px' }}>
                <div className={styles.badgeMarker2} />
                채집 금지구역
              </Badge>
            </div>
          </div>
        </div>

        {/* b-4. 수확물 확인하기 */}
        <div className={styles.harvestButton}>
          <HarvestButton onClick={handleAnalysisButtonClick} />
        </div>

        {/* b-5. 버튼: 채집 안내서, 위치 트래킹 */}
        <div className={styles.buttons}>
          {/* 채집 안내서 -> 모달 창 열기 */}
          <InfoButton onClick={openInfoModal} />
          {/* 위치 트래킹 -> 트래핑 페이지 이동 */}
          <TrackingButton onClick={handleTrackingClick} />
        </div>

        {/* 채집 안내서 모달(InfoModal) 로직 */}
        {isInfoModalOpen && <InfoModal onClose={closeInfoModal} />}
      </div>
    </div>
  );
};
