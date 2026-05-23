// src/components/ui/MenuLightbox.jsx

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function MenuLightbox({ selectedMenu, onClose }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // 當燈箱開啟時，鎖定背景的滾動
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const bttBtn = document.getElementById('back-to-top-btn');
    if (bttBtn) bttBtn.style.display = 'none';
    
    return () => { 
      document.body.style.overflow = 'unset'; 
      if (bttBtn) bttBtn.style.display = '';
    };
  }, []);

  const handleWheel = (e) => {
    const zoomSensitivity = 0.002;
    const delta = -e.deltaY * zoomSensitivity;
    let newScale = scale + delta;
    
    newScale = Math.min(Math.max(0.3, newScale), 5);
    setScale(newScale);
  };

  const handleMouseDown = (e) => {
    // 🌟 核心修改：e.button === 0 是左鍵，e.button === 1 是中鍵
    if (e.button === 0 || e.button === 1) { 
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
    if (e.button === 0 || e.button === 1) {
      setIsDragging(false);
    }
  };

  if (!selectedMenu) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1A1A1A]/95 backdrop-blur-sm p-4 md:p-10 animate-in fade-in duration-300 select-none" 
      onClick={onClose}
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
              {/* 🌟 提示文字更新 */}
              滾輪縮放圖片 / 按住滑鼠左鍵或滾輪拖曳
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
            onClick={onClose} 
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
  );
}