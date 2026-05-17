// src/views/InfoView.jsx
import React, { useState } from 'react';
import { NUTRITION_TOPICS } from '../data/Data';

export default function InfoView() {
  const [activeTopicId, setActiveTopicId] = useState(NUTRITION_TOPICS[0].id);
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const activeTopic = NUTRITION_TOPICS.find((t) => t.id === activeTopicId) || NUTRITION_TOPICS[0];
  const activeThumb = activeTopic.thumbnails[activeThumbIndex] || activeTopic.thumbnails[0];

  // ==========================================
  // 🛠️ 【開發者自定義調整區】
  // ==========================================
  
  // --- 右側摩天輪結構設定 ---
  const ACTIVE_OFFSET_ANGLE = 25; 
  const ORBIT_RADIUS = '-60vmax';
  const LARGE_IMAGE_SIZE = '47vw';
  const RIGHT_CIRCLE_SIZE = '113vmax';
  const RIGHT_CIRCLE_TRANSLATE = 'translate(70.9%, 50%)';

  // --- 左側內容區塊佈局設定 (文字與縮圖) ---
  const LEFT_CONTENT_TOP = '10vh'; 
  const LEFT_CONTENT_LEFT = '6vw'; 
  const LEFT_CONTENT_MAX_WIDTH = '380px'; 
  
  // =========================================================================
  // ⏳ 🌟 【轉場時間 JS 控制器】
  // 這裡決定了點擊按鈕後，「等待多少毫秒」才把舊資料偷偷抽換成新資料。
  // 核心規範：這個數字「必須」與下方動態層的淡出時間（duration-500）保持完全同步！
  // =========================================================================
  const FADE_OUT_TIME = 500; // 👈 調整舊內容完全消失的等待時間（500 代表 0.5 秒）
  // =========================================================================

  const handleCategorySwitch = (newId) => {
    if (newId === activeTopicId) return;
    setIsFading(true); // 觸發淡出狀態
    
    setTimeout(() => {
      setActiveTopicId(newId);
      setActiveThumbIndex(0);
      setRotation(0); 
      setIsFading(false); // 撤銷淡出狀態，自動觸發淡入
    }, FADE_OUT_TIME); 
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
      // 🎨 【背景大畫布色彩動畫】
      // duration-1000 控制當切換類別時，全螢幕大底色「盲融變色」的速度（1000 = 1.0秒）
      className="relative w-full h-screen overflow-hidden transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: activeTopic.theme.canvas }}
    >
      
      {/* 🎨 【左側裝飾圓圈變色動畫】 */}
      {/* duration-1000 控制左側漸層圓變色的速度 */}
      <div 
        className="absolute top-1/2 left-0 w-[68vmax] h-[68vmax] rounded-full pointer-events-none z-0 transition-all duration-1000"
        style={{ 
          transform: 'translate(-34.4%, -74.1%)', 
          background: activeTopic.theme.circlePrimaryGradient 
        }}
      />

      {/* 🎨 【右下角裝飾圓圈變色動畫】 */}
      {/* duration-1000 控制右下實色圓變色的速度 */}
      <div 
        className="absolute bottom-0 right-0 rounded-full pointer-events-none z-0 transition-colors duration-1000 ease-in-out"
        style={{ 
          width: RIGHT_CIRCLE_SIZE, 
          height: RIGHT_CIRCLE_SIZE,
          transform: RIGHT_CIRCLE_TRANSLATE, 
          backgroundColor: activeTopic.theme.circleSecondary 
        }}
      />

      {/* =========================================================================
          🎬 🌟 【分離式網頁轉場核心動畫層】
          這裡包裹了所有會隨分類改變而「消失、浮現」的文字與圖片。
          透過下方的三元運算式，可以分別控制「淡出」與「淡入」的極致視覺細節：
         ========================================================================= */}
      <div 
        className={`absolute inset-0 w-full h-full transition-all ease-in-out ${
          isFading 
            ? 'opacity-20 scale-95 duration-500'    
            // 👆 【1. 淡出設定區（Fade-out）】
            // - `opacity-0`：控制淡出末段的初始透明度（0代表完全隱形，想做不完全淡出可改為 opacity-30）
            // - `duration-500`：控制舊文字/圖片縮小隱形的速度（0.5秒），需與最上方的 FADE_OUT_TIME 相同
            
            : 'opacity-100 scale-100 duration-1000' 
            // 👇 【2. 淡入設定區（Fade-in）】
            // - `duration-1000`：🌟 調整這裏可以改變新內容浮現的時間！
            //   若希望內容像煙霧一樣極度緩慢優雅地浮現，可以改為 `duration-1000` (1秒) 或 `duration-1500`
        }`}
      >
        {/* 🎡 【右側隱形摩天輪大轉盤】 */}
        {/* duration-1000 控制當點擊小縮圖時，大卡車圖片進行角度旋轉、甩動的速度（1000 = 1秒） */}
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
                {/* 🖼️ 【餐點大圖片自身動畫】 */}
                {/* duration-1000 控制圖片被轉到正中央時「放大變亮」以及被轉走時「縮小變暗」的微互動耗時 */}
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

        {/* 左側文字與縮圖內容區 */}
        <div 
          className="absolute z-20 flex flex-col pointer-events-none"
          style={{ top: LEFT_CONTENT_TOP, left: LEFT_CONTENT_LEFT }}
        >
          <div className="pointer-events-auto" style={{ maxWidth: LEFT_CONTENT_MAX_WIDTH }}>
            <h1 className="text-[4rem] font-bold text-white mb-3 tracking-widest drop-shadow-lg">
              {activeThumb.alt}
            </h1>
            <p className="text-[1rem] text-white/90 leading-[2] tracking-[0.15em] text-justify mb-6">
              {activeTopic.description}
            </p>

            {/* 🎯 【左側 6 顆餐點小縮圖網格】 */}
            <div className="grid grid-cols-3 gap-x-3 gap-y-6 w-max">
              {activeTopic.thumbnails.map((thumb, i) => {
                const isActive = i === activeThumbIndex;
                return (
                  <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => handleThumbClick(i)}>
                    {/* duration-500 控制滑鼠移入(Hover)或選取縮圖時，小圖案微幅放大的彈性反饋速度 */}
                    <div className="w-[70px] h-[70px] transition-all duration-500 ease-out flex items-center justify-center">
                      <img 
                        src={thumb.src} 
                        alt={thumb.alt} 
                        className={`max-w-full max-h-full object-contain transition-all duration-500 ${
                          isActive ? 'scale-110 drop-shadow-[0_10px_15px_rgba(255,255,255,0.2)]' : 'opacity-60 group-hover:opacity-100 group-hover:scale-105'
                        }`} 
                      />
                    </div>
                    {/* duration-500 控制小縮圖下方白色焦點橫線「向兩側平滑伸展」的過渡時間 */}
                    <div className={`h-[2px] bg-white transition-all duration-500 ${isActive ? 'w-[70%] opacity-100' : 'w-0 opacity-0'}`} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 🖱️ 【最下方三大分類切換按鈕】 */}
      {/* 💡 注意：放在內容動畫層外面，切換時按鈕才不會跟著一起變透明消失，視覺極度扎實 */}
      <div className="absolute bottom-[8vh] left-[6vw] flex gap-4 z-30">
        {NUTRITION_TOPICS.map((topic) => {
          const isCategoryActive = topic.id === activeTopicId;
          return (
            <button
              key={topic.id}
              onClick={() => handleCategorySwitch(topic.id)}
              // duration-400 控制滑鼠懸停(Hover)或選取切換時，膠囊按鈕「黑白灰顏色切換與陰影浮起」的物理耗時
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