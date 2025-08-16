import React from 'react';
import { Text } from '../../atoms';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  overlay?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = '로딩 중...',
  size = 'medium',
  overlay = true,
}) => {
  const spinnerSize = {
    small: '24px',
    medium: '48px',
    large: '64px',
  };

  const spinner = (
    <div className={styles.spinnerContainer}>
      <div
        className={styles.spinner}
        style={{
          width: spinnerSize[size],
          height: spinnerSize[size],
        }}
      ></div>
      {message && (
        <Text size="lg" weight="medium" color="dark" className={styles.loadingText}>
          {message}
        </Text>
      )}
    </div>
  );

  if (overlay) {
    return <div className={styles.loadingOverlay}>{spinner}</div>;
  }

  return spinner;
};

export default LoadingSpinner;
