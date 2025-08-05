import React from 'react';
import { Text } from '../../atoms';
import styles from './TrackingButton.module.css';

export interface TrackingButtonProps {
  onClick?: () => void;
  className?: string;
}

const TrackingButton: React.FC<TrackingButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button className={`${styles.container} ${className}`} onClick={onClick}>
      <div className={styles.content}>
        <div className={styles.textSection}>
          <Text size="lg" color="dark" weight="bold" className={styles.title}>
            위치 트래킹
          </Text>
        </div>
        <div className={styles.iconSection}>
          <img src="/tracking.svg" alt="위치 트래킹" className={styles.locationIcon} />
        </div>
      </div>
    </button>
  );
};

export default TrackingButton;
