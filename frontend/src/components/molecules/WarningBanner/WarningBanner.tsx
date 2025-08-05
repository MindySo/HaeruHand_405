import React from 'react';
import { Badge } from '../../atoms';
import styles from './WarningBanner.module.css';

export interface WarningBannerProps {
  type: '풍랑주의보' | '폭염주의보' | '태풍주의보' | '해파리주의보' | '호우주의보';
  date: string;
  location: string;
  className?: string;
}

const WarningBanner: React.FC<WarningBannerProps> = ({ type, date, location, className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <Badge variant="error" size="small" className={styles.badge}>
        {type}
      </Badge>
      <span className={styles.text}>
        {date} {location} 발효
      </span>
    </div>
  );
};

export default WarningBanner;
