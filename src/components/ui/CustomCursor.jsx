import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react'; // 使用 Lucide icon 作為預設圖案的十字

export default function CustomCursor({ setActiveTab }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // 判斷鼠標是否在視窗內

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // 全域偵測：判斷滑鼠下方是不是「可點擊」的目標
      const target = e.target;
      const isClickable = 
        target.closest('button') !== null || 
        target.closest('a') !== null || 
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleGlobalClick = (e) => {
      const target = e.target;
      const isClickable = 
        target.closest('button') !== null || 
        target.closest('a') !== null || 
        window.getComputedStyle(target).cursor === 'pointer';

      // 如果點擊的地方「不是」可點擊目標，且 setActiveTab 存在，就切換到選單頁面
      if (!isClickable && setActiveTab) {
        setActiveTab('menu'); 
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('click', handleGlobalClick);
    };
  }, [isVisible, setActiveTab]);

  // 如果滑鼠離開瀏覽器視窗，或者是觸控螢幕，就隱藏鼠標
  if (!isVisible) return null;

  return (
    <div 
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      {isHovering ? (
        /* 狀態 A：指向可點擊目標 (目前用綠色圓點示意，之後可換成矮人圖片) */
        <div className="relative -translate-x-1/2 -translate-y-1/2 transition-all duration-300">
           {/* 如果你有矮人圖片了，把下面這行替換成 <img src="/你的矮人圖片.png" className="w-12 h-12" /> */}
           <div className="w-4 h-4 bg-green-600 rounded-full shadow-[0_0_15px_rgba(22,163,74,0.5)] scale-150 transition-transform"></div>
        </div>
      ) : (
        /* 狀態 B：預設空白處 (圓環 + 十字，暗示可點擊開啟選單) */
        <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 opacity-70">
           <div className="w-10 h-10 border border-green-700/50 rounded-full animate-[spin_4s_linear_infinite] flex items-center justify-center"></div>
           <Plus size={16} className="absolute text-green-700/70" />
        </div>
      )}
    </div>
  );
}