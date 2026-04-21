// src/views/ShopsView.jsx

import React, { useState } from 'react';
import { MapPin, Clock, ArrowRight, X, Leaf } from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';
import FadeInCard from '../components/ui/FadeInCard';

export default function ShopsView({ setSelectedShop, setActiveTab }) {
  const [filterType, setFilterType] = useState('全部');
  const [filterTime, setFilterTime] = useState('全部');
  const [selectedMenu, setSelectedMenu] = useState(null);
  
  const handleShopClick = (shopData) => {
    setSelectedShop(shopData);    // 1. 將選中的店家資料存入 App.jsx 的 selectedShop
    setActiveTab('shopDetail');   // 2. 將畫面切換到 ShopDetailView
  };
  const filteredShops = RESTAURANTS.filter(shop => {
    if (filterType !== '全部' && shop.type !== filterType) return false;
    if (filterTime !== '全部' && shop.distance > parseInt(filterTime)) return false;
    return true;
  });

  return (
    <div className="py-12 px-6 max-w-5xl mx-auto min-h-screen animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-stone-200 pb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-[#1A1A1A] mb-3 uppercase">店家資訊</h1>
          <p className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase">Vegan Shops Guide</p>
        </div>
        <div className="flex space-x-8 mt-8 md:mt-0">
          <div className="flex flex-col">
            <label className="text-[9px] font-bold tracking-[0.2em] text-stone-400 mb-2 uppercase">素食分類</label>
            <div className="relative">
              <select 
                className="appearance-none bg-transparent border-b border-[#1A1A1A] text-[#1A1A1A] text-xs font-bold tracking-[0.1em] pb-2 pr-6 focus:outline-none cursor-pointer"
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
              >
                <option value="全部">所有分類</option>
                <option value="全素">全素</option>
                <option value="蛋奶素">蛋奶素</option>
                <option value="五辛素">五辛素</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-[9px] font-bold tracking-[0.2em] text-stone-400 mb-2 uppercase">步行時間</label>
            <div className="relative">
              <select 
                className="appearance-none bg-transparent border-b border-[#1A1A1A] text-[#1A1A1A] text-xs font-bold tracking-[0.1em] pb-2 pr-6 focus:outline-none cursor-pointer"
                value={filterTime}
                onChange={e => setFilterTime(e.target.value)}
              >
                <option value="全部">不限時間</option>
                <option value="5">5 分鐘以內</option>
                <option value="10">10 分鐘以內</option>
                <option value="15">15 分鐘以內</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        {filteredShops.map((shop, idx) => (
          <FadeInCard key={shop.id} delay={(idx % 5) * 100}>
            <div onClick={() => handleShopClick(shop)} className="group relative bg-[#FDFCF8] flex flex-col p-6 md:p-8 border border-stone-200 hover:border-[#1A1A1A] hover:shadow-xl transition-all duration-500">
              <div className="flex flex-col mb-6 border-b border-stone-100 pb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold tracking-[0.15em] text-[#1A1A1A]">{shop.name}</h3>
                  <span className="px-2 py-0.5 border border-[#1A1A1A] text-[9px] font-bold tracking-[0.1em] text-[#1A1A1A] uppercase">
                    {shop.type}
                  </span>
                </div>
                <div className="flex items-center text-xs font-bold tracking-[0.1em] text-stone-400 space-x-5">
                  <span className="flex items-center"><MapPin size={12} className="mr-1 text-stone-300" /> {shop.distance} min</span>
                  <span className="flex items-center"><Clock size={12} className="mr-1 text-stone-300" /> {shop.open}</span>
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
                      <span className="text-xs font-bold text-stone-400 tracking-wider">NT$ {dish.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end w-full">
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); // 阻止事件冒泡，避免觸發外層卡片的跳轉
                    setSelectedMenu(shop.menuImg);
                  }}
                  className="flex items-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 uppercase hover:text-stone-400 hover:border-stone-400 transition-colors"
                >
                  <span>查看線上完整菜單</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
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

      {selectedMenu && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1A1A1A]/95 backdrop-blur-sm p-6 animate-in fade-in duration-300">
          <div className="relative max-w-2xl w-full h-[80vh] flex flex-col items-center">
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