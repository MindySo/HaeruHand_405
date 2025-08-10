import { useQuery } from '@tanstack/react-query';

interface WeatherFishery {
  id: number;
  areaName: string;
  forecastDate: number[];
  forecastTimePeriod: string;
  averageAirTemperature: number;
  averageWaterTemperature: number;
  averageWaveHeight: number;
  averageWindSpeed: number;
  weatherDescription: string;
  seaTravelIndex: string;
  createdAt: number[];
  updatedAt: number[];
}

interface WeatherFisheryResponse {
  is_success: boolean;
  code: number;
  message: string;
  data: WeatherFishery[];
}

// 날씨 데이터 조회 (기본값: 오늘 날짜, 제주북서)
const fetchWeatherFishery = async (): Promise<WeatherFisheryResponse> => {
  const response = await fetch('http://i13a405.p.ssafy.io/api/v1/weather/fishery', {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }

  return await response.json();
};

// 날씨 데이터 조회 hook
export const useWeatherFishery = () => {
  return useQuery({
    queryKey: ['weather-fishery'],
    queryFn: fetchWeatherFishery,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};
