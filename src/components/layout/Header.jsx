// src/components/layout/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
// 🌟 從 mockData 引入自定義 Logo 素材
import { LOGO_LONG, LOGO_SHORT } from '../../data/Data';

export default function Header({ activeTab, setActiveTab, isFullScreenView }) {
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
  // 模式 A：全螢幕頁面的「懸浮吃人膠囊」 (使用 LOGO_LONG)
  // ==========================================
  if (isFullScreenView) {
    return (
      <header 
        key="capsule-header"
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
        className={`fixed z-[9999] top-6 right-6 h-[60px] bg-[#F6F6F4]/95 backdrop-blur-md shadow-xl rounded-full border border-stone-200 overflow-hidden transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.25,1)] flex items-center ${
          isFloatingExpanded ? 'pr-6 md:pr-8' : 'pr-0'
        }`}
      >
         {/* 🌟 膠囊模式：固定使用 LOGO_LONG */}
         <div 
           onClick={handleLogoClick}
           className="min-w-[60px] w-auto h-[60px] flex-shrink-0 flex items-center justify-center cursor-pointer bg-transparent z-20"
         >
           <img 
             src={LOGO_LONG} 
             alt="YZU Veggie Logo" 
             className="w-auto h-4 object-contain mx-6" 
           />
         </div>

         <div className={`flex items-center space-x-5 md:space-x-7 whitespace-nowrap overflow-hidden transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.25,1)] ${
           isFloatingExpanded 
             ? 'max-w-auto md:max-w-[600px] opacity-100 delay-100' 
             : 'max-w-0 opacity-0 delay-0 pointer-events-none'
         }`}>
           {filteredNavLinks.map(item => (
             <button 
               key={item.id}
               onClick={() => { setActiveTab(item.id); window.scrollTo(0,0); }}
               className="text-[10px] md:text-xs tracking-[0.15em] font-bold uppercase text-stone-500 hover:text-[#1A1A1A] transition-colors duration-300 border-none bg-transparent cursor-pointer"
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
      className="flex items-center w-full z-50 bg-[#F6F6F4]/95  transition-all duration-700 ease-in-out"
    >
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col items-center justify-center gap-y-5 px-6 mt-8">
        
        {/* Logo 區塊 */}
        <div 
          role="button" 
          className="flex items-center cursor-pointer bg-transparent"
          onClick={handleLogoClick}
        >
          {/* 🌟 固定導航欄：固定使用 LOGO_SHORT */}
          <img 
            src={ LOGO_SHORT } 
            alt="YZU Veggie Logo" 
            className="w-50 h-auto object-contain mr-3 mb-4" 
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