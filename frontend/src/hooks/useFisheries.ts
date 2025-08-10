import { useQuery } from '@tanstack/react-query';

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
  const response = await fetch('http://i13a405.p.ssafy.io/api/v1/fisheries', {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }

  return await response.json();
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
  gueom: 6, // 구업 -> id: 6
  gonae: 7, // 고내 -> id: 7
  aewol: 8, // 애월 -> id: 8 (애월스쿠버만 허용)
  suwon: 10, // 수원 -> id: 10
};

// 어장 ID로 어장 정보 찾기
export const findFisheryById = (fisheries: Fishery[], id: number): Fishery | undefined => {
  return fisheries.find((fishery) => fishery.id === id);
};
