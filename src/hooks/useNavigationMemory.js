// src/hooks/useNavigationMemory.js
import { useCallback } from 'react';

export default function useNavigationMemory(activeTab, setActiveTab) {
  
  /**
   * 🌟 優化版跳轉函式
   * 就算父組件漏傳 activeTab，也絕對不攔截跳轉！
   */
  const navigateTo = useCallback((targetTab) => {
    if (!targetTab) return; // 只檢查要去哪裡，不卡死目前的來源
    
    // 只有在 activeTab 有效存在時，才寫入高度與來源記憶
    if (activeTab) {
      sessionStorage.setItem('nav_previous_tab', activeTab);
      sessionStorage.setItem(`scroll_pos_${activeTab}`, window.scrollY.toString());
    }
    
    // 💥 確保這一行百分之百會被執行，絕對不罷工
    setActiveTab(targetTab);
  }, [activeTab, setActiveTab]);

  /**
   * 🌟 返回功能
   */
  const goBack = useCallback((defaultFallback = 'shops') => {
    const previousTab = sessionStorage.getItem('nav_previous_tab');
    setActiveTab(previousTab || defaultFallback);
  }, [setActiveTab]);

  /**
   * 🌟 捲動位置復原器
   */
  const restoreScrollPosition = useCallback((tabName) => {
    const savedPosition = sessionStorage.getItem(`scroll_pos_${tabName}`);
    if (savedPosition) {
      const targetScroll = parseInt(savedPosition, 10);
      let attempts = 0;
      
      const intervalId = setInterval(() => {
        window.scrollTo(0, targetScroll);
        attempts++;
        
        if (Math.abs(window.scrollY - targetScroll) <= 3 || attempts > 12) {
          clearInterval(intervalId);
          sessionStorage.removeItem(`scroll_pos_${tabName}`);
        }
      }, 40);

      return () => clearInterval(intervalId);
    }
  }, []);

  return { navigateTo, goBack, restoreScrollPosition };
}