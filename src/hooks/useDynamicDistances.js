// src/hooks/useDynamicDistances.js
import { useState, useEffect } from 'react';
import { RESTAURANTS } from '../data/restaurantsData';

export default function useDynamicDistances(userLocation) {
  // 預設先使用原本的假資料
  const [dynamicShops, setDynamicShops] = useState(RESTAURANTS);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    // 防呆：如果沒有定位，或沒載入 Google API，就直接用假資料
    if (!userLocation || !window.google || !window.google.maps) {
      setDynamicShops(RESTAURANTS);
      return;
    }

    const calculateDistances = async () => {
      setIsCalculating(true);
      const service = new window.google.maps.DistanceMatrixService();

      // 1. 整理終點名單：優先用經緯度，沒有就用文字地址
      const destinations = RESTAURANTS.map(shop => {
        if (shop.lat && shop.lng) return { lat: shop.lat, lng: shop.lng };
        return shop.address; // 退而求其次，直接把 "桃園市中壢區..." 送給 Google 找
      });

      const origin = { lat: userLocation.lat, lng: userLocation.lng };

      try {
        // 2. 定義要查詢的三種交通方式 (機車統一用 DRIVING 汽車模式代替)
        const modes = [
          { key: 'walking', mode: window.google.maps.TravelMode.WALKING },
          { key: 'bicycle', mode: window.google.maps.TravelMode.BICYCLING },
          { key: 'scooter', mode: window.google.maps.TravelMode.DRIVING } 
        ];

        // 3. 一口氣平行發送 3 個 API 請求 (因為一次只能查一種交通工具)
        const promises = modes.map(m => 
          service.getDistanceMatrix({
            origins: [origin],
            destinations: destinations,
            travelMode: m.mode,
            unitSystem: window.google.maps.UnitSystem.METRIC, // 使用公制
          }).then(res => ({ key: m.key, data: res }))
        );

        const results = await Promise.all(promises);

        // 4. 把算出來的「真實分鐘數」塞回原本的店家資料中
        const updatedShops = RESTAURANTS.map((shop, index) => {
          const newDistance = { ...shop.distance };

          results.forEach(result => {
            const element = result.data.rows[0].elements[index];
            if (element && element.status === 'OK') {
              // API 給的是秒數 (duration.value)，我們除以 60 換算成「分鐘」並無條件進位
              const minutes = Math.ceil(element.duration.value / 60);
              newDistance[result.key] = minutes;
            }
          });

          return { ...shop, distance: newDistance };
        });

        // 5. 更新狀態：大功告成！
        setDynamicShops(updatedShops);

      } catch (error) {
        console.error("⚠️ 動態時間計算失敗，切換回靜態資料:", error);
        setDynamicShops(RESTAURANTS);
      } finally {
        setIsCalculating(false);
      }
    };

    calculateDistances();
  }, [userLocation]); // 只要定位一改變，就會重新計算

  return { dynamicShops, isCalculating };
}