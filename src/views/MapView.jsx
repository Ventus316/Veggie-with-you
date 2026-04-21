// src/views/MapView.jsx

import React, { useState } from 'react';
import { ChevronLeft, X, Star, Utensils, MapPin, Clock, Search } from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';

// ==========================================
// 🌟 3D 舞台參數微調區 (可自行隨意更改！)
// ==========================================
const STAGE_CONFIG = {
  perspective: '3500px', // 攝影機景深 (數字越小，3D 變形越誇張；越大越平緩)
  transition: 'transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)', // 動畫的平滑度與速度
  
  // 狀態 A：手機在前方 (預設)
  phoneActive: {
    phone:  { x: '-70%', y: '0%', z: '100px', rotateY: '5deg', rotateX: '2deg', scale: 1, zIndex: 50 },
    tablet: { x: '15%',  y: '0%', z: '-150px', rotateY: '-10deg', rotateX: '5deg', scale: 0.9, zIndex: 10 }
  },
  
  // 狀態 B：平板在前方
  tabletActive: {
    tablet: { x: '5%',   y: '0%', z: '100px', rotateY: '-2deg', rotateX: '2deg', scale: 1, zIndex: 50 },
    phone:  { x: '-150%', y: '5%', z: '-150px', rotateY: '15deg', rotateX: '5deg', scale: 0.85, zIndex: 10 }
  }
};

export default function MapView({ selectedShop, setSelectedShop }) {
  const [filterTime, setFilterTime] = useState('15');
  const [searchQuery, setSearchQuery] = useState('');
  
  // 控制誰在最前方：'phone' 或 'tablet'
  const [activeDevice, setActiveDevice] = useState('phone');

  const filteredShops = RESTAURANTS.filter(shop => {
    if (filterTime !== '全部' && shop.distance > parseInt(filterTime)) return false;
    if (searchQuery && !shop.name.includes(searchQuery) && !shop.type.includes(searchQuery)) return false;
    return true;
  });

  // 取得當前的 3D 座標設定
  const currentPos = activeDevice === 'phone' ? STAGE_CONFIG.phoneActive : STAGE_CONFIG.tabletActive;

  // 輔助函式：將設定轉換為 CSS Transform 字串
  const getTransform = (device) => {
    const { x, y, z, rotateY, rotateX, scale } = currentPos[device];
    return `translate3d(${x}, ${y}, ${z}) rotateY(${rotateY}) rotateX(${rotateX}) scale(${scale})`;
  };

  return (
    // 舞台背景 (深色系更能凸顯裝置螢幕的光澤)
    <div 
      className="relative w-full min-h-screen bg-[#E5E3DF] overflow-hidden flex items-center justify-center animate-in fade-in duration-700 pt-[70px]"
      style={{ perspective: STAGE_CONFIG.perspective }} // 啟用 3D 空間
    >
      {/* 環境光影/倒影點綴 */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[30vh] bg-stone-300/50 blur-[100px] rounded-[100%] pointer-events-none"></div>

      {/* ==========================================
          裝置 1：平板 (地圖顯示區)
          ========================================== */}
      <div 
        className="absolute w-[900px] max-w-[90vw] h-[600px] max-h-[70vh] bg-[#1A1A1A] rounded-[2rem] border-[10px] border-[#1A1A1A] shadow-2xl flex flex-col"
        style={{ 
          transform: getTransform('tablet'),
          transition: STAGE_CONFIG.transition,
          zIndex: currentPos.tablet.zIndex,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* 如果平板不是主角，蓋一層隱形玻璃來接收點擊事件，並稍微變暗 */}
        {activeDevice !== 'tablet' && (
          <div 
            className="absolute inset-0 z-[100] bg-black/10 cursor-pointer rounded-[1.5rem] hover:bg-transparent transition-colors"
            onClick={() => setActiveDevice('tablet')}
            title="點擊將地圖移至前方"
          />
        )}
        
        {/* 平板螢幕內容 (地圖) */}
        <div className="flex-1 relative bg-[#E8EAED] rounded-[1.5rem] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          
          <div className="absolute top-[45%] left-[55%] z-10 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 bg-emerald-600 rounded-full shadow-lg border-[3px] border-white flex items-center justify-center text-white mb-1">
              <span className="text-xs font-black">YZU</span>
            </div>
            <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-md shadow-md text-[10px] font-bold text-[#1A1A1A] tracking-wider">元智大學</span>
          </div>

          {filteredShops.map(r => (
            <div 
              key={r.id}
              className="absolute cursor-pointer transition-all z-20 group hover:scale-110 hover:z-30"
              style={{ 
                top: `${45 + (r.distance % 2 === 0 ? 1 : -1) * (r.distance * 1.5)}%`, 
                left: `${55 + (r.id % 2 === 0 ? 1 : -1) * (r.distance * 2)}%` 
              }}
              onClick={(e) => { 
                e.stopPropagation(); // 避免觸發背板的點擊
                setSelectedShop(r); 
                setActiveDevice('phone'); // 點擊地圖標籤時，把手機叫到前面來看詳細資料
              }}
            >
              <div className="flex flex-col items-center relative">
                <div className={`px-2.5 py-1.5 rounded-md shadow-md text-xs font-bold mb-1 transition-colors ${selectedShop?.id === r.id ? 'bg-[#1A1A1A] text-white scale-110' : 'bg-white text-[#1A1A1A]'}`}>
                  {r.name}
                </div>
                <MapPin 
                  size={28} 
                  className={`${selectedShop?.id === r.id ? 'text-[#1A1A1A]' : 'text-emerald-600'} drop-shadow-md transition-all`} 
                  fill={selectedShop?.id === r.id ? '#1A1A1A' : '#ffffff'}
                />
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ==========================================
          裝置 2：手機 (搜尋與資料區)
          ========================================== */}
      <div 
        className="absolute w-[320px] h-[650px] max-h-[80vh] bg-[#1A1A1A] rounded-[2.5rem] border-[12px] border-[#1A1A1A] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col"
        style={{ 
          transform: getTransform('phone'),
          transition: STAGE_CONFIG.transition,
          zIndex: currentPos.phone.zIndex,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* 手機瀏海 (Dynamic Island) 增加真實感 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#1A1A1A] rounded-b-[1rem] z-50"></div>

        {/* 如果手機不是主角，蓋一層隱形玻璃來接收點擊事件 */}
        {activeDevice !== 'phone' && (
          <div 
            className="absolute inset-0 z-[100] bg-black/10 cursor-pointer rounded-[1.8rem] hover:bg-transparent transition-colors"
            onClick={() => setActiveDevice('phone')}
            title="點擊將選單移至前方"
          />
        )}

        {/* 手機螢幕內容 */}
        <div className="flex-1 relative bg-white rounded-[1.8rem] overflow-hidden flex flex-col">
          
          {selectedShop ? (
            // --- 內容 A：店家詳細資料 ---
            <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="relative w-full h-56 flex-shrink-0">
                <img src={selectedShop.img} className="w-full h-full object-cover" alt={selectedShop.name}/>
                <button 
                  onClick={() => setSelectedShop(null)} 
                  className="absolute top-8 left-4 w-8 h-8 bg-[#1A1A1A]/80 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-[#1A1A1A] shadow-md transition-transform hover:scale-110 z-10 cursor-pointer"
                >
                  <ChevronLeft size={18} strokeWidth={2.5} />
                </button>
              </div>
              <div className="p-5 flex-1 flex flex-col bg-white rounded-t-[1.5rem] -mt-6 relative z-10">
                <h2 className="text-xl font-black text-[#1A1A1A] mb-1">{selectedShop.name}</h2>
                <div className="flex items-center text-xs mb-4">
                  <span className="font-bold text-[#1A1A1A] mr-1">{selectedShop.rating}</span>
                  <div className="flex text-amber-500 mr-2">
                    {[...Array(5)].map((_,i) => <Star key={i} size={12} fill="currentColor"/>)}
                  </div>
                  <span className="text-stone-500">({selectedShop.reviews}) · $1-200</span>
                </div>
                
                <div className="space-y-4 text-xs text-stone-700 pt-2 border-t border-stone-100">
                  <div className="flex items-start space-x-3">
                    <div className="w-5 text-center mt-0.5"><Utensils size={16} className="text-stone-400" /></div>
                    <div className="flex items-center text-stone-600">
                      <span className="font-bold text-emerald-700 mr-2 border border-emerald-700/30 px-1.5 py-0.5 rounded">{selectedShop.type}</span> 
                      內用 · 外帶
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 text-center mt-0.5"><MapPin size={16} className="text-stone-400" /></div>
                    <div>距離校門步行 {selectedShop.distance} 分鐘</div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-5 text-center mt-0.5"><Clock size={16} className="text-stone-400" /></div>
                    <div><span className="text-emerald-600 font-bold mr-2">營業中</span> · {selectedShop.open}</div>
                  </div>
                </div>

                {/* 行動呼籲按鈕 */}
                <button className="mt-8 w-full py-3 bg-[#1A1A1A] text-white text-xs font-bold tracking-widest rounded-xl hover:bg-stone-800 transition-colors">
                  前往導航
                </button>
              </div>
            </div>
          ) : (
            // --- 內容 B：搜尋與店家列表 ---
            <div className="flex-1 flex flex-col bg-white overflow-hidden pt-8">
              <div className="p-4 border-b border-stone-100 flex-shrink-0 z-10 bg-white">
                 <div className="flex items-center bg-stone-100/80 border border-stone-200 shadow-inner rounded-xl px-4 py-3 mb-3 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                   <Search size={16} className="text-stone-400 mr-3 flex-shrink-0" />
                   <input 
                     type="text" 
                     placeholder="搜尋蔬食店家..." 
                     className="flex-1 bg-transparent text-xs font-medium text-[#1A1A1A] focus:outline-none placeholder-stone-400" 
                     value={searchQuery} 
                     onChange={e => setSearchQuery(e.target.value)}
                   />
                   {searchQuery && <X size={16} className="text-stone-400 cursor-pointer" onClick={() => setSearchQuery('')}/>}
                 </div>
                 <div className="flex items-center space-x-2">
                   <div className="flex items-center border border-stone-200 rounded-lg px-2 py-1.5 text-xs text-stone-600 bg-white shadow-sm flex-1">
                     <Clock size={12} className="mr-1.5 text-stone-400"/>
                     <select 
                       className="bg-transparent focus:outline-none font-bold cursor-pointer w-full text-center appearance-none"
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
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar bg-stone-50/50">
                 {filteredShops.map((shop, idx) => (
                   <div 
                     key={shop.id} 
                     className="p-4 border-b border-stone-100 flex cursor-pointer hover:bg-white transition-colors animate-in fade-in slide-in-from-bottom-2"
                     style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}
                     onClick={() => {
                        setSelectedShop(shop); 
                        setActiveDevice('tablet'); // 點擊列表的店家時，把地圖(平板)旋轉到前方來查看位置
                     }}
                   >
                      <div className="flex-1 pr-3 flex flex-col justify-center">
                        <h3 className="font-bold text-[#1A1A1A] text-sm mb-1">{shop.name}</h3>
                        <div className="text-[10px] text-stone-500 mb-1.5">
                          <span className="text-emerald-700 font-bold border border-emerald-700/20 px-1 py-0.5 rounded mr-1">{shop.type}</span> 
                          {shop.distance}m
                        </div>
                        <div className="flex items-center text-[10px] text-stone-500">
                          <span className="text-[#1A1A1A] font-bold mr-1">{shop.rating}</span>
                          <Star size={10} className="text-amber-500" fill="currentColor"/>
                        </div>
                      </div>
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                        <img src={shop.img} className="w-full h-full object-cover" alt={shop.name}/>
                      </div>
                   </div>
                 ))}
                 
                 {filteredShops.length === 0 && (
                   <div className="p-8 text-center text-xs text-stone-400 font-bold tracking-widest mt-10">
                     找不到符合的店家
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