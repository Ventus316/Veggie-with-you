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

  if (!shop) {
    return null; 
  }

  // ==========================================
  // 資料動態解析機制 (不依賴修改 mockData)
  // ==========================================
  
  // 工具：將 Unsplash 縮圖替換為高畫質圖片
  const getHighResImg = (url, size = '1200') => {
    return url ? url.replace('w=200', `w=${size}`).replace('w=800', `w=${size}`) : '';
  };

  // 1. 【修改重點】主視覺圖片：優先使用 shop.menuImg 作為 Hero Image
  const displayMainImg = getHighResImg(shop.menuImg, '1200') || 
                         getHighResImg(shop.img, '1200') || 
                         "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200&auto=format&fit=crop";
  
  // 2. 特色餐點側邊圖：從推薦餐點陣列中提取圖片
  const extractedImgs = shop.recommendations?.map(dish => getHighResImg(dish.img, '800')).filter(Boolean) || [];
  const displayMealImgs = [
    extractedImgs[0] || "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
    extractedImgs[1] || extractedImgs[0] || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"
  ];

  // 3. 文字欄位防呆處理
  const paymentMethods = shop.payment || ['現金', 'LINE Pay'];
  const priceRange = shop.priceRange || '約 NT$ 50 - 150';
  const hasReservation = shop.reservation !== undefined ? shop.reservation : false;
  const hasRestroom = shop.restroom !== undefined ? shop.restroom : true;

  const features = shop.features || { 
    portion: '提供適合學生族群的適中份量，兼顧健康與飽足感，CP值高。', 
    aesthetics: '餐點擺盤用心，以豐富的自然色彩呈現蔬食美感，適合拍照。', 
    environment: '用餐環境舒適整潔，非常適合下課後與朋友聚餐或討論報告。' 
  };
  const recommendations = shop.recommendations || [];

  return (
    <div className="py-12 px-6 max-w-6xl mx-auto min-h-screen animate-in fade-in duration-1000">
      
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
          <span className="flex items-center"><MapPin size={14} className="mr-1.5"/> 步行 {shop.distance || '--'} 分鐘</span>
          <span className="flex items-center"><Star size={14} className="mr-1.5 text-[#1A1A1A]" fill="currentColor"/> {shop.rating || '4.0'} ({shop.reviews || '0'})</span>
        </div>
      </div>

      {/* 圖片展示區 (主視覺改用 menuImg + 特色餐點) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="md:col-span-2 relative aspect-[16/9] md:aspect-auto rounded-xl overflow-hidden shadow-sm bg-stone-200">
          <img 
            src={displayMainImg} 
            alt={`${shop.name} 菜單視覺`} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]" 
          />
          <span className="absolute top-4 left-4 bg-[#1A1A1A]/80 backdrop-blur text-white text-[10px] px-3 py-1.5 tracking-widest font-bold uppercase shadow-sm">
            {shop.menuImg ? '精選菜單' : '店家視覺'}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
          {displayMealImgs.map((imgUrl, i) => (
            <div key={i} className="relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-stone-200">
              <img src={imgUrl} alt={`特色餐點 ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]" />
              <span className="absolute top-4 left-4 bg-[#1A1A1A]/80 backdrop-blur text-white text-[10px] px-3 py-1.5 tracking-widest font-bold uppercase shadow-sm">特色餐點</span>
            </div>
          ))}
        </div>
      </div>

      {/* 資訊內容區 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* 左側：詳細資訊清單 & 完整菜單按鈕 */}
        <div className="lg:col-span-1 space-y-12">
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-6 flex items-center border-b border-stone-200 pb-3">
               <Info size={16} className="mr-2"/> 詳細資訊
            </h3>
            <ul className="space-y-4 text-sm text-[#1A1A1A] tracking-widest font-medium">
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">素食類別</span> <span>{shop.type || '--'}</span></li>
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">價位區間</span> <span>{priceRange}</span></li>
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">營業時間</span> <span>{shop.open || '--'}</span></li>
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">付款方式</span> <span>{paymentMethods.join('、')}</span></li>
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">可否訂位</span> <span>{hasReservation ? '可訂位' : '現場候位'}</span></li>
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">洗手間</span> <span>{hasRestroom ? '有提供' : '無提供'}</span></li>
            </ul>
          </div>

          <button
            onClick={() => shop.menuImg && setSelectedMenu(shop.menuImg)}
            disabled={!shop.menuImg}
            className={`w-full py-4 text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center space-x-2 ${
              shop.menuImg ? 'bg-[#1A1A1A] hover:bg-stone-700 cursor-pointer' : 'bg-stone-300 cursor-not-allowed'
            }`}
          >
            <span>{shop.menuImg ? '查看完整菜單' : '暫無線上菜單'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 右側：店家特色與推薦餐點 */}
        <div className="lg:col-span-2 space-y-16">
          
          {/* 特色說明 */}
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-6 flex items-center border-b border-stone-200 pb-3">
               <Star size={16} className="mr-2"/> 店家特色說明
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <div className="bg-white p-6 border border-stone-200 shadow-sm rounded-xl">
                  <h4 className="text-[10px] font-black tracking-widest text-[#1A1A1A] mb-3 uppercase">份量</h4>
                  <p className="text-sm text-stone-500 leading-loose font-medium">{features.portion}</p>
               </div>
               <div className="bg-white p-6 border border-stone-200 shadow-sm rounded-xl">
                  <h4 className="text-[10px] font-black tracking-widest text-[#1A1A1A] mb-3 uppercase">美觀</h4>
                  <p className="text-sm text-stone-500 leading-loose font-medium">{features.aesthetics}</p>
               </div>
               <div className="bg-white p-6 border border-stone-200 shadow-sm rounded-xl">
                  <h4 className="text-[10px] font-black tracking-widest text-[#1A1A1A] mb-3 uppercase">環境</h4>
                  <p className="text-sm text-stone-500 leading-loose font-medium">{features.environment}</p>
               </div>
            </div>
          </div>

          {/* 推薦餐點 */}
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-6 flex items-center border-b border-stone-200 pb-3">
               <Utensils size={16} className="mr-2"/> 推薦餐點資訊
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {recommendations.map((dish, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 bg-white border border-stone-200 shadow-sm rounded-xl hover:shadow-md hover:border-[#1A1A1A] transition-all">
                     <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-stone-200">
                        {dish.img && <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" />}
                     </div>
                     <div className="flex flex-col justify-center flex-grow">
                        <span className="text-sm font-bold text-[#1A1A1A] tracking-[0.15em] mb-2">{dish.name}</span>
                        <span className="text-xs font-bold text-stone-400 tracking-wider">NT$ {dish.price}</span>
                     </div>
                  </div>
               ))}
               
               {recommendations.length === 0 && (
                 <p className="text-sm text-stone-400">目前暫無推薦餐點資料</p>
               )}
            </div>
          </div>
        </div>

      </div>

      {/* 線上菜單放大燈箱 (Modal) */}
      {selectedMenu && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1A1A1A]/95 backdrop-blur-sm p-6 animate-in fade-in duration-300" onClick={() => setSelectedMenu(null)}>
          <div className="relative max-w-2xl w-full h-[80vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedMenu(null)}
              className="absolute -top-12 right-0 text-white hover:text-stone-400 transition-colors flex items-center space-x-2 text-[10px] tracking-[0.2em] uppercase font-bold cursor-pointer"
            >
              <span>Close</span> <X size={18} />
            </button>
            <div className="w-full h-full bg-[#F6F6F4] p-2 overflow-hidden shadow-2xl border border-stone-800">
              <img 
                src={selectedMenu} 
                className="w-full h-full object-contain" 
                alt="線上完整菜單" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}