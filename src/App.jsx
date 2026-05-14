// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

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
            setActiveTab={setActiveTab} // 🌟 傳入跳轉函數
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
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCompactHeader={isScrolled} 
        isFullScreenView={isFullScreenView}
      />

      <main className={`relative transition-all duration-500 ${
        isNoScrollView 
          ? 'h-screen pt-0 overflow-hidden' 
          : isFullScreenView 
            ? 'min-h-screen pt-0 pb-16' 
            : 'min-h-screen pt-[140px]'
      }`}>
        {renderView()}
      </main>

      {!hideFooter && <Footer scrollToTop={scrollToTop} />}
    </div>
  );
}