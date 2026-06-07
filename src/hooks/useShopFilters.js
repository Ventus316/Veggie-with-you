// src/hooks/useShopFilters.js
import { useState, useMemo } from 'react';
import { RESTAURANTS } from '../data/restaurantsData';

// 🌟 修改：加入 shopsData 參數，讓外部可以傳入算好的動態資料
export default function useShopFilters(shopsData = RESTAURANTS, forceIncludeShop = null) {
  const [filterTransport, setFilterTransport] = useState('walking');
  const [filterTime, setFilterTime] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShops = useMemo(() => {
    // 🌟 修改：改用傳進來的 shopsData 進行過濾
    let result = shopsData.filter(shop => {
      // 1. 搜尋比對
      if (searchQuery && !shop.name.includes(searchQuery) && !shop.type.includes(searchQuery)) return false;

      // 2. 交通方式與時間比對
      if (filterTime !== 'all') {
        const limit = parseInt(filterTime);
        const shopTime = shop.distance?.[filterTransport];
        if (!shopTime || shopTime > limit) return false;
      }

      return true;
    });

    // 防呆：確保「目前選中的店家」不會被濾掉
    if (forceIncludeShop && !result.some(s => s.id === forceIncludeShop.id)) {
      result = [...result, forceIncludeShop];
    }

    return result;
  }, [shopsData, filterTransport, filterTime, searchQuery, forceIncludeShop]);

  return {
    filterTransport, setFilterTransport,
    filterTime, setFilterTime,
    searchQuery, setSearchQuery,
    filteredShops
  };
}