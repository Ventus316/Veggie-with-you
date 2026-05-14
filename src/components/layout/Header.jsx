// src/components/layout/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Leaf } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, isCompactHeader, isFullScreenView }) {
  const [isFloatingExpanded, setIsFloatingExpanded] = useState(true);
  const timeoutRef = useRef(null);

  // ==========================================
  // 🛠️ 【開發者自定義調整區】
  // ==========================================
  
  // 1. 🌟 滑鼠離開後，自動收起的時間 (毫秒)
  const AUTO_COLLAPSE_TIME = 3000; 

  // 2. 🌟 進入頁面或跳轉分頁時，膠囊保持展開的時間 (毫秒)
  // 依照需求改為 2000 (即 2 秒)
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

  // 🌟 核心邏輯：進入全螢幕頁面或「切換分頁」時展開 2 秒
  useEffect(() => {
    if (isFullScreenView) {
      // 1. 強制展開
      setIsFloatingExpanded(true);
      
      // 2. 清除任何正在運行的計時器 (包含上個分頁留下的或滑鼠離開的)
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      // 3. 設定 2 秒後自動收起，並存入 ref 以供 handleMouseEnter 攔截
      timeoutRef.current = setTimeout(() => {
        setIsFloatingExpanded(false);
      }, INITIAL_EXPAND_TIME);
    }
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isFullScreenView, activeTab]); // 🌟 加入 activeTab，確保分頁跳轉也會重置 2 秒

  // 🌟 滑鼠移入：只要鼠標在上面，就絕對不收起
  const handleMouseEnter = () => {
    if (isFullScreenView) {
      // 取消所有收起倒數 (包含進入頁面的 2 秒倒數與離開的 3 秒倒數)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsFloatingExpanded(true);
    }
  };

  // 🌟 滑鼠離開：啟動自動收起計時器
  const handleMouseLeave = () => {
    if (isFullScreenView && isFloatingExpanded) {
      // 先清除舊的再設新的，確保時間準確
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
        // 點開後同樣套用自動收起邏輯
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

  if (isFullScreenView) {
    return (
      <header 
        key="capsule-header"
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
        // 🌟 讓外層成為 flex 容器，並透過 pr (padding-right) 控制展開時的右側留白
        className={`fixed z-[9999] top-6 right-6 h-[60px] bg-[#F6F6F4]/95 backdrop-blur-md shadow-xl rounded-full border border-stone-200 overflow-hidden transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.25,1)] flex items-center ${
          isFloatingExpanded ? 'pr-6 md:pr-8' : 'pr-0'
        }`}
      >
         {/* Logo區塊：固定尺寸，不隨文字縮放 */}
         <div 
           onClick={handleLogoClick}
           className="w-[60px] h-[60px] flex-shrink-0 flex items-center justify-center cursor-pointer bg-transparent z-20"
         >
           <Leaf size={24} strokeWidth={2.5} className="text-[#1A1A1A]" />
         </div>

         {/* 選單區塊：透過 max-w 控制動畫，實際寬度由裡面的文字自動撐開 */}
         <div className={`flex items-center space-x-5 md:space-x-7 whitespace-nowrap overflow-hidden transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.25,1)] ${
           isFloatingExpanded 
             ? 'max-w-[400px] md:max-w-[600px] opacity-100 delay-100' 
             : 'max-w-0 opacity-0 delay-0 pointer-events-none'
         }`}>
           {filteredNavLinks.map(item => (
             <button 
               key={item.id}
               onClick={() => { setActiveTab(item.id); window.scrollTo(0,0); }}
               className="text-[10px] md:text-xs tracking-[0.15em] font-bold uppercase text-stone-500 hover:text-[#1A1A1A] transition-colors duration-300"
             >
               {item.label}
             </button>
           ))}
         </div>
      </header>
    );
  }

  return (
    <header 
      key="normal-header"
      className={`w-full z-50 transition-all duration-700 ease-in-out ${
        isCompactHeader 
          ? 'fixed top-0 left-0 bg-[#F6F6F4]/95 backdrop-blur-md shadow-sm h-[70px]'
          : 'fixed top-0 left-0 bg-[#F6F6F4] h-[140px]'
      }`}
    >
      <div className= "max-w-7xl mx-auto w-full h-full relative px-6">
        <div 
          role="button" 
          className={`absolute transition-all duration-700 ease-in-out flex cursor-pointer bg-transparent z-10 ${
            isCompactHeader
              ? 'top-1/2 -translate-y-1/2 left-6 flex-row items-center scale-75 origin-left'
              : 'top-8 left-1/2 -translate-x-1/2 flex-col items-center'
          }`}
          onClick={handleLogoClick}
        >
          <div className={`flex items-center text-[#1A1A1A] ${isCompactHeader ? 'mr-4' : 'mb-1'}`}>
            <Leaf size={isCompactHeader ? 20 : 24} strokeWidth={2} />
            <span className={`tracking-[0.25em] font-black uppercase ml-2 ${isCompactHeader ? 'text-xl' : 'text-2xl'}`}>
              YZU Veggie
            </span>
          </div>
          <span className={`tracking-[0.3em] font-bold text-stone-500 uppercase ${isCompactHeader ? 'text-[8px] mt-1 hidden md:block' : 'text-[10px]'}`}>
            Sustainability Group
          </span>
        </div>

        <div className={`absolute transition-all duration-700 ease-in-out flex ${
          isCompactHeader
            ? 'top-1/2 -translate-y-1/2 right-6 w-auto'
            : 'bottom-4 left-1/2 -translate-x-1/2 w-full max-w-3xl justify-center'
        }`}>
          <div className={`flex items-center overflow-x-auto no-scrollbar ${isCompactHeader ? 'space-x-4 md:space-x-8' : 'space-x-8 md:space-x-12'}`}>
            {NAV_LINKS.map(item => (
              <button 
                key={item.id}
                onClick={() => { setActiveTab(item.id); window.scrollTo(0,0); }}
                className={`flex items-center whitespace-nowrap text-[10px] md:text-[18px] tracking-[0.15em] font-bold uppercase transition-colors duration-300
                  ${activeTab === item.id ? 'text-[#1A1A1A]' : 'text-stone-400 hover:text-[#1A1A1A]'}
                `}
              >
                {item.label}
                {!isCompactHeader && <span className="w-1 h-1 rounded-full bg-stone-300 ml-8 last:hidden md:block hidden opacity-50"></span>}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}