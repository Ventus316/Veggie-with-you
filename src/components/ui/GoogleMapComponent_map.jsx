// src/components/ui/GoogleMapComponent_map.jsx

import React, { useEffect, useRef } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';


// 🌟 1. 從 Data 引入自製的地圖素材
import { MAP_SCHOOL, MAP_RADISH } from '../../data/Data';
import currentLocationIcon from '../../assets/map/location.png';

setOptions({
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: 'weekly',
});

export default function GoogleMapComponent({ shops, selectedShop, userLocation, filterTransport, onMarkerClick, onMapClick }) {
  const mapRef = useRef(null);
  const googleMap = useRef(null);
  const markersRef = useRef({});
  const schoolMarkerRef = useRef(null); // 儲存學校標記的引用
  const userMarkerRef = useRef(null); // 儲存用戶位置標記的引用

  // 👇 2. 新增這兩行：用來存儲路線計算服務 (大腦) 與路線渲染器 (雙手)
  const directionsService = useRef(null);
  const directionsRenderer = useRef(null);


  useEffect(() => {
    const initMap = async () => {
      try {
        const { Map } = await importLibrary('maps');
        const yzuCenter = { lat: 24.9705, lng: 121.2633 };

        if (!googleMap.current && mapRef.current) {
          googleMap.current = new Map(mapRef.current, {
            center: yzuCenter,
            zoom: 16,
            styles: minimalistMapStyle,
            disableDefaultUI: true,
            zoomControl: true,
            gestureHandling: 'greedy',
            clickableIcons: false, // 禁用 Google 內建 POI 點擊
          });

          // 👇 3. 新增這段：初始化導航工具
          directionsService.current = new window.google.maps.DirectionsService();
          directionsRenderer.current = new window.google.maps.DirectionsRenderer({
            map: googleMap.current,
            suppressMarkers: true, // 🌟 關鍵：隱藏預設的紅綠 A/B 標記，保留我們自己精緻的蘿蔔和定位點！
            polylineOptions: {
              strokeColor: '#3B82F6', // 漂亮的藍色導航線
              strokeOpacity: 0.8,
              strokeWeight: 6,        // 線條粗細
            }
          });

          // 當地圖被點擊時，通知父層將平板移到前方
          googleMap.current.addListener('click', () => {
            if (onMapClick) onMapClick();
          });

          // 🌟 2. 在地圖初始化時，為「元智大學」建立專屬的永久地標標記
          schoolMarkerRef.current = new window.google.maps.Marker({
            position: yzuCenter,
            map: googleMap.current,
            title: "元智大學",
            icon: {
              url: MAP_SCHOOL,
              scaledSize: new window.google.maps.Size(40, 50), // 設定合適的制服尺寸
              anchor: new window.google.maps.Point(20, 25),   // 圓形圖標錨點設在正中心
            },
            zIndex: 10, // 層級略高於一般未選取的店家
          });
        }

        renderMarkers(shops);
      } catch (error) {
        console.error('地圖載入出錯:', error);
      }
    };

    initMap();
  }, [shops]);

  useEffect(() => {
    if (!googleMap.current || !window.google || !userLocation) return;

    if (!userMarkerRef.current) {
      // 如果還沒畫過，就新建一個 Marker
      userMarkerRef.current = new window.google.maps.Marker({
        position: userLocation,
        map: googleMap.current,
        title: "您的當前位置",
        icon: {
          url: currentLocationIcon,
          scaledSize: new window.google.maps.Size(40, 40), // 可自行調整圖標大小
          anchor: new window.google.maps.Point(20, 20),    // 讓圖標正中心對齊座標
        },
        zIndex: 9999, // 確保在最上層
      });
    } else {
      // 如果已經畫過，但位置改變了，就更新座標
      userMarkerRef.current.setPosition(userLocation);
    }
  }, [userLocation]);

  // 👇 4. 新增這段：動態計算與繪製路線
  useEffect(() => {
    // 確保所有地圖與導航工具都載入完畢
    if (!googleMap.current || !window.google || !directionsService.current || !directionsRenderer.current) return;

    // 狀況 A：如果沒有選取店家，就「清除」地圖上的路線 (🌟 拿掉 !userLocation 的限制)
    if (!selectedShop) {
      directionsRenderer.current.setDirections({ routes: [] });
      return;
    }

    // 🌟 新增：決定起點！如果有 userLocation 就用真實定位，沒有就用學校預設座標
    const yzuCenter = { lat: 24.9705, lng: 121.2633 };
    const originLocation = userLocation || yzuCenter;

    // 狀況 B：轉換交通方式
    let travelMode = window.google.maps.TravelMode.WALKING;
    if (filterTransport === 'bicycle') travelMode = window.google.maps.TravelMode.BICYCLING;
    if (filterTransport === 'scooter') travelMode = window.google.maps.TravelMode.DRIVING; // 機車使用汽車模式模擬道路

    // 狀況 C：發送請求給 Google 計算路線
    directionsService.current.route(
      {
        origin: originLocation, // 🌟 起點改用我們上面判斷好的 originLocation
        destination: { lat: selectedShop.lat, lng: selectedShop.lng }, // 終點：店家位置
        travelMode: travelMode,
      },
      (response, status) => {
        if (status === 'OK') {
          // 算成功了！餵給渲染器自動畫藍色線條並縮放
          directionsRenderer.current.setDirections(response);
        } else {
          console.error('導航路線計算失敗:', status);
          directionsRenderer.current.setDirections({ routes: [] }); // 失敗時清空路線
        }
      }
    );
  }, [selectedShop, userLocation, filterTransport]);

  const renderMarkers = (shopsData) => {
    if (!googleMap.current || !window.google) return;

    // 清除舊的店家標記（保留學校標記不清除）
    Object.values(markersRef.current).forEach((m) => m.setMap(null));
    markersRef.current = {};

    shopsData.forEach((shop) => {
      const isSelected = selectedShop?.id === shop.id;

      // 🌟 3. 將店家標記全面換成自製的 mapRadish 素材
      const marker = new window.google.maps.Marker({
        position: { lat: shop.lat, lng: shop.lng },
        map: googleMap.current,
        title: shop.name,
        icon: {
          url: MAP_RADISH,
          // 透過條件判斷，當選中該店家時動態放大圖片尺寸 (從 36px 放大到 50px)
          scaledSize: isSelected 
            ? new window.google.maps.Size(50, 60) 
            : new window.google.maps.Size(30, 36),
          // 精準計算錨點（Point 參數為: width/2, height），確保蘿蔔針尖底部直擊座標
          anchor: isSelected 
            ? new window.google.maps.Point(25, 60) 
            : new window.google.maps.Point(15, 36),
        },
        zIndex: isSelected ? 1000 : 1, // 被選中的店家擁有最高層級
        cursor: 'pointer',
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
    <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden cursor-pointer">
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