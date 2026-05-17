// src/views/ShopDetailView.jsx

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  MapPin, 
  Info, 
  ArrowRight, 
  X,
  CheckCircle2, 
  XCircle,
  Navigation
} from 'lucide-react';

import { WEEKDAY_ICONS } from '../data/Data';

export default function ShopDetailView({ shop, setActiveTab }) {
  const [selectedMenu, setSelectedMenu] = useState(null);
  
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!shop) {
      setActiveTab('shops');
    } else {
      window.scrollTo(0, 0);
    }
  }, [shop, setActiveTab]);

  useEffect(() => {
    if (selectedMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedMenu]);

  if (!shop) return null; 

  const handleWheel = (e) => {
    const zoomSensitivity = 0.002;
    const delta = -e.deltaY * zoomSensitivity;
    let newScale = scale + delta;
    
    newScale = Math.min(Math.max(0.3, newScale), 5);
    setScale(newScale);
  };

  const handleMouseDown = (e) => {
    if (e.button === 1) { 
      e.preventDefault(); 
      setIsDragging(true);
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    
    setPosition(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));
    
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e) => {
    if (e.button === 1) {
      setIsDragging(false);
    }
  };

  const getHighResImg = (url, size = '1200') => {
    return url ? url.replace('w=200', `w=${size}`).replace('w=800', `w=${size}`) : '';
  };

  const displayMainImg = getHighResImg(shop.menuImg, '1200') || 
                         getHighResImg(shop.img, '1200') || 
                         "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop";
  
  const extractedImgs = shop.recommendations?.map(dish => getHighResImg(dish.img, '800')).filter(Boolean) || [];
  const displayMealImgs = [
    extractedImgs[0] || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    extractedImgs[1] || extractedImgs[0] || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"
  ];

  const features = shop.features || {};

  const renderStatusIcon = (value) => {
    const isPositive = (val) => {
      if (!val) return false;
      const str = val.toString().toLowerCase();
      if (str.includes('不可') || str === '無' || str.includes('不外借') || str.includes('不提供')) return false;
      return true;
    };

    return isPositive(value) ? (
      <CheckCircle2 size={20} strokeWidth={2.5} className="text-emerald-600 flex-shrink-0" />
    ) : (
      <XCircle size={20} strokeWidth={2.5} className="text-rose-500 flex-shrink-0" />
    );
  };

  return (
    <div className="py-12 px-36 max-w-6xl mx-auto min-h-screen animate-in fade-in duration-1000">
      
      {/* 頂部：返回按鈕 */}
      <button 
        onClick={() => setActiveTab('shops')} 
        className="flex items-center text-xs font-bold tracking-[0.2em] text-stone-400 hover:text-[#1A1A1A] uppercase mb-10 transition-colors group cursor-pointer"
      >
        <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" /> 返回列表
      </button>

      {/* 標題與簡介 */}
      <div className="mb-12 border-b border-stone-200 pb-8">
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.15em] text-[#1A1A1A] mb-6">{shop.name}</h1>
        
        <div className="flex flex-wrap items-center text-[10px] md:text-xs font-bold tracking-[0.1em] text-stone-500 gap-3">
          <span className="px-3 py-1 border border-[#1A1A1A] text-[#1A1A1A] uppercase mr-2">{shop.type || '素食'}</span>
          
          {shop.distance && (
            <>
              <span className="bg-stone-200/60 text-stone-600 px-2.5 py-1 rounded-md">步行 {shop.distance.walking} 分</span>
              <span className="bg-stone-200/60 text-stone-600 px-2.5 py-1 rounded-md">單車 {shop.distance.bicycle} 分</span>
              <span className="bg-stone-200/60 text-stone-600 px-2.5 py-1 rounded-md">機車 {shop.distance.scooter} 分</span>
              {shop.distance.transit < 99 && (
                <span className="bg-stone-200/60 text-stone-600 px-2.5 py-1 rounded-md">公車 {shop.distance.transit} 分</span>
              )}
            </>
          )}
        </div>
      </div>

      {/* 圖片展示區 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 md:h-[480px]"> 
        <div 
          onClick={() => shop.menuImg && setSelectedMenu(shop.menuImg)}
          className={`md:col-span-2 relative h-[300px] md:h-full rounded-xl overflow-hidden shadow-sm bg-stone-200 ${shop.menuImg ? 'cursor-pointer group/menu' : ''}`}
        >
          <img 
            src={displayMainImg} 
            alt="主視覺" 
            className="w-full h-full object-cover object-left-top group-hover/menu:scale-105 transition-transform duration-[1500ms]" 
          />
          <span className="absolute top-4 left-4 bg-[#1A1A1A]/80 backdrop-blur text-white text-[10px] px-3 py-1.5 tracking-widest font-bold uppercase shadow-sm pointer-events-none">
            {shop.menuImg ? '精選菜單' : '店家視覺'}
          </span>
          {shop.menuImg && (
            <div className="absolute bottom-4 right-4 bg-[#1A1A1A]/80 backdrop-blur text-white text-[10px] px-4 py-2 flex items-center tracking-widest font-bold uppercase shadow-sm opacity-80 group-hover/menu:opacity-100 transition-opacity">
              <span>點擊查看完整菜單</span>
              <ArrowRight size={12} className="ml-2 group-hover/menu:translate-x-1 transition-transform" />
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-6 md:h-full">
          {displayMealImgs.map((imgUrl, i) => (
            <div key={i} className="relative h-[150px] md:h-full rounded-xl overflow-hidden shadow-sm bg-stone-200">
              <img src={imgUrl} alt="特色" className="w-full h-full object-cover object-left-top hover:scale-105 transition-transform duration-[1500ms]" />
            </div>
          ))}
        </div>
      </div>

      {/* 資訊內容區 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* 左側：詳細資訊清單 */}
        <div className="lg:col-span-1 space-y-12">
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-6 flex items-center border-b border-stone-200 pb-3">
               <Info size={16} className="mr-2"/> 詳細資訊
            </h3>
            <ul className="space-y-4 text-sm text-[#1A1A1A] tracking-widest font-medium">
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">素食類別</span> <span>{shop.type || '--'}</span></li>
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">價位區間</span> <span>{shop.priceRange || '--'}</span></li>
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">聯絡電話</span> <span>{shop.phone || '--'}</span></li>
              
              <li className="flex justify-between items-start border-b border-stone-100 pb-3 pt-2">
                <span className="text-stone-500 whitespace-nowrap mr-4 pt-1.5">營業時間</span>
                <div className="space-y-6 flex flex-col items-end">
                  {(() => {
                    const groupedMap = {};
                    shop.open?.forEach((item) => {
                      if (!groupedMap[item.time]) {
                        groupedMap[item.time] = [];
                      }
                      groupedMap[item.time].push(item.day);
                    });

                    return Object.entries(groupedMap).map(([timeStr, daysArray], gIdx) => {
                      let rows = [daysArray];
                      if (daysArray.length === 6) {
                        rows = [daysArray.slice(0, 3), daysArray.slice(3, 6)];
                      } else if (daysArray.length === 7) {
                        rows = [daysArray.slice(0, 3), daysArray.slice(3, 7)];
                      } else if (daysArray.length > 5) {
                        const mid = Math.ceil(daysArray.length / 2);
                        rows = [daysArray.slice(0, mid), daysArray.slice(mid)];
                      }

                      return (
                        <div key={gIdx} className="flex flex-col items-end">
                          <div className="flex flex-col gap-2 mb-2 items-end">
                            {rows.map((row, rIdx) => (
                              <div key={rIdx} className="flex gap-2 justify-end">
                                {row.map((day, dIdx) => (
                                  <div key={dIdx} className="w-8 h-8 flex items-center justify-center">
                                    <img 
                                      src={WEEKDAY_ICONS[day]} 
                                      alt={day} 
                                      className="w-full h-full object-contain"
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentNode.innerHTML = `<span class="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[11px]">${day}</span>`;
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-end w-full">
                            {timeStr === '休息' ? (
                              <div className="h-8 flex items-center justify-end">
                                <img 
                                  src="/images/icons/closed_status.png" 
                                  alt="公休" 
                                  className="h-6 object-contain"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.parentNode.innerHTML = `<span class="text-stone-500 font-bold tracking-widest text-sm bg-stone-200 px-2 py-1 rounded">公休</span>`;
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="text-sm font-bold tracking-widest text-stone-600 text-right">
                                {timeStr.split('\n').map((line, i) => (
                                  <span key={i} className="block">{line}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 🌟 右側：店家特色說明 (2x2 非對稱網格佈局) */}
        <div className="lg:col-span-2 flex flex-col justify-start">
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-6 flex items-center border-b border-stone-200 pb-3">
               <MapPin size={16} className="mr-2"/> 店家特色說明
            </h3>
            
            {/* 🌟 切分為 4 等分，左側佔 3 (75%)，右側佔 1 (25%) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              
              {/* 第一行第一列 (75%)：份量 */}
              {features.portion && (
                <div className="sm:col-span-2 bg-white p-6 border border-stone-200 shadow-sm rounded-xl hover:shadow-md transition-shadow flex flex-col justify-center">
                  <h4 className="text-[14px] font-black tracking-widest text-[#1A1A1A] mb-1 uppercase">份量</h4>
                  <p className="text-sm text-stone-500 leading-loose font-medium">{features.portion}</p>
                </div>
              )}

              {/* 第一行第二列 (25%)：付款方式 */}
              {features.payment && (
                <div className="sm:col-span-1 bg-white p-6 border border-stone-200 shadow-sm rounded-xl hover:shadow-md transition-shadow flex flex-col justify-center">
                  <h4 className="text-[14px] font-black tracking-widest text-[#1A1A1A] mb-1 uppercase">付款方式</h4>
                  <p className="text-sm text-stone-500 leading-loose font-medium">{features.payment}</p>
                </div>
              )}

              {/* 第二行第一列 (75%)：環境 */}
              {features.environment && (
                <div className="sm:col-span-2 bg-white p-6 border border-stone-200 shadow-sm rounded-xl hover:shadow-md transition-shadow flex flex-col justify-center">
                  <h4 className="text-[14px] font-black tracking-widest text-[#1A1A1A] mb-1 uppercase">環境</h4>
                  <p className="text-sm text-stone-500 leading-loose font-medium">{features.environment}</p>
                </div>
              )}

              {/* 第二行第二列 (25%)：訂位與洗手間 (同一個膠囊) */}
              {(features.reservation || features.restroom) && (
                <div className="sm:col-span-1 bg-white p-6 border border-stone-200 shadow-sm rounded-xl hover:shadow-md transition-shadow flex flex-col justify-center gap-3">
                  {features.reservation && (
                    <div className="flex items-center justify-between w-full">
                      <h4 className="text-[14px] font-black tracking-widest text-[#1A1A1A] uppercase m-0">訂位</h4>
                      {renderStatusIcon(features.reservation)}
                    </div>
                  )}
                  {features.restroom && (
                    <div className="flex items-center justify-between w-full">
                      <h4 className="text-[14px] font-black tracking-widest text-[#1A1A1A] uppercase m-0">洗手間</h4>
                      {renderStatusIcon(features.restroom)}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* 底部：跳轉地圖按鈕 */}
          <button
            onClick={() => setActiveTab('map')}
            className="w-full mt-6 py-4 text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center space-x-2 bg-[#1A1A1A] hover:bg-stone-700 cursor-pointer rounded-xl shadow-md"
          >
            <span>前往地圖查看路線</span>
            <Navigation size={14} />
          </button>
        </div>
      </div>

      {/* 線上菜單放大燈箱 */}
      {selectedMenu && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1A1A1A]/95 backdrop-blur-sm p-4 md:p-10 animate-in fade-in duration-300 select-none" 
          onClick={() => setSelectedMenu(null)}
          onWheel={handleWheel} 
        >
          <div 
            className="relative max-w-5xl w-full max-h-[85vh] md:max-h-[90vh] flex flex-col" 
            onClick={e => e.stopPropagation()}
          >
            <div className="w-full flex justify-start items-end mb-3 text-stone-300 px-1 pointer-events-none">
              <div className="flex flex-col">
                <span className="text-[9px] md:text-xs tracking-[0.2em] font-bold uppercase opacity-60 mb-1">Menu Viewer</span>
                <span className="text-[10px] md:text-xs tracking-widest font-bold text-white">
                  滾輪縮放圖片 / 按住滑鼠中鍵拖曳
                </span>
              </div>
            </div>

            <div 
              className="relative flex-1 bg-[#F6F6F4] shadow-2xl border border-stone-800 overflow-hidden flex flex-col"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              
              <button 
                onClick={() => setSelectedMenu(null)} 
                className="absolute top-4 right-4 z-50 group flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-[#1A1A1A]/80 hover:bg-[#1A1A1A] backdrop-blur-md rounded-full transition-all duration-300 cursor-pointer shadow-lg border border-white/10"
              >
                <X size={20} className="text-white group-hover:rotate-90 transition-transform" />
              </button>

              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              >
                <img 
                  src={selectedMenu} 
                  alt="線上完整菜單" 
                  draggable="false"
                  className="max-w-full max-h-full object-contain transition-transform duration-75 ease-out origin-center pointer-events-none"
                  style={{ 
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})` 
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}