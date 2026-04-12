// src/views/HomeView.jsx

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { RECOMMEND_DISHES } from '../data/mockData';

export default function HomeView({ setActiveTab }) {
  return (
    <div className="animate-in fade-in duration-1000">
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-light text-[#1A1A1A] tracking-[0.1em] leading-[1.4] mb-8">
            讓素食成為一種時尚<br />且低門檻的選擇
          </h1>
          <h2 className="text-xl md:text-3xl font-light text-[#1A1A1A] tracking-[0.05em] mb-12">
            Make Vegan A Fashion & Accessible Choice
          </h2>
          <p className="text-sm md:text-base text-stone-500 leading-loose max-w-2xl font-medium tracking-wide mb-16">
            解決校園周邊「不知道吃什麼」的痛點，透過高品質視覺圖鑑與直觀步行導航，為 YZU 師生串聯健康與永續的每一餐。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24 w-full sm:w-auto">
            <button 
              onClick={() => setActiveTab('map')}
              className="w-full sm:w-auto px-10 py-4 bg-transparent border border-[#1A1A1A] text-[#1A1A1A] text-xs tracking-[0.2em] font-bold uppercase hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
            >
              開啟步行地圖
            </button>
            <button 
              onClick={() => setActiveTab('menu')}
              className="w-full sm:w-auto px-10 py-4 bg-[#1A1A1A] border border-[#1A1A1A] text-white text-xs tracking-[0.2em] font-bold uppercase hover:bg-transparent hover:text-[#1A1A1A] transition-all duration-300"
            >
              探索美味餐點
            </button>
          </div>
          <div className="w-full max-w-6xl mx-auto h-[50vh] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1600&auto=format&fit=crop" 
              alt="Healthy Vegan Food" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms]"
            />
          </div>
        </div>
      </section>

      <section className="py-24 overflow-hidden bg-[#1A1A1A] text-white mt-12">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
           <div>
             <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] mb-4">餐點推薦</h2>
             <p className="text-xs font-bold tracking-[0.3em] uppercase text-stone-500">Top Recommendations</p>
           </div>
           <button 
             onClick={() => setActiveTab('menu')}
             className="flex items-center text-xs tracking-[0.2em] font-bold text-stone-400 hover:text-white transition-colors uppercase pb-2 border-b border-stone-700 hover:border-white"
           >
             View All Menu <ArrowRight size={14} className="ml-2" />
           </button>
        </div>

        <div className="flex overflow-x-auto gap-8 px-6 md:px-12 pb-12 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {RECOMMEND_DISHES.map((dish, index) => (
            <div 
              key={dish.id} 
              className="flex-shrink-0 w-[260px] md:w-[320px] group cursor-pointer snap-center"
              onClick={() => setActiveTab('menu')}
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden mb-6 bg-stone-800">
                <img 
                  src={dish.img} 
                  alt={dish.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                />
                <div className="absolute top-0 left-0 bg-[#1A1A1A] text-white px-3 py-2 text-xs font-black tracking-widest">
                  0{index + 1}
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] text-stone-500 font-bold mb-2 uppercase tracking-[0.2em]">{dish.shop}</p>
                <h3 className="text-lg font-light tracking-[0.1em] text-white mb-4 group-hover:text-stone-300 transition-colors">{dish.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-widest text-stone-400">NT$ {dish.price}</span>
                  <ArrowRight size={16} className="text-stone-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}