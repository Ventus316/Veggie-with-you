// src/components/ui/GoogleMapComponent.jsx
import React, { useEffect, useRef } from 'react';
// 1. 直接从库中导入两个函数，不再使用 Loader 类
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

// 2. 在模块顶层调用 setOptions 进行一次性配置
setOptions({
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: 'weekly',
});

export default function GoogleMapComponent({ shops, selectedShop, onMarkerClick }) {
  const mapRef = useRef(null);
  const googleMap = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    const initMap = async () => {
      try {
        // 3. 直接调用 importLibrary('maps') 来加载地图库
        const { Map } = await importLibrary('maps');

        const yzuCenter = { lat: 24.9701, lng: 121.2631 };

        if (!googleMap.current && mapRef.current) {
          googleMap.current = new Map(mapRef.current, {
            center: yzuCenter,
            zoom: 16,
            styles: minimalistMapStyle,
            disableDefaultUI: true,
            zoomControl: true,
            gestureHandling: 'greedy',
          });
        }

        // 渲染标记
        renderMarkers(shops);
      } catch (error) {
        console.error('地图载入出错:', error);
      }
    };

    initMap();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shops]);

  const renderMarkers = (shopsData) => {
    if (!googleMap.current || !window.google) return;

    // 清除既有標記
    Object.values(markersRef.current).forEach((m) => m.setMap(null));
    markersRef.current = {};

    shopsData.forEach((shop) => {
      const isSelected = selectedShop?.id === shop.id;

      const marker = new window.google.maps.Marker({
        position: { lat: shop.lat, lng: shop.lng },
        map: googleMap.current,
        title: shop.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: isSelected ? '#065f46' : '#ffffff',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#065f46',
          scale: isSelected ? 10 : 7,
        },
        zIndex: isSelected ? 1000 : 1,
      });

      marker.addListener('click', () => onMarkerClick(shop));
      markersRef.current[shop.id] = marker;
    });
  };

  // 当选取的店家变化时，平移地图并更新标记样式
  useEffect(() => {
    if (selectedShop && googleMap.current) {
      googleMap.current.panTo({ lat: selectedShop.lat, lng: selectedShop.lng });
      renderMarkers(shops);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedShop]);

  return (
    <div className="absolute inset-0 w-full h-full rounded-[1.5rem] overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}


const minimalistMapStyle = [
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] },
  { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] },
  { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] },
  { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] },
  { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] },
  { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] },
  { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] },
  { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] },
  { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] },
  { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] },
  { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] },
  { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }
];