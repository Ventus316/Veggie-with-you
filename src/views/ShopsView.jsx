// src/views/ShopsView.jsx
import React, { useState, useEffect } from 'react';
import { MapPin, Clock, ArrowRight, X, Leaf } from 'lucide-react';
import useShopFilters from '../hooks/useShopFilters';
import FadeInCard from '../components/ui/FadeInCard_shops';
import { SORT_ICONS } from '../data/Data';

// 定義翻譯對應表，供卡片動態顯示用
const TRANSPORT_LABELS = { walking: '步行', bicycle: '腳踏車', scooter: '機車', transit: '大眾運輸' };

export default function ShopsView({ setSelectedShop, setActiveTab }) {
  const [selectedMenu, setSelectedMenu] = useState(null);
  
  const { 
    filterTransport, setFilterTransport, 
    filterTime, setFilterTime, 
    filteredShops 
  } = useShopFilters();
  
  const handleShopClick = (shopData) => {
    // 關鍵修正點 1：在點擊事件觸發的第一時間，火速捕捉並記錄目前的捲動高度
    sessionStorage.setItem('scroll_pos_shops', window.scrollY.toString());
    
    setSelectedShop(shopData);
    setActiveTab('shopDetail');
  };

  // 關鍵修正點 2：多週期滾動追蹤復原機制
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

  // 🌟 核心新增：動態獲取並格式化今日營業時間的輔助函式
  const getTodayOpenHours = (openArray) => {
    if (!Array.isArray(openArray)) return '暫無營業時間資料';
    
    // 1. 取得今日星期幾對應的中文標籤 (JavaScript 的 getDay() 0是週日，1是週一...)
    const daysMap = ['日', '一', '二', '三', '四', '五', '六'];
    const todayDayStr = daysMap[new Date().getDay()];
    
    // 2. 從店家的營業時間陣列中找出今日對應的物件
    const todayInfo = openArray.find(item => item.day === todayDayStr);
    
    if (!todayInfo) return '未提供今日營業時間';
    
    // 3. 根據營業狀態回傳美化後的字串
    if (todayInfo.time === '休息') {
      return '今日公休';
    }
    
    // 4. 防呆處理：將兩段式營業時間的 \n 換行符號替換為空白，確保卡片內部排版維持完美的單行不變形
    return `今日 ${todayInfo.time.replace(/\n/g, ' ')}`;
  };

  return (
    <div className="px-6 max-w-5xl mx-auto min-h-screen animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-stone-200 pb-8 mt-8 mx-12">
        
        {/* 🌟 終極解法：橫向膠囊按鈕 (完全避開 3D 圖層重疊 Bug) */}
        <div className="space-y-3 w-full overflow-hidden">
          
          {/* 交通工具列 (可橫向滑動) */}
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
                  // 🌟 如果被選中，用 filter 讓圖標變成純白色；沒選中就維持原本的灰色
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

          {/* 時間限制列 (可橫向滑動) */}
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

      <div className="flex flex-col space-y-6 mx-6">
        {filteredShops.map((shop, idx) => (
          <FadeInCard key={shop.id} delay={(idx % 5) * 100}>
            <div onClick={() => handleShopClick(shop)} className="group relative bg-[#FDFCF8] flex flex-col p-6 md:p-8 border border-stone-200 hover:border-[#1A1A1A] hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div className="flex flex-col mb-6 border-b border-stone-100 pb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold tracking-[0.15em] text-[#1A1A1A]">{shop.name}</h3>
                  <span className="px-2 py-0.5 border border-[#1A1A1A] text-[9px] font-bold tracking-[0.1em] text-[#1A1A1A] uppercase">
                    {shop.type}
                  </span>
                </div>
                <div className="flex items-center text-xs font-bold tracking-[0.1em] text-stone-400 space-x-5">
                  <span className="flex items-center">
                    <MapPin size={12} className="mr-1 text-stone-300" /> 
                    {TRANSPORT_LABELS[filterTransport]} {shop.distance?.[filterTransport] || '--'} 分
                  </span>
                  {/* 🌟 核心調整：調用動態時間函式，即時呈現今日營業時段或公修標籤 */}
                  <span className={`flex items-center ${shop.open && shop.open[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]?.time === '休息' ? 'text-rose-500/80' : ''}`}>
                    <Clock size={12} className="mr-1 text-stone-300" /> 
                    {getTodayOpenHours(shop.open)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-6">
                {shop.recommendations.map((dish, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-md border border-stone-200">
                      <img 
                        src={dish.img} 
                        alt={dish.name} 
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" 
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-sm font-bold text-[#1A1A1A] tracking-[0.1em] mb-1">{dish.name}</span>
                      <span className="text-xs font-bold text-stone-400 tracking-wider">NT$ {dish.price || '--'}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end w-full">
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); 
                    setSelectedMenu(shop.menuImg);
                  }}
                  disabled={!shop.menuImg}
                  className={`flex items-center space-x-2 text-[10px] font-bold tracking-[0.2em] border-b pb-1 uppercase transition-colors ${
                    shop.menuImg 
                      ? 'text-[#1A1A1A] border-[#1A1A1A] hover:text-stone-400 hover:border-stone-400' 
                      : 'text-stone-300 border-stone-300 cursor-not-allowed'
                  }`}
                >
                  <span>查看線上完整菜單</span>
                  {shop.menuImg && <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </div>
          </FadeInCard>
        ))}

        {filteredShops.length === 0 && (
          <div className="py-24 text-center">
            <Leaf size={32} className="mx-auto text-stone-300 mb-4" />
            <p className="text-stone-400 text-xs tracking-[0.2em] font-bold uppercase">無符合篩選條件的店家</p>
          </div>
        )}
      </div>

      {/* 線上菜單放大燈箱 (Modal) */}
      {selectedMenu && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1A1A1A]/95 backdrop-blur-sm p-6 animate-in fade-in duration-300" onClick={() => setSelectedMenu(null)}>
          <div className="relative max-w-2xl w-full h-[80vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedMenu(null)}
              className="absolute -top-12 right-0 text-white hover:text-stone-400 transition-colors flex items-center space-x-2 text-[10px] tracking-[0.2em] uppercase font-bold"
            >
              <span>Close</span> <X size={18} />
            </button>
            <div className="w-full h-full bg-[#F6F6F4] p-2 overflow-hidden shadow-2xl border border-stone-800">
              <img 
                src={selectedMenu} 
                className="w-full h-full object-contain" 
                alt="線上完整菜單" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}