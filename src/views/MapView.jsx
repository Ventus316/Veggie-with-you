// src/views/MapView.jsx

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Star, Utensils, MapPin, Clock, Search } from 'lucide-react';
import { RESTAURANTS } from '../data/mockData';

export default function MapView({ selectedShop, setSelectedShop }) {
  const [filterTime, setFilterTime] = useState('15');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const filteredShops = RESTAURANTS.filter(shop => {
    if (filterTime !== '全部' && shop.distance > parseInt(filterTime)) return false;
    if (searchQuery && !shop.name.includes(searchQuery) && !shop.type.includes(searchQuery)) return false;
    return true;
  });

  return (
    <div className="relative w-full h-full bg-[#E5E3DF] overflow-hidden flex animate-in fade-in duration-700">
      <div 
        className={`absolute top-0 left-0 h-full w-full md:w-[400px] bg-white shadow-[4px_0_24px_rgba(0,0,0,0.1)] z-40 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-1/2 -right-6 w-6 h-14 bg-white border border-stone-200 border-l-0 rounded-r-md flex items-center justify-center shadow-sm text-stone-400 hover:text-[#1A1A1A] z-50 transition-colors"
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {selectedShop ? (
          <div className="flex-1 flex flex-col bg-white overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="relative w-full h-56 flex-shrink-0">
              <img src={selectedShop.img} className="w-full h-full object-cover" alt={selectedShop.name}/>
              <button 
                onClick={() => setSelectedShop(null)} 
                className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#1A1A1A] hover:bg-white shadow-sm transition-transform hover:scale-110"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h2 className="text-2xl font-black text-[#1A1A1A] mb-1">{selectedShop.name}</h2>
              <div className="flex items-center text-sm mb-4">
                <span className="font-bold text-[#1A1A1A] mr-1">{selectedShop.rating}</span>
                <div className="flex text-amber-500 mr-2">
                  {[...Array(5)].map((_,i) => <Star key={i} size={14} fill="currentColor"/>)}
                </div>
                <span className="text-stone-500">({selectedShop.reviews}) · $1-200</span>
              </div>
              <div className="flex space-x-6 border-b border-stone-200 text-sm font-bold text-stone-500 mb-6">
                <span className="text-emerald-700 border-b-2 border-emerald-700 pb-2">總覽</span>
                <span className="pb-2 hover:text-stone-800 cursor-pointer">菜單</span>
              </div>
              <div className="space-y-4 text-sm text-stone-700 border-t border-stone-100 pt-6">
                <div className="flex items-start space-x-3">
                  <div className="w-5 text-center mt-0.5"><Utensils size={18} className="text-stone-400" /></div>
                  <div className="flex items-center text-stone-600">
                    <span className="font-bold text-emerald-700 mr-2">{selectedShop.type}</span> · 內用 · 外帶
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 text-center mt-0.5"><MapPin size={18} className="text-stone-400" /></div>
                  <div>距離校門步行 {selectedShop.distance} 分鐘</div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 text-center mt-0.5"><Clock size={18} className="text-stone-400" /></div>
                  <div><span className="text-emerald-600 font-bold mr-2">營業中</span> · 打烊時間: {selectedShop.open.split(' - ')[1] || '20:00'}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            <div className="p-4 border-b border-stone-100 flex-shrink-0 z-10 bg-white">
               <div className="flex items-center bg-white border border-stone-200 shadow-sm rounded-full px-4 py-2.5 mb-3 focus-within:shadow-md transition-shadow">
                 <Search size={18} className="text-stone-400 mr-3 flex-shrink-0" />
                 <input 
                   type="text" 
                   placeholder="搜尋蔬食店家、分類..." 
                   className="flex-1 bg-transparent text-sm font-medium text-[#1A1A1A] focus:outline-none placeholder-stone-400" 
                   value={searchQuery} 
                   onChange={e => setSearchQuery(e.target.value)}
                 />
                 {searchQuery && <X size={18} className="text-stone-400 cursor-pointer" onClick={() => setSearchQuery('')}/>}
               </div>
               <div className="flex space-x-2 overflow-x-auto no-scrollbar">
                 <div className="flex items-center border border-stone-200 rounded-full px-3 py-1.5 text-xs text-stone-600 bg-white">
                   <Clock size={12} className="mr-1.5 text-stone-400"/>
                   <select 
                     className="bg-transparent focus:outline-none font-bold cursor-pointer"
                     value={filterTime}
                     onChange={(e) => setFilterTime(e.target.value)}
                   >
                     <option value="全部">不限距離</option>
                     <option value="15">步行 15分內</option>
                     <option value="10">步行 10分內</option>
                     <option value="5">步行 5分內</option>
                   </select>
                 </div>
               </div>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
               {filteredShops.map(shop => (
                 <div 
                   key={shop.id} 
                   className="p-5 border-b border-stone-100 flex cursor-pointer hover:bg-stone-50 transition-colors" 
                   onClick={() => setSelectedShop(shop)}
                 >
                    <div className="flex-1 pr-4">
                      <h3 className="font-bold text-[#1A1A1A] text-base mb-1">{shop.name}</h3>
                      <div className="flex items-center text-[11px] text-stone-500 mb-1.5">
                        <span className="text-[#1A1A1A] font-bold mr-1">{shop.rating}</span>
                        <div className="flex text-amber-500 mr-1">
                          {[...Array(5)].map((_,i) => <Star key={i} size={10} fill="currentColor"/>)}
                        </div>
                      </div>
                      <div className="text-[11px] text-stone-500 mb-1">
                        <span className="text-emerald-700 font-bold">{shop.type}</span> · 步行 {shop.distance}m
                      </div>
                    </div>
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-stone-100">
                      <img src={shop.img} className="w-full h-full object-cover" alt={shop.name}/>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 relative bg-[#E8EAED]">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute top-[45%] left-[55%] z-10 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-10 h-10 bg-emerald-600 rounded-full shadow-lg border-[3px] border-white flex items-center justify-center text-white mb-1">
            <span className="text-[10px] font-black">YZU</span>
          </div>
          <span className="bg-white/80 backdrop-blur px-2 py-0.5 rounded shadow text-[9px] font-bold text-[#1A1A1A]">元智大學</span>
        </div>
        {filteredShops.map(r => (
          <div 
            key={r.id}
            className="absolute cursor-pointer transition-all z-20 group"
            style={{ 
              top: `${45 + (r.distance % 2 === 0 ? 1 : -1) * (r.distance * 1.5)}%`, 
              left: `${55 + (r.id % 2 === 0 ? 1 : -1) * (r.distance * 2)}%` 
            }}
            onClick={() => { setSelectedShop(r); setIsSidebarOpen(true); }}
          >
            <div className="flex flex-col items-center relative">
              <div className={`px-2 py-1 rounded-md shadow-md text-[10px] font-bold mb-1 transition-colors ${selectedShop?.id === r.id ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#1A1A1A]'}`}>
                {r.name}
              </div>
              <MapPin 
                size={24} 
                className={`${selectedShop?.id === r.id ? 'text-[#1A1A1A] scale-110' : 'text-emerald-600'} drop-shadow-sm transition-all`} 
                fill={selectedShop?.id === r.id ? '#1A1A1A' : '#ffffff'}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}