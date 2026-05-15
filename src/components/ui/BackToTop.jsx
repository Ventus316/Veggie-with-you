// src/components/ui/BackToTop.jsx

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // 監聽捲動高度
  useEffect(() => {
    const toggleVisibility = () => {
      // 當往下捲動超過 300px 時，顯示按鈕
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // 組件卸載時清除監聽，避免記憶體流失
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 加入平滑捲動效果
    });
  };

  return (
    <button
      onClick={scrollToTop}
      // 根據 isVisible 狀態來控制透明度與點擊穿透，並設定固定在右下角 (bottom-8 right-8)
      className={`fixed bottom-8 right-8 z-[9999] p-3 rounded-full bg-[#1A1A1A]/80 hover:bg-[#1A1A1A] text-white shadow-lg backdrop-blur-md transition-all duration-500 ease-in-out cursor-pointer border border-white/10
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      aria-label="回到頂部"
    >
      <ChevronUp size={24} />
    </button>
  );
}