// src/views/MapView.jsx

import React, { useState } from 'react';
import { ChevronLeft, X, Star, Utensils, MapPin, Clock, Search } from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';

// ==========================================
// 🌟 3D 舞台參數微調區 (可根據你的美感自行修改)
// ==========================================
const STAGE_CONFIG = {
  perspective: '1200px', // 空間深度
  transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)', // 動畫平滑曲線
  
  // 狀態 A：手機在前方 (搜尋/詳細資訊模式)
  phoneActive: {
    phone:  { x: '-100%', y: '0%', z: '150px', rotateY: '0deg', rotateX: '3deg', scale: 1, zIndex: 50 },
    tablet: { x: '20%',  y: '0%', z: '-120px', rotateY: '-10deg', rotateX: '5deg', scale: 1, zIndex: 10 }
  },
  
  // 狀態 B：平板在前方 (地圖導覽模式)
  tabletActive: {
    tablet: { x: '10%',   y: '0%', z: '0px', rotateY: '0deg', rotateX: '3deg', scale: 1.05, zIndex: 50 },
    phone:  { x: '-160%', y: '5%', z: '-150px', rotateY: '12deg', rotateX: '5deg', scale: 0.85, zIndex: 10 }
  }
};

export default function MapView({ selectedShop, setSelectedShop }) {
  const [filterTime, setFilterTime] = useState('15');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDevice, setActiveDevice] = useState('phone');

  const filteredShops = RESTAURANTS.filter(shop => {
    if (filterTime !== '全部' && shop.distance > parseInt(filterTime)) return false;
    if (searchQuery && !shop.name.includes(searchQuery) && !shop.type.includes(searchQuery)) return false;
    return true;
  });

  const currentPos = activeDevice === 'phone' ? STAGE_CONFIG.phoneActive : STAGE_CONFIG.tabletActive;

  // 輔助函式：將設定轉換為 CSS Transform 字串
  const getTransform = (device) => {
    const { x, y, z, rotateY, rotateX, scale } = currentPos[device];
    return `translate3d(${x}, ${y}, ${z}) rotateY(${rotateY}) rotateX(${rotateX}) scale(${scale})`;
  };

  return (
    <div 
      className="relative w-full h-screen bg-[#E5E3DF] overflow-hidden flex items-center justify-center animate-in fade-in duration-700"
      style={{ perspective: STAGE_CONFIG.perspective }}
    >
      {/* 底部環境倒影/陰影 */}
      <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[70vw] h-[20vh] bg-stone-300/40 blur-[80px] rounded-full pointer-events-none"></div>

      {/* ==========================================
          裝置 1：平板 (地圖顯示區)
          ========================================== */}
      <div 
        className="absolute w-[900px] max-w-[92vw] h-[600px] max-h-[75vh] bg-[#1A1A1A] rounded-[2rem] border-[10px] border-[#1A1A1A] shadow-2xl flex flex-col"
        style={{ 
          transform: getTransform('tablet'),
          transition: STAGE_CONFIG.transition,
          zIndex: currentPos.tablet.zIndex,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* 平板非活動時的點擊覆蓋層 */}
        {activeDevice !== 'tablet' && (
          <div 
            className="absolute inset-0 z-[100] bg-black/10 cursor-pointer rounded-[1.5rem] hover:bg-transparent transition-colors"
            onClick={() => setActiveDevice('tablet')}
          />
        )}
        
        {/* 平板螢幕 */}
        <div className="flex-1 relative bg-[#E8EAED] rounded-[1.5rem] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          {/* 校園地標 */}
          <div className="absolute top-[45%] left-[55%] z-10 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-10 h-10 bg-emerald-600 rounded-full shadow-lg border-[3px] border-white flex items-center justify-center text-white mb-1">
              <span className="text-[10px] font-black">YZU</span>
            </div>
            <span className="bg-white/90 backdrop-blur px-2 py-0.5 rounded shadow text-[9px] font-bold text-[#1A1A1A]">元智大學</span>
          </div>

          {/* 店家標籤 (Pins) */}
          {filteredShops.map(r => (
            <div 
              key={r.id}
              role="button" // 🌟 確保被 CustomCursor 識別
              className="absolute cursor-pointer transition-all z-20 group hover:scale-110"
              style={{ 
                top: `${45 + (r.distance % 2 === 0 ? 1 : -1) * (r.distance * 1.5)}%`, 
                left: `${55 + (r.id % 2 === 0 ? 1 : -1) * (r.distance * 2)}%` 
              }}
              onClick={(e) => { 
                // 🌟 修復核心：阻止冒泡與原生事件衝突
                e.stopPropagation(); 
                if (e.nativeEvent) e.nativeEvent.stopImmediatePropagation();
                
                setSelectedShop(r); 
                setActiveDevice('phone'); // 點地圖時，把手機(資料頁)叫到前面
              }}
            >
              <div className="flex flex-col items-center relative">
                <div className={`px-2 py-1 rounded shadow-md text-[10px] font-bold mb-1 transition-colors ${selectedShop?.id === r.id ? 'bg-[#1A1A1A] text-white scale-110' : 'bg-white text-[#1A1A1A]'}`}>
                  {r.name}
                </div>
                <MapPin 
                  size={26} 
                  className={selectedShop?.id === r.id ? 'text-[#1A1A1A]' : 'text-emerald-600'} 
                  fill="#ffffff"
                />
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ==========================================
          裝置 2：手機 (清單與詳細資料區)
          ========================================== */}
      <div 
        className="absolute w-[320px] h-[650px] max-h-[85vh] bg-[#1A1A1A] rounded-[2.5rem] border-[12px] border-[#1A1A1A] shadow-[0_25px_60px_rgba(0,0,0,0.35)] flex flex-col"
        style={{ 
          transform: getTransform('phone'),
          transition: STAGE_CONFIG.transition,
          zIndex: currentPos.phone.zIndex,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#1A1A1A] rounded-b-2xl z-50"></div>

        {activeDevice !== 'phone' && (
          <div 
            className="absolute inset-0 z-[100] bg-black/10 cursor-pointer rounded-[1.8rem]"
            onClick={() => setActiveDevice('phone')}
          />
        )}

        <div className="flex-1 relative bg-white rounded-[1.8rem] overflow-hidden flex flex-col">
          
          {selectedShop ? (
            <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="relative w-full h-52 flex-shrink-0">
                <img src={selectedShop.img} className="w-full h-full object-cover" alt={selectedShop.name}/>
                <button 
                  onClick={() => setSelectedShop(null)} 
                  className="absolute top-8 left-4 w-8 h-8 bg-[#1A1A1A]/80 backdrop-blur rounded-full flex items-center justify-center text-white z-10 cursor-pointer"
                >
                  <ChevronLeft size={18} strokeWidth={2.5} />
                </button>
              </div>
              <div className="p-5 flex-1 bg-white rounded-t-[1.5rem] -mt-6 relative z-10">
                <h2 className="text-xl font-black text-[#1A1A1A] mb-1">{selectedShop.name}</h2>
                <div className="flex items-center text-[11px] mb-4">
                  <span className="font-bold mr-1">{selectedShop.rating}</span>
                  <div className="flex text-amber-500 mr-2">
                    {[...Array(5)].map((_,i) => <Star key={i} size={12} fill="currentColor"/>)}
                  </div>
                  <span className="text-stone-400">({selectedShop.reviews})</span>
                </div>
                
                <div className="space-y-4 text-xs text-stone-700 border-t border-stone-100 pt-5">
                  <div className="flex items-start space-x-3">
                    <Utensils size={16} className="text-stone-300" />
                    <div className="flex items-center">
                      <span className="font-bold text-emerald-700 mr-2">{selectedShop.type}</span> · 內用 · 外帶
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin size={16} className="text-stone-300" />
                    <div>步行約 {selectedShop.distance} 分鐘</div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock size={16} className="text-stone-300" />
                    <div><span className="text-emerald-600 font-bold">營業中</span> · {selectedShop.open}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col bg-white overflow-hidden pt-8">
              <div className="p-4 border-b border-stone-100 bg-white">
                 <div className="flex items-center bg-stone-100/60 border border-stone-200 rounded-xl px-4 py-3 mb-3">
                   <Search size={16} className="text-stone-400 mr-3" />
                   <input 
                     type="text" 
                     placeholder="搜尋蔬食..." 
                     className="flex-1 bg-transparent text-xs font-medium focus:outline-none" 
                     value={searchQuery} 
                     onChange={e => setSearchQuery(e.target.value)}
                   />
                 </div>
                 <div className="flex items-center border border-stone-200 rounded-lg px-2 py-1.5 text-[10px] font-bold">
                   <Clock size={12} className="mr-2 text-stone-400"/>
                   <select 
                     className="bg-transparent focus:outline-none w-full appearance-none text-center cursor-pointer"
                     value={filterTime}
                     onChange={(e) => setFilterTime(e.target.value)}
                   >
                     <option value="全部">不限距離</option>
                     <option value="15">步行 15分內</option>
                     <option value="10">步行 10分內</option>
                     <option value="5">步行 5分內</option>
                   </select>
                 </div>
              </div>
              <div className="flex-1 overflow-y-auto no-scrollbar">
                 {filteredShops.map((shop, idx) => (
                   <div 
                     key={shop.id} 
                     className="p-4 border-b border-stone-50 flex cursor-pointer hover:bg-stone-50 transition-colors animate-in fade-in"
                     style={{ animationDelay: `${idx * 40}ms` }}
                     onClick={() => {
                        setSelectedShop(shop); 
                        setActiveDevice('tablet'); // 點清單時，把地圖(平板)移到前方看位置
                     }}
                   >
                      <div className="flex-1 pr-3 flex flex-col justify-center">
                        <h3 className="font-bold text-sm mb-1">{shop.name}</h3>
                        <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">{shop.type}</div>
                      </div>
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-stone-100">
                        <img src={shop.img} className="w-full h-full object-cover" alt={shop.name}/>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}