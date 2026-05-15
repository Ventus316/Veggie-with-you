import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  MapPin, 
  Star, 
  Info, 
  ArrowRight, 
  Utensils, 
  X 
} from 'lucide-react';

export default function ShopDetailView({ shop, setActiveTab }) {
  const [selectedMenu, setSelectedMenu] = useState(null);

  useEffect(() => {
    if (!shop) {
      setActiveTab('shops');
    }
  }, [shop, setActiveTab]);

  if (!shop) return null; 

  const getHighResImg = (url, size = '1200') => {
    return url ? url.replace('w=200', `w=${size}`).replace('w=800', `w=${size}`) : '';
  };

  const displayMainImg = getHighResImg(shop.menuImg, '1200') || 
                         getHighResImg(shop.img, '1200') || 
                         "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop";
  
  const extractedImgs = shop.recommendations?.map(dish => getHighResImg(dish.img, '800')).filter(Boolean) || [];
  const displayMealImgs = [
    extractedImgs[0] || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    extractedImgs[1] || extractedImgs[0] || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"
  ];

  // 資料防呆與距離文字化
  const features = shop.features || {};
  const recommendations = shop.recommendations || [];
  const distanceText = shop.distance 
    ? `步行 ${shop.distance.walking} 分 / 機車 ${shop.distance.scooter} 分`
    : '-- 分鐘';

  // 定義特色說明的中文標籤對應表
  const featureLabels = {
    portion: '份量',
    environment: '環境',
    restroom: '洗手間',
    payment: '付款方式',
    reservation: '訂位規則',
    aesthetics: '餐點美觀'
  };

  return (
    <div className="py-12 px-36 max-w-6xl mx-auto min-h-screen animate-in fade-in duration-1000">
      
      {/* 頂部：返回按鈕 */}
      <button 
        onClick={() => setActiveTab('shops')} 
        className="flex items-center text-xs font-bold tracking-[0.2em] text-stone-400 hover:text-[#1A1A1A] uppercase mb-10 transition-colors group cursor-pointer"
      >
        <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" /> 返回列表
      </button>

      {/* 標題與簡介 */}
      <div className="mb-12 border-b border-stone-200 pb-8">
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.15em] text-[#1A1A1A] mb-6">{shop.name}</h1>
        <div className="flex flex-wrap items-center text-xs font-bold tracking-[0.1em] text-stone-500 gap-6">
          <span className="px-3 py-1 border border-[#1A1A1A] text-[#1A1A1A] uppercase">{shop.type || '素食'}</span>
          <span className="flex items-center"><MapPin size={14} className="mr-1.5"/> {distanceText}</span>
          <span className="flex items-center"><Star size={14} className="mr-1.5 text-[#1A1A1A]" fill="currentColor"/> {shop.rating || '4.0'} ({shop.reviews || '0'})</span>
        </div>
      </div>

      {/* 圖片展示區 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="md:col-span-2 relative aspect-[16/9] md:aspect-auto rounded-xl overflow-hidden shadow-sm bg-stone-200">
          <img src={displayMainImg} alt="主視覺" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]" />
          <span className="absolute top-4 left-4 bg-[#1A1A1A]/80 backdrop-blur text-white text-[10px] px-3 py-1.5 tracking-widest font-bold uppercase shadow-sm">
            {shop.menuImg ? '精選菜單' : '店家視覺'}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
          {displayMealImgs.map((imgUrl, i) => (
            <div key={i} className="relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-stone-200">
              <img src={imgUrl} alt="特色" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]" />
            </div>
          ))}
        </div>
      </div>

      {/* 資訊內容區 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* 左側：詳細資訊清單 (價位區間、聯絡電話、營業時間) */}
        <div className="lg:col-span-1 space-y-12">
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-6 flex items-center border-b border-stone-200 pb-3">
               <Info size={16} className="mr-2"/> 詳細資訊
            </h3>
            <ul className="space-y-4 text-sm text-[#1A1A1A] tracking-widest font-medium">
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">素食類別</span> <span>{shop.type || '--'}</span></li>
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">價位區間</span> <span>{shop.priceRange || '--'}</span></li>
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">聯絡電話</span> <span>{shop.phone || '--'}</span></li>
              {/* 營業時間 (改為左右排版、資料靠右對齊) */}
              <li className="flex justify-between items-start border-b border-stone-100 pb-3 pt-2">
                <span className="text-stone-500 whitespace-nowrap mr-4 pt-2">營業時間</span>
                
                <div className="space-y-6 flex flex-col items-end">
                  {(() => {
                    // 1. 將相同營業時間的日子整理在一起 (Hash Map)
                    const groupedMap = {};
                    shop.open?.forEach((item) => {
                      if (!groupedMap[item.time]) {
                        groupedMap[item.time] = [];
                      }
                      groupedMap[item.time].push(item.day);
                    });

                    // 2. 將整理好的資料轉回陣列來渲染
                    return Object.entries(groupedMap).map(([timeStr, daysArray], gIdx) => (
                      <div key={gIdx} className="flex flex-col items-end">
                        
                        {/* 第一行：將同樣時間的「日期 Icon」橫向並排，靠右對齊 (justify-end) */}
                        <div className="flex gap-2 mb-2 justify-end">
                          {daysArray.map((day, dIdx) => (
                            <div key={dIdx} className="w-8 h-8 flex items-center justify-center">
                              <img 
                                src={`/images/icons/day_${day}.png`} // 替換為你的圖片路徑
                                alt={day} 
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.parentNode.innerHTML = `<span class="w-8 h-8 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[11px]">${day}</span>`;
                                }}
                              />
                            </div>
                          ))}
                        </div>

                        {/* 第二行：顯示時間或公休 Icon，靠右對齊 */}
                        <div className="flex justify-end w-full">
                          {timeStr === '休息' ? (
                            <div className="h-8 flex items-center justify-end">
                              <img 
                                src="/images/icons/closed_status.png" // 替換為你的公休圖片
                                alt="公休" 
                                className="h-6 object-contain"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.parentNode.innerHTML = `<span class="text-stone-500 font-bold tracking-widest text-sm bg-stone-200 px-2 py-1 rounded">公休</span>`;
                                }}
                              />
                            </div>
                          ) : (
                            <div className="text-sm font-bold tracking-widest text-stone-600 text-right">
                              {timeStr.split('\n').map((line, i) => (
                                <span key={i} className="block">{line}</span>
                              ))}
                            </div>
                          )}
                        </div>

                      </div>
                    ));
                  })()}
                </div>
              </li>
            </ul>
          </div>

          <button
            onClick={() => shop.menuImg && setSelectedMenu(shop.menuImg)}
            disabled={!shop.menuImg}
            className={`w-full py-4 text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center space-x-2 ${
              shop.menuImg ? 'bg-[#1A1A1A] hover:bg-stone-700 cursor-pointer' : 'bg-stone-300 cursor-not-allowed'
            }`}
          >
            <span>{shop.menuImg ? '查看線上菜單' : '暫無線上菜單'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 右側：店家特色說明 (動態匯入包含付款、洗手間等) */}
        <div className="lg:col-span-2 space-y-16">
          
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-6 flex items-center border-b border-stone-200 pb-3">
               <Star size={16} className="mr-2"/> 店家特色說明
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
               {/* 將 shop.features 物件內的所有屬性自動轉換為卡片 */}
               {Object.entries(features).map(([key, value]) => (
                  value ? (
                    <div key={key} className="bg-white p-6 border border-stone-200 shadow-sm rounded-xl hover:shadow-md transition-shadow">
                      <h4 className="text-[10px] font-black tracking-widest text-[#1A1A1A] mb-3 uppercase">
                        {featureLabels[key] || key}
                      </h4>
                      <p className="text-sm text-stone-500 leading-loose font-medium">{value}</p>
                    </div>
                  ) : null
               ))}
            </div>
          </div>

          {/* 推薦餐點 */}
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-6 flex items-center border-b border-stone-200 pb-3">
               <Utensils size={16} className="mr-2"/> 推薦餐點資訊
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {recommendations.map((dish, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 bg-white border border-stone-200 shadow-sm rounded-xl hover:border-[#1A1A1A] transition-all">
                     <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-stone-200">
                        {dish.img && <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" />}
                     </div>
                     <div className="flex flex-col justify-center">
                        <span className="text-sm font-bold text-[#1A1A1A] tracking-[0.15em] mb-2">{dish.name}</span>
                        <span className="text-xs font-bold text-stone-400 tracking-wider">NT$ {dish.price || '--'}</span>
                     </div>
                  </div>
               ))}
            </div>
          </div>
        </div>

      </div>

      {/* 線上菜單放大燈箱 */}
      {selectedMenu && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1A1A1A]/95 backdrop-blur-sm p-6 animate-in fade-in duration-300" onClick={() => setSelectedMenu(null)}>
          <div className="relative max-w-2xl w-full h-[80vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedMenu(null)} className="absolute -top-12 right-0 text-white hover:text-stone-400 transition-colors flex items-center space-x-2 text-[10px] tracking-[0.2em] uppercase font-bold cursor-pointer">
              <span>Close</span> <X size={18} />
            </button>
            <div className="w-full h-full bg-[#F6F6F4] p-2 overflow-hidden shadow-2xl border border-stone-800">
              <img src={selectedMenu} className="w-full h-full object-contain" alt="線上完整菜單" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}