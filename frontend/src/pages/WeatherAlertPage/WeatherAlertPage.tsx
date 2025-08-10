import React, { useState } from 'react';
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

const initialFilters: Filter[] = [
  { id: 'all', name: '전체', active: false },
  { id: 'gueom', name: '구엄', active: false },
  { id: 'gonae', name: '고내', active: false },
  { id: 'aewol', name: '애월', active: true },
  { id: 'suwon', name: '수원', active: false },
];

const WeatherAlertPage: React.FC = () => {
  const [filters, setFilters] = useState<Filter[]>(initialFilters);
  const [currentFilter, setCurrentFilter] = useState<string>('aewol'); // 기본값
  const navigate = useNavigate();

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
          애월3리 어촌계
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
