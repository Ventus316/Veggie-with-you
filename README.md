# 🥦 YZU VegFind (元智蔬食指南)

[![Vercel Deployment](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel&style=for-the-badge)](https://yzu-veg-find.vercel.app/)

「讓綠色飲食，成為觸手可及的時尚選擇。」

**👉 [立即點擊體驗：YZU VegFind 線上實機 Demo](https://yzu-veg-find.vercel.app/) 👈**

**YZU VegFind** 是一套結合 **時空感知** 與 **動態數據流** 的校園永續蔬食導航系統。專為元智大學師生打造，旨在解決校園周邊蔬食資訊零碎、缺乏即時營業狀態的問題。透過精準的 GPS 距離換算、即時營業狀態演算法以及無縫的互動介面，我們致力於打破素食的刻板印象，提供從探索到抵達的最佳使用者體驗。

## 🛠️ 技術棧 (Tech Stack)

本專案採用現代化前端工程標準建置，確保系統的高效能與高可維護性：

| 🌐 技術領域        | 🚀 核心技術與套件   | 💡 應用場景與目的                                                               |
| :----------------- | :------------------ | :------------------------------------------------------------------------------ |
| **前端核心框架**   | **React (Vite)**    | 採用元件化開發，搭配 Vite 提供極速的本地啟動與優化打包。                        |
| **地圖與定位引擎** | **Google Maps API** | 整合 Maps JS、Directions 與 Distance Matrix API，提供客製化底圖與動態路線導航。 |
| **狀態與資料流**   | **React Hooks**     | 透過 useState/useEffect 於頂層集中統籌狀態，以清晰的單向資料流解決同步問題。    |
| **雲端部署架構**   | **Vercel**          | 實現自動化 CI/CD 部署，提供穩定、極速的線上預覽體驗。                           |
| **樣式與 UI 體驗** | **Tailwind CSS**    | Utility-first CSS 框架，建構一致且穩定的響應式視覺排版。                        |
| **視覺圖標系統**   | **Lucide-React**    | 輕量級 SVG 圖標庫，提供高質感的視覺點綴與操作指引。                             |

---

## 💡 核心技術架構 (Technical Highlights)

我們不僅展示靜態數據，更專注於 **數據流的生命週期管理** 與 **前端效能最佳化**：

- ⏱️ **即時營業狀態大腦 (`getRealTimeStatus.js`)**：獨立抽離的演算法模組，能解析跨日或多段班的複雜營業時間，並與當前裝置時間即時比對，自動渲染「營業中」或深色阻斷視覺的「公休」標籤。
- 📍 **智慧動態距離估算 (`useDynamicDistances.js`)**：編排自訂 Hook 在載入瞬間獲取真實 GPS 座標，背景非同步換算步行、腳踏車、機車的精準通勤時間。
- 🧠 **集中式狀態管理 (Centralized State Management)**：狀態集中於頂層 `App.jsx` 進行統籌，透過清晰的單向資料流將導航分頁（`activeTab`）與選取店家（`selectedShop`）精確分發至各視圖元件，確保全站狀態具備單一數據源（Single Source of Truth）。
- 🧱 **關注點分離 (Separation of Concerns)**：透過嚴格的資料夾職責劃分（`hooks/` 負責狀態與非同步邏輯、`utils/` 專職純函數運算、`data/` 存放靜態資料字典），徹底消滅「上帝物件 (God Object)」，維持程式碼的高可讀性與維護便利。
- 🛡️ **非同步生命週期控管與防呆隔離**：於地圖元件引入 `isMapReady` 狀態機制，徹底消滅 React 與 Google Maps API 載入時間差造成的 **競態條件 (Race Condition)** 導致的圖標遺失。並實作嚴格的 **防呆座標隔離**，確保導航功能正常運作的同時，不會在地圖上渲染錯誤的使用者定位點。

---

## 🌱 專案願景與永續目標 (Vision & SDGs)

本專案旨在解決元智大學生活圈蔬食資訊分散與選擇門檻高的痛點。透過建立高品質的數位導航平台，我們不僅提供校園美食指南，更具體實踐了聯合國永續發展目標 (SDGs)：

- **SDG 3 (健康與福祉)**：降低師生尋找健康飲食的地理與資訊成本。
- **SDG 12 (責任消費及生產)**：讓永續飲食融入日常生活，成為方便且低門檻的選擇。

---

## 🎯 UX 設計策略：雙軌導覽 (Dual-Track Navigation)

我們精準分析了校園使用者的用餐情境，針對不同生理狀態設計了雙軌導航路徑：

1. **即時決策型 (任務導向)**：針對午休時間有限的族群，解決「距離與時間」的核心痛點。透過步行地圖提供快速過濾，減少猶豫時間。
2. **啟發探索型 (探索模式)**：針對不知道吃什麼的族群，解決「選擇疲勞」的問題。利用沉浸式餐點圖鑑的高質量影像刺激視覺與食慾。

---

## 🎨 品牌視覺與設計理念 (Visual Identity)

本專案的 UI 與 Logo 設計以「自然、健康、親近」為核心概念：

- **色彩計畫**：主色調選用綠色代表蔬食、植物與永續；輔以橘色象徵新鮮食材與健康活力。
- **Logo 巧思**：字體圓潤並融入葉片元素。其中 `VegFind` 的英文字母「i」特別設計成蘿蔔造型，不僅直接呼應蔬食主題，更為產品增添了趣味性與品牌記憶點。

---

## 📊 使用者測試與市場驗證 (User Validation)

系統上線前，我們邀請了 12 位測試者進行封閉體驗，針對易用性與內容契合度進行評分。測試數據獲得以下核心結論：

- **提升決策效率**：即時導引的地圖與視覺化圖鑑，被證實能有效解決校園生活圈中常見的午休決策困難。
- **跨族群推廣潛力**：受測者多為平時少吃素的群體，實測證明友善的介面設計成功降低了飲食嘗試的門檻，具備推廣蔬食健康知識的教育價值。

---

## 📂 系統架構目錄 (Directory Structure)

基於 **關注點分離 (Separation of Concerns)** 原則，建立企業級的前端檔案架構：

```text
YZU_VEGFIND/
├── 📂 public/               # 靜態免打包資源 (透過絕對路徑讀取)
│   ├── 📂 info/             # 小百科專屬圖片
│   ├── 📂 shops/            # 店家實景與餐點圖
│   ├── 📂 sort/             # 分類用靜態圖標
│   ├── 📄 favicon.svg       # 網頁標籤圖示
│   └── 📄 icons.svg         # 全域 SVG 圖標集合
│
├── 📂 src/                  # 專案核心原始碼
│   ├── 📂 assets/           # 需動態打包的靜態素材
│   ├── 📂 components/       # 共用 React UI 組件 (layout, ui)
│   ├── 📂 data/             # 靜態資料庫大腦 (Data.js, infoData.js, restaurantsData.js)
│   ├── 📂 hooks/            # 自訂 React Hooks (狀態與業務邏輯封裝)
│   ├── 📂 utils/            # 純運算邏輯共用模組 (getRealTimeStatus.js)
│   └── 📂 views/            # 頁面級別視圖 (Home, Map, Menu, Shops, Info, Detail 等)
│
├── 📄 .env                  # 環境變數設定檔 (存放 API Key)
├── 📄 eslint.config.js      # 程式碼品質與語法檢查規則
├── 📄 package.json          # 專案套件依賴清單
└── 📄 vite.config.js        # Vite 開發伺服器與建置設定

```

## 🚀 如何在本地端運行 (How to Run Locally)

**環境要求：** 請確保您的電腦已安裝 [Node.js](https://nodejs.org/zh-tw/) (建議安裝 LTS 版本)。

### 啟動步驟：

1. 複製專案：

```bash

git clone https://github.com/Ventus316/YZU_VegFind.git

```

2. 進入專案目錄 (重要)：

```bash

cd YZU_VegFind

```

3. 安裝專案依賴套件：

```bash

npm install

```

4. 啟動開發伺服器：

```bash

npm run dev

```

5. 開始體驗：

終端機會顯示一段 Local 網址（通常為 http://localhost:5173/），按住 Ctrl (Mac 為 Cmd) 並點擊該網址，即可在瀏覽器中觀看互動裝置。

## 👥 開發團隊 (Credits)

本專案由 **元智大學 資訊傳播學系** 團隊設計與開發：

- 何珮瑄
- 曾秋燕
- 李柏融
- 孔郁婷
- 張倢睿
