import React from 'react';
import { Text } from '../../atoms';
import styles from './WeatherWidgets.module.css';

interface WidgetDataProps {
  icon: React.ReactNode;
  subtitle: string;
  data: string;
}

const WidgetData: React.FC<WidgetDataProps> = ({ icon, subtitle, data }) => {
  return (
    <div className={styles.widgetData}>
      <div className={styles.iconSection}>{icon}</div>
      <div className={styles.textSection}>
        <Text size="sm" color="gray" weight="semiBold" style={{ marginBottom: '4px' }}>
          {subtitle}
        </Text>
        <Text size="xl" color="dark" weight="bold">
          {data}
        </Text>
      </div>
    </div>
  );
};

// 아이콘 컴포넌트들
const SunIcon: React.FC = () => (
  <div className={styles.sunIcon}>
    <div className={styles.sunCenter}></div>
  </div>
);

const WeatherWidgets: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* 지도 페이지 위젯 */}
      <div className={styles.weatherWidget}>
        <WidgetData icon={<SunIcon />} subtitle="현재 날씨" data="32.7°C / 맑음" />
      </div>
      <div className={styles.weatherWidget}>
        <WidgetData icon={<SunIcon />} subtitle="위험도" data="보통" />
      </div>

      {/* 메인 페이지 위젯 */}
      {/* <div className={styles.weatherWidget}>
        <WidgetData icon={<SunIcon />} subtitle="해루 가능 시간" data="09:10 ~ 11:00" />
      </div>
      <div className={styles.weatherWidget}>
        <WidgetData icon={<SunIcon />} subtitle="현재 수온" data="22.7°C" />
      </div> */}
    </div>
  );
};

export default WeatherWidgets;
