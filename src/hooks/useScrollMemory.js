// src/hooks/useScrollMemory.js

import { useEffect } from 'react';

export default function useScrollMemory(pageId) {
  useEffect(() => {
    // 1. 組件掛載時：從 sessionStorage 讀取紀錄並還原位置
    const savedPosition = sessionStorage.getItem(`scroll_pos_${pageId}`);
    
    if (savedPosition !== null) {
      // 使用 setTimeout 稍微延遲 10ms，確保 React DOM 已經把圖片和列表渲染出來再滾動
      setTimeout(() => {
        window.scrollTo({ top: parseInt(savedPosition, 10), behavior: 'instant' });
      }, 10);
    } else {
      // 如果沒有紀錄，就回到最上方
      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    // 2. 組件卸載時（離開頁面）：記錄當下的滾動高度
    return () => {
      sessionStorage.setItem(`scroll_pos_${pageId}`, window.scrollY);
    };
  }, [pageId]);
}