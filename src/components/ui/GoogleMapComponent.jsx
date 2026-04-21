// src/components/ui/GoogleMapComponent.jsx

import React, { useEffect, useRef } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

export default function GoogleMapComponent({ shops, selectedShop, onMarkerClick }) {
  const mapRef = useRef(null);
  const googleMap = useRef(null);
  const markersRef = useRef({});

  useEffect(() => {
    // 1. 初始化設定
    setOptions({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });

    const initMap = async () => {
      try {
        // 2. 載入必要的函式庫
        // 我們只需要 "maps"，因為傳統的 Marker 已經包含在裡面
        // 不要載入 "marker" 函式庫，那是給新版 AdvancedMarkerElement 用的
        const { Map } = await importLibrary("maps");

        const yzuCenter = { lat: 24.9701, lng: 121.2631 };

        if (!googleMap.current && mapRef.current) {
          googleMap.current = new Map(mapRef.current, {
            center: yzuCenter,
            zoom: 16,
            styles: minimalistMapStyle,
            disableDefaultUI: true,
            zoomControl: true,
            gestureHandling: "greedy",
          });
        }

        // 3. 渲染標記
        refreshMarkers(shops);
      } catch (error) {
        console.error("Google Maps 載入失敗:", error);
      }
    };

    initMap();
  }, [shops]); 

  // 渲染標記的函式
  const refreshMarkers = (shopsData) => {
    // 確保 google 對象已存在
    if (!googleMap.current || !window.google) return;

    // 清除舊標記
    Object.values(markersRef.current).forEach(marker => marker.setMap(null));
    markersRef.current = {};

    shopsData.forEach((shop) => {
      const isSelected = selectedShop?.id === shop.id;

      // 🌟 修復重點：使用 google.maps.Marker (傳統標記) 
      // 這樣才能支援你的 icon SVG 路徑與樣式
      const marker = new google.maps.Marker({
        position: { lat: shop.lat, lng: shop.lng },
        map: googleMap.current,
        title: shop.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: isSelected ? "#065f46" : "#ffffff",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#065f46",
          scale: isSelected ? 10 : 7,
        },
        zIndex: isSelected ? 1000 : 1
      });

      marker.addListener("click", () => {
        onMarkerClick(shop);
      });

      markersRef.current[shop.id] = marker;
    });
  };

  // 當外部選中的店家改變時，進行平移與圖示更新
  useEffect(() => {
    if (selectedShop && googleMap.current && window.google) {
      googleMap.current.panTo({ lat: selectedShop.lat, lng: selectedShop.lng });
      
      // 更新所有標記的視覺狀態
      Object.entries(markersRef.current).forEach(([id, marker]) => {
        const isThisSelected = parseInt(id) === selectedShop.id;
        
        // 🌟 修復重點：使用傳統的 setIcon
        marker.setIcon({
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: isThisSelected ? "#065f46" : "#ffffff",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#065f46",
          scale: isThisSelected ? 10 : 7,
        });
        marker.setZIndex(isThisSelected ? 1000 : 1);
      });
    }
  }, [selectedShop]);

  return (
    <div className="absolute inset-0 w-full h-full rounded-[1.5rem] overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}

// 保持原本的 minimalistMapStyle 不變
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