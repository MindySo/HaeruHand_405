import React, { useState } from 'react';
import { Text } from '../../components/atoms';
import { WarningBanner } from '../../components/molecules';
import styles from './WeatherAlertPage.module.css';
import { useNavigate } from '@tanstack/react-router';

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
  announcedAt: string | number[]; // 배열 혹은 문자열 모두 대응
  effectiveAt: string | number[];
  expectedEndAt: string | number[];
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

interface Filter {
  id: string;
  name: string;
  active: boolean;
}

interface AlertItem {
  id: number;
  type: string;
  date: string;
  location: string;
}

const initialFilters: Filter[] = [
  { id: 'all', name: '전체', active: false },
  { id: 'gueom', name: '구엄', active: false },
  { id: 'gonae', name: '고내', active: false },
  { id: 'aewol', name: '애월', active: true },
  { id: 'suwon', name: '수원', active: false },
];

// 특보 구역코드 → 구역명 매핑
const REGION_NAME_BY_CODE: Record<string, string> = {
  // 육상 L
  L1090000: '제주도',
  L1090900: '제주도남부', // 서귀포와 중복되나 특보 구역 기준으로 일반화
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

const pad2 = (n: number) => String(n).padStart(2, '0');

const formatAnnouncedAt = (val: string | number[]) => {
  if (Array.isArray(val)) {
    const [yy, mm, dd, hh, mi] = val;
    return `${pad2(mm)}월 ${pad2(dd)}일 ${pad2(hh)}시 ${pad2(mi)}분`;
  }
  // 문자열(ISO 등)도 방어적으로 처리
  const d = new Date(val);
  if (!Number.isNaN(d.getTime())) {
    return `${pad2(d.getMonth() + 1)}월 ${pad2(d.getDate())}일 ${pad2(d.getHours())}시 ${pad2(
      d.getMinutes(),
    )}분`;
  }
  return '';
};

const mapRegionCodeToName = (code?: string) => {
  if (!code) return '';
  return REGION_NAME_BY_CODE[code] ?? code;
};

const WeatherAlertPage: React.FC = () => {
  const [filters, setFilters] = useState<Filter[]>(initialFilters);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchWarnings = async (page = 0, size = 20) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://i13a405.p.ssafy.io/api/v1/weather/warnings?page=${page}&size=${size}`,
        {
          method: 'GET',
          headers: { Accept: 'application/json' },
        },
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status} - ${text}`);
      }
      const json: WeatherWarningsResponse = await res.json();
      const list = (json.data?.content ?? []).map<AlertItem>((w) => ({
        id: w.id,
        type: `${w.warningType}${w.warningLevel}`,
        date: formatAnnouncedAt(w.announcedAt),
        location: mapRegionCodeToName(w.regionCode),
      }));
      setAlerts(list);
    } catch (e: any) {
      setError(e?.message ?? '요청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterClick = (filterId: string) => {
    setFilters((prev) =>
      prev.map((filter) => ({
        ...filter,
        active: filter.id === filterId,
      })),
    );

    if (filterId === 'all') {
      fetchWarnings(0, 20);
    }
  };

  const handleBackButtonClick = () => {
    navigate({ to: '/main' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={handleBackButtonClick}>
          <img src="/backButton.svg" alt="뒤로가기" className={styles.backButtonIcon} />
        </button>
        <Text size="xl" color="dark" weight="bold" className={styles.title}>
          애월3리 어촌계
        </Text>
      </div>

      <div className={styles.filterTabs}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`${styles.filterTab} ${filter.active ? styles.active : ''}`}
            onClick={() => handleFilterClick(filter.id)}
          >
            <Text
              size="md"
              color={filter.active ? 'dark' : 'gray'}
              weight={filter.active ? 'bold' : 'regular'}
            >
              {filter.name}
            </Text>
          </button>
        ))}
      </div>

      <div className={styles.alertList}>
        {loading && (
          <WarningBanner
            type={'정보' as any}
            date="불러오는 중..."
            location=""
            variant="info"
            className={styles.alertItem}
            suffix="발표"
          />
        )}
        {error && !loading && (
          <WarningBanner
            type={'오류' as any}
            date={error}
            location=""
            variant="info"
            className={styles.alertItem}
            suffix="발표"
          />
        )}
        {!loading &&
          !error &&
          alerts.map((item, index) => (
            <WarningBanner
              key={item.id}
              type={item.type as any}
              date={item.date}
              location={item.location}
              variant={index === 0 ? 'latest' : 'past'}
              className={styles.alertItem}
              suffix="발표" // 발표 시간 기준
            />
          ))}
      </div>
    </div>
  );
};

export default WeatherAlertPage;
