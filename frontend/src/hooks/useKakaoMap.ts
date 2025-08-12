// hooks/useKakaoMap.ts
import { useEffect, useRef, useState } from 'react';

interface FisheryLocation {
  latitude: number;
  longitude: number;
}

export function useKakaoMap(selectedFishery?: FisheryLocation, containerId: string = 'main-map') {
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 카카오 지도 로딩
  useEffect(() => {
    if (!selectedFishery) return;

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById(containerId);
        if (!container) return;

        const options = {
          center: new window.kakao.maps.LatLng(selectedFishery.latitude, selectedFishery.longitude),
          level: 4,
        };

        const map = new window.kakao.maps.Map(container, options);
        mapRef.current = map;

        // 검색 서비스 준비
        const placesService = new window.kakao.maps.services.Places();

        // 마커 생성
        const createMarker = (place: any) => {
          const marker = new window.kakao.maps.Marker({
            map,
            position: new window.kakao.maps.LatLng(place.y, place.x),
          });
          markersRef.current.push(marker);
        };

        // 마커 삭제
        const clearMarkers = () => {
          markersRef.current.forEach((marker) => marker.setMap(null));
          markersRef.current = [];
        };

        // 카테고리 검색 함수
        const searchCategory = (categoryCode: string) => {
          if (!mapRef.current) return;
          setLoading(true);

          const center = map.getCenter();
          const options = {
            location: center,
            radius: 2000, // 2km 반경
          };

          placesService.categorySearch(
            categoryCode,
            (result: any, status: any) => {
              setLoading(false);
              if (status === window.kakao.maps.services.Status.OK) {
                clearMarkers();
                result.forEach((place: any) => createMarker(place));
                map.setBounds(getBoundsFromPlaces(result));
              }
            },
            options,
          );
        };

        // 검색 결과 범위 계산
        const getBoundsFromPlaces = (places: any[]) => {
          const bounds = new window.kakao.maps.LatLngBounds();
          places.forEach((place) => bounds.extend(new window.kakao.maps.LatLng(place.y, place.x)));
          return bounds;
        };

        // 외부에서 검색 기능 호출할 수 있도록 반환값에 추가
        hookApiRef.current = {
          searchConvenienceStore: () => searchCategory('CS2'), // 편의점
          searchParkingLot: () => searchCategory('PK6'), // 주차장
          searchToilet: () => searchCategory('PO3'), // 화장실(공공시설)
        };
      });
    };

    document.head.appendChild(script);
  }, [selectedFishery]);

  // 외부에서 접근 가능한 API
  const hookApiRef = useRef<any>({
    searchConvenienceStore: () => {},
    searchParkingLot: () => {},
    searchToilet: () => {},
  });

  return {
    map: mapRef,
    loading,
    ...hookApiRef.current,
  };
}
