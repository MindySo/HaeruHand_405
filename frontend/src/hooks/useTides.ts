import { useQuery } from '@tanstack/react-query';

interface TideData {
  id: number;
  stationCode: string;
  observationDate: number[];
  firstHighTideTime: number[];
  firstLowTideTime: number[];
  secondHighTideTime: number[];
  secondLowTideTime: number[];
  fishingStartTime: number[];
  fishingEndTime: number[];
}

interface TidesResponse {
  is_success: boolean;
  code: number;
  message: string;
  data: TideData;
}

// 조석 데이터 조회 (기본값: 오늘 날짜)
const fetchTides = async (stationCode: string = 'DT_0004'): Promise<TidesResponse> => {
  const response = await fetch(`http://i13a405.p.ssafy.io/api/v1/tides/station/${stationCode}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }

  return await response.json();
};

// 조석 데이터 조회 hook
export const useTides = (stationCode: string = 'DT_0004') => {
  return useQuery({
    queryKey: ['tides', stationCode],
    queryFn: () => fetchTides(stationCode),
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 30 * 60 * 1000, // 30분
  });
};

// 시간 배열을 HH:MM 형식으로 변환
export const formatTimeArray = (timeArray: number[]): string => {
  if (!timeArray || timeArray.length < 2) return '';
  const [hours, minutes] = timeArray;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};
