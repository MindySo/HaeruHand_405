import { Button } from '../../components/atoms';
import { Text } from '../../components/atoms';
import { WarningBanner, WeatherWidgets } from '../../components/molecules';
import styles from './LocationSelectPage.module.css';

const LocationSelectPage = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <Text size="xl" weight="bold" color="dark" className={styles.title}>
          오늘은 어디서 해루질 해볼까요?
        </Text>
        <Text size="md" weight="regular" color="dark" className={styles.subtitle}>
          지역에 맞는 날씨와 주의사항을 알려드릴게요
        </Text>
      </div>

      {/* Map Section */}
      <div className={styles.mapSection}>
        <img src="/jeju_map.svg" alt="제주도 지도" className={styles.map} />
      </div>

      {/* Bottom Button */}
      <div className={styles.buttonSection}>
        <div className={styles.infoSection}>
          <WarningBanner
            type="호우주의보"
            date="07월 24일 22시 00분"
            location="서울"
            variant="info"
            className={styles.bannerSection}
          />
          <WeatherWidgets
            items={[
              {
                icon: (
                  <img
                    src="/sunIcon.svg"
                    alt="태양 아이콘"
                    style={{ width: '24px', height: '24px' }}
                  />
                ),
                subtitle: '현재 날씨',
                data: '32.7℃ / 맑음',
              },
              {
                icon: (
                  <img
                    src="/normal.svg"
                    alt="위험도 보통"
                    style={{ width: '24px', height: '24px' }}
                  />
                ),
                subtitle: '위험도',
                data: '보통',
              },
            ]}
          />
        </div>
        <Button size="large" variant="primary" fullWidth>
          해루하러 가기
        </Button>
      </div>
    </div>
  );
};

export default LocationSelectPage;
