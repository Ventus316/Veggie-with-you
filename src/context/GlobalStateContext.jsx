// src/context/GlobalStateContext.jsx
import React, { createContext, useContext, useState } from 'react';

const GlobalStateContext = createContext();

export function GlobalStateProvider({ children }) {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedShop, setSelectedShop] = useState(null);

  // 這裡把所有你想「全域共享」的狀態與方法包進去
  const value = {
    activeTab,
    setActiveTab,
    selectedShop,
    setSelectedShop,
  };

  return (
    <GlobalStateContext.Provider value={value}>
      {children}
    </GlobalStateContext.Provider>
  );
}

// 建立一個自訂 Hook，讓其他組件方便使用這個 Context
export function useGlobalState() {
  return useContext(GlobalStateContext);
}