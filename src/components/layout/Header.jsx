// src/components/layout/Header.jsx

import React, { useState, useEffect, useRef } from 'react';

import useUserLocation from '../../hooks/useUserLocation';

import { LOGO_LONG, LOGO_SHORT } from '../../assets/iconHub';

export default function Header({ activeTab, setActiveTab, isFullScreenView }) {
  // 🌟 1. 新增：呼叫獨立定位 Hook
  const { location, error, isLoading } = useUserLocation();

  // 🌟 2. 新增：在控制台印出來檢查有沒有成功
  console.log("Header 偵測目前定位：", { location, error, isLoading });

  const [isFloatingExpanded, setIsFloatingExpanded] = useState(true);
  const timeoutRef = useRef(null);

  // ==========================================
  // 🛠️ 【開發者自定義調整區】
  // ==========================================
  const AUTO_COLLAPSE_TIME = 3000; 
  const INITIAL_EXPAND_TIME = 2000; 
  // ==========================================

  const NAV_LINKS = [
    { id: 'shops', label: '店家資訊' },
    { id: 'menu', label: '餐點圖鑑' },
    { id: 'map', label: '步行地圖' },
    { id: 'info', label: '素食小百科' },
    { id: 'about', label: '關於我們' }
  ];

  const filteredNavLinks = NAV_LINKS.filter(item => item.id !== activeTab);

  useEffect(() => {
    if (isFullScreenView) {
      setIsFloatingExpanded(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsFloatingExpanded(false);
      }, INITIAL_EXPAND_TIME);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isFullScreenView, activeTab]);

  const handleMouseEnter = () => {
    if (isFullScreenView) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsFloatingExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (isFullScreenView && isFloatingExpanded) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsFloatingExpanded(false);
      }, AUTO_COLLAPSE_TIME);
    }
  };

  const handleLogoClick = (e) => {
    e.stopPropagation();
    if (isFullScreenView) {
      if (!isFloatingExpanded) {
        setIsFloatingExpanded(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setIsFloatingExpanded(false);
        }, AUTO_COLLAPSE_TIME);
      } else {
        setActiveTab('home');
      }
    } else {
      setActiveTab('home');
    }
  };

  // ==========================================
  // 模式 A：全螢幕頁面的「懸浮吃人膠囊」
  // ==========================================
  if (isFullScreenView) {
    return (
      <header 
        key="capsule-header"
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
        // 🌟 微調了 pr-2 md:pr-4，因為按鈕本身現在自帶 padding 了
        className={`fixed z-9999 top-6 right-6 h-15 bg-[#F6F6F4]/95 backdrop-blur-md shadow-xl rounded-full border border-stone-200 overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.25,1)] flex items-center ${
          isFloatingExpanded ? 'pr-2 md:pr-4' : 'pr-0'
        }`}
      >
          <div 
            onClick={handleLogoClick}
            // 1. 加入 hover:bg-stone-200/50 與 transition-colors duration-300
            // 2. 加入 rounded-l-full 讓 hover 狀態的左邊緣貼合膠囊的圓弧
            // 3. 加入 group 讓裡面的 img 可以感應到外層被 hover
            className="group min-w-15 w-auto h-15 shrink-0 flex items-center justify-center cursor-pointer bg-transparent z-20 hover:bg-stone-200/50 rounded-l-full transition-colors duration-300"
          >
            <img 
              src={LOGO_LONG} 
              alt="YZU Veggie Logo" 
              // 🌟 結合你的想法：平時稍微暗/透明一點 (opacity-70)，hover 時恢復全彩全亮 (group-hover:opacity-100)
              className="w-auto h-4 object-contain mx-6 opacity-70 group-hover:opacity-100 transition-opacity duration-300" 
            />
          </div>

         {/* 🌟 1. 移除原本的 space-x-5，並加上 h-full 讓容器高度填滿 60px */}
         <div className={`flex items-center h-full whitespace-nowrap overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.25,1)] ${
           isFloatingExpanded 
             ? 'max-w-100 md:max-w-150 opacity-100 delay-100' 
             : 'max-w-0 opacity-0 delay-0 pointer-events-none'
         }`}>
           {filteredNavLinks.map(item => (
             <button 
               key={item.id}
               // 🌟 移除了 window.scrollTo(0,0)，避免跟 useScrollMemory 衝突
               onClick={() => { setActiveTab(item.id); }}
               // 🌟 2. 核心修改：加入 h-full (上下拉滿點擊區域) 與 px-3 md:px-4 (左右拉滿點擊區域)
               // 加上了 hover:bg-stone-200/50，你可以透過滑鼠懸停看到點擊範圍變得多大！
               className="h-full px-3 md:px-4 flex items-center justify-center text-[10px] md:text-xs tracking-[0.15em] font-bold uppercase text-stone-500 hover:text-[#1A1A1A] hover:bg-stone-200/50 transition-colors duration-300 border-none bg-transparent cursor-pointer"
             >
               {item.label}
             </button>
           ))}
         </div>
      </header>
    );
  }

  // ==========================================
  // 模式 B：一般頁面的固定導航欄 (使用 LOGO_SHORT)
  // ==========================================
  return (
    <header 
      key="normal-header"
      className="flex items-center w-full z-50 bg-[#F6F6F4]/95 transition-all duration-700 ease-in-out"
    >
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col items-center justify-center gap-y-5 px-6 mt-8">
        
        {/* Logo 區塊 */}
        <div 
          role="button" 
          className="flex items-center cursor-pointer bg-transparent"
          onClick={handleLogoClick}
        >
          <img 
            src={ LOGO_SHORT } 
            alt="YZU Veggie Logo" 
            className="w-25 h-auto object-contain mr-3 mb-4" 
          />
        </div>

        {/* 導航按鈕區塊 */}
        <div className="flex items-center space-x-4 md:space-x-8 overflow-x-auto no-scrollbar">
          {NAV_LINKS.map(item => (
            <button 
              key={item.id}
              onClick={() => { setActiveTab(item.id); }}
              className={`flex items-center whitespace-nowrap text-[10px] md:text-lg tracking-[0.15em] font-bold uppercase transition-colors duration-300 border-none bg-transparent cursor-pointer
                ${activeTab === item.id ? 'text-[#1A1A1A]' : 'text-stone-400 hover:text-[#1A1A1A]'}
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}