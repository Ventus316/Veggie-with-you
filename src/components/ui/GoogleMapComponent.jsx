// src/components/ui/GoogleMapComponent.jsx
import React, { useEffect, useRef } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

setOptions({
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: 'weekly',
});

// 🌟 定義自定義標記：一個優雅的「蔬食水滴針」SVG 路徑
const PIN_SVG_PATH = "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z";

export default function GoogleMapComponent({ shops, selectedShop, onMarkerClick, onMapClick }) {
  const mapRef = useRef(null);
  const googleMap = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    const initMap = async () => {
      try {
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
            clickableIcons: false, // 禁用 Google 內建 POI 點擊，保持介面純粹
          });

          // 🌟 修復點擊切換問題：直接在地圖物件上監聽點擊
          // 當地圖被點擊時，通知父層將平板移到前方
          googleMap.current.addListener('click', () => {
            if (onMapClick) onMapClick();
          });
        }

        renderMarkers(shops);
      } catch (error) {
        console.error('地圖載入出錯:', error);
      }
    };

    initMap();
  }, [shops]);

  const renderMarkers = (shopsData) => {
    if (!googleMap.current || !window.google) return;

    Object.values(markersRef.current).forEach((m) => m.setMap(null));
    markersRef.current = {};

    shopsData.forEach((shop) => {
      const isSelected = selectedShop?.id === shop.id;

      const marker = new window.google.maps.Marker({
        position: { lat: shop.lat, lng: shop.lng },
        map: googleMap.current,
        title: shop.name,
        // 🌟 美化標記：使用自定義 SVG
        icon: {
          path: PIN_SVG_PATH,
          fillColor: isSelected ? '#065f46' : '#8B8B8B', // 選中時為深綠色，未選中為大地灰
          fillOpacity: 1,
          strokeWeight: 1,
          strokeColor: '#FFFFFF',
          scale: isSelected ? 2.5 : 1.8, // 選中時放大標記
          anchor: new window.google.maps.Point(12, 22), // 確保針尖對準座標
        },
        zIndex: isSelected ? 1000 : 1,
        cursor: 'pointer', // 🌟 修復鼠標樣式
      });

      marker.addListener('click', () => onMarkerClick(shop));
      markersRef.current[shop.id] = marker;
    });
  };

  useEffect(() => {
    if (selectedShop && googleMap.current) {
      googleMap.current.panTo({ lat: selectedShop.lat, lng: selectedShop.lng });
      renderMarkers(shops);
    }
  }, [selectedShop]);

  return (
    // 🌟 增加 cursor-pointer 確保滑鼠懸浮時呈現可點擊狀態
    <div className="absolute inset-0 w-full h-full rounded-[1.5rem] overflow-hidden cursor-pointer">
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