// src/components/layout/Header.jsx

import React from 'react';
import { Leaf } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, isCompactHeader }) {
  return (
    <header className={`w-full z-50 transition-all duration-700 ease-in-out ${
      isCompactHeader 
        ? 'fixed top-0 left-0 bg-[#F6F6F4]/95 backdrop-blur-md shadow-sm h-[70px]'
        : 'fixed top-0 left-0 bg-[#F6F6F4] h-[140px]'
    }`}>
      <div className="max-w-7xl mx-auto w-full h-full relative px-6">
        
        <div 
          className={`absolute transition-all duration-700 ease-in-out flex cursor-pointer z-10 ${
            isCompactHeader
              ? 'top-1/2 -translate-y-1/2 left-6 flex-row items-center scale-75 origin-left'
              : 'top-8 left-1/2 -translate-x-1/2 flex-col items-center'
          }`}
          onClick={() => setActiveTab('home')}
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
            {[
              { id: 'shops', label: '店家資訊' },
              { id: 'menu', label: '餐點圖鑑' },
              { id: 'map', label: '步行地圖' },
              { id: 'info', label: '素食小百科' },
              { id: 'about', label: '關於我們' }
            ].map(item => (
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