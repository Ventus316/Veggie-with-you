// src/views/HomeView.jsx

import React from 'react';

export default function HomeView({ setActiveTab }) {
  return (
    // 🌟 核心修改 1：加入 min-h-[calc(100vh-140px)] 與 flex flex-col justify-center
    // 這樣可以扣除導航欄 (140px) 的高度，讓整個區塊在螢幕中「完美垂直置中」
    <div className="animate-in fade-in duration-1000 min-h-[calc(100vh-140px)] flex flex-col justify-center pb-12">
      
      {/* 移除了原本寫死的 pt-24，讓外層的 flex 自動幫我們排版置中 */}
      <section className="px-6 pt-8">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          
          {/* ==========================================
              🛠️ 調整指南：你可以修改 mb- 後面的數字來控制間距
              ========================================== */}
              
          {/* 1. 【主標題】：mb-8 控制與下方英文副標的距離 */}
          <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-light text-[#1A1A1A] tracking-[0.1em] leading-[1.4] mb-6">
            讓素食成為一種時尚<br />且低門檻的選擇
          </h1>
          
          {/* 2. 【英文副標】：mb-12 控制與下方內文的距離 */}
          <h2 className="text-xl md:text-3xl font-light text-[#1A1A1A] tracking-[0.05em] mb-8">
            Make Vegan A Fashion & Accessible Choice
          </h2>

          {/* 4. 【按鈕區】 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
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
          
          {/* 3. 【內文】：mb-16 控制與下方按鈕的距離 */}
          <p className="text-sm md:text-base text-stone-500 leading-loose max-w-2xl font-medium tracking-wide pt-8">
            解決校園周邊「不知道吃什麼」的痛點，透過高品質視覺圖鑑與直觀步行導航，為 YZU 師生串聯健康與永續的每一餐。
          </p>  
        </div>
      </section>

    </div>
  );
}