import { Button } from '../../components/atoms';
import { Text } from '../../components/atoms';
import styles from './TrackingSharePage.module.css';

const TrackingSharePage = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton}>
          <img src="/backButton.svg" alt="뒤로가기" className={styles.backButtonIcon} />
        </button>
      </div>

      {/* Title */}
      <div className={styles.titleSection}>
        <Text size="xl" weight="bold" color="dark">
          친구에게 QR을 보여주세요
        </Text>
        <div className={styles.subtitleSection}>
          <Text size="md" weight="regular" color="dark">
            서로의 위치를 확인하고,
          </Text>
          <Text size="md" weight="regular" color="dark">
            더 안전하게 해루질할 수 있어요
          </Text>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* QR Code */}
        <div className={styles.qrSection}>
          <img src="/qr.svg" alt="QR 코드" className={styles.qrCode} />
        </div>
      </div>

      {/* Bottom Button */}
      <div className={styles.buttonSection}>
        <Button size="large" variant="primary" fullWidth>
          돌아가기
        </Button>
      </div>
    </div>
  );
};

export default TrackingSharePage;
