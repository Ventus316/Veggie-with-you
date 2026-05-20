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

  // 🌟 核心 BUG 修復點：導航欄全域切換攔截器
  const handleNavbarTabChange = (tabId) => {
    // 1. 清除店家列表頁的捲動暫存，確保下次進去是全新的頂部
    sessionStorage.removeItem('scroll_pos_shops'); 
    // 2. 清除當前選取的店家狀態
    setSelectedShop(null); 
    // 3. 切換目標分頁
    setActiveTab(tabId); 
    
    // 🌟 4. 關鍵修復：不論跳轉到店家頁、餐點頁、關於我們還是首頁，
    // 在組件抽換完成的瞬間，強迫瀏覽器視窗立刻、無延遲地回到最上方 (instant)
    window.scrollTo({ top: 0, behavior: 'instant' });
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