// src/views/InfoView.jsx

import React, { useState } from 'react';
import { Info, Activity } from 'lucide-react';
import NutritionRadarChart from '../components/ui/NutritionRadarChart';
import { INFO_CATEGORIES, NUTRITION_DATA } from '../data/mockData';

export default function InfoView() {
  const [selectedCategory, setSelectedCategory] = useState('飯麵類');

  return (
    <div className="py-12 px-6 max-w-6xl mx-auto animate-in fade-in duration-1000">
      <div className="text-center mb-20">
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-[#1A1A1A] mb-4 uppercase">素食小百科</h1>
        <p className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase">Vegan Knowledge Base</p>
      </div>

      <div className="mb-24">
        <div className="flex items-center space-x-3 mb-8 border-b border-stone-200 pb-4">
          <Info size={18} className="text-[#1A1A1A]" />
          <h2 className="text-xl font-bold tracking-[0.15em] text-[#1A1A1A]">素食分類介紹</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INFO_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="bg-white p-8 border border-stone-200 hover:border-[#1A1A1A] hover:-translate-y-1 transition-all duration-300">
              <h3 className="text-sm font-bold tracking-[0.1em] text-[#1A1A1A] mb-3">{cat.title}</h3>
              <p className="text-xs text-stone-500 tracking-wider leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b border-stone-200 pb-4 gap-4">
          <div className="flex items-center space-x-3">
            <Activity size={18} className="text-[#1A1A1A]" />
            <h2 className="text-xl font-bold tracking-[0.15em] text-[#1A1A1A]">常見蔬食食材五角圖 (每100克)</h2>
          </div>
          
          <div className="flex space-x-2 overflow-x-auto no-scrollbar max-w-full pb-2 md:pb-0">
            {Object.keys(NUTRITION_DATA).map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border rounded-full whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                    : 'bg-white text-stone-500 border-stone-200 hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {NUTRITION_DATA[selectedCategory].map((item, idx) => (
            <div key={idx} className="flex-shrink-0 w-[260px] md:w-[300px] snap-center bg-white border border-stone-200 p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <NutritionRadarChart data={item.values} />
              <h3 className="text-sm font-bold tracking-[0.15em] text-[#1A1A1A] mt-6">{item.name}</h3>
            </div>
          ))}
        </div>

        <p className="text-right text-[10px] text-stone-400 font-bold tracking-widest mt-6">
          * 以上數據比例僅供參考，實際數值會依烹調方式與食材產地有所差異。
        </p>
      </div>
    </div>
  );
}