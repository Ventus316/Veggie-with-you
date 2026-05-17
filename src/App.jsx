// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import BackToTop from './components/ui/BackToTop';

// 各頁面視圖
import HomeView from './views/HomeView';
import ShopsView from './views/ShopsView';
import MapView from './views/MapView';
import MenuView from './views/MenuView';
import InfoView from './views/InfoView';
import AboutView from './views/AboutView';
import ShopDetailView from './views/ShopDetailView';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedShop, setSelectedShop] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 🌟 核心修復：建立一個專門給全站「頂部導航欄」使用的分頁切換函式
  // 當使用者主動點擊 Header 的標籤或 Logo 切換大分頁時，主動清空「已選取店家」，讓頁面回歸初始狀態
  const handleNavbarTabChange = (tabId) => {
    setSelectedShop(null); 
    setActiveTab(tabId);
  };

  const renderView = () => {
    switch (activeTab) {
      case 'home': return <HomeView setActiveTab={setActiveTab} />;
      // 💡 店家列表與詳情頁維持使用原始的 setActiveTab，確保點擊卡片與跳轉詳情時狀態不被沖掉
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
  const isNoScrollView = activeTab === 'map' || activeTab === 'info';
  
  // 3. 隱藏頁尾
  const hideFooter = activeTab === 'map' || activeTab === 'info' || activeTab === 'home' || activeTab === 'menu' || activeTab === 'shopDetail' || activeTab === 'shops' || activeTab === 'about';

  return (
    <div className="min-h-screen bg-[#F6F6F4] font-sans text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-white overflow-x-hidden">
      {/* 🌟 核心修復：將原本直接傳入的 setActiveTab 改為全新封裝的 handleNavbarTabChange */}
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
            ? 'min-h-screen pt-0 pb-16' 
            : 'pt-1'
      }`}>
        {renderView()}
      </main>

      {!hideFooter && <Footer scrollToTop={scrollToTop} />}
    
      <BackToTop />
    </div>
  );
}