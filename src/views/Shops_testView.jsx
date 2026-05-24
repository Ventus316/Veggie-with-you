// src/views/Shops_testView.jsx
import React, { useEffect } from 'react';
import { Clock, Leaf } from 'lucide-react';
import useShopFilters from '../hooks/useShopFilters';
import FadeInCard from '../components/ui/FadeInCard_shops';
import { SORT_ICONS } from '../data/Data';

// 定義交通工具對應的顯示標籤
const TRANSPORT_LABELS = { walking: '步行', bicycle: '腳踏車', scooter: '機車', transit: '大眾運輸' };

export default function Shops_testView({ setSelectedShop, setActiveTab }) {
  const { 
    filterTransport, setFilterTransport, 
    filterTime, setFilterTime, 
    filteredShops 
  } = useShopFilters();
  
  const handleShopClick = (shopData) => {
    // 記錄目前的捲動高度
    sessionStorage.setItem('scroll_pos_shops', window.scrollY.toString());
    setSelectedShop(shopData);
    setActiveTab('shopDetail');
  };

  // 多週期滾動追蹤復原機制
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scroll_pos_shops');
    if (savedPosition) {
      const targetScroll = parseInt(savedPosition, 10);
      let attempts = 0;
      
      const intervalId = setInterval(() => {
        window.scrollTo(0, targetScroll);
        attempts++;
        
        if (Math.abs(window.scrollY - targetScroll) <= 3 || attempts > 12) {
          clearInterval(intervalId);
          sessionStorage.removeItem('scroll_pos_shops');
        }
      }, 40);

      return () => clearInterval(intervalId);
    }
  }, [filteredShops]);

  // 🌟 核心升級：即時判斷當前是否營業
  const getRealTimeStatus = (openData) => {
    if (!openData || !Array.isArray(openData)) return { text: '未知', isOpen: false };
    
    const daysMap = ['日', '一', '二', '三', '四', '五', '六'];
    const now = new Date();
    const todayStr = daysMap[now.getDay()];
    const todaySchedule = openData.find(item => item.day === todayStr);

    // 今日公休
    if (!todaySchedule || todaySchedule.time === '休息') {
      return { text: '公休', isOpen: false };
    }

    // 計算當前時間的分鐘總數
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const timeRanges = todaySchedule.time.split('\n'); // 處理如 '11:00-14:00\n16:30-19:30'

    for (const range of timeRanges) {
      const [startStr, endStr] = range.split('-');
      if (!startStr || !endStr) continue;

      const [startH, startM] = startStr.split(':').map(Number);
      const [endH, endM] = endStr.split(':').map(Number);

      const startMinutes = startH * 60 + startM;
      const endMinutes = endH * 60 + endM;

      // 若目前時間落在區間內，則為營業中
      if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
        return { text: '營業中', isOpen: true };
      }
    }

    // 若不在任何營業區間內，則顯示休息
    return { text: '休息中', isOpen: false };
  };

  // 🌟 圖片路徑解析工具：確保 public 資料夾的圖片能正確讀取
  const resolveAsset = (path) => {
    if (!path) return '';
    if (path.startsWith('/')) {
      return `${import.meta.env.BASE_URL}${path.slice(1)}`;
    }
    return path;
  };

  return (
    <div className="px-8 max-w-5xl mx-auto min-h-screen animate-in fade-in duration-1000 pb-20">
      
      {/* 頂部篩選列維持不變 (已退回原版設計) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-stone-200 pb-8 mt-8 mx-12">
        <div className="space-y-3 w-full overflow-hidden">
          
          {/* 交通工具列 */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'walking', label: '步行', icon: SORT_ICONS.walking },
              { id: 'bicycle', label: '腳踏車', icon: SORT_ICONS.bicycle },
              { id: 'scooter', label: '機車', icon: SORT_ICONS.scooter }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={(e) => { e.stopPropagation(); setFilterTransport(opt.id); }}
                className={`flex-shrink-0 flex items-center px-3 py-2 rounded-lg text-[10px] font-bold border transition-colors ${
                  filterTransport === opt.id 
                    ? 'bg-stone-800 text-white border-stone-800 shadow-sm' 
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <img 
                  src={opt.icon} 
                  alt={opt.label}
                  className={`w-3.5 h-3.5 mr-1.5 object-contain ${
                    filterTransport === opt.id 
                      ? 'filter brightness-0 invert' 
                      : 'filter brightness-50 contrast-125'
                  }`} 
                />
                {opt.label}
              </button>
            ))}
          </div>

          {/* 時間限制列 */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: '不限' },
              { id: '5', label: '5 分' },
              { id: '10', label: '10 分' },
              { id: '15', label: '15 分' }
            ].map(opt => (
              <button
                key={opt.id}
                onClick={(e) => { e.stopPropagation(); setFilterTime(opt.id); }}
                className={`flex-shrink-0 flex items-center px-2 py-2 rounded-lg text-[10px] font-bold border transition-colors ${
                  filterTime === opt.id 
                    ? 'bg-stone-800 text-white border-stone-800 shadow-sm' 
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Clock size={12} className={`mr-1.5 ${filterTime === opt.id ? 'text-white' : 'text-stone-400'}`} />
                {opt.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* 🌟 核心佈局切換：網格系統 (手機2欄、平板3欄、電腦4欄) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12 md:mx-12">
        {/* 限制最多顯示 12 個店家 */}
        {filteredShops.slice(0, 12).map((shop, idx) => {
          const status = getRealTimeStatus(shop.open);
          
          return (
            <FadeInCard key={shop.id} delay={(idx % 4) * 100}>
              <div 
                onClick={() => handleShopClick(shop)} 
                className="group flex flex-col items-center cursor-pointer"
              >
                {/* 店家 Logo 圓形框 */}
                <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full overflow-hidden border border-stone-200 shadow-sm mb-4 transition-all duration-300 group-hover:shadow-lg group-hover:border-stone-300 bg-white flex items-center justify-center">
                  <img 
                    // 🌟 這裡套用了 resolveAsset 來確保 public 資料夾的圖片能被讀取
                    src={resolveAsset(shop.shopLogo || shop.img)} 
                    alt={shop.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* 底部資訊列 (狀態 + 交通距離) */}
                <div className="flex items-center justify-between w-full px-2 max-w-[150px]">
                  
                  {/* 左側：營業狀態標籤 */}
                  <span className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-widest ${
                    status.isOpen 
                      ? 'bg-stone-200 text-stone-700' 
                      : 'bg-stone-100 text-stone-400'
                  }`}>
                    {status.text}
                  </span>

                  {/* 右側：交通工具與距離 */}
                  <div className="flex items-center text-[10px] md:text-xs font-bold text-stone-400 tracking-wider">
                    <img 
                      src={SORT_ICONS[filterTransport]} 
                      alt="transport" 
                      className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1 filter brightness-0 opacity-40" 
                    />
                    {shop.distance?.[filterTransport] || '--'}min
                  </div>

                </div>
              </div>
            </FadeInCard>
          );
        })}
      </div>

      {/* 無資料狀態 */}
      {filteredShops.length === 0 && (
        <div className="py-24 text-center">
          <Leaf size={32} className="mx-auto text-stone-300 mb-4" />
          <p className="text-stone-400 text-xs tracking-[0.2em] font-bold uppercase">無符合篩選條件的店家</p>
        </div>
      )}

    </div>
  );
}