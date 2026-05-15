// src/components/ui/GlobalNavigation_old.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Map, Utensils, Store, BookOpen, Users, X, Menu } from 'lucide-react';

export default function GlobalNavigation({ activeTab, setActiveTab }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  // 用來引用導航欄容器，判斷點擊是否在外面
  const navRef = useRef(null); 

  // 定義所有導航項目與圖示
  const NAV_ITEMS = [
    { id: 'shops', label: '店家資訊', icon: Store },
    { id: 'menu', label: '餐點圖鑑', icon: Utensils },
    { id: 'map', label: '步行地圖', icon: Map },
    { id: 'info', label: '素食小百科', icon: BookOpen },
    { id: 'about', label: '關於我們', icon: Users },
  ];

  // 核心功能：動態過濾掉當前所在的頁面標籤，讓選單只顯示 4 個選項
  const filteredNavItems = NAV_ITEMS.filter(item => item.id !== activeTab);

  // 監聽全域點擊，用來關閉選單
  useEffect(() => {
    const handleOutsideClick = (e) => {
      // 如果選單是開啟狀態，且點擊的地方不在導航欄(navRef)內部，也不是那個觸發按鈕
      if (isNavOpen && navRef.current && !navRef.current.contains(e.target) && !e.target.closest('.nav-trigger-btn')) {
        setIsNavOpen(false);
      }
    };

    // 監聽 mousedown 事件比 click 事件更即時
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isNavOpen]);

  return (
    <>
      {/* ==========================================
          1. 懸浮導航選單 (玻璃質感)
          ========================================== */}
      <div 
        ref={navRef}
        className={`fixed z-[9998] bottom-24 right-6 transition-all duration-300 ease-out flex flex-col items-end gap-2 origin-bottom-right ${
          isNavOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* 選單主體 */}
        <div className="flex flex-col p-2 bg-[#FDFCF8]/90 backdrop-blur-xl border border-stone-200 rounded-3xl shadow-2xl w-max min-w-[180px]">
          {filteredNavItems.map((item, idx) => (
            <React.Fragment key={item.id}>
              <button 
                onClick={() => { setActiveTab(item.id); setIsNavOpen(false); }}
                className="flex items-center w-full px-5 py-3 hover:bg-stone-100 rounded-xl transition-colors group cursor-pointer border-none bg-transparent"
              >
                <item.icon size={16} className="mr-3 text-stone-500 group-hover:text-green-600 transition-colors" />
                <span className="text-[11px] md:text-[12px] font-bold tracking-[0.15em] uppercase text-[#1A1A1A] whitespace-nowrap">
                  {item.label}
                </span>
              </button>
              {/* 分隔線邏輯 */}
              {idx < filteredNavItems.length - 1 && (
                <div className="h-[1px] bg-stone-200 mx-3 my-1"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ==========================================
          2. 固定在右下角的觸發按鈕 (FAB)
          ========================================== */}
      <button 
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="nav-trigger-btn fixed z-[9999] bottom-6 right-6 w-14 h-14 bg-[#1A1A1A] hover:bg-[#2d2d2d] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-out cursor-pointer border-none group"
        style={{ boxShadow: isNavOpen ? '0 0 20px rgba(0,0,0,0.3)' : '0 10px 25px rgba(0,0,0,0.2)' }}
      >
        {isNavOpen ? (
          // 開啟時顯示 X
          <X size={24} className="animate-in fade-in zoom-in duration-300" />
        ) : (
          // 關閉時顯示 Menu 三條線
          <Menu size={24} className="animate-in fade-in zoom-in duration-300 group-hover:scale-110" />
        )}
      </button>
    </>
  );
}