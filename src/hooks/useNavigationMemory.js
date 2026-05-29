import { useCallback } from 'react';

export default function useNavigationMemory(activeTab, setActiveTab) {
  
  /**
   * 🌟 1. 自定義跳轉函式：取代原本的 setActiveTab
   * 在跳轉到新頁面前，自動幫當前頁面拍下「高度快照」並記錄為上一頁
   */
  const navigateTo = useCallback((targetTab) => {
    if (!activeTab || !targetTab) return;
    
    // 儲存目前的頁面作為「來時頁面 (上一頁)」
    sessionStorage.setItem('nav_previous_tab', activeTab);
    
    // 自動化捲動記憶：使用當前頁面標籤作為 Key，記錄當前滾動高度
    sessionStorage.setItem(`scroll_pos_${activeTab}`, window.scrollY.toString());
    
    // 執行實際的頁面切換
    setActiveTab(targetTab);
  }, [activeTab, setActiveTab]);

  /**
   * 🌟 2. 自動返回功能
   * 點擊返回鍵時直接呼叫此函式，會自動尋找來源頁，若無來源則回到指定的預設頁
   */
  const goBack = useCallback((defaultFallback = 'shops') => {
    const previousTab = sessionStorage.getItem('nav_previous_tab');
    
    // 切換回上一頁，如果沒有歷史紀錄，則前往預設的備用頁面
    setActiveTab(previousTab || defaultFallback);
  }, [setActiveTab]);

  /**
   * 🌟 3. 捲動位置復原器
   * 提供給各頁面元件在 useEffect 中呼叫，傳入自己的 tab 名稱即可自動回滾
   */
  const restoreScrollPosition = useCallback((tabName) => {
    const savedPosition = sessionStorage.getItem(`scroll_pos_${tabName}`);
    if (savedPosition) {
      const targetScroll = parseInt(savedPosition, 10);
      let attempts = 0;
      
      const intervalId = setInterval(() => {
        window.scrollTo(0, targetScroll);
        attempts++;
        
        // 成功對齊或嘗試超過次數後清除定時器並釋放記憶體
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