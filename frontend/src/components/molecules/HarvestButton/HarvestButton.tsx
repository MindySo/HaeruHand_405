import React from 'react';
import { Text } from '../../atoms';
import styles from './HarvestButton.module.css';

export interface HarvestButtonProps {
  onClick?: () => void;
  className?: string;
}

const HarvestButton: React.FC<HarvestButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button className={`${styles.container} ${className}`} onClick={onClick}>
      <div className={styles.content}>
        <div className={styles.textSection}>
          <Text size="lg" color="white" weight="bold" className={styles.title}>
            무엇을 잡으셨나요?
          </Text>
          <Text size="sm" color="white" className={styles.subtitle}>
            수확물 확인하기 &gt;
          </Text>
        </div>
        <div className={styles.iconSection}>
          <img src="/shells.svg" alt="조개들" className={styles.shellsIcon} />
        </div>
      </div>
    </button>
  );
};

export default HarvestButton;
