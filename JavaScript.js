// 📝 第 01 堂課：認識 JavaScript
// 1-1 JavaScript 特色與用途
// 如果你說 HTML 是網頁的骨架、CSS 是皮相，那 JavaScript 就是網頁的大腦與靈魂。

// 1-1-1 基本觀念
//     直譯式語言 (Interpreted Language)：與你需要經過編譯（Compile）才能執行的 C/C++ 不同，JS 是由瀏覽器引擎（如 Chrome 的 V8）「一邊讀取、一邊執行」的。
//     弱型別 (Weakly Typed)：你不需要在宣告變數時寫死 int 或 string，JS 會根據你給的值自動判斷。
//     事件驅動 (Event-driven)：JS 的核心任務是「等待使用者動作」。例如在你的 App.jsx 中，它在等待使用者點擊導航標籤 (setActiveTab)。

// 1-1-2 用途
// 前端互動：操控 DOM 元素，實現你網頁中的平滑位移與視圖切換。
// 資料處理與 API 串接：像你在 App.jsx 裡定義的 RECOMMEND_DISHES 模擬數據陣列，未來可以透過 JS 從伺服器抓取真實資料。
// 跨平台開發：除了網頁，還能開發後端（Node.js）、手機 App（React Native）或是遊戲（PixiJS）。

// 1-2 設定 JavaScript 開發環境
// 要讓 JS 跑起來，你不需要安裝龐大的 IDE，只需要一個執行環境和一個編輯器。
// 1-2-1 執行環境
// 瀏覽器 (Browser)：這是最天然的實驗室。每個現代瀏覽器都內建了 JS 引擎。
// Node.js：如果你想在電腦本機端（非瀏覽器環境）跑 JS，就需要安裝它。對於你目前開發的 React 專案，Node.js 是必備的基礎環境。

// 1-2-2 如何選擇文字編輯器
// VS Code (推薦)：目前業界與資傳系開發專案的標準配備。它強大的外掛系統能幫你自動完成代碼，這也是你寫 App.jsx 的主要工具。

// 1-2-3 純文字編輯器 NotePad++
// 這是書中提到的輕量級工具。對於初學者來說，它能強迫你手寫每一行代碼，不依賴自動補全，有助於記憶語法。但以大三的專案規格來說，建議還是維持使用 VS Code 以確保效率。

// 1-2-4 瀏覽器主控台 (Console)
// 除錯神盾：在瀏覽器按 F12 或 Ctrl+Shift+I 呼叫出來的 Console 標籤頁。

// ## 1. 必學：開發者的「每日麵包」 (The Essentials)
// 這幾個方法你每天都會用到，建議現在就練到反射動作：
// console.log()：最基礎的輸出，用於觀察變數如 activeTab 的狀態切換。
// console.table()：資傳系最強力推薦。當你要檢查 RECOMMEND_DISHES 或 RESTAURANTS 這種大型陣列資料時，它能直接幫你排成表格，這比 log 雜亂的展開圖清楚一百倍。
// console.dir()：當你發現 querySelector 抓回來的元素不如預期時，用 dir 可以看清楚該 DOM 節點的所有屬性細節。
// console.error() & console.warn()：當你的地圖點座標計算錯誤，或搜尋過濾器沒抓到資料時，用它們來標註問題嚴重性。

// ## 2. 進階：讓 Debug 更有邏輯 (Organization)
// 當你的專案像 App.jsx 一樣開始變長（超過 500 行），你就需要這些工具來整理訊息：
// console.group() / console.groupEnd()：實戰場景：你可以把所有關於「地圖初始化」的 log 包在一起。

// JavaScript
// console.group("地圖初始化檢查");
// console.log("座標已載入");
// console.log("Pins 已繪製");
// console.groupEnd();
// console.clear()：當 React 的 useEffect 瘋狂噴訊息讓你眼花時，隨手一行 clear 還你清爽的介面。

// ## 3. 專業：效能與邏輯檢查 (Performance & Logic)
// 這部分在處理複雜動畫（如你筆記中的第十章轉場）或大量資料運算時非常有感：
// console.assert(條件, 訊息)：比 if 更省事。如果條件為 false 才會噴錯誤。
//     範例：console.assert(shop.distance <= 15, "這家店太遠了！");
// console.count()：想知道使用者點了幾次「探索美味餐點」按鈕？用這個就不用自己寫 let i++。
// console.time() / console.timeEnd()：效能優化：用來測量你的 ALL_DISHES 過濾邏輯跑了多久，確保不會造成網頁卡頓。



// 📝 第 02 堂課：JavaScript 基礎語法
// 2-1 語法架構
// JavaScript 的套用方式與 CSS 非常相似。
//     內聯 (Internal)：寫在 HTML 的 <script> 標籤內。
//     外聯 (External)：使用 <script src="script.js"></script> 引入。
// 註解符號：
//     單行註解：// 內容
//     多行註解：/ 內容 /

// 2-2 變數與資料型別
// 在 JS 中，型別是跟著「值」走的，而不是跟著「變數名稱」走。
// 2-2-1 資料型別
//     數值 (Number)：包含整數與浮點數。
//        toFixed(); 強制取到小數點的指定位數
//     字串 (String)：用單引號或雙引號包裹，如 "YZU Veggie"。
//     布林 (Boolean)：true 或 false，常用於判斷狀態（如 isScrolled）。
//     Undefined：變數已宣告但尚未給值。
//     Null：表示該變數「刻意為空」。
//     NaN (Not a Number)：運算出錯時的產物（例如：字串除以數字）。
//     Infinity：無限大（例如：$1 / 0$）。
//     Object (物件)：其他都可歸類到物件型別，如function(函數)、object(物件)、array(陣列)、date(日期)等，用於儲存複雜資料的結構，如你的餐廳資訊 { name: "綠意" }。
//     Symbol：ES6 新增，代表獨一無二的識別代碼。
// 2-2-2 變數宣告與作用範圍
//     const (常數)：不可重新賦值。在專案中定義模擬數據（如 RESTAURANTS）時必用。
//     let (變數)：區域作用域 (Block Scope)。變數只在 {} 內有效，最符合 C++ 邏輯。
//     var ：函式作用域 (Function Scope)。具備「提升 (Hoisting)」特性，現代開發應避免使用。

// 2-2-3 強制轉換型別 (Type Conversion)
// 在 JavaScript 中，型別轉換分為「自動轉型 (Coercion)」與「顯式轉型 (Explicit Conversion)」。
// 1. 檢查型別：typeof 運算子
//     在轉換之前，我們必須先知道它是什麼。
// 語法：typeof 變數
//     console.log(typeof "120"); // "string"
//     console.log(typeof 120);   // "number"
// 2. 轉為數值 (To Number)
// 這是資傳系處理「價格運算」或「座標計算」最常用的部分。
// (A) Number()：最嚴格的轉型
// 特性：只要字串內包含任何非數字（如 "12px"），結果就是 NaN。
// 適合：處理乾淨的純數字字串。
//     Number("120"); // 120
//     Number("12.5"); // 12.5
//     Number("12px"); // NaN (因為 px 不是數字)
// (B) parseInt() 與 parseFloat()：聰明的解析 (Parsing)
// 這不是舊寫法，而是專門用來「提取」字串開頭的數字。
// parseInt(string)：轉為整數。它會由左往右讀，直到遇到非數字為止。
// parseFloat(string)：轉為浮點數（小數）。
// 實戰：處理 CSS 單位或使用者輸入。
//     parseInt("12px");   // 12 (自動過濾掉 px)
//     parseFloat("12.5元"); // 12.5
// 💡 進階筆記：現代 ES6 標準建議寫成 Number.parseInt()，這能增加代碼的可讀性，明確告知這是數值處理，但功能與原來的完全相同。
// 3. 轉為字串 (To String)
// 當你想把價格加上 $ 符號顯示在網頁上時。
// String()：全能轉型。
//     String(120);    // "120"
// .toString()：除了 null 與 undefined 之外，所有物件都有的方法。
//     (120).toString(); // "120"
// 4. 轉為布林值 (To Boolean)
//     這在切換 isSidebarOpen 狀態時非常重要。
// Boolean()：將值轉為 true 或 false。
// JavaScript 的「假值 (Falsy)」清單：以下 6 個值轉為 Boolean 必為 false，其餘皆為 true。
//     false
//     0
//     "" (空字串)
//     null
//     undefined
//     NaN
// 5. 自動轉型的坑 (Implicit Coercion)
// JS 會嘗試「幫你」轉型，但往往會出錯：
//     加法 +：只要有一方是字串，就會變成「字串拼接」。
//         1 + "2" = "12"
//     減乘除 -, , /：會自動嘗試將雙方轉為「數字」。
//         "10" - 2 = 8
//         "10"  "2" = 20

// 2-3 運算式與運算子
// 這部分與 C++ 幾乎完全一致。
// 2-3-1 運算式
//     指定運算式：=、+=、-=。
//     算術運算式 (Arithmetic)：+, -, , /, % (取餘數)。遞增/減：++, --。
//         特性：JavaScript 的除法會自動處理浮點數，$1 / 0$ 會得到 Infinity 而非當機。
//     字串運算式 (String)
//         拼接 +：將兩個字串連起來，例如 "YZU" + " Veggie"。
//         字串模板 (必學)：使用反引號 ` 與 ${} 嵌入變數，開發 React 必備。
//             範例：`NT$ ${dish.price}`。
//     布林運算式 (Boolean)
//         嚴格比較 (必用)：=== (值與型別皆須相等)、!==。
// 2-3-2 運算子
//     算術運算子：+、-、、/、% (取餘數)、++、--。
//     比較運算子：
//         ==：只比較值是否相等（會自動轉型）。
//         ===：嚴格相等（值與型別皆須一致）。實務上強烈建議一律使用 === 以防 Bug。
//     邏輯運算子：&& (AND)、|| (OR)、! (NOT)。
//     運算子優先順序：括號 () 最高，接著是算術、比較，最後是邏輯與指定運算。



// 📝 第 03 堂課：程式控制結構
// 3-1 選擇結構 (Selection)
// 決定網頁在特定條件下該顯示什麼。
// 3-1-1 if...else
// 基礎：最常用的條件判斷。
// 實戰：雖然 React 常用 && 簡寫，但邏輯等同於「如果 activeTab === 'map' 則顯示地圖」。
// 3-1-2 switch...case
// 用途：當有大量固定選項時，比 if 更整潔。
// 注意：每個 case 結尾必須加 break，否則會繼續執行下一個條件。

// 3-2 重複結構 (Repetition)
// 用於處理重複性的任務，如渲染 10 家餐廳的卡片。
// 3-2-1 for
// 標準型：for (let i = 0; i < len; i++)。適合需要知道「索引值 (index)」的場景。
//     for (let i = 0; i < dishes.length; i++) {
//         console.log(`第 ${i+1} 道菜是：${dishes[i]}`);
//     }    // 輸出：第 1 道菜是：藜麥沙拉...
// 3-2-2 for...in
// 重點：專門用來遍歷「物件 (Object)」的屬性名稱 (Key)。
// 範例：遍歷一家餐廳的所有資訊標籤。
//     // ❌ 不推薦用於陣列，因為 i 會是字串 "0", "1", "2"
//     for (let i in dishes) {
//         console.log(i); // 0, 1, 2
//     }
//     // ✅ 推薦用於物件 (Object)
//     const shop = { name: "綠意", price: 120 };
//     for (let key in shop) {
//         console.log(`${key}: ${shop[key]}`); 
//     } // 輸出：name: 綠意, price: 120
// 3-2-3 forEach 與 for...of (資傳系必學)
//     for...of：遍歷「陣列 (Array)」的值。最符合直覺。
//         例1:for (const shop of RESTAURANTS) {
//             console.log(shop.name); // 直接印出店名
//         }
//         例2:for (let dish of dishes) {
//             console.log(dish); 
//         }   // 輸出：藜麥沙拉, 胡麻拌麵, 羅宋湯
//     forEach：陣列內建的方法。
//         dishes.forEach((dish, index) => {
//             console.log(`${index}: ${dish}`);
//         });
// 3-2-4 while
// while：先判斷條件再執行。
// 3-2-5 do...while
// do...while：不論條件，先執行一次再說。
// 3-2-6 break 和 continue
// break：直接強制跳出整個迴圈。
// continue：跳過本次循環，直接進入下一次。

// 3-3 錯誤與意外處理 (Exception Handling)
//     防止網頁因為一個小錯誤（如抓不到圖片路徑）就整面當掉。
// 3-3-1 錯誤類型 (Common Errors)
// SyntaxError：語法寫錯（如少了一個括號）。
// ReferenceError：引用了不存在的變數（如沒宣告 shop 就想印出它）。
// TypeError：型別錯誤。
//     常見場景：對 null 或 undefined 讀取屬性（例如：當 selectedShop 是 null 時卻想讀取 selectedShop.name）。
// RangeError：數值超出有效範圍。
// 3-3-2 例外處理 (Try...Catch)
// try：放置可能出錯的代碼（如 API 抓取）。
// catch(exception)：出錯時的救援措施。
// finally：不論結果如何，最後一定執行的程式碼（如隱藏載入中的動畫）。
//     try {
//         // 嘗試讀取地圖資料
//     } catch (err) {
//         console.error("地圖載入失敗：", err.message);
//     } finally {
//         console.log("導覽系統初始化完成");
//     }


