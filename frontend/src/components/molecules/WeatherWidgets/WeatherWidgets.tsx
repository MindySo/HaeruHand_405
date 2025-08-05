import React from 'react';
import styles from './WeatherWidgets.module.css';
import WeatherWidgetItem, {
  type WeatherWidgetItemProps,
} from '../../atoms/WeatherWidgetItem/WeatherWidgetItem';

interface WeatherWidgetsProps {
  items: WeatherWidgetItemProps[];
}

const WeatherWidgets: React.FC<WeatherWidgetsProps> = ({ items }) => {
  return (
    <div className={styles.container}>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <div className={styles.weatherWidget}>
            <WeatherWidgetItem {...item} />
          </div>
          {idx !== items.length - 1 && <div className={styles.divider} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default WeatherWidgets;
