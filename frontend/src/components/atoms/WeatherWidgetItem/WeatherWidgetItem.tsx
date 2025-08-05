import React from 'react';
import { Text } from '../../atoms';
import styles from './WeatherWidgetItem.module.css';

export interface WeatherWidgetItemProps {
  icon: React.ReactNode;
  subtitle: string;
  data: string;
}

const WeatherWidgetItem: React.FC<WeatherWidgetItemProps> = ({ icon, subtitle, data }) => {
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

export default WeatherWidgetItem;
