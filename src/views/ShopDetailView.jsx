// src/views/ShopDetailView.jsx

import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  MapPin, 
  Star, 
  Info, 
  ArrowRight, 
  Utensils, 
  X 
} from 'lucide-react';

import { WEEKDAY_ICONS } from '../data/Data';

export default function ShopDetailView({ shop, setActiveTab }) {
  const [selectedMenu, setSelectedMenu] = useState(null);
  
  // 🌟 縮放與拖拽的進階狀態
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // 1. 處理頁面跳轉置頂
  useEffect(() => {
    if (!shop) {
      setActiveTab('shops');
    } else {
      window.scrollTo(0, 0);
    }
  }, [shop, setActiveTab]);

  // 2. 處理背景捲動鎖定與重置
  useEffect(() => {
    if (selectedMenu) {
      // 開啟燈箱時禁止底層捲動
      document.body.style.overflow = 'hidden';
    } else {
      // 關閉時恢復捲動並重置縮放與位移
      document.body.style.overflow = 'unset';
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
    // 元件卸載時也要確保恢復捲動
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedMenu]);

  if (!shop) return null; 

  // 🌟 滾輪縮放邏輯
  const handleWheel = (e) => {
    // 雖然外層已經 overflow: hidden，加上 preventDefault 可以避免其他預設滾動行為
    // 注意：React 中 onWheel 可能無法直接 e.preventDefault()，但因為我們已經鎖了 body overflow，所以不會有背景滾動問題
    const zoomSensitivity = 0.002;
    const delta = -e.deltaY * zoomSensitivity;
    let newScale = scale + delta;
    
    // 允許縮小到 0.3 倍（看超長菜單很有用），最大放大到 5 倍
    newScale = Math.min(Math.max(0.3, newScale), 5);
    setScale(newScale);
  };

  // 🌟 滑鼠中鍵拖拽邏輯
  const handleMouseDown = (e) => {
    if (e.button === 1) { // 1 代表滑鼠中鍵
      e.preventDefault(); // 防止中鍵點擊出現原生捲動游標
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
  const recommendations = shop.recommendations || [];
  const distanceText = shop.distance 
    ? `步行 ${shop.distance.walking} 分 / 機車 ${shop.distance.scooter} 分`
    : '-- 分鐘';

  const featureLabels = {
    portion: '份量',
    environment: '環境',
    restroom: '洗手間',
    payment: '付款方式',
    reservation: '訂位規則',
    aesthetics: '餐點美觀'
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
        <div className="flex flex-wrap items-center text-xs font-bold tracking-[0.1em] text-stone-500 gap-6">
          <span className="px-3 py-1 border border-[#1A1A1A] text-[#1A1A1A] uppercase">{shop.type || '素食'}</span>
          <span className="flex items-center"><MapPin size={14} className="mr-1.5"/> {distanceText}</span>
          <span className="flex items-center"><Star size={14} className="mr-1.5 text-[#1A1A1A]" fill="currentColor"/> {shop.rating || '4.0'} ({shop.reviews || '0'})</span>
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
                      
                      // 🌟 新增分行邏輯：超過 5 個就拆分成兩行
                      let rows = [daysArray];
                      if (daysArray.length === 6) {
                        rows = [daysArray.slice(0, 3), daysArray.slice(3, 6)]; // 3 + 3
                      } else if (daysArray.length === 7) {
                        rows = [daysArray.slice(0, 3), daysArray.slice(3, 7)]; // 3 + 4
                      } else if (daysArray.length > 5) {
                        // 備用防呆：超過 5 個的一律均分兩行
                        const mid = Math.ceil(daysArray.length / 2);
                        rows = [daysArray.slice(0, mid), daysArray.slice(mid)];
                      }

                      return (
                        <div key={gIdx} className="flex flex-col items-end">
                          
                          {/* 🌟 透過 map 將切好的 rows 渲染成多行，並用 flex-col gap-2 產生垂直間距 */}
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

          <button
            onClick={() => shop.menuImg && setSelectedMenu(shop.menuImg)}
            disabled={!shop.menuImg}
            className={`w-full py-4 text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center space-x-2 ${
              shop.menuImg ? 'bg-[#1A1A1A] hover:bg-stone-700 cursor-pointer' : 'bg-stone-300 cursor-not-allowed'
            }`}
          >
            <span>{shop.menuImg ? '查看線上菜單' : '暫無線上菜單'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 右側：店家特色說明 & 推薦餐點 */}
        <div className="lg:col-span-2 space-y-16">
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-6 flex items-center border-b border-stone-200 pb-3">
               <Star size={16} className="mr-2"/> 店家特色說明
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
               {Object.entries(features).map(([key, value]) => (
                  value ? (
                    <div key={key} className="bg-white p-6 border border-stone-200 shadow-sm rounded-xl hover:shadow-md transition-shadow">
                      <h4 className="text-[10px] font-black tracking-widest text-[#1A1A1A] mb-3 uppercase">
                        {featureLabels[key] || key}
                      </h4>
                      <p className="text-sm text-stone-500 leading-loose font-medium">{value}</p>
                    </div>
                  ) : null
               ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-6 flex items-center border-b border-stone-200 pb-3">
               <Utensils size={16} className="mr-2"/> 推薦餐點資訊
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {recommendations.map((dish, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 bg-white border border-stone-200 shadow-sm rounded-xl hover:border-[#1A1A1A] transition-all">
                     <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-stone-200">
                        {dish.img && <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" />}
                     </div>
                     <div className="flex flex-col justify-center">
                        <span className="text-sm font-bold text-[#1A1A1A] tracking-[0.15em] mb-2">{dish.name}</span>
                        <span className="text-xs font-bold text-stone-400 tracking-wider">NT$ {dish.price || '--'}</span>
                     </div>
                  </div>
               ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 終極版：線上菜單放大燈箱 */}
      {selectedMenu && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1A1A1A]/95 backdrop-blur-sm p-4 md:p-10 animate-in fade-in duration-300 select-none" 
          onClick={() => setSelectedMenu(null)}
          onWheel={handleWheel} // 監聽全區滾輪
        >
          <div 
            className="relative max-w-5xl w-full max-h-[85vh] md:max-h-[90vh] flex flex-col" 
            onClick={e => e.stopPropagation()}
          >
            {/* 提示資訊列 */}
            <div className="w-full flex justify-start items-end mb-3 text-stone-300 px-1 pointer-events-none">
              <div className="flex flex-col">
                <span className="text-[9px] md:text-xs tracking-[0.2em] font-bold uppercase opacity-60 mb-1">Menu Viewer</span>
                <span className="text-[10px] md:text-xs tracking-widest font-bold text-white">
                  滾輪縮放圖片 / 按住滑鼠中鍵拖曳
                </span>
              </div>
            </div>

            {/* 互動區塊 (接收中鍵拖拽事件) */}
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

              {/* 圖片容器：使用 max-w-full 與 max-h-full 確保最上方與最下方在 1 倍時能完整顯示 */}
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              >
                <img 
                  src={selectedMenu} 
                  alt="線上完整菜單" 
                  draggable="false" // 禁用原生拖拽，避免干擾我們自己寫的拖曳邏輯
                  className="max-w-full max-h-full object-contain transition-transform duration-75 ease-out origin-center pointer-events-none"
                  style={{ 
                    // 🌟 完全交由 transform 來放大縮小，不會破壞 object-contain 的比例限制
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