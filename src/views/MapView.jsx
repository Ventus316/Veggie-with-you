// src/views/MapView.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Star, Clock, Search, MapPin, X, ArrowRight, Navigation } from 'lucide-react';
// 🌟 1. 引入共用 Hook
import useShopFilters from '../hooks/useShopFilters';
import GoogleMapComponent from '../components/ui/GoogleMapComponent_map';

const STAGE_CONFIG = {
  perspective: '1200px',
  transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
  phoneActive: {
    phone:  { x: '-100%', y: '0%', z: '150px', rotateY: '0deg', rotateX: '3deg', scale: 1, zIndex: 50 },
    tablet: { x: '23%',  y: '0%', z: '-120px', rotateY: '-10deg', rotateX: '5deg', scale: 1, zIndex: 10 }
  },
  tabletActive: {
    // 確保地圖平貼於螢幕，防止觸控偏移
    tablet: { x: '15%',   y: '0%', z: '0px', rotateY: '0deg', rotateX: '0deg', scale: 1.1, zIndex: 50 },
    phone:  { x: '-170%', y: '5%', z: '-300px', rotateY: '25deg', rotateX: '0deg', scale: 1, zIndex: 10 }
  }
};

export default function MapView({ selectedShop, setSelectedShop, setActiveTab }) {
  const [activeDevice, setActiveDevice] = useState(selectedShop ? 'phone' : 'tablet');
  const [mapActiveShop, setMapActiveShop] = useState(null);

  // 🌟 2. 使用 Hook 取得過濾後的乾淨資料，完全移除本地的 useMemo 與 filterType
  const { 
    filterTransport, setFilterTransport, 
    filterTime, setFilterTime, 
    searchQuery, setSearchQuery,
    filteredShops 
  } = useShopFilters(selectedShop);

  useEffect(() => {
    if (selectedShop) {
      const timer = setTimeout(() => {
        setMapActiveShop(selectedShop);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      setMapActiveShop(null);
    }
  }, [selectedShop]);

  const currentPos = activeDevice === 'phone' ? STAGE_CONFIG.phoneActive : STAGE_CONFIG.tabletActive;
  const getTransform = (device) => {
    const { x, y, z, rotateY, rotateX, scale } = currentPos[device];
    return `translate3d(${x}, ${y}, ${z}) rotateY(${rotateY}) rotateX(${rotateX}) scale(${scale})`;
  };

  return (
    <div className="relative w-full h-screen bg-[#E5E3DF] overflow-hidden flex items-center justify-center animate-in fade-in duration-700" style={{ perspective: STAGE_CONFIG.perspective }}>
      
      {/* ==================== 平板外框 ==================== */}
      <div 
        className="absolute w-[900px] max-w-[92vw] h-[600px] max-h-[75vh] bg-[#1A1A1A] rounded-[2rem] border-[10px] border-[#1A1A1A] shadow-2xl flex flex-col"
        style={{ 
          transform: getTransform('tablet'), 
          transition: STAGE_CONFIG.transition, 
          zIndex: currentPos.tablet.zIndex, 
          transformStyle: 'preserve-3d',
          cursor: activeDevice !== 'tablet' ? 'pointer' : 'default' 
        }}
        onClickCapture={(e) => { 
          if (activeDevice !== 'tablet') {
            e.stopPropagation();
            setActiveDevice('tablet'); 
          }
        }}
      >
        <div className={`flex-1 relative bg-[#E8EAED] rounded-[1.5rem] overflow-hidden ${activeDevice !== 'tablet' ? 'pointer-events-none' : ''}`}>
          <GoogleMapComponent 
            shops={filteredShops} 
            selectedShop={mapActiveShop} 
            onMarkerClick={(shop) => { setSelectedShop(shop); setActiveDevice('tablet'); }}
            onMapClick={() => { setActiveDevice('tablet'); }}
          />
        </div>
      </div>

      {/* ==================== 手機外框 ==================== */}
      <div 
        className="absolute w-[320px] h-[650px] max-h-[85vh] bg-[#1A1A1A] rounded-[2.5rem] border-[12px] border-[#1A1A1A] shadow-2xl flex flex-col"
        style={{ 
          transform: getTransform('phone'), 
          transition: STAGE_CONFIG.transition, 
          zIndex: currentPos.phone.zIndex, 
          transformStyle: 'preserve-3d',
          cursor: activeDevice !== 'phone' ? 'pointer' : 'default' 
        }}
        onClickCapture={(e) => { 
          if (activeDevice !== 'phone') {
            e.stopPropagation();
            setActiveDevice('phone'); 
          }
        }}
      >
        <div className={`flex-1 relative bg-white rounded-[1.8rem] overflow-hidden flex flex-col ${activeDevice !== 'phone' ? 'pointer-events-none' : ''}`}>
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
                          if (!Array.isArray(selectedShop.open)) {
                            return <span className="text-stone-500 text-xs font-bold">請參考店家公告</span>;
                          }

                          const groupedMap = {};
                          selectedShop.open.forEach((item) => {
                            if (!groupedMap[item.time]) groupedMap[item.time] = [];
                            groupedMap[item.time].push(item.day);
                          });

                          return Object.entries(groupedMap).map(([timeStr, daysArray], gIdx) => (
                            <div key={gIdx} className="flex flex-col items-start">
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
                   <input type="text" placeholder="搜尋店名..." className="flex-1 bg-transparent text-xs font-medium focus:outline-none border-none min-w-0" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                   {searchQuery && <X size={14} className="text-stone-400 cursor-pointer" onClick={() => setSearchQuery('')} />}
                 </div>
                 
                 {/* 🌟 3. 只保留交通與時間篩選，並將它們並排 */}
                 <div className="grid grid-cols-2 gap-2">
                   <div className="flex items-center border border-stone-200 rounded-lg px-2 py-2 text-[9px] font-bold">
                     <Navigation size={12} className="mr-1 text-stone-400 flex-shrink-0"/>
                     <select className="bg-transparent focus:outline-none w-full border-none cursor-pointer appearance-none" value={filterTransport} onChange={(e) => setFilterTransport(e.target.value)}>
                       <option value="walking">步行</option>
                       <option value="bicycle">腳踏車</option>
                       <option value="scooter">機車</option>
                       <option value="transit">大眾運輸</option>
                     </select>
                   </div>
                   <div className="flex items-center border border-stone-200 rounded-lg px-2 py-2 text-[9px] font-bold">
                     <Clock size={12} className="mr-1 text-stone-400 flex-shrink-0"/>
                     <select className="bg-transparent focus:outline-none w-full border-none cursor-pointer appearance-none" value={filterTime} onChange={(e) => setFilterTime(e.target.value)}>
                       <option value="all">不限時間</option>
                       <option value="5">5 分鐘內</option>
                       <option value="10">10 分鐘內</option>
                       <option value="15">15 分鐘內</option>
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