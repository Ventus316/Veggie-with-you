// src/hooks/useUserLocation.js
import { useState, useEffect, useCallback } from 'react';

// 🌟 防呆預設座標：若抓不到定位，預設為元智大學座標 (可自行微調)
const DEFAULT_LOCATION = {
  lat: 24.9682,
  lng: 121.2613
};

export default function useUserLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLocation = useCallback(() => {
    setIsLoading(true);
    setError(null);

    // 檢查瀏覽器是否支援定位 API
    if (!navigator.geolocation) {
      setError("⚠️ 您的瀏覽器不支援定位功能，已切換至預設座標。");
      setLocation(DEFAULT_LOCATION);
      setIsLoading(false);
      return;
    }

    // 呼叫瀏覽器內建定位
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // ✅ 成功抓取真實座標
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        // ❌ 失敗 (使用者拒絕、超時、或設備無 GPS)
        console.warn("定位失敗:", err.message);
        setError("⚠️ 無法取得真實定位，已切換至校園預設座標。");
        setLocation(DEFAULT_LOCATION);
        setIsLoading(false);
      },
      { 
        enableHighAccuracy: true, // 盡可能要求高精確度 (會多耗一點電與時間)
        timeout: 5000,            // 最多等 5 秒，超時就當作失敗
        maximumAge: 0             // 不使用暫存的舊位置
      }
    );
  }, []);

  // 組件載入時，自動執行一次定位
  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  // 回傳：座標(location)、錯誤訊息(error)、載入狀態(isLoading)、重新定位函式(retry)
  return { location, error, isLoading, retry: fetchLocation };
}