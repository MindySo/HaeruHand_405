import { useNavigate } from '@tanstack/react-router';
import { useState, useRef } from 'react';
import { Button } from '../../components/atoms';
import { Text } from '../../components/atoms';
import { LoadingSpinner } from '../../components/molecules';
import { usePhotoAnalysis } from '../../hooks/usePhotoAnalysis';
import styles from './PhotoAnalysisResultPage.module.css';
import { useAuth } from '../../hooks/useAuth';
import { LoginModal } from '../../components/molecules/LoginModal/LoginModal';

const PhotoAnalysisResultPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fishName, setFishName] = useState<string>('');
  const [banStartDate, setBanStartDate] = useState<string>('');
  const [banEndDate, setBanEndDate] = useState<string>('');
  const [sizeLimit, setSizeLimit] = useState<string>('');
  const [analysisCompleted, setAnalysisCompleted] = useState<boolean>(false);
  const [currentlyRestricted, setCurrentlyRestricted] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { analyzePhoto, isLoading, error } = usePhotoAnalysis();

  const handleBackButtonClick = () => {
    navigate({ to: '/main' });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // 이전 분석 결과 초기화
        setAnalysisCompleted(false);
        setFishName('');
        setBanStartDate('');
        setBanEndDate('');
        setSizeLimit('');

        // 파일을 미리보기로 표시
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // 전체 분석 프로세스 실행
        const result = await analyzePhoto(file);
        console.log('분석 완료:', result);
        setFishName(result.analysisResult.fishName);
        setBanStartDate(result.analysisResult.regulationFish.restrictionStartDate);
        setBanEndDate(result.analysisResult.regulationFish.restrictionEndDate);

        // minimumLengthCentimeter 처리
        const minLength = result.analysisResult.regulationFish.minimumLengthCentimeter;
        if (minLength === null || minLength === undefined) {
          setSizeLimit('없음');
        } else {
          setSizeLimit(`${minLength}cm`);
        }
        setCurrentlyRestricted(result.analysisResult.currentlyRestricted);
        setAnalysisCompleted(true);
      } catch (error) {
        console.error('파일 분석 중 오류 발생:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* 로그인 안 된 경우에만 모달 표시 */}
      {!isAuthenticated() && <LoginModal message="수확물을 AI로 확인" />}

      {/* 로딩 중일 때 스피너 오버레이 */}
      {isLoading && <LoadingSpinner message="AI가 분석 중입니다..." size="large" />}

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
        <div className={styles.imageContainer}>
          {selectedImage ? (
            <>
              <img src={selectedImage} alt="선택된 이미지" className={styles.previewImage} />
              {analysisCompleted && currentlyRestricted && (
                <div className={styles.restrictionOverlay}>
                  <Text size="xxl" weight="bold" className={styles.warningText}>
                    채집 금지기간
                  </Text>
                </div>
              )}
            </>
          ) : (
            <div className={styles.placeholder}>
              <Text size="lg" weight="regular" color="gray">
                사진을 업로드해주세요
              </Text>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{ color: 'red', margin: '10px 0' }}>오류가 발생했습니다: {error.message}</div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {analysisCompleted && (
        <div className={styles.subContentSection}>
          <Text size="lg" weight="semiBold" color="dark">
            이름: {fishName}
          </Text>
          <Text
            size="md"
            weight={currentlyRestricted ? 'bold' : 'regular'}
            color="dark"
            className={currentlyRestricted ? styles.warningText : undefined}
          >
            금어기: {banStartDate} ~ {banEndDate}
          </Text>
          <Text size="md" weight="regular" color="dark">
            금지체장: {sizeLimit}
          </Text>
        </div>
      )}

      {/* Upload Button */}
      <div className={styles.buttonSection}>
        <Button
          size="large"
          variant="primary"
          fullWidth
          onClick={handleUploadClick}
          disabled={isLoading}
        >
          {isLoading ? '분석 중...' : '업로드하기'}
        </Button>
      </div>
    </div>
  );
};

export default PhotoAnalysisResultPage;
