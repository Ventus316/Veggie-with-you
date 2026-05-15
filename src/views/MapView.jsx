// src/views/MapView.jsx
import React, { useState } from 'react';
import { ChevronLeft, Star, Utensils, Clock, Search, MapPin, X, ArrowRight, Filter } from 'lucide-react';
import { RESTAURANTS } from '../data/restaurantsData';
import GoogleMapComponent from '../components/ui/GoogleMapComponent';

const STAGE_CONFIG = {
  perspective: '1200px',
  transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
  phoneActive: {
    phone:  { x: '-100%', y: '0%', z: '150px', rotateY: '0deg', rotateX: '3deg', scale: 1, zIndex: 50 },
    tablet: { x: '23%',  y: '0%', z: '-120px', rotateY: '-10deg', rotateX: '5deg', scale: 1, zIndex: 10 }
  },
  tabletActive: {
    tablet: { x: '15%',   y: '0%', z: '0px', rotateY: '0deg', rotateX: '3deg', scale: 1.1, zIndex: 50 },
    phone:  { x: '-170%', y: '5%', z: '-300px', rotateY: '25deg', rotateX: '0deg', scale: 1, zIndex: 10 }
  }
};

export default function MapView({ selectedShop, setSelectedShop, setActiveTab }) {
  const [filterDist, setFilterDist] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDevice, setActiveDevice] = useState('phone');

  // 🌟 整合篩選邏輯
  const filteredShops = RESTAURANTS.filter(shop => {
    // 1. 距離篩選
    const walk = shop.distance?.walking || 0;
    const scooter = shop.distance?.scooter || 0;
    if (filterDist === 'walk-5' && walk > 5) return false;
    if (filterDist === 'walk-10' && walk > 10) return false;
    if (filterDist === 'walk-15' && walk > 15) return false;
    if (filterDist === 'scoot-5' && scooter > 5) return false;
    if (filterDist === 'scoot-10' && scooter > 10) return false;

    // 2. 素食分類篩選
    if (filterType !== 'all' && !shop.type.includes(filterType)) return false;

    // 3. 關鍵字搜尋
    if (searchQuery && !shop.name.includes(searchQuery) && !shop.type.includes(searchQuery)) return false;

    return true;
  });

  const currentPos = activeDevice === 'phone' ? STAGE_CONFIG.phoneActive : STAGE_CONFIG.tabletActive;
  const getTransform = (device) => {
    const { x, y, z, rotateY, rotateX, scale } = currentPos[device];
    return `translate3d(${x}, ${y}, ${z}) rotateY(${rotateY}) rotateX(${rotateX}) scale(${scale})`;
  };

  return (
    <div className="relative w-full h-screen bg-[#E5E3DF] overflow-hidden flex items-center justify-center animate-in fade-in duration-700" style={{ perspective: STAGE_CONFIG.perspective }}>
      
      {/* 平板：地圖顯示 */}
      <div className="absolute w-[900px] max-w-[92vw] h-[600px] max-h-[75vh] bg-[#1A1A1A] rounded-[2rem] border-[10px] border-[#1A1A1A] shadow-2xl flex flex-col"
        style={{ transform: getTransform('tablet'), transition: STAGE_CONFIG.transition, zIndex: currentPos.tablet.zIndex, transformStyle: 'preserve-3d' }}>
        <div className="flex-1 relative bg-[#E8EAED] rounded-[1.5rem] overflow-hidden">
          <GoogleMapComponent 
            shops={filteredShops} 
            selectedShop={selectedShop} 
            onMarkerClick={(shop) => { setSelectedShop(shop); setActiveDevice('phone'); }}
            onMapClick={() => { setSelectedShop(null); setActiveDevice('tablet'); }}
          />
        </div>
      </div>

      {/* 手機：清單與詳情 */}
      <div className="absolute w-[320px] h-[650px] max-h-[85vh] bg-[#1A1A1A] rounded-[2.5rem] border-[12px] border-[#1A1A1A] shadow-2xl flex flex-col"
        style={{ transform: getTransform('phone'), transition: STAGE_CONFIG.transition, zIndex: currentPos.phone.zIndex, transformStyle: 'preserve-3d' }}>
        
        <div className="flex-1 relative bg-white rounded-[1.8rem] overflow-hidden flex flex-col">
          {selectedShop ? (
            /* --- 詳細資料區 --- */
            <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar animate-in fade-in duration-300">
              <div className="relative w-full h-52 flex-shrink-0">
                <img src={selectedShop.img} className="w-full h-full object-cover" alt={selectedShop.name}/>
                <button onClick={() => setSelectedShop(null)} className="absolute top-8 left-4 w-10 h-10 bg-[#1A1A1A]/80 backdrop-blur rounded-full flex items-center justify-center text-white z-50 border-none cursor-pointer shadow-lg hover:bg-black">
                  <ChevronLeft size={22} strokeWidth={2.5} />
                </button>
              </div>

              <div className="p-5 flex-1 bg-white rounded-t-[1.5rem] -mt-6 relative z-10 flex flex-col">
                <h2 className="text-xl font-black text-[#1A1A1A] mb-1">{selectedShop.name}</h2>
                <div className="flex items-center text-[11px] mb-4">
                  <span className="font-bold mr-1">{selectedShop.rating}</span>
                  <div className="flex text-amber-500 mr-2">{[...Array(5)].map((_,i) => <Star key={i} size={12} fill="currentColor"/>)}</div>
                  <span className="text-stone-400">({selectedShop.reviews})</span>
                </div>
                
                <div className="space-y-4 text-xs text-stone-700 border-t border-stone-100 pt-5 mb-8">
                  <div className="flex items-start space-x-3">
                    <MapPin size={16} className="text-stone-300 flex-shrink-0" />
                    <div className="leading-tight">
                      步行約 {selectedShop.distance?.walking || 0} 分鐘
                      <span className="text-stone-400 ml-1">· 機車約 {selectedShop.distance?.scooter || 0} 分鐘</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 w-full">
                    <Clock size={16} className="text-stone-300 flex-shrink-0 mt-0.5" />
                    <div className="leading-tight flex-1">
                      <div className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-3">營業時間</div>
                      
                      <div className="space-y-4 flex flex-col items-start w-full">
                        {(() => {
                          // 防呆機制：如果沒有正確的 open 陣列，直接顯示提示
                          if (!Array.isArray(selectedShop.open)) {
                            return <span className="text-stone-500 text-xs font-bold">請參考店家公告</span>;
                          }

                          // 1. 將相同營業時間的日子整理在一起 (Hash Map)
                          const groupedMap = {};
                          selectedShop.open.forEach((item) => {
                            if (!groupedMap[item.time]) groupedMap[item.time] = [];
                            groupedMap[item.time].push(item.day);
                          });

                          // 2. 轉回陣列渲染 (改為靠左對齊以適應手機小卡版面)
                          return Object.entries(groupedMap).map(([timeStr, daysArray], gIdx) => (
                            <div key={gIdx} className="flex flex-col items-start">
                              
                              {/* 第一行：星期 Icon (橫向並排、靠左排列) */}
                              <div className="flex gap-1.5 mb-1.5 flex-wrap">
                                {daysArray.map((day, dIdx) => (
                                  <div key={dIdx} className="w-6 h-6 flex items-center justify-center">
                                    <img 
                                      src={`/images/icons/day_${day}.png`}
                                      alt={day} 
                                      className="w-full h-full object-contain"
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentNode.innerHTML = `<span class="w-6 h-6 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[10px]">${day}</span>`;
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>

                              {/* 第二行：時間文字 或 公休 Icon */}
                              <div className="flex justify-start w-full">
                                {timeStr === '休息' ? (
                                  <div className="h-6 flex items-center">
                                    <img 
                                      src="/images/icons/closed_status.png" 
                                      alt="公休" 
                                      className="h-5 object-contain"
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentNode.innerHTML = `<span class="text-stone-500 font-bold tracking-widest text-xs bg-stone-200 px-2 py-0.5 rounded">公休</span>`;
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div className="text-xs font-bold tracking-widest text-stone-600">
                                    {timeStr.split('\n').map((line, i) => (
                                      <span key={i} className="block mt-0.5">{line}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('shopDetail')}
                  className="mt-auto w-full py-4 bg-[#1A1A1A] text-white text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center space-x-2 border-none cursor-pointer hover:bg-stone-800 transition-colors"
                >
                  <span>查看完整店家詳情</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ) : (
            /* --- 搜尋清單區 --- */
            <div className="flex-1 flex flex-col bg-white overflow-hidden pt-8">
              <div className="p-4 border-b border-stone-100 bg-white">
                 {/* 搜尋框 */}
                 <div className="flex items-center bg-stone-100/60 border border-stone-200 rounded-xl px-4 py-3 mb-3">
                   <Search size={16} className="text-stone-400 mr-3 flex-shrink-0" />
                   <input type="text" placeholder="搜尋蔬食..." className="flex-1 bg-transparent text-xs font-medium focus:outline-none border-none min-w-0" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                   {searchQuery && <X size={14} className="text-stone-400 cursor-pointer" onClick={() => setSearchQuery('')} />}
                 </div>
                 
                 {/* 🌟 雙重篩選欄位 */}
                 <div className="grid grid-cols-2 gap-2">
                   <div className="flex items-center border border-stone-200 rounded-lg px-2 py-2 text-[9px] font-bold">
                     <MapPin size={12} className="mr-1 text-stone-400 flex-shrink-0"/>
                     <select className="bg-transparent focus:outline-none w-full border-none cursor-pointer appearance-none" value={filterDist} onChange={(e) => setFilterDist(e.target.value)}>
                       <option value="all">不限距離</option>
                       <option value="walk-5">步行 5分內</option>
                       <option value="walk-10">步行 10分內</option>
                       <option value="walk-15">步行 15分內</option>
                       <option value="scoot-5">機車 5分內</option>
                       <option value="scoot-10">機車 10分內</option>
                     </select>
                   </div>
                   <div className="flex items-center border border-stone-200 rounded-lg px-2 py-2 text-[9px] font-bold">
                     <Filter size={12} className="mr-1 text-stone-400 flex-shrink-0"/>
                     <select className="bg-transparent focus:outline-none w-full border-none cursor-pointer appearance-none" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                       <option value="all">全部類別</option>
                       <option value="全素">全素 / 純素</option>
                       <option value="蛋奶素">蛋奶素</option>
                       <option value="五辛素">五辛素</option>
                     </select>
                   </div>
                 </div>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar">
                 {filteredShops.map((shop, idx) => (
                   <div key={shop.id} className="p-4 border-b border-stone-50 flex cursor-pointer hover:bg-stone-50 transition-colors animate-in fade-in"
                     style={{ animationDelay: `${idx * 40}ms` }}
                     onClick={() => { setSelectedShop(shop); setActiveDevice('phone'); }}>
                      <div className="flex-1 pr-3 flex flex-col justify-center min-w-0">
                        <h3 className="font-bold text-sm mb-1 truncate">{shop.name}</h3>
                        <div className="text-[10px] text-emerald-700 font-bold uppercase truncate tracking-wider">{shop.type}</div>
                      </div>
                      <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm border border-stone-100 flex-shrink-0">
                        <img src={shop.img} className="w-full h-full object-cover" alt={shop.name}/>
                      </div>
                   </div>
                 ))}
                 {filteredShops.length === 0 && (
                   <div className="p-10 text-center text-xs text-stone-400 font-bold uppercase tracking-widest leading-loose">
                     找不到符合條件的店家<br/>請試著調整篩選範圍
                   </div>
                 )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}