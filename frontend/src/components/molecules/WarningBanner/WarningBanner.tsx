import React from 'react';
import { Badge } from '../../atoms';
import styles from './WarningBanner.module.css';

export interface WarningBannerProps {
  type: '풍랑주의보' | '폭염주의보' | '태풍주의보' | '해파리주의보' | '호우주의보';
  date: string;
  location: string;
  className?: string;
  variant?: 'latest' | 'past';
}

const WarningBanner: React.FC<WarningBannerProps> = ({
  type,
  date,
  location,
  className = '',
  variant = 'latest',
}) => {
  const isLatest = variant === 'latest';

  return (
    <div className={`${styles.container} ${isLatest ? styles.latest : styles.past} ${className}`}>
      <Badge
        variant={isLatest ? 'error' : 'neutral'}
        size="small"
        className={styles.badge}
        style={{
          backgroundColor: isLatest ? '#FD0202' : '#ABABAB',
          color: 'white',
          fontSize: '14px',
        }}
      >
        {type}
      </Badge>
      <span className={styles.text}>
        {date} {location} 발효
      </span>
    </div>
  );
};

export default WarningBanner;
