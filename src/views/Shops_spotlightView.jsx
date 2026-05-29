// src/views/Shops_testView.jsx
import React, { useEffect, useState, useRef } from 'react';
import { Clock, Leaf } from 'lucide-react';
import useShopFilters from '../hooks/useShopFilters';
import FadeInCard from '../components/ui/FadeInCard_shops';
import { SORT_ICONS } from '../data/Data';

const TRANSPORT_LABELS = { walking: '步行', bicycle: '腳踏車', scooter: '機車', transit: '大眾運輸' };

export default function Shops_testView({ setSelectedShop, setActiveTab }) {
  const { filterTransport, setFilterTransport, filterTime, setFilterTime, filteredShops } = useShopFilters();
  
  const [hoveredShopId, setHoveredShopId] = useState(null);
  const gridWrapperRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const [filterStatus, setFilterStatus] = useState('all');

  const handleMouseMove = (e) => {
    if (!gridWrapperRef.current) return;
    const rect = gridWrapperRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseLeave = () => setHoveredShopId(null);

  useEffect(() => {
    const headerEl = document.querySelector('header');
    if (headerEl) headerEl.style.opacity = hoveredShopId ? '0.4' : '1';
    return () => { if (headerEl) headerEl.style.opacity = '1'; };
  }, [hoveredShopId]);

  const handleShopClick = (shopData) => {
    sessionStorage.setItem('scroll_pos_shops', window.scrollY.toString());
    setSelectedShop(shopData);
    setActiveTab('shopDetail');
  };

  const getRealTimeStatus = (openData) => {
    if (!openData || !Array.isArray(openData)) return { text: '未知', isOpen: false };
    const daysMap = ['日', '一', '二', '三', '四', '五', '六'];
    const now = new Date();
    const todayStr = daysMap[now.getDay()];
    const todaySchedule = openData.find(item => item.day === todayStr);
    if (!todaySchedule || todaySchedule.time === '休息') return { text: '公休', isOpen: false };
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    for (const range of todaySchedule.time.split('\n')) {
      const [startStr, endStr] = range.split('-');
      if (!startStr || !endStr) continue;
      const [startH, startM] = startStr.split(':').map(Number);
      const [endH, endM] = endStr.split(':').map(Number);
      if (currentMinutes >= startH * 60 + startM && currentMinutes <= endH * 60 + endM) {
        return { text: '營業中', isOpen: true };
      }
    }
    return { text: '公休', isOpen: false };
  };

  const finalShops = filteredShops.filter(shop => {
    if (filterStatus === 'all') return true;
    const status = getRealTimeStatus(shop.open);
    return filterStatus === 'open' ? status.isOpen : !status.isOpen;
  });

  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scroll_pos_shops');
    if (savedPosition) {
      const targetScroll = parseInt(savedPosition, 10);
      let attempts = 0;
      const intervalId = setInterval(() => {
        window.scrollTo(0, targetScroll);
        attempts++;
        if (Math.abs(window.scrollY - targetScroll) <= 3 || attempts > 12) {
          clearInterval(intervalId);
          sessionStorage.removeItem('scroll_pos_shops');
        }
      }, 40);
      return () => clearInterval(intervalId);
    }
  }, [finalShops]);

  const resolveAsset = (path) => {
    if (!path) return '';
    if (path.startsWith('/')) return `${import.meta.env.BASE_URL}${path.slice(1)}`;
    return path;
  };

  const handleStatusToggle = (e) => {
    e.stopPropagation();
    if (filterStatus === 'all') setFilterStatus('open');
    else if (filterStatus === 'open') setFilterStatus('closed');
    else setFilterStatus('all');
  };

  // 🌟 統一按鈕底色為黑色
  const getStatusBtnConfig = () => {
    const baseStyle = 'bg-stone-800 text-white border-stone-800 shadow-sm';
    if (filterStatus === 'open') return { label: '營業', dot: 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]', style: baseStyle };
    if (filterStatus === 'closed') return { label: '公休', dot: 'bg-rose-400', style: baseStyle };
    return { label: '全部', dot: 'bg-stone-400', style: baseStyle };
  };
  const statusConfig = getStatusBtnConfig();

  const renderShopCardContent = (shop, isOverlay = false) => {
    const status = getRealTimeStatus(shop.open);
    const statusBg = status.isOpen ? 'bg-stone-200' : 'bg-stone-100';
    const statusTextColor = isOverlay ? 'text-black' : (status.isOpen ? 'text-[#1A1A1A]' : 'text-stone-400');
    const transportBg = 'bg-stone-100';
    const transportTextColor = isOverlay ? 'text-black' : 'text-stone-500';
    const transportIconOpacity = isOverlay ? 'opacity-100' : 'opacity-50';

    return (
      <div className="w-full max-w-[200px] aspect-[4/5] mx-auto flex flex-col items-center justify-start pointer-events-none">
        <div 
          className={`w-[120px] h-[120px] md:w-[140px] md:h-[140px] mt-4 rounded-full overflow-hidden bg-white flex items-center justify-center mb-5 border border-stone-200/50 shadow-sm ${!isOverlay ? 'pointer-events-auto cursor-pointer' : ''}`}
          onMouseEnter={!isOverlay ? () => setHoveredShopId(shop.id) : undefined}
          onMouseLeave={!isOverlay ? () => setHoveredShopId(null) : undefined}
        >
          <img src={resolveAsset(shop.shopLogo || shop.img)} alt={shop.name} className="w-full h-full object-cover"/>
        </div>
        <div className="flex items-center justify-between w-full px-1 max-w-[160px]">
          <span className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-widest ${statusBg} ${statusTextColor}`}>
            {status.text}
          </span>
          <div className={`flex items-center px-2.5 py-1 rounded-full text-[10px] md:text-xs font-bold tracking-wider ${transportBg} ${transportTextColor}`}>
            <img src={SORT_ICONS[filterTransport]} alt="transport" className={`w-3 md:w-3.5 h-3 md:h-3.5 mr-1 filter brightness-0 ${transportIconOpacity}`} />
            {shop.distance?.[filterTransport] || '--'}min
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen pb-20">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#F6F6F4]" />
        {finalShops.slice(0, 12).map(shop => (
          <img 
            key={`bg-${shop.id}`} src={resolveAsset(shop.shopBg || shop.img)} alt="Environment"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${hoveredShopId === shop.id ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className={`absolute inset-0 bg-[#1A1A1A]/60 transition-opacity duration-700 ease-out ${hoveredShopId ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      <div className="relative z-10 px-8 max-w-5xl mx-auto animate-in fade-in duration-1000">
        
        <div className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b pb-8 mt-8 mx-12 transition-all duration-700 ${hoveredShopId ? 'opacity-40 border-stone-200/20' : 'opacity-100 border-stone-200'}`}>
          <div className="space-y-3 w-full overflow-hidden">
            
            <div className="flex gap-2 overflow-x-auto no-scrollbar items-center">
              {['walking', 'bicycle', 'scooter'].map(id => (
                <button
                  key={id}
                  onClick={(e) => { e.stopPropagation(); setFilterTransport(id); }}
                  className={`flex-shrink-0 flex items-center px-3 py-2 rounded-lg text-[10px] font-bold border transition-colors ${filterTransport === id ? 'bg-stone-800 text-white border-stone-800 shadow-sm' : 'bg-transparent text-stone-600 border-transparent hover:bg-stone-200/30'}`}
                >
                  <img src={SORT_ICONS[id]} alt={id} className={`w-3.5 h-3.5 mr-1.5 object-contain ${filterTransport === id ? 'filter brightness-0 invert' : 'filter brightness-50 contrast-125'}`} />
                  {TRANSPORT_LABELS[id]}
                </button>
              ))}
              
              <button
                onClick={handleStatusToggle}
                className={`flex-shrink-0 flex items-center px-3 py-2 rounded-lg text-[10px] font-bold border transition-all duration-300 ${statusConfig.style}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 transition-colors duration-300 ${statusConfig.dot}`} />
                {statusConfig.label}
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {[ { id: 'all', label: '不限' }, { id: '5', label: '5 分' }, { id: '10', label: '10 分' }, { id: '15', label: '15 分' } ].map(opt => (
                <button
                  key={opt.id}
                  onClick={(e) => { e.stopPropagation(); setFilterTime(opt.id); }}
                  className={`flex-shrink-0 flex items-center px-2 py-2 rounded-lg text-[10px] font-bold border transition-colors ${filterTime === opt.id ? 'bg-stone-800 text-white border-stone-800 shadow-sm' : 'bg-transparent text-stone-600 border-transparent hover:bg-stone-200/30'}`}
                >
                  <Clock size={12} className={`mr-1.5 ${filterTime === opt.id ? 'text-white' : 'text-stone-400'}`} />
                  {opt.label}
                </button>
              ))}
            </div>

          </div>
        </div>

        <div ref={gridWrapperRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative md:mx-12">
          
          <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12 transition-all duration-700 ${hoveredShopId ? 'opacity-15 grayscale' : 'opacity-100'}`}>
            {finalShops.slice(0, 12).map((shop, idx) => (
              <FadeInCard key={`base-${shop.id}`} delay={(idx % 4) * 100}>
                <div onClick={() => handleShopClick(shop)} className="cursor-pointer">
                  {renderShopCardContent(shop, false)}
                </div>
              </FadeInCard>
            ))}
          </div>

          <div 
            className={`absolute inset-0 pointer-events-none transition-opacity duration-500 z-50 ${hoveredShopId ? 'opacity-100' : 'opacity-0'}`}
            style={{
              WebkitMaskImage: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, black 60%, transparent 100%)`,
              maskImage: `radial-gradient(circle 200px at ${mousePos.x}px ${mousePos.y}px, black 60%, transparent 100%)`,
            }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12 h-full">
              {finalShops.slice(0, 12).map((shop) => (
                <div key={`overlay-${shop.id}`}>
                  {renderShopCardContent(shop, true)}
                </div>
              ))}
            </div>
          </div>

        </div>

        {finalShops.length === 0 && (
          <div className="py-24 text-center">
            <Leaf size={32} className="mx-auto text-stone-300 mb-4" />
            <p className="text-stone-400 text-xs tracking-[0.2em] font-bold uppercase">無符合篩選條件的店家</p>
          </div>
        )}

      </div>
    </div>
  );
}