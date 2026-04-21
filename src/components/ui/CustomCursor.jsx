import React, { useState, useEffect } from 'react';
import { Plus, Map, Utensils, Store, BookOpen, Users, X } from 'lucide-react';

export default function CustomCursor({ setActiveTab }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const [isNavOpen, setIsNavOpen] = useState(false);
  // 🌟 新增：儲存選單的動態位置與變形參數
  const [navStyle, setNavStyle] = useState({ left: '50%', top: '50%', transform: 'translate(-50%, 20px)' });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target;
      const isClickable = 
        target.closest('button') !== null || 
        target.closest('a') !== null || 
        target.closest('[role="button"]') !== null || 
        target.closest('.cursor-pointer') !== null || 
        window.getComputedStyle(target).cursor === 'pointer';

      setIsHovering(isClickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleGlobalClick = (e) => {
      const target = e.target;

      // 避免點擊小導航欄自己時關閉
      if (target.closest('.floating-mini-nav')) return;

      const isClickable = 
        target.closest('button') !== null || 
        target.closest('a') !== null || 
        target.closest('[role="button"]') !== null || 
        target.closest('.cursor-pointer') !== null || 
        window.getComputedStyle(target).cursor === 'pointer';

      if (!isClickable) {
        // 🌟 智慧邊界偵測 (Smart Boundary Detection)
        let x = e.clientX;
        let y = e.clientY;
        let xTransform = '-50%'; // 預設水平居中於鼠標
        let yTransform = '20px'; // 預設在鼠標下方 20px 開啟

        const safeMargin = 300; // 預留給選單的寬度緩衝空間

        // 1. 如果太靠左側，讓選單往右對齊
        if (x < safeMargin) {
          xTransform = '0%';
          x += 15;
        } 
        // 2. 如果太靠右側，讓選單往左對齊
        else if (x > window.innerWidth - safeMargin) {
          xTransform = '-100%';
          x -= 15;
        }

        // 3. 如果太靠近底部，讓選單往上開啟，避免被裁切
        if (y > window.innerHeight - 80) {
          yTransform = 'calc(-100% - 20px)';
        }

        // 更新位置並打開選單
        setNavStyle({
          left: `${x}px`,
          top: `${y}px`,
          transform: `translate(${xTransform}, ${yTransform})`
        });
        
        setIsNavOpen(prev => !prev); 
      } else {
        // 點到其他按鈕時，自動收合小導航
        setIsNavOpen(false);
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
  }, [isVisible]);

  // 定義導航菜單陣列，方便管理
  const NAV_ITEMS = [
    { id: 'shops', label: '店家資訊', icon: Store },
    { id: 'menu', label: '餐點圖鑑', icon: Utensils },
    { id: 'map', label: '步行地圖', icon: Map },
    { id: 'info', label: '素食小百科', icon: BookOpen },
    { id: 'about', label: '關於我們', icon: Users },
  ];

  return (
    <>
      {/* 🌟 智慧定位懸浮小導航欄 */}
      <div 
          className={`floating-mini-nav fixed z-[9998] transition duration-300 ease-out flex flex-wrap items-center justify-center p-1.5 bg-[#FDFCF8]/95 backdrop-blur-xl border border-stone-200 rounded-2xl md:rounded-full shadow-2xl w-max max-w-[90vw] origin-center ${
            isNavOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        style={navStyle} // 套用動態計算好的座標
      >
        {NAV_ITEMS.map((item, idx) => (
          <React.Fragment key={item.id}>
            <button 
              onClick={() => { setActiveTab(item.id); setIsNavOpen(false); }}
              className="flex items-center px-3 py-2 md:px-4 md:py-2 hover:bg-stone-200 rounded-full transition-colors group cursor-pointer"
            >
              <item.icon size={14} className="mr-1.5 text-stone-500 group-hover:text-green-600 transition-colors" />
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase text-[#1A1A1A] whitespace-nowrap">
                {item.label}
              </span>
            </button>
            {/* 分隔線 (最後一個項目不顯示) */}
            {idx < NAV_ITEMS.length - 1 && (
              <div className="hidden md:block w-[1px] h-4 bg-stone-300 mx-1"></div>
            )}
          </React.Fragment>
        ))}
        
        {/* 關閉按鈕 */}
        <div className="w-[1px] h-4 bg-stone-300 mx-1"></div>
        <button 
          onClick={() => setIsNavOpen(false)}
          className="p-2 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
        >
          <X size={14} className="text-stone-500" />
        </button>
      </div>

      {/* 自定義鼠標 */}
      {isVisible && (
        <div 
          className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
          style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
        >
          {isHovering ? (
            <div className="relative -translate-x-1/2 -translate-y-1/2 transition-all duration-300">
               <div className="w-4 h-4 bg-green-600 rounded-full shadow-[0_0_15px_rgba(22,163,74,0.5)] scale-150 transition-transform"></div>
            </div>
          ) : (
            <div className="relative -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 opacity-70">
               <div className="w-10 h-10 border border-green-700/50 rounded-full animate-[spin_4s_linear_infinite] flex items-center justify-center"></div>
               <Plus size={16} className="absolute text-green-700/70" />
            </div>
          )}
        </div>
      )}
    </>
  );
}