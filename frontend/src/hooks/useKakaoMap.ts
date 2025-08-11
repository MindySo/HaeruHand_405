import { useEffect, useRef, useState, useCallback } from 'react';

interface LatLng {
  lat: number;
  lng: number;
}

type CategoryType = '편의점' | '주차장' | '화장실';

const CATEGORY_CODES: Record<Exclude<CategoryType, '화장실'>, string> = {
  편의점: 'CS2',
  주차장: 'PK6',
};

export const useKakaoMapWithCategory = (containerId: string, initialCenter: LatLng) => {
  const mapRef = useRef<any>(null);
  const placesServiceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [center, setCenter] = useState<LatLng>(initialCenter);

  // 지도 및 Places 서비스 초기화
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAP_API_KEY
    }&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      (window as any).kakao.maps.load(() => {
        const kakao = (window as any).kakao;
        const container = document.getElementById(containerId);
        if (!container) return;

        mapRef.current = new kakao.maps.Map(container, {
          center: new kakao.maps.LatLng(center.lat, center.lng),
          level: 4,
        });

        placesServiceRef.current = new kakao.maps.services.Places(mapRef.current);
      });
    };
  }, [center.lat, center.lng, containerId]);

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  };

  const addMarkers = (places: any[]) => {
    const kakao = (window as any).kakao;
    places.forEach((place) => {
      const marker = new kakao.maps.Marker({
        map: mapRef.current,
        position: new kakao.maps.LatLng(place.y, place.x),
      });
      markersRef.current.push(marker);
    });
  };

  const searchByCategory = useCallback(
    (category: CategoryType) => {
      if (!placesServiceRef.current) return;

      clearMarkers();

      if (category === '화장실') {
        placesServiceRef.current.keywordSearch(
          '화장실',
          (data: any, status: string) => {
            if (status === (window as any).kakao.maps.services.Status.OK) {
              addMarkers(data);
            }
          },
          {
            location: new (window as any).kakao.maps.LatLng(center.lat, center.lng),
            radius: 2000,
          },
        );
      } else {
        const categoryCode = CATEGORY_CODES[category];
        placesServiceRef.current.categorySearch(
          categoryCode,
          (data: any, status: string) => {
            if (status === (window as any).kakao.maps.services.Status.OK) {
              addMarkers(data);
            }
          },
          {
            location: new (window as any).kakao.maps.LatLng(center.lat, center.lng),
            radius: 2000,
          },
        );
      }
    },
    [center],
  );

  const updateMyLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const newCenter = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      setCenter(newCenter);
      if (mapRef.current) {
        mapRef.current.setCenter(
          new (window as any).kakao.maps.LatLng(newCenter.lat, newCenter.lng),
        );
      }
    });
  }, []);

  return {
    searchByCategory,
    updateMyLocation,
    center,
  };
};
