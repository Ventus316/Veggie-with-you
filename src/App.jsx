import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
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

  return (
    <div className="cursor-none min-h-screen bg-[#F6F6F4] font-sans text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-white overflow-x-hidden">
      
      {/* 全域自定義鼠標與懸浮隨選導航欄 */}
      <CustomCursor setActiveTab={setActiveTab} />

      {/* 🌟 Header 條件渲染：地圖頁不顯示 Header */}
      {activeTab !== 'map' && (
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isCompactHeader={isScrolled} 
        />
      )}

      {/* 🌟 主內容區：地圖頁 pt 改為 0，達到真正的全螢幕滿版效果 */}
      <main className={`relative transition-all duration-500 ${
        activeTab === 'map' ? 'h-screen pt-0 overflow-hidden' : 'min-h-screen pt-[140px]'
      }`}>
        {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
        {activeTab === 'shops' && <ShopsView setSelectedShop={setSelectedShop} setActiveTab={setActiveTab} />}
        {activeTab === 'shopDetail' && <ShopDetailView shop={selectedShop} setActiveTab={setActiveTab} />}
        {activeTab === 'map' && <MapView selectedShop={selectedShop} setSelectedShop={setSelectedShop} />}
        {activeTab === 'menu' && <MenuView setActiveTab={setActiveTab} setSelectedShop={setSelectedShop} />}
        {activeTab === 'info' && <InfoView />}
        {activeTab === 'about' && <AboutView />}
      </main>

      {/* 🌟 Footer 條件渲染：地圖頁不顯示 Footer */}
      {activeTab !== 'map' && (
        <Footer scrollToTop={scrollToTop} />
      )}
      
    </div>
  );
}