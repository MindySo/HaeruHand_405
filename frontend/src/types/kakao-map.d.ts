declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (container: HTMLElement, options: MapOptions) => Map;
        LatLng: new (lat: number, lng: number) => LatLng;
        Marker: new (options: MarkerOptions) => Marker;
        MarkerImage: new (src: string, size: Size) => MarkerImage;
        Size: new (width: number, height: number) => Size;
      };
    };
  }
}

interface MapOptions {
  center: LatLng;
  level: number;
}

interface MarkerOptions {
  map: Map;
  position: LatLng;
  image?: MarkerImage;
}

interface Map {
  // Map 인스턴스의 메서드들
}

interface LatLng {
  // LatLng 인스턴스의 메서드들
}
interface Marker {
  // Marker 인스턴스의 메서드들
}

interface MarkerImage {
  // MarkerImage 인스턴스의 메서드들
}

interface Size {
  // Size 인스턴스의 메서드들
}

export {};
