import { useNavigate } from '@tanstack/react-router';
import { Button } from '../../components/atoms';
import { Text } from '../../components/atoms';
import styles from './PhotoAnalysisResultPage.module.css';
import { useAuth } from '../../hooks/useAuth';
import { LoginModal } from '../../components/molecules/LoginModal/LoginModal';

interface AnalysisResult {
  isAllowed: boolean;
  species: string;
  banPeriod: string;
  sizeLimit: string;
  imageUrl: string;
}

// 임시 데이터 - 실제로는 백엔드에서 받아올 데이터
const mockData: AnalysisResult = {
  isAllowed: false, // true: 채집 허용, false: 채집 금지
  species: '보말',
  banPeriod: '09.07 ~ 11.01',
  sizeLimit: '없음',
  imageUrl: '/bomal.png',
};

const PhotoAnalysisResultPage = () => {
  const { isAllowed, species, banPeriod, sizeLimit, imageUrl } = mockData;
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleBackButtonClick = () => {
    navigate({ to: '/main' });
  };

  return (
    <div>
      {/* 로그인 안 된 경우에만 모달 표시 */}
      {!isAuthenticated() && <LoginModal message="수확물을 AI로 확인" />}

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <button className={styles.backButton} onClick={handleBackButtonClick}>
            <img src="/backButton.svg" alt="뒤로가기" className={styles.backButtonIcon} />
          </button>
        </div>

        {/* Title */}
        <div className={styles.titleSection}>
          <Text size="xl" weight="bold" color="dark">
            저희에게 사진을 보여주세요
          </Text>
          <div className={styles.subtitleSection}>
            <Text size="md" weight="regular" color="dark">
              뭘 잡으셨는지, 잡아도 되는지
            </Text>
            <Text size="md" weight="regular" color="dark">
              잡아도 되는 크기인지 모두 알려드릴게요
            </Text>
          </div>
        </div>

        {/* Analysis Image */}
        <div className={styles.imageSection}>
          <div className={`${styles.imageContainer} ${!isAllowed ? styles.restricted : ''}`}>
            <img
              src={imageUrl}
              alt={`${species} 분석 결과`}
              className={`${styles.previewImage} ${!isAllowed ? styles.restrictedImage : ''}`}
            />
            {!isAllowed && (
              <div className={styles.restrictionOverlay}>
                <Text size="xxxl" weight="bold" color="warning">
                  채집 금지기간
                </Text>
              </div>
            )}
          </div>
        </div>

        <div className={styles.resultSection}>
          <Text size="lg" weight="bold" color="dark">
            {species}
          </Text>
          <Text
            size="sm"
            weight="regular"
            color={!isAllowed ? 'warning' : 'dark'}
            className={!isAllowed ? styles.warningText : ''}
          >
            금어기 : {banPeriod}
          </Text>
          <Text size="sm" weight="regular" color="dark">
            금지체장 : {sizeLimit}
          </Text>
        </div>

        {/* Upload Button */}
        <div className={styles.buttonSection}>
          <Button size="large" variant="primary" fullWidth>
            업로드하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoAnalysisResultPage;
