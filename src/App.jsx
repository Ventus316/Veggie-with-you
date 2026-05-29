// src/App.jsx
import React, { useState, useEffect , useRef } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BackToTop from './components/ui/BackToTop';

// 各頁面視圖
import HomeView from './views/HomeView';
// import ShopsView from './views/ShopsView';
import ShopsView from './views/Shops_spotlightView';
import MapView from './views/MapView';
import MenuView from './views/MenuView';
import InfoView from './views/InfoView';
import AboutView from './views/AboutView';
import ShopDetailView from './views/ShopDetailView';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedShop, setSelectedShop] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavbarTabChange = (tabId) => {
    // 【防護機制】：如果正在冷卻中（true），或者點擊的就是當前頁面，直接 return 掉，不理他
    if (isNavigatingRef.current || tabId === activeTab) return;

    // 將狀態設為「正在切換中」，鎖住後面的點擊
    isNavigatingRef.current = true;

    // 1. 清除店家列表頁的捲動暫存
    sessionStorage.removeItem('scroll_pos_shops'); 
    // 2. 清除當前選取的店家狀態
    setSelectedShop(null); 
    // 3. 切換目標分頁
    setActiveTab(tabId); 
    
    // 4. 強迫瀏覽器視窗立刻回到最上方
    window.scrollTo({ top: 0, behavior: 'instant' });

    // 🌟 【解除鎖定】：設定 500 毫秒 (0.5秒) 後，把鎖打開，允許下一次點擊
    // 這個時間您可以根據視覺動畫的長短自行微調（通常 500ms ~ 800ms 最舒適）
    setTimeout(() => {
      isNavigatingRef.current = false;
    }, 500); 
  };

  const renderView = () => {
    switch (activeTab) {
      case 'home': return <HomeView setActiveTab={setActiveTab} />;
      case 'shops': return <ShopsView setSelectedShop={setSelectedShop} setActiveTab={setActiveTab} />;
      case 'shopDetail': return <ShopDetailView shop={selectedShop} setActiveTab={setActiveTab} />;
      case 'map': 
        return (
          <MapView 
            selectedShop={selectedShop} 
            setSelectedShop={setSelectedShop} 
            setActiveTab={setActiveTab} 
          />
        );
      case 'menu': return <MenuView setActiveTab={setActiveTab} setSelectedShop={setSelectedShop} />;
      case 'info': return <InfoView />;
      case 'about': return <AboutView />;
      default: return <HomeView setActiveTab={setActiveTab} />;
    }
  };

  // 1. 控制膠囊導航顯示
  const isFullScreenView = activeTab === 'map' || activeTab === 'info' || activeTab === 'menu' || activeTab === 'shopDetail' || activeTab === 'shops' || activeTab === 'about';
  
  // 2. 控制滾動鎖定 (僅地圖與百科鎖死高度)
  const isNoScrollView = activeTab === 'map' || activeTab === 'info' || activeTab === 'about';
  
  // 3. 隱藏頁尾
  const hideFooter = activeTab === 'map' || activeTab === 'info' || activeTab === 'home' || activeTab === 'menu' || activeTab === 'shopDetail' || activeTab === 'shops' || activeTab === 'about';

  return (
    <div className="min-h-screen bg-[#F6F6F4] font-sans text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-white overflow-x-hidden">
      <Header 
        activeTab={activeTab} 
        setActiveTab={handleNavbarTabChange} 
        isCompactHeader={isScrolled} 
        isFullScreenView={isFullScreenView}
      />

      <main className={`relative transition-all duration-500 ${
        isNoScrollView 
          ? 'h-screen pt-0 overflow-hidden' 
          : isFullScreenView 
            ? 'min-h-screen pt-0' 
            : 'pt-1'
      }`}>
        {renderView()}
      </main>

      {!hideFooter && <Footer scrollToTop={scrollToTop} />}
    
      <BackToTop />
    </div>
  );
}