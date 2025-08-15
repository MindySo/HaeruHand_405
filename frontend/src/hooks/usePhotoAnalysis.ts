import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../apis/apiClient';

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

// Signed URL 요청 함수
const requestSignedUrl = async (imageExtension: string): Promise<SignedUrlResponse> => {
  return await apiClient.post<SignedUrlResponse>('/v1/storage/signed-urls', {
    type: 'ai',
    imageExtension: imageExtension,
  });
};

// 파일 업로드 함수
const uploadFileToSignedUrl = async ({
  signedUrl,
  file,
}: {
  signedUrl: string;
  file: File;
}): Promise<void> => {
  return await apiClient.uploadFile(signedUrl, file);
};

// AI 분석 요청 함수
const requestSeafoodDetection = async (imageUrl: string): Promise<SeafoodDetectResponse> => {
  return await apiClient.post<SeafoodDetectResponse>('/v1/seafood-detect', {
    imageUrl: imageUrl,
  });
};

export const usePhotoAnalysis = () => {
  // Signed URL 요청 mutation
  const signedUrlMutation = useMutation({
    mutationFn: requestSignedUrl,
    onSuccess: (data) => {
      console.log('Signed URL 응답:', data.data);
    },
    onError: (error) => {
      console.error('Signed URL 요청 중 오류:', error);
    },
  });

  // 파일 업로드 mutation
  const uploadFileMutation = useMutation({
    mutationFn: uploadFileToSignedUrl,
    onSuccess: () => {
      console.log('파일 업로드 성공!');
    },
    onError: (error) => {
      console.error('파일 업로드 중 오류:', error);
    },
  });

  // AI 분석 mutation
  const seafoodDetectionMutation = useMutation({
    mutationFn: requestSeafoodDetection,
    onSuccess: (data) => {
      console.log('AI 분석 결과:', data.data);
    },
    onError: (error) => {
      console.error('AI 분석 중 오류:', error);
    },
  });

  // 전체 분석 프로세스 실행 함수
  const analyzePhoto = async (file: File) => {
    try {
      // 1. 파일 확장자 추출
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpeg';
      console.log('파일 확장자:', extension);

      // 2. Signed URL 요청
      const signedUrlResponse = await signedUrlMutation.mutateAsync(extension);
      const { signedUrl, imageUrl } = signedUrlResponse.data;

      // 3. 파일 업로드
      await uploadFileMutation.mutateAsync({ signedUrl, file });
      console.log('최종 이미지 URL:', imageUrl);

      // 4. AI 분석 요청
      const seafoodDetectResponse = await seafoodDetectionMutation.mutateAsync(imageUrl);

      return {
        imageUrl,
        analysisResult: seafoodDetectResponse.data,
      };
    } catch (error) {
      console.error('전체 분석 프로세스 중 오류:', error);
      throw error;
    }
  };

  return {
    analyzePhoto,
    signedUrlMutation,
    uploadFileMutation,
    seafoodDetectionMutation,
    isLoading:
      signedUrlMutation.isPending ||
      uploadFileMutation.isPending ||
      seafoodDetectionMutation.isPending,
    error: signedUrlMutation.error || uploadFileMutation.error || seafoodDetectionMutation.error,
  };
};
