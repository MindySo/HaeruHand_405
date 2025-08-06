import React, { useState } from 'react';
import { Text } from '../../components/atoms';
import { WarningBanner } from '../../components/molecules';
import dummyData from '../../data/dummy.json';
import styles from './WeatherAlertPage.module.css';

interface WeatherAlert {
  id: number;
  type: string;
  date: string;
  location: string;
  status: string;
  priority: string;
}

interface Filter {
  id: string;
  name: string;
  active: boolean;
}

const WeatherAlertPage: React.FC = () => {
  const [filters, setFilters] = useState<Filter[]>(dummyData.filters);
  const [alerts] = useState<WeatherAlert[]>(dummyData.weatherAlerts);

  const handleFilterClick = (filterId: string) => {
    setFilters((prev) =>
      prev.map((filter) => ({
        ...filter,
        active: filter.id === filterId,
      })),
    );
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton}>
          <img src="/backButton.svg" alt="뒤로가기" className={styles.backButtonIcon} />
        </button>
        <Text size="xl" color="dark" weight="bold" className={styles.title}>
          애월3리 어촌계
        </Text>
      </div>

      {/* Filter Tabs */}
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

      {/* Alert List */}
      <div className={styles.alertList}>
        {alerts.map((alert, index) => (
          <WarningBanner
            key={alert.id}
            type={alert.type as any}
            date={`${alert.date} ${alert.location} ${alert.status}`}
            location=""
            variant={index === 0 ? 'latest' : 'past'}
            className={styles.alertItem}
          />
        ))}
      </div>
    </div>
  );
};

export default WeatherAlertPage;
