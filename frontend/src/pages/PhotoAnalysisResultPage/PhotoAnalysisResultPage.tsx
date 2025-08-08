import { useNavigate } from '@tanstack/react-router';
import { useState, useRef } from 'react';
import { Button } from '../../components/atoms';
import { Text } from '../../components/atoms';
import styles from './PhotoAnalysisResultPage.module.css';

interface SignedUrlResponse {
  is_success: boolean;
  code: number;
  message: string;
  data: {
    imageUrl: string;
    signedUrl: string;
  };
}

interface RegulationFish {
  speciesName: string;
  restrictionRegion: string;
  restrictionStartDate: string;
  restrictionEndDate: string;
  minimumLengthCentimeter: number;
  minimumWeightGram: number;
  measurementType: string;
  lawAnnouncementDate: string;
  note: string;
  imageUrl: string;
}

interface SeafoodDetectResponse {
  is_success: boolean;
  code: number;
  message: string;
  data: {
    fishName: string;
    regulationFish: RegulationFish;
    currentlyRestricted: boolean;
  };
}

const PhotoAnalysisResultPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate({ to: '/main' });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const getFileExtension = (filename: string): string => {
    return filename.split('.').pop()?.toLowerCase() || 'jpeg';
  };

  const requestSignedUrl = async (imageExtension: string): Promise<SignedUrlResponse> => {
    try {
      const requestBody = {
        type: 'ai',
        imageExtension: imageExtension,
      };

      console.log('요청 데이터:', requestBody);

      const response = await fetch('http://i13a405.p.ssafy.io/api/v1/storage/signed-urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('응답 상태:', response.status);
      console.log('응답 헤더:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('에러 응답:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('API 호출 중 오류:', error);
      throw error;
    }
  };

  const uploadFileToSignedUrl = async (signedUrl: string, file: File): Promise<void> => {
    try {
      console.log('파일 업로드 시작:', file.name);

      const response = await fetch(signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      console.log('업로드 응답 상태:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('업로드 에러 응답:', errorText);
        throw new Error(`Upload failed! status: ${response.status}, message: ${errorText}`);
      }

      console.log('파일 업로드 성공!');
    } catch (error) {
      console.error('파일 업로드 중 오류:', error);
      throw error;
    }
  };

  const requestSeafoodDetection = async (imageUrl: string): Promise<SeafoodDetectResponse> => {
    try {
      const requestBody = {
        imageUrl: imageUrl,
      };

      console.log('AI 분석 요청 데이터:', requestBody);

      const response = await fetch('http://i13a405.p.ssafy.io/api/v1/seafood-detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('AI 분석 응답 상태:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('AI 분석 에러 응답:', errorText);
        throw new Error(`AI analysis failed! status: ${response.status}, message: ${errorText}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('AI 분석 API 호출 중 오류:', error);
      throw error;
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);

      try {
        // 파일을 미리보기로 표시
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // 파일 확장자 추출
        const extension = getFileExtension(file.name);
        console.log('파일 확장자:', extension);

        // 백엔드 API 호출하여 signedUrl 받기
        const signedUrlResponse = await requestSignedUrl(extension);
        console.log('Signed URL 응답:', signedUrlResponse.data);

        // signedUrl을 사용하여 파일 업로드
        const { signedUrl, imageUrl } = signedUrlResponse.data;
        await uploadFileToSignedUrl(signedUrl, file);

        console.log('최종 이미지 URL:', imageUrl);

        // AI 분석 API 호출
        const seafoodDetectResponse = await requestSeafoodDetection(imageUrl);
        console.log('AI 분석 결과:', seafoodDetectResponse.data);
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
      } finally {
        setIsLoading(false);
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
          {isLoading ? '처리 중...' : '업로드하기'}
        </Button>
      </div>
    </div>
  );
};

export default PhotoAnalysisResultPage;
