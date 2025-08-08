import { useNavigate } from '@tanstack/react-router';
import { useState, useRef } from 'react';
import { Button } from '../../components/atoms';
import { Text } from '../../components/atoms';
import { usePhotoAnalysis } from '../../hooks/usePhotoAnalysis';
import styles from './PhotoAnalysisResultPage.module.css';

const PhotoAnalysisResultPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
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
        // 파일을 미리보기로 표시
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // 전체 분석 프로세스 실행
        const result = await analyzePhoto(file);
        console.log('분석 완료:', result);
      } catch (error) {
        console.error('파일 분석 중 오류 발생:', error);
      }
    }
  };

  return (
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
        <div className={styles.imageContainer}>
          {selectedImage ? (
            <img src={selectedImage} alt="선택된 이미지" className={styles.previewImage} />
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
