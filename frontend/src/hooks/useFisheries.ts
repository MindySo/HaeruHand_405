import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../apis/apiClient';

interface Fishery {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  stationCode: string;
  regionCode: string;
  areaName: string; // 새로 추가된 필드
}

interface FisheriesResponse {
  is_success: boolean;
  code: number;
  message: string;
  data: Fishery[];
}

// 모든 어장 조회
const fetchFisheries = async (): Promise<FisheriesResponse> => {
  return await apiClient.get<FisheriesResponse>('/v1/fisheries');
};

// 모든 어장 조회 hook
export const useFisheries = () => {
  return useQuery({
    queryKey: ['fisheries'],
    queryFn: fetchFisheries,
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 30 * 60 * 1000, // 30분
  });
};

// 지역별 어장 매핑 (새로운 id 기준)
export const FISHERY_ID_BY_LOCATION: Record<string, number> = {
  gueom: 1, // 구업 -> id: 6
  gonae: 2, // 고내 -> id: 7
  aewol: 3, // 애월 -> id: 8 (애월스쿠버만 허용)
  suwon: 5, // 수원 -> id: 10
};

// 어장 ID로 어장 정보 찾기
export const findFisheryById = (fisheries: Fishery[], id: number): Fishery | undefined => {
  return fisheries.find((fishery) => fishery.id === id);
};
