// hooks/useKakaoMap.ts
import { useEffect, useRef, useState, useCallback } from 'react';

interface FisheryLocation {
  latitude: number;
  longitude: number;
}

export function useKakaoMap(selectedFishery?: FisheryLocation, containerId: string = 'main-map') {
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSdkLoaded, setIsSdkLoaded] = useState(false); // SDK 로드 완료 여부 (완료 후 검색 함수 실행되도록)

  // 기존 마커 삭제
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  }, []);

  // 마커 생성
  const createMarker = useCallback((place: any) => {
    const marker = new window.kakao.maps.Marker({
      map: mapRef.current,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });
    markersRef.current.push(marker);
  }, []);

  // 카테고리 검색 (편의점, 주차장)
  const searchCategory = useCallback(
    (categoryCode: string) => {
      if (!isSdkLoaded) {
        console.warn('SDK 아직 로드 안됨~~');
        return;
      }
      if (!mapRef.current) return;

      const placesService = new window.kakao.maps.services.Places();
      const center = mapRef.current.getCenter();
      const options = { location: center, radius: 2000 };

      setLoading(true);
      placesService.categorySearch(
        categoryCode,
        (result: any, status: any) => {
          setLoading(false);
          if (status === window.kakao.maps.services.Status.OK) {
            clearMarkers();
            result.forEach((place: any) => createMarker(place));

            // 지도 범위 재설정
            const bounds = new window.kakao.maps.LatLngBounds();
            result.forEach((place: any) =>
              bounds.extend(new window.kakao.maps.LatLng(place.y, place.x)),
            );
            mapRef.current.setBounds(bounds);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            console.warn('검색 결과 없음');
            clearMarkers();
          } else {
            console.error('검색 실패', status);
          }
        },
        options,
      );
    },
    [isSdkLoaded, clearMarkers, createMarker],
  );

  /** 키워드 검색 (화장실 전용) */
  const searchByKeyword = useCallback(
    (keyword: string) => {
      if (!isSdkLoaded) {
        console.warn('⚠️ SDK가 아직 로드되지 않았습니다.');
        return;
      }
      if (!mapRef.current) return;

      const placesService = new window.kakao.maps.services.Places();
      const center = mapRef.current.getCenter();
      const options = { location: center, radius: 2000 };

      setLoading(true);
      placesService.keywordSearch(
        keyword,
        (result: any, status: any) => {
          setLoading(false);
          if (status === window.kakao.maps.services.Status.OK) {
            clearMarkers();
            result.forEach((place: any) => createMarker(place));
            mapRef.current.setBounds(getBoundsFromPlaces(result));
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            console.warn('키워드 검색 결과 없음');
            clearMarkers();
          } else {
            console.error('키워드 검색 실패', status);
          }
        },
        options,
      );
    },
    [isSdkLoaded, clearMarkers, createMarker],
  );

  // SDK 및 지도 초기화
  useEffect(() => {
    if (!selectedFishery) return;

    if (window.kakao && window.kakao.maps) {
      console.log('SDK 이미 로드됨..!');
      initMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_API_KEY
    }&libraries=services&autoload=false`;
    script.async = true;
    script.onload = () => {
      window.kakao.maps.load(() => {
        console.log('SDK 로드 완료!!');
        initMap();
      });
    };
    document.head.appendChild(script);

    function initMap() {
      const container = document.getElementById(containerId);
      if (!container) {
        console.error(`Map container (${containerId})를 찾을 수 없습니다.`);
        return;
      }
      const options = {
        center: new window.kakao.maps.LatLng(selectedFishery.latitude, selectedFishery.longitude),
        level: 4,
      };
      const map = new window.kakao.maps.Map(container, options);
      mapRef.current = map;
      setIsSdkLoaded(true); // SDK + 지도 초기화 완료
    }
  }, [selectedFishery, containerId]);

  return {
    map: mapRef,
    loading,
    isSdkLoaded, // 외부에서 로드 상태 확인 가능
    searchConvenienceStore: () => searchCategory('CS2'),
    searchParkingLot: () => searchCategory('PK6'),
    searchToilet: () => searchByKeyword('화장실'),
  };
}
