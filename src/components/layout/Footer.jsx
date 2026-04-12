// src/components/layout/Footer.jsx

import React from 'react';
import { ChevronUp, Leaf } from 'lucide-react';

export default function Footer({ scrollToTop }) {
  return (
    <footer className="relative bg-[#F6F6F4] mt-32 border-t border-stone-200">
      <button 
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white shadow-lg hover:-translate-y-2 transition-transform duration-300 z-30"
      >
        <ChevronUp size={20} />
      </button>

      <div className="relative w-full overflow-hidden flex flex-col justify-end pt-20">
        
        <div className="relative w-full text-center leading-[0.8] z-0 mb-4">
          <span className="text-[26vw] font-black text-white select-none whitespace-nowrap tracking-tighter drop-shadow-sm block">
            VEGGIE
          </span>
          
          <div className="absolute bottom-4 right-6 md:bottom-8 md:right-12 z-10 flex flex-col items-end">
            <Leaf className="w-6 h-6 md:w-8 md:h-8 text-[#1A1A1A]" strokeWidth={2} />
            <span className="text-xl md:text-3xl font-black tracking-[0.25em] uppercase text-[#1A1A1A] mt-1">YZU Veggie</span>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-12 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between text-[10px] tracking-[0.1em] font-bold text-stone-500 uppercase pt-6 relative">
            <div className="absolute top-6 left-0 w-full h-[1px] bg-stone-300 z-[-1]"></div>
            <div className="bg-[#F6F6F4] pr-4 z-10">
              &copy; YZU VEGGIE all rights reserved. 網頁設計 : 王大明 / 李小華 / 陳阿強 / 張小美 / 林小宇
            </div>
            <div className="bg-[#F6F6F4] pl-4 z-10 mt-4 md:mt-0 cursor-pointer hover:text-[#1A1A1A] transition-colors">
              隱私權政策
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}