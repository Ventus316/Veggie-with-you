// src/views/InfoView.jsx
import React, { useState } from 'react';
import { NUTRITION_TOPICS } from '../data/mockData';

export default function InfoView() {
  const [activeTopicId, setActiveTopicId] = useState(NUTRITION_TOPICS[0].id);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const activeTopic = NUTRITION_TOPICS.find((t) => t.id === activeTopicId) || NUTRITION_TOPICS[0];
  const activeThumb = activeTopic.thumbnails[activeThumbIndex] || activeTopic.thumbnails[0];

  // ==========================================
  // 🛠️ 【開發者自定義調整區】 🛠️
  // 後續你可以直接改這裡的數字來微調畫面！
  // ==========================================
  
  // --- 右側摩天輪設定 ---
  const ACTIVE_OFFSET_ANGLE = 25; 
  const ORBIT_RADIUS = '-60vmax';
  const LARGE_IMAGE_SIZE = '47vw';
  const RIGHT_CIRCLE_SIZE = '113vmax';
  const RIGHT_CIRCLE_TRANSLATE = 'translate(70.9%, 50%)';

  // --- 左側內容區塊設定 (文字與縮圖) ---
  // 1. 內容區塊距離上方的距離 (稍微調小可以往上拉)
  const LEFT_CONTENT_TOP = '10vh'; 
  
  // 2. 內容區塊距離左側的距離 (稍微調小可以往左拉)
  const LEFT_CONTENT_LEFT = '6vw'; 
  
  // 3. 內容區塊的最大寬度 (調小可以避免文字或縮圖跑到圓形外面)
  const LEFT_CONTENT_MAX_WIDTH = '380px'; 
  // ==========================================

  const handleCategorySwitch = (newId) => {
    if (newId === activeTopicId) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveTopicId(newId);
      setActiveThumbIndex(0);
      setRotation(0); 
      setIsFading(false);
    }, 500); 
  };

  const handleThumbClick = (i) => {
    if (i === activeThumbIndex) return;
    let diff = i - activeThumbIndex;
    if (diff > 3) diff -= 6;
    if (diff < -3) diff += 6;
    setRotation(prev => prev - diff * 60);
    setActiveThumbIndex(i);
  };

  return (
    <div 
      className={`relative w-full h-screen overflow-hidden transition-all duration-500 ease-in-out ${
        isFading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
      style={{ backgroundColor: activeTopic.theme.canvas }}
    >
      
      {/* 背景 1：左側接邊圓 (保留你的設定，不作更動) */}
      <div 
        className="absolute top-1/2 left-0 w-[68vmax] h-[68vmax] rounded-full pointer-events-none z-0"
        style={{ 
          transform: 'translate(-34.4%, -74.1%)', 
          background: activeTopic.theme.circlePrimaryGradient 
        }}
      />

      {/* 背景 2：右下角接邊圓 */}
      <div 
        className="absolute bottom-0 right-0 rounded-full pointer-events-none z-0 transition-colors duration-500"
        style={{ 
          width: RIGHT_CIRCLE_SIZE, 
          height: RIGHT_CIRCLE_SIZE,
          transform: RIGHT_CIRCLE_TRANSLATE, 
          backgroundColor: activeTopic.theme.circleSecondary 
        }}
      />

      {/* 互動核心：右側隱形摩天輪 */}
      <div 
        className="absolute bottom-0 right-0 rounded-full transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] z-10 pointer-events-none"
        style={{ 
          width: RIGHT_CIRCLE_SIZE, 
          height: RIGHT_CIRCLE_SIZE,
          transform: `${RIGHT_CIRCLE_TRANSLATE} rotate(${rotation + ACTIVE_OFFSET_ANGLE}deg)` 
        }}
      >
        {activeTopic.thumbnails.map((thumb, i) => {
          return (
            <div 
              key={i}
              className="absolute top-1/2 left-1/2"
              style={{
                width: LARGE_IMAGE_SIZE,
                height: LARGE_IMAGE_SIZE,
                marginLeft: `calc(-1 * ${LARGE_IMAGE_SIZE} / 2)`, 
                marginTop: `calc(-1 * ${LARGE_IMAGE_SIZE} / 2)`,
                transform: `rotate(${i * 60}deg) translateX(${ORBIT_RADIUS}) rotate(${-i * 60}deg) rotate(${-(rotation + ACTIVE_OFFSET_ANGLE)}deg)`
              }}
            >
              <img 
                src={thumb.src} 
                alt={thumb.alt} 
                className={`w-full h-full object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.4)] transition-all duration-1000 ${
                  i === activeThumbIndex ? 'scale-100 opacity-100' : 'scale-[0.6] opacity-30'
                }`}
              />
            </div>
          )
        })}
      </div>

      {/* 左側內容區 (套用新的自定義變數) */}
      <div 
        className="absolute z-20 flex flex-col pointer-events-none"
        style={{ top: LEFT_CONTENT_TOP, left: LEFT_CONTENT_LEFT }}
      >
        
        <div className="pointer-events-auto" style={{ maxWidth: LEFT_CONTENT_MAX_WIDTH }}>
          <h1 className="text-[4rem] font-bold text-white mb-3 tracking-widest drop-shadow-lg">
            {activeThumb.alt}
          </h1>
          {/* 調整文字大小與行距，讓版面更緊湊 */}
          <p className="text-[1rem] text-white/90 leading-[2] tracking-[0.15em] text-justify mb-6">
            {activeTopic.description}
          </p>

          {/* 縮圖網格：縮小間距 (gap) 與圖示尺寸，確保不超邊界 */}
          <div className="grid grid-cols-3 gap-x-3 gap-y-6 w-max">
            {activeTopic.thumbnails.map((thumb, i) => {
              const isActive = i === activeThumbIndex;
              return (
                <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => handleThumbClick(i)}>
                  <div className="w-[70px] h-[70px] transition-all duration-500 ease-out flex items-center justify-center">
                    <img 
                      src={thumb.src} 
                      alt={thumb.alt} 
                      className={`max-w-full max-h-full object-contain transition-all duration-500 ${
                        isActive ? 'scale-110 drop-shadow-[0_10px_15px_rgba(255,255,255,0.2)]' : 'opacity-60 group-hover:opacity-100 group-hover:scale-105'
                      }`} 
                    />
                  </div>
                  <div className={`h-[2px] bg-white transition-all duration-500 ${isActive ? 'w-[70%] opacity-100' : 'w-0 opacity-0'}`} />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 左下角：分類切換按鈕 */}
      <div className="absolute bottom-[8vh] left-[6vw] flex gap-4 z-30">
        {NUTRITION_TOPICS.map((topic) => {
          const isCategoryActive = topic.id === activeTopicId;
          return (
            <button
              key={topic.id}
              onClick={() => handleCategorySwitch(topic.id)}
              className={`py-2.5 px-8 rounded-full text-base tracking-[0.2em] font-bold transition-all duration-400 border-none cursor-pointer ${
                isCategoryActive 
                  ? 'bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] scale-105' 
                  : 'bg-[rgba(255,255,255,0.15)] text-white hover:bg-[rgba(255,255,255,0.25)] backdrop-blur-md'
              }`}
            >
              {topic.tabLabel}
            </button>
          )
        })}
      </div>

    </div>
  );
}