import React, { useState, useEffect } from 'react';
import { Text } from '../../components/atoms';
import { WarningBanner } from '../../components/molecules';
import {
  useWeatherWarnings,
  useWeatherWarningsByRegion,
  transformWeatherWarnings,
} from '../../hooks/useWeatherWarnings';
import styles from './WeatherAlertPage.module.css';
import { useNavigate } from '@tanstack/react-router';

interface Filter {
  id: string;
  name: string;
  active: boolean;
}

interface LocationInfo {
  id: string;
  name: string;
  displayName: string;
}

const WeatherAlertPage: React.FC = () => {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [currentFilter, setCurrentFilter] = useState<string>('aewol'); // 기본값
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(null);
  const navigate = useNavigate();

  // 컴포넌트 마운트 시 localStorage에서 선택된 지역 정보 가져오기
  useEffect(() => {
    const savedLocation = localStorage.getItem('selectedLocation');
    if (savedLocation) {
      try {
        const locationInfo = JSON.parse(savedLocation);
        setSelectedLocation(locationInfo);

        // 선택된 어장에 따라 초기 필터 설정
        const initialFilters: Filter[] = [
          { id: 'all', name: '전체', active: false },
          { id: 'gueom', name: '구업', active: locationInfo.id === 'gueom' },
          { id: 'gonae', name: '고내', active: locationInfo.id === 'gonae' },
          { id: 'aewol', name: '애월', active: locationInfo.id === 'aewol' },
          { id: 'suwon', name: '수원', active: locationInfo.id === 'suwon' },
        ];

        setFilters(initialFilters);
        setCurrentFilter(locationInfo.id);
      } catch (error) {
        console.error('저장된 지역 정보를 파싱할 수 없습니다:', error);
        // 기본값 설정
        const defaultLocation = {
          id: 'aewol',
          name: '애월',
          displayName: '애월3리 어촌계',
        };
        setSelectedLocation(defaultLocation);

        const defaultFilters: Filter[] = [
          { id: 'all', name: '전체', active: false },
          { id: 'gueom', name: '구업', active: false },
          { id: 'gonae', name: '고내', active: false },
          { id: 'aewol', name: '애월', active: true },
          { id: 'suwon', name: '수원', active: false },
        ];

        setFilters(defaultFilters);
        setCurrentFilter('aewol');
      }
    } else {
      // 저장된 정보가 없으면 기본값 설정
      const defaultLocation = {
        id: 'aewol',
        name: '애월',
        displayName: '애월3리 어촌계',
      };
      setSelectedLocation(defaultLocation);

      const defaultFilters: Filter[] = [
        { id: 'all', name: '전체', active: false },
        { id: 'gueom', name: '구업', active: false },
        { id: 'gonae', name: '고내', active: false },
        { id: 'aewol', name: '애월', active: true },
        { id: 'suwon', name: '수원', active: false },
      ];

      setFilters(defaultFilters);
      setCurrentFilter('aewol');
    }
  }, []);

  // 전체 특보 조회
  const allWarningsQuery = useWeatherWarnings(0, 20);

  // 지역별 특보 조회 (L1090700 고정)
  const regionWarningsQuery = useWeatherWarningsByRegion('L1090700', 0, 20);

  // 현재 활성화된 필터에 따라 적절한 쿼리 선택
  const isAllFilter = currentFilter === 'all';
  const activeQuery = isAllFilter ? allWarningsQuery : regionWarningsQuery;

  const handleFilterClick = (filterId: string) => {
    setFilters((prev) =>
      prev.map((filter) => ({
        ...filter,
        active: filter.id === filterId,
      })),
    );
    setCurrentFilter(filterId);
  };

  const handleBackButtonClick = () => {
    navigate({ to: '/main' });
  };

  // 데이터 변환
  const alerts = activeQuery.data ? transformWeatherWarnings(activeQuery.data) : [];
  const isLoading = activeQuery.isPending;
  const error = activeQuery.error;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBackButtonClick}>
          <img src="/backButton.svg" alt="뒤로가기" className={styles.backButtonIcon} />
        </button>
        <Text size="xl" color="dark" weight="bold" className={styles.title}>
          {selectedLocation?.displayName || '애월3리 어촌계'}
        </Text>
      </div>

      <div className={styles.filterTabs}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`${styles.filterTab} ${filter.active ? styles.active : ''}`}
            onClick={() => handleFilterClick(filter.id)}
          >
            <Text
              size="md"
              color={filter.active ? 'dark' : 'gray'}
              weight={filter.active ? 'bold' : 'regular'}
            >
              {filter.name}
            </Text>
          </button>
        ))}
      </div>

      <div className={styles.alertList}>
        {isLoading && (
          <WarningBanner
            type={'정보' as any}
            date="불러오는 중..."
            location=""
            variant="info"
            className={styles.alertItem}
            suffix="발표"
          />
        )}
        {error && !isLoading && (
          <WarningBanner
            type={'오류' as any}
            date={error instanceof Error ? error.message : '요청 중 오류가 발생했습니다.'}
            location=""
            variant="info"
            className={styles.alertItem}
            suffix="발표"
          />
        )}
        {!isLoading &&
          !error &&
          alerts.map((item, index) => (
            <WarningBanner
              key={item.id}
              type={item.type as any}
              date={item.date}
              location={item.location}
              variant={index === 0 ? 'latest' : 'past'}
              className={styles.alertItem}
              suffix="발표"
            />
          ))}
      </div>
    </div>
  );
};

export default WeatherAlertPage;
