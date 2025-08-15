import { useEffect, useRef, useState, useCallback } from 'react';

interface FisheryLocation {
  latitude: number;
  longitude: number;
}

// 장소들의 경계를 계산하는 유틸리티 함수 추가 (사용하지 않으므로 제거)
// const getBoundsFromPlaces = (places: any[]) => {
//   if (!places || places.length === 0) {
//     return new window.kakao.maps.LatLngBounds();
//   }

//   const bounds = new window.kakao.maps.LatLngBounds();
//   places.forEach((place) => {
//     bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
//   });
//   return bounds;
// };

export function useKakaoMap(selectedFishery?: FisheryLocation, containerId: string = 'main-map') {
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const overlayRef = useRef<any>(null);
  const messageOverlayRef = useRef<any>(null); // "검색 결과 없음" 메시지 오버레이
  const messageTimeoutRef = useRef<any>(null); // 메시지 제거 타이머

  const [loading, setLoading] = useState(false);
  const [isSdkLoaded, setIsSdkLoaded] = useState(false); // SDK 로드 완료 여부 (완료 후 검색 함수 실행되도록)

  // "검색 결과 없음" 메시지 즉시 제거
  const clearMessageOverlay = useCallback(() => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = null;
    }
    if (messageOverlayRef.current) {
      messageOverlayRef.current.setMap(null);
      messageOverlayRef.current = null;
    }
  }, []);

  // 상세정보 오버레이 제거
  const clearOverlay = useCallback(() => {
    if (overlayRef.current) {
      overlayRef.current.setMap(null);
      overlayRef.current = null;
    }
  }, []);

  // 지도 클릭 시 상세정보 오버레이 제거
  useEffect(() => {
    if (!isSdkLoaded || !mapRef.current) return;

    const mapClickHandler = () => clearOverlay();
    window.kakao.maps.event.addListener(mapRef.current, 'click', mapClickHandler);

    return () => {
      window.kakao.maps.event.removeListener(mapRef.current, 'click', mapClickHandler);
    };
  }, [isSdkLoaded, clearOverlay]);

  // 검색 결과가 없는 경우 오버레이 메시지 표시
  const showTemporaryOverlay = useCallback(
    (message: string) => {
      if (!mapRef.current) return;

      // HTML 내용 (CSS 애니메이션 포함)
      const content = `
        <div class="search-overlay-message">
          ${message}
        </div>
      `;

      const overlay = new window.kakao.maps.CustomOverlay({
        content,
        map: mapRef.current,
        position: mapRef.current.getCenter(),
        yAnchor: 0.5,
        xAnchor: 0.5,
        zIndex: 99,
      });

      messageOverlayRef.current = overlay;

      // 2초 후 제거
      messageTimeoutRef.current = setTimeout(() => {
        clearMessageOverlay();
      }, 2000);
    },
    [clearMessageOverlay],
  );

  // 마커 생성
  const createMarker = useCallback(
    (place: any) => {
      const marker = new window.kakao.maps.Marker({
        map: mapRef.current,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      // 오버레이 콘텐츠 생성
      const content = `
        <div class="marker-info-overlay">
        <strong style="font-size:16px;">${place.place_name || ''}</strong><br/>
        ${place.road_address_name ? `<span>${place.road_address_name}</span><br/>` : ''}
        <span>${place.address_name || ''}</span><br/>
        ${place.phone ? `<span>${place.phone}</span>` : ''}
        </div>
      `;

      // 클릭 이벤트 등록
      window.kakao.maps.event.addListener(marker, 'click', function () {
        clearOverlay();

        const overlay = new window.kakao.maps.CustomOverlay({
          content,
          map: mapRef.current,
          position: new window.kakao.maps.LatLng(place.y, place.x),
          yAnchor: 1,
          zIndex: 2,
        });
        overlayRef.current = overlay;
      });

      markersRef.current.push(marker);
    },
    [clearOverlay],
  );

  // 기존 마커 삭제
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  }, []);

  // 카테고리 검색 (편의점, 주차장)
  const searchCategory = useCallback(
    (categoryCode: string) => {
      if (!isSdkLoaded) return;

      if (!mapRef.current) return;

      clearOverlay();
      clearMessageOverlay();

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
            clearMarkers();
            showTemporaryOverlay('검색 결과가 없습니다');
          } else {
            console.error('검색 실패', status);
          }
        },
        options,
      );
    },
    [isSdkLoaded, clearMarkers, createMarker],
  );

  // 키워드 검색 (화장실)
  const searchByKeyword = useCallback(
    (keyword: string) => {
      if (!isSdkLoaded) return;

      if (!mapRef.current) return;

      clearOverlay();
      clearMessageOverlay();

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
            // getBoundsFromPlaces 대신 직접 bounds 계산
            const bounds = new window.kakao.maps.LatLngBounds();
            result.forEach((place: any) => {
              bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
            });
            mapRef.current.setBounds(bounds);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            clearMarkers();
            showTemporaryOverlay('검색 결과가 없습니다');
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
        center: new window.kakao.maps.LatLng(
          selectedFishery?.latitude || 33.4996,
          selectedFishery?.longitude || 126.5312,
        ),
        level: 4,
        draggable: true,
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
