import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../apis/apiClient';

interface ApiPageable {
  pageNumber: number;
  paged: boolean;
  pageSize: number;
  unpaged: boolean;
  offset: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
}

interface WeatherWarningFromApi {
  id: number;
  regionCode: string;
  warningType: string;
  warningLevel: string;
  warningCommand: string;
  announcedAt: string | number[];
  effectiveAt: string | number[];
  expectedEndAt: string | number[] | null;
  createdAt: string | number[];
  updatedAt: string | number[];
}

interface WeatherWarningsResponse {
  is_success: boolean;
  code: number;
  message: string;
  data: {
    totalElements: number;
    totalPages: number;
    pageable: ApiPageable;
    numberOfElements: number;
    size: number;
    content: WeatherWarningFromApi[];
    number: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    first: boolean;
    last: boolean;
    empty: boolean;
  };
}

// 전체 기상특보 조회
const fetchAllWarnings = async (
  page: number = 0,
  size: number = 20,
): Promise<WeatherWarningsResponse> => {
  return await apiClient.get<WeatherWarningsResponse>(
    `/v1/weather/warnings?page=${page}&size=${size}`,
  );
};

// 지역별 기상특보 조회
const fetchWarningsByRegion = async (
  regionCode: string,
  page: number = 0,
  size: number = 20,
): Promise<WeatherWarningsResponse> => {
  return await apiClient.get<WeatherWarningsResponse>(
    `/v1/weather/warnings/region/${regionCode}?page=${page}&size=${size}`,
  );
};

// 전체 기상특보 조회 hook
export const useWeatherWarnings = (page: number = 0, size: number = 20) => {
  return useQuery({
    queryKey: ['weather-warnings', page, size],
    queryFn: () => fetchAllWarnings(page, size),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};

// 지역별 기상특보 조회 hook
export const useWeatherWarningsByRegion = (
  regionCode: string,
  page: number = 0,
  size: number = 20,
) => {
  return useQuery({
    queryKey: ['weather-warnings-region', regionCode, page, size],
    queryFn: () => fetchWarningsByRegion(regionCode, page, size),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    enabled: !!regionCode, // regionCode가 있을 때만 실행
  });
};

// 데이터 변환 유틸리티 함수들
export const pad2 = (n: number) => String(n).padStart(2, '0');

export const formatAnnouncedAt = (val: string | number[]) => {
  if (Array.isArray(val)) {
    const [yy, mm, dd, hh, mi] = val;
    return `${pad2(mm)}월 ${pad2(dd)}일 ${pad2(hh)}시 ${pad2(mi)}분`;
  }
  const d = new Date(val);
  if (!Number.isNaN(d.getTime())) {
    return `${pad2(d.getMonth() + 1)}월 ${pad2(d.getDate())}일 ${pad2(d.getHours())}시 ${pad2(
      d.getMinutes(),
    )}분`;
  }
  return '';
};

// 특보 구역코드 → 구역명 매핑
export const REGION_NAME_BY_CODE: Record<string, string> = {
  // 육상 L
  L1090000: '제주도',
  L1090900: '제주도남부',
  L1090500: '제주도산지',
  L1090600: '제주도서부',
  L1090700: '제주도북부',
  L1090800: '제주도동부',
  L1091100: '제주도북부중산간',
  L1091200: '제주도남부중산간',
  L1091000: '추자도',

  // 해상 S
  S1323000: '제주도앞바다',
  S1323100: '제주도북부앞바다',
  S1323200: '제주도동부앞바다',
  S1323300: '제주도남부앞바다',
  S1323400: '제주도서부앞바다',
  S1324020: '제주도남쪽바깥먼바다',
  S1324110: '제주도남동쪽안쪽먼바다',
  S1324210: '제주도남서쪽안쪽먼바다',

  S1330000: '제주도전해상',
  S2320400: '제주도북부앞바다중 연안바다',
  S2320610: '제주도서부앞바다중 북서연안바다',
  S2320620: '제주도서부앞바다중 남서연안바다',
  S2320700: '제주도남부앞바다중 연안바다',
  S2320900: '제주도동부앞바다중 북동연안바다',
  S2321000: '제주도동부앞바다중 남동연안바다',
  S2330100: '남해서부서쪽먼바다중 추자도연안바다',
  S2330200: '제주도동부앞바다중 우도연안바다',
  S2330300: '제주도서부앞바다중 가파도연안바다',
};

export const mapRegionCodeToName = (code?: string) => {
  if (!code) return '';
  return REGION_NAME_BY_CODE[code] ?? code;
};

// API 응답을 컴포넌트에서 사용할 수 있는 형태로 변환
export const transformWeatherWarnings = (data: WeatherWarningsResponse) => {
  return (data.data?.content ?? []).map((w) => ({
    id: w.id,
    type: `${w.warningType}${w.warningLevel}`,
    date: formatAnnouncedAt(w.announcedAt),
    location: mapRegionCodeToName(w.regionCode),
  }));
};
