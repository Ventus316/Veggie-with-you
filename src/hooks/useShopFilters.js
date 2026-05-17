// src/hooks/useShopFilters.js
import { useState, useMemo } from 'react';
import { RESTAURANTS } from '../data/restaurantsData';

export default function useShopFilters(forceIncludeShop = null) {
  const [filterTransport, setFilterTransport] = useState('walking');
  const [filterTime, setFilterTime] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShops = useMemo(() => {
    let result = RESTAURANTS.filter(shop => {
      // 1. 搜尋比對 (主要供地圖頁使用)
      if (searchQuery && !shop.name.includes(searchQuery) && !shop.type.includes(searchQuery)) return false;

      // 2. 交通方式與時間比對
      if (filterTime !== 'all') {
        const limit = parseInt(filterTime);
        // 動態讀取選定交通方式的時間，若無該資料則預設給 999 (排除)
        const shopTime = shop.distance?.[filterTransport];
        if (!shopTime || shopTime > limit) return false;
      }

      return true;
    });

    // 防呆：確保「目前選中的店家」不會因為篩選條件改變而從地圖/清單上消失
    if (forceIncludeShop && !result.some(s => s.id === forceIncludeShop.id)) {
      result = [...result, forceIncludeShop];
    }

    return result;
  }, [filterTransport, filterTime, searchQuery, forceIncludeShop]);

  return {
    filterTransport, setFilterTransport,
    filterTime, setFilterTime,
    searchQuery, setSearchQuery,
    filteredShops
  };
}