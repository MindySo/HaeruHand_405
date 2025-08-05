import React from 'react';
import { Text } from '../../atoms';
import styles from './InfoButton.module.css';

export interface InfoButtonProps {
  onClick?: () => void;
  className?: string;
}

const InfoButton: React.FC<InfoButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button className={`${styles.container} ${className}`} onClick={onClick}>
      <div className={styles.content}>
        <div className={styles.textSection}>
          <Text size="lg" color="dark" weight="bold" className={styles.title}>
            채집 안내서
          </Text>
        </div>
        <div className={styles.iconSection}>
          <img src="/sea-shell.svg" alt="채집 안내서" className={styles.locationIcon} />
        </div>
      </div>
    </button>
  );
};

export default InfoButton;
