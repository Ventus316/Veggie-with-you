// src/views/MenuView.jsx

import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { ALL_DISHES, RESTAURANTS } from '../data/mockData';

export default function MenuView({ setActiveTab, setSelectedShop }) {
  const rows = [];
  for (let i = 0; i < ALL_DISHES.length; i += 4) {
    rows.push(ALL_DISHES.slice(i, i + 4));
  }

  const [expandedRows, setExpandedRows] = useState(() => {
    const init = {};
    rows.forEach((_, rowIndex) => {
      init[rowIndex] = rowIndex % 4;
    });
    return init;
  });

  return (
    <div className="py-12 px-6 max-w-[1400px] mx-auto min-h-screen animate-in fade-in duration-1000">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-[#1A1A1A] mb-3 uppercase">餐點圖鑑</h1>
        <p className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase">Vegan Menu Gallery</p>
      </div>

      <div className="flex flex-col space-y-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full h-[30vh] md:h-[40vh] gap-2 justify-around">
            {row.map((dish, colIndex) => {
              const isExpanded = expandedRows[rowIndex] === colIndex;
              
              return (
                <div 
                  key={dish.id} 
                  onMouseEnter={() => setExpandedRows(prev => ({ ...prev, [rowIndex]: colIndex }))}
                  className={`relative transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] overflow-hidden bg-stone-900 cursor-pointer ${isExpanded ? 'flex-[4]' : 'flex-1'}`}
                >
                  <img 
                    src={dish.img} 
                    alt={dish.name} 
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isExpanded ? 'grayscale-0 opacity-100' : 'grayscale-[0.3] opacity-60'}`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}></div>

                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                     <span className="text-white text-sm md:text-lg tracking-[0.3em] font-light uppercase [writing-mode:vertical-rl] drop-shadow-md">
                       {dish.shop}
                     </span>
                  </div>
                  
                  <div className={`absolute top-4 left-4 md:top-6 md:left-6 text-white transition-opacity duration-500 delay-100 z-10 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <h3 className="text-base md:text-xl font-bold tracking-[0.1em] whitespace-nowrap drop-shadow-md">
                      {dish.name}
                    </h3>
                  </div>

                  <div className={`absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white transition-opacity duration-500 delay-100 z-10 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <span className="text-sm md:text-base font-bold tracking-widest whitespace-nowrap drop-shadow-md">
                      NT$ {dish.price}
                    </span>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const targetShop = RESTAURANTS.find(r => r.name === dish.shop);
                      if(targetShop) {
                        setSelectedShop(targetShop);
                      }
                      setActiveTab('map');
                    }}
                    className={`absolute bottom-4 right-4 md:bottom-6 md:right-6 text-white border-b border-transparent hover:text-stone-300 hover:border-stone-300 transition-colors z-20 flex items-center space-x-1 duration-500 delay-100 cursor-pointer ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  >
                    <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] whitespace-nowrap uppercase drop-shadow-md">
                      {dish.shop}
                    </span>
                    <MapPin size={14} className="hidden md:block drop-shadow-md" />
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}