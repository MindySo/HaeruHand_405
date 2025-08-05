import React from 'react';
import { Text } from '../../atoms';
import styles from './InfoCard.module.css';

export interface InfoCardProps {
  title: string;
  type: 'guide' | 'tracking';
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, type, className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <Text size="md" color="dark" weight="bold" className={styles.title}>
        {title}
      </Text>

      {type === 'guide' && (
        <div className={styles.guideContent}>
          <div className={styles.shell}>🐚</div>
          <div className={styles.shell}>🐚</div>
          <div className={styles.starfish}>⭐</div>
        </div>
      )}

      {type === 'tracking' && (
        <div className={styles.trackingContent}>
          <div className={styles.mapIcon}>
            <div className={styles.path}></div>
            <div className={styles.marker}></div>
            <div className={styles.marker}></div>
            <div className={styles.marker}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoCard;
