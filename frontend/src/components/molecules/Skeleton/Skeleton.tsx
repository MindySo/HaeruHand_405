import React from 'react';
import styles from './Skeleton.module.css';

// 스켈레톤 애니메이션을 위한 기본 클래스
const SkeletonBase: React.FC<{ className?: string }> = ({ className, children }) => (
  <div className={`${styles.skeletonBase} ${className || ''}`}>{children}</div>
);

// 특보 배너 스켈레톤
export const WarningBannerSkeleton: React.FC = () => (
  <div className={styles.skeletonWarningBanner}>
    <div className={styles.skeletonWarningContent}>
      <SkeletonBase className={styles.skeletonWarningIcon} />
      <div className={styles.skeletonWarningText}>
        <SkeletonBase className={styles.skeletonWarningTitle} />
        <SkeletonBase className={styles.skeletonWarningSubtitle} />
      </div>
    </div>
  </div>
);

// 날씨 위젯 스켈레톤
export const WeatherWidgetSkeleton: React.FC = () => (
  <div className={styles.skeletonWeatherWidget}>
    <SkeletonBase className={styles.skeletonWidgetIcon} />
    <div className={styles.skeletonWidgetContent}>
      <SkeletonBase className={styles.skeletonWidgetSubtitle} />
      <SkeletonBase className={styles.skeletonWidgetData} />
    </div>
  </div>
);

// 지도 스켈레톤
export const MapSkeleton: React.FC = () => (
  <div className={styles.skeletonMap}>
    <div className={styles.skeletonMapContent}>
      <SkeletonBase className={styles.skeletonMapPlaceholder} />
      <div className={styles.skeletonCategoryButtons}>
        <SkeletonBase className={styles.skeletonCategoryButton} />
        <SkeletonBase className={styles.skeletonCategoryButton} />
        <SkeletonBase className={styles.skeletonCategoryButton} />
      </div>
    </div>
  </div>
);

// 수확물 버튼 스켈레톤
export const HarvestButtonSkeleton: React.FC = () => (
  <div className={styles.skeletonHarvestButton}>
    <SkeletonBase className={styles.skeletonHarvestIcon} />
    <SkeletonBase className={styles.skeletonHarvestText} />
  </div>
);

// 액션 버튼 스켈레톤
export const ActionButtonsSkeleton: React.FC = () => (
  <div className={styles.skeletonActionButtons}>
    <SkeletonBase className={styles.skeletonActionButton} />
    <SkeletonBase className={styles.skeletonActionButton} />
  </div>
);

// 범용 스켈레톤 컴포넌트들
export const TextSkeleton: React.FC<{ width?: string; height?: string; className?: string }> = ({
  width = '100%',
  height = '16px',
  className,
}) => (
  <SkeletonBase className={`${styles.textSkeleton} ${className || ''}`} style={{ width, height }} />
);

export const CircleSkeleton: React.FC<{ size?: string; className?: string }> = ({
  size = '24px',
  className,
}) => (
  <SkeletonBase
    className={`${styles.circleSkeleton} ${className || ''}`}
    style={{ width: size, height: size }}
  />
);

export const RectangleSkeleton: React.FC<{
  width?: string;
  height?: string;
  className?: string;
}> = ({ width = '100%', height = '48px', className }) => (
  <SkeletonBase
    className={`${styles.rectangleSkeleton} ${className || ''}`}
    style={{ width, height }}
  />
);

// 기본 스켈레톤 컴포넌트
export const Skeleton: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
  children,
}) => (
  <SkeletonBase className={className} style={style}>
    {children}
  </SkeletonBase>
);
