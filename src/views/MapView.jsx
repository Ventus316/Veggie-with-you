// src/views/MapView.jsx

import React, { useState, useEffect } from 'react';
import { ChevronLeft, Star, Clock, Search, MapPin, X, ArrowRight } from 'lucide-react';

import { SORT_ICONS } from '../data/Data';
import { getRealTimeStatus } from '../utils/getRealTimeStatus';
import useShopFilters from '../hooks/useShopFilters';
import useNavigationMemory from '../hooks/useNavigationMemory';

import GoogleMapComponent from '../components/ui/GoogleMapComponent_map';


const TRANSPORT_LABELS = { walking: '步行', bicycle: '腳踏車', scooter: '機車', transit: '大眾運輸' };

const STAGE_CONFIG = {
  perspective: '1200px',
  transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)',
  phoneActive: {
    phone:  { x: '-100%', y: '0%', z: '150px', rotateY: '0deg', rotateX: '3deg', scale: 1, zIndex: 50 },
    tablet: { x: '23%',  y: '0%', z: '-120px', rotateY: '-10deg', rotateX: '5deg', scale: 1, zIndex: 10 }
  },
  tabletActive: {
    tablet: { x: '15%',   y: '0%', z: '0px', rotateY: '0deg', rotateX: '0deg', scale: 1.1, zIndex: 50 },
    phone:  { x: '-170%', y: '5%', z: '-300px', rotateY: '25deg', rotateX: '0deg', scale: 1, zIndex: 10 }
  }
};


export default function MapView({ userLocation, shopsData, activeTab, selectedShop, setSelectedShop, setActiveTab }) {
  const [activeDevice, setActiveDevice] = useState(selectedShop ? 'phone' : 'tablet');
  const [mapActiveShop, setMapActiveShop] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const { navigateTo } = useNavigationMemory(activeTab, setActiveTab);
  
  // 🎯 合併篩選器的呼叫，刪除重複宣告的
  const { 
    filterTransport, setFilterTransport, 
    filterTime, setFilterTime, 
    searchQuery, setSearchQuery,
    filteredShops 
  } = useShopFilters(shopsData, selectedShop);

  // 🎯 在函式宣告完之後，才執行 finalShops 的資料過濾
  const finalShops = filteredShops.filter(shop => {
    if (filterStatus === 'all') return true;
    const status = getRealTimeStatus(shop.open);
    return filterStatus === 'open' ? status.isOpen : !status.isOpen;
  });

  // 👇 地圖與裝置邏輯
  useEffect(() => {
    if (selectedShop) {
      const timer = setTimeout(() => { setMapActiveShop(selectedShop); }, 150);
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

  const handleStatusToggle = (e) => {
    e.stopPropagation();
    if (filterStatus === 'all') setFilterStatus('open');
    else if (filterStatus === 'open') setFilterStatus('closed');
    else setFilterStatus('all');
  };

  const getStatusBtnConfig = () => {
    const baseStyle = 'bg-stone-800 text-white border-stone-800 shadow-sm';
    if (filterStatus === 'open') return { label: '營業', dot: 'bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.8)]', style: baseStyle };
    if (filterStatus === 'closed') return { label: '公休', dot: 'bg-rose-500', style: baseStyle };
    return { label: '全部', dot: 'bg-stone-300', style: baseStyle };
  };
  const statusConfig = getStatusBtnConfig();

  return (
    <div className="relative w-full h-screen bg-[#E5E3DF] overflow-hidden flex items-center justify-center animate-in fade-in duration-700" style={{ perspective: STAGE_CONFIG.perspective }}>
      
      <div 
        className="absolute w-225 max-w-[92vw] h-150 max-h-[75vh] bg-[#1A1A1A] rounded-4xl border-10 border-[#1A1A1A] shadow-2xl flex flex-col"
        style={{ transform: getTransform('tablet'), transition: STAGE_CONFIG.transition, zIndex: currentPos.tablet.zIndex, transformStyle: 'preserve-3d', cursor: activeDevice !== 'tablet' ? 'pointer' : 'default' }}
        onClickCapture={(e) => { if (activeDevice !== 'tablet') { e.stopPropagation(); setActiveDevice('tablet'); } }}
      >
        <div className={`flex-1 relative bg-[#E8EAED] rounded-3xl overflow-hidden ${activeDevice !== 'tablet' ? 'pointer-events-none' : ''}`}>
          <GoogleMapComponent 
            shops={finalShops}
            selectedShop={mapActiveShop} 
            userLocation={userLocation} // 🌟 新增這行：把座標傳給真正的地圖元件
            filterTransport={filterTransport}
            onMarkerClick={(shop) => { setSelectedShop(shop); setActiveDevice('tablet'); }}
            onMapClick={() => { setActiveDevice('tablet'); }}
          />
        </div>
      </div>

      <div 
        className="absolute w-[320px] h-162.5 max-h-[85vh] bg-[#1A1A1A] rounded-[2.5rem] border-12 border-[#1A1A1A] shadow-2xl flex flex-col"
        style={{ transform: getTransform('phone'), transition: STAGE_CONFIG.transition, zIndex: currentPos.phone.zIndex, transformStyle: 'preserve-3d', cursor: activeDevice !== 'phone' ? 'pointer' : 'default' }}
        onClickCapture={(e) => { if (activeDevice !== 'phone') { e.stopPropagation(); setActiveDevice('phone'); } }}
      >
        <div className={`flex-1 relative bg-white rounded-[1.8rem] overflow-hidden flex flex-col ${activeDevice !== 'phone' ? 'pointer-events-none' : ''}`}>
          {selectedShop ? (
            <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar animate-in fade-in duration-300">
              <div className="relative w-full h-52 shrink-0">
                <img src={selectedShop.img} className="w-full h-full object-cover" alt={selectedShop.name}/>
                <button onClick={() => setSelectedShop(null)} className="absolute top-8 left-4 w-10 h-10 bg-[#1A1A1A]/80 backdrop-blur rounded-full flex items-center justify-center text-white z-50 border-none cursor-pointer shadow-lg hover:bg-black">
                  <ChevronLeft size={22} strokeWidth={2.5} />
                </button>
              </div>

              <div className="p-5 flex-1 bg-white rounded-t-3xl -mt-6 relative z-10 flex flex-col">
                <h2 className="text-xl font-black text-[#1A1A1A] mb-1">{selectedShop.name}</h2>
                <div className="flex items-center text-[11px] mb-4">
                  <span className="font-bold mr-1">{selectedShop.rating}</span>
                  <div className="flex text-amber-500 mr-2">{[...Array(5)].map((_,i) => <Star key={i} size={12} fill="currentColor"/>)}</div>
                  <span className="text-stone-400">({selectedShop.reviews})</span>
                </div>
                
                <div className="space-y-4 text-xs text-stone-700 border-t border-stone-100 pt-5 mb-8">
                  <div className="flex items-start space-x-3">
                    <MapPin size={16} className="text-stone-300 shrink-0" />
                    <div className="leading-tight">
                      步行 {selectedShop.distance?.walking || 0} 分鐘
                      <span className="text-stone-400 ml-1">· 機車 {selectedShop.distance?.scooter || 0} 分鐘</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 w-full">
                    <Clock size={16} className="text-stone-300 shrink-0 mt-0.5" />
                    <div className="leading-tight flex-1">
                      <div className="text-emerald-600 font-bold uppercase tracking-widest text-xs mb-3">營業時間</div>
                      
                      <div className="space-y-4 flex flex-col items-start w-full">
                        {(() => {
                          if (!Array.isArray(selectedShop.open)) return <span className="text-stone-500 text-xs font-bold">請參考店家公告</span>;
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
                                      src={`/images/icons/day_${day}.png`} alt={day} className="w-full h-full object-contain"
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
                                      src="/images/icons/closed_status.png" alt="公休" className="h-5 object-contain"
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

                {/* 🌟 4. 把原來的 setActiveTab('shopDetail') 換成 navigateTo */}
                <button 
                  onClick={() => navigateTo('shopDetail')}
                  className="mt-auto w-full py-4 bg-[#1A1A1A] text-white text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center space-x-2 border-none cursor-pointer hover:bg-stone-800 transition-colors"
                >
                  <span>查看完整店家詳情</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col bg-white overflow-hidden pt-8">
              
              <div className="py-2 px-4 border-b border-stone-100 bg-white">
                 
                 <div className="flex items-center bg-stone-100/60 border border-stone-200 rounded-xl px-4 py-3 mb-4">
                   <Search size={16} className="text-stone-400 mr-3 shrink-0" />
                   <input type="text" placeholder="搜尋店名..." className="flex-1 bg-transparent text-xs font-medium focus:outline-none border-none min-w-0" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                   {searchQuery && <X size={10} className="text-stone-400 cursor-pointer" onClick={() => setSearchQuery('')} />}
                 </div>
                 
                <div className="space-y-3 w-full overflow-hidden">
                  
                  <div className="flex gap-2 overflow-x-auto no-scrollbar items-center">
                    {['walking', 'bicycle', 'scooter'].map(id => (
                      <button
                        key={id}
                        onClick={(e) => { e.stopPropagation(); setFilterTransport(id); }}
                        className={`shrink-0 flex items-center px-2 py-2 rounded-lg text-[10px] font-bold border transition-colors ${
                          filterTransport === id ? 'bg-stone-800 text-white border-stone-800 shadow-sm' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <img 
                          src={SORT_ICONS[id]} alt={id}
                          className={`w-3.5 h-3.5 mr-1.5 object-contain ${filterTransport === id ? 'filter brightness-0 invert' : 'filter brightness-50 contrast-125'}`} 
                        />
                        {TRANSPORT_LABELS[id]}
                      </button>
                    ))}

                    <button
                      onClick={handleStatusToggle}
                      className={`shrink-0 flex items-center px-2 py-2 rounded-lg text-[10px] font-bold border transition-all duration-300 ${statusConfig.style}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 transition-colors duration-300 ${statusConfig.dot}`} />
                      {statusConfig.label}
                    </button>
                  </div>

                  <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {[ { id: 'all', label: '不限' }, { id: '5', label: '5 分' }, { id: '10', label: '10 分' }, { id: '15', label: '15 分' } ].map(opt => (
                      <button
                        key={opt.id}
                        onClick={(e) => { e.stopPropagation(); setFilterTime(opt.id); }}
                        className={`shrink-0 flex items-center px-2 py-2 rounded-lg text-[10px] font-bold border transition-colors ${
                          filterTime === opt.id ? 'bg-stone-800 text-white border-stone-800 shadow-sm' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <Clock size={12} className={`mr-1.5 ${filterTime === opt.id ? 'text-white' : 'text-stone-400'}`} />
                        {opt.label}
                      </button>
                    ))}
                  </div>

                </div>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar">
                 {finalShops.map((shop, idx) => (
                   <div key={shop.id} className="p-4 border-b border-stone-50 flex cursor-pointer hover:bg-stone-50 transition-colors animate-in fade-in"
                     style={{ animationDelay: `${idx * 40}ms` }}
                     onClick={() => { setSelectedShop(shop); setActiveDevice('phone'); }}>
                      <div className="flex-1 pr-3 flex flex-col justify-center min-w-0">
                        <h3 className="font-bold text-sm mb-1 truncate">{shop.name}</h3>
                          <div className="text-[10px] uppercase truncate tracking-wider flex items-center space-x-2 mt-1">
                            {(() => {
                              const status = getRealTimeStatus(shop.open);
                              return (
                                <>
                                  {/* 🌟 替換為您的圓角膠囊樣式 */}
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest bg-stone-200 text-[#1A1A1A]">
                                    {status.text}
                                  </span>
                                  <span className="text-stone-500 font-medium">{shop.type}</span>
                                </>
                              );
                            })()}
                          </div>
                      </div>
                      <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm border border-stone-100 shrink-0">
                        <img src={shop.img} className="w-full h-full object-cover" alt={shop.name}/>
                      </div>
                   </div>
                 ))}
                 {finalShops.length === 0 && (
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