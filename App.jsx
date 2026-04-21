import React, { useState, useEffect, useRef } from 'react';
import { 
  Leaf, 
  Search,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  MapPin,
  Clock,
  Utensils,
  X,
  Star,
  Share2,
  Bookmark,
  Smartphone,
  Navigation,
  Info,
  Activity
} from 'lucide-react';

// --- 模擬數據 ---
const RECOMMEND_DISHES = [
  {
    id: 1,
    shop: "綠意植物料理",
    name: "招牌牛油果藜麥沙拉",
    price: 120,
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    shop: "興仁路清爽蔬食",
    name: "日式胡麻時蔬拌麵",
    price: 85,
    img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    shop: "內壢巷弄健康餐",
    name: "溫補鮮蔬羅宋湯",
    price: 95,
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    shop: "純植系手作",
    name: "松露野菇義大利麵",
    price: 150,
    img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    shop: "元智二門蔬食",
    name: "植物肉手打漢堡",
    price: 110,
    img: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=800&auto=format&fit=crop"
  }
];

const RESTAURANTS = [
  { id: 1, name: "綠意植物料理", distance: 5, rating: "4.9", reviews: "210", type: "全素", open: "11:30 - 20:00", menuImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&auto=format&fit=crop", recommendations: [{ name: "招牌牛油果藜麥沙拉", price: 120, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&auto=format&fit=crop" }, { name: "松露野菇燉飯", price: 160, img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=200&auto=format&fit=crop" }] },
  { id: 2, name: "興仁路清爽蔬食", distance: 5, rating: "4.8", reviews: "192", type: "蛋奶素", open: "11:00 - 19:30", menuImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=200&auto=format&fit=crop", recommendations: [{ name: "日式胡麻時蔬拌麵", price: 85, img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=200&auto=format&fit=crop" }, { name: "黃金酥脆豆腐", price: 50, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop" }] },
  { id: 3, name: "內壢巷弄健康餐", distance: 10, rating: "4.5", reviews: "89", type: "五辛素", open: "10:30 - 20:00", menuImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop", recommendations: [{ name: "溫補鮮蔬羅宋湯", price: 95, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop" }, { name: "香料烤時蔬拼盤", price: 110, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&auto=format&fit=crop" }] },
  { id: 4, name: "純植系手作", distance: 15, rating: "4.7", reviews: "156", type: "全素", open: "12:00 - 21:00", menuImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=200&auto=format&fit=crop", recommendations: [{ name: "青醬堅果義大利麵", price: 150, img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=200&auto=format&fit=crop" }, { name: "燕麥奶拿鐵", price: 80, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop" }] },
  { id: 5, name: "元智二門蔬食", distance: 5, rating: "4.6", reviews: "230", type: "蛋奶素", open: "11:00 - 14:00", menuImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop", img: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=200&auto=format&fit=crop", recommendations: [{ name: "植物肉手打漢堡", price: 110, img: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=200&auto=format&fit=crop" }, { name: "起司薯塊", price: 60, img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=200&auto=format&fit=crop" }] },
  { id: 6, name: "大地生機飲食店", distance: 10, rating: "4.4", reviews: "78", type: "全素", open: "08:00 - 17:00", menuImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=200&auto=format&fit=crop", recommendations: [{ name: "五行養生拌飯", price: 100, img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=200&auto=format&fit=crop" }, { name: "冷壓綠拿鐵", price: 90, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&auto=format&fit=crop" }] },
  { id: 7, name: "香草時光輕食", distance: 15, rating: "4.9", reviews: "312", type: "蛋奶素", open: "10:00 - 18:00", menuImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop", img: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=200&auto=format&fit=crop", recommendations: [{ name: "番茄莫札瑞拉帕尼尼", price: 130, img: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=200&auto=format&fit=crop" }, { name: "手工優格杯", price: 75, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop" }] },
  { id: 8, name: "無肉不歡", distance: 5, rating: "4.3", reviews: "65", type: "五辛素", open: "17:00 - 23:00", menuImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=200&auto=format&fit=crop", recommendations: [{ name: "麻辣植物肉串", price: 45, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=200&auto=format&fit=crop" }, { name: "烤櫛瓜片", price: 40, img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=200&auto=format&fit=crop" }] },
  { id: 9, name: "和平豆花蔬食", distance: 10, rating: "4.8", reviews: "450", type: "全素", open: "13:00 - 21:00", menuImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop", img: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=200&auto=format&fit=crop", recommendations: [{ name: "招牌綜合豆花", price: 50, img: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=200&auto=format&fit=crop" }, { name: "古早味綠豆湯", price: 40, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop" }] },
  { id: 10, name: "靜心禪食", distance: 15, rating: "4.9", reviews: "188", type: "全素", open: "11:30 - 14:00", menuImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop", img: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=200&auto=format&fit=crop", recommendations: [{ name: "靜心定食餐盤", price: 200, img: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=200&auto=format&fit=crop" }, { name: "牛蒡養生茶", price: 60, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=200&auto=format&fit=crop" }] }
].map(shop => ({
  ...shop,
  // 擴充店家資訊頁展開所需的詳細欄位
  storefrontImg: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
  mealImgs: [
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop"
  ],
  priceRange: "NT$ 100 - 250",
  payment: ["現金", "LINE Pay", "全支付"],
  reservation: shop.id % 2 !== 0,
  restroom: shop.id % 3 !== 0,
  features: {
    portion: "份量適中偏多，即使是男同學也能吃飽。",
    aesthetics: "擺盤精緻，使用高質感陶瓷餐具，非常適合拍照打卡。",
    environment: "環境乾淨明亮，每日定時消毒，採光極佳。"
  }
}));

const ALL_DISHES = [
  { id: 1, name: "招牌牛油果藜麥沙拉", price: 120, shop: "綠意植物料理", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "日式胡麻時蔬拌麵", price: 85, shop: "興仁路清爽蔬食", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "溫補鮮蔬羅宋湯", price: 95, shop: "內壢巷弄健康餐", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "松露野菇義大利麵", price: 150, shop: "純植系手作", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop" },
  { id: 5, name: "植物肉手打漢堡", price: 110, shop: "元智二門蔬食", img: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=800&auto=format&fit=crop" },
  { id: 6, name: "五行養生拌飯", price: 100, shop: "大地生機飲食店", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop" },
  { id: 7, name: "番茄莫札瑞拉帕尼尼", price: 130, shop: "香草時光輕食", img: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=800&auto=format&fit=crop" },
  { id: 8, name: "麻辣植物肉串", price: 45, shop: "無肉不歡", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop" },
  { id: 9, name: "招牌綜合豆花", price: 50, shop: "和平豆花蔬食", img: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop" },
  { id: 10, name: "靜心定食餐盤", price: 200, shop: "靜心禪食", img: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=800&auto=format&fit=crop" },
  { id: 11, name: "香料烤時蔬拼盤", price: 110, shop: "內壢巷弄健康餐", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop" },
  { id: 12, name: "青醬堅果義大利麵", price: 150, shop: "純植系手作", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop" },
  { id: 13, name: "燕麥奶拿鐵", price: 80, shop: "純植系手作", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop" },
  { id: 14, name: "黃金酥脆豆腐", price: 50, shop: "興仁路清爽蔬食", img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop" },
  { id: 15, name: "起司薯塊", price: 60, shop: "元智二門蔬食", img: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=800&auto=format&fit=crop" },
  { id: 16, name: "冷壓綠拿鐵", price: 90, shop: "大地生機飲食店", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop" },
  { id: 17, name: "手工優格杯", price: 75, shop: "香草時光輕食", img: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=800&auto=format&fit=crop" },
  { id: 18, name: "烤櫛瓜片", price: 40, shop: "無肉不歡", img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop" },
  { id: 19, name: "古早味綠豆湯", price: 40, shop: "和平豆花蔬食", img: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop" },
  { id: 20, name: "牛蒡養生茶", price: 60, shop: "靜心禪食", img: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=800&auto=format&fit=crop" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedShop, setSelectedShop] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // 監聽滾動狀態 (用於 Header 動態縮小)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCompactHeader = activeTab === 'map' || isScrolled;

  return (
    <div className="min-h-screen bg-[#F6F6F4] font-sans text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-white overflow-x-hidden">
      
      {/* 導航欄 (動態變化 Sticky Header) */}
      <header className={`w-full z-50 transition-all duration-700 ease-in-out ${
        isCompactHeader 
          ? 'fixed top-0 left-0 bg-[#F6F6F4]/95 backdrop-blur-md shadow-sm h-[70px]' // 縮小固定狀態
          : 'fixed top-0 left-0 bg-[#F6F6F4] h-[140px]' // 初始大標題展開狀態
      }`}>
        <div className="max-w-7xl mx-auto w-full h-full relative px-6">
          
          {/* Logo (平滑位移動畫) */}
          <div 
            className={`absolute transition-all duration-700 ease-in-out flex cursor-pointer z-10 ${
              isCompactHeader
                ? 'top-1/2 -translate-y-1/2 left-6 flex-row items-center scale-75 origin-left'
                : 'top-8 left-1/2 -translate-x-1/2 flex-col items-center'
            }`}
            onClick={() => setActiveTab('home')}
          >
            <div className={`flex items-center text-[#1A1A1A] ${isCompactHeader ? 'mr-4' : 'mb-1'}`}>
              <Leaf size={isCompactHeader ? 20 : 24} strokeWidth={2} />
              <span className={`tracking-[0.25em] font-black uppercase ml-2 ${isCompactHeader ? 'text-xl' : 'text-2xl'}`}>
                YZU Veggie
              </span>
            </div>
            <span className={`tracking-[0.3em] font-bold text-stone-500 uppercase ${isCompactHeader ? 'text-[8px] mt-1 hidden md:block' : 'text-[10px]'}`}>
              Sustainability Group
            </span>
          </div>

          {/* 導航列表 (平滑位移動畫) */}
          <div className={`absolute transition-all duration-700 ease-in-out flex ${
            isCompactHeader
              ? 'top-1/2 -translate-y-1/2 right-6 w-auto'
              : 'bottom-4 left-1/2 -translate-x-1/2 w-full max-w-3xl justify-center'
          }`}>
            <div className={`flex items-center overflow-x-auto no-scrollbar ${isCompactHeader ? 'space-x-4 md:space-x-8' : 'space-x-8 md:space-x-12'}`}>
              {[
                { id: 'shops', label: '店家資訊' },
                { id: 'menu', label: '餐點圖鑑' },
                { id: 'map', label: '步行地圖' },
                { id: 'info', label: '素食小百科' },
                { id: 'about', label: '關於我們' }
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); window.scrollTo(0,0); }}
                  className={`flex items-center whitespace-nowrap text-[10px] md:text-xs tracking-[0.15em] font-bold uppercase transition-colors duration-300
                    ${activeTab === item.id ? 'text-[#1A1A1A]' : 'text-stone-400 hover:text-[#1A1A1A]'}
                  `}
                >
                  {item.label}
                  {!isCompactHeader && <span className="w-1 h-1 rounded-full bg-stone-300 ml-8 last:hidden md:block hidden opacity-50"></span>}
                </button>
              ))}
            </div>
          </div>

        </div>
      </header>

      {/* 視圖切換區 */}
      <main className={`relative transition-all duration-500 ${
        activeTab === 'map' ? 'h-screen pt-[70px] overflow-hidden' : 'min-h-screen pt-[140px]'
      }`}>
        {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
        {activeTab === 'shops' && <ShopsView setSelectedShop={setSelectedShop} setActiveTab={setActiveTab} />}
        {activeTab === 'shopDetail' && <ShopDetailView shop={selectedShop} setActiveTab={setActiveTab} />}
        {activeTab === 'map' && <MapView selectedShop={selectedShop} setSelectedShop={setSelectedShop} />}
        {activeTab === 'menu' && <MenuView setActiveTab={setActiveTab} setSelectedShop={setSelectedShop} />}
        {activeTab === 'info' && <InfoView />}
        {activeTab === 'about' && <AboutView />}
      </main>

      {/* 頁尾 - 若在地圖頁則隱藏頁尾以滿版顯示 */}
      {activeTab !== 'map' && (
        <footer className="relative bg-[#F6F6F4] mt-32 border-t border-stone-200">
          <button 
            onClick={scrollToTop}
            className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white shadow-lg hover:-translate-y-2 transition-transform duration-300 z-30"
          >
            <ChevronUp size={20} />
          </button>

          <div className="relative w-full overflow-hidden flex flex-col justify-end pt-20">
            
            <div className="relative w-full text-center leading-[0.8] z-0 mb-4">
              <span className="text-[26vw] font-black text-white select-none whitespace-nowrap tracking-tighter drop-shadow-sm block">
                VEGGIE
              </span>
              
              <div className="absolute bottom-4 right-6 md:bottom-8 md:right-12 z-10 flex flex-col items-end">
                <Leaf className="w-6 h-6 md:w-8 md:h-8 text-[#1A1A1A]" strokeWidth={2} />
                <span className="text-xl md:text-3xl font-black tracking-[0.25em] uppercase text-[#1A1A1A] mt-1">YZU Veggie</span>
              </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-12 w-full">
              <div className="flex flex-col md:flex-row items-center justify-between text-[10px] tracking-[0.1em] font-bold text-stone-500 uppercase pt-6 relative">
                <div className="absolute top-6 left-0 w-full h-[1px] bg-stone-300 z-[-1]"></div>
                <div className="bg-[#F6F6F4] pr-4 z-10">
                  &copy; YZU VEGGIE all rights reserved. 網頁設計 : 王大明 / 李小華 / 陳阿強 / 張小美 / 林小宇
                </div>
                <div className="bg-[#F6F6F4] pl-4 z-10 mt-4 md:mt-0 cursor-pointer hover:text-[#1A1A1A] transition-colors">
                  隱私權政策
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

// --- 視圖：全新首頁 ---
function HomeView({ setActiveTab }) {
  return (
    <div className="animate-in fade-in duration-1000">
      
      {/* 視覺主區塊 (Hero Section) */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          
          {/* 標語主標題 */}
          <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-light text-[#1A1A1A] tracking-[0.1em] leading-[1.4] mb-8">
            讓素食成為一種時尚<br />
            且低門檻的選擇
          </h1>
          
          {/* 英文副標 */}
          <h2 className="text-xl md:text-3xl font-light text-[#1A1A1A] tracking-[0.05em] mb-12">
            Make Vegan A Fashion & Accessible Choice
          </h2>
          
          {/* 標語副文 */}
          <p className="text-sm md:text-base text-stone-500 leading-loose max-w-2xl font-medium tracking-wide mb-16">
            解決校園周邊「不知道吃什麼」的痛點，透過高品質視覺圖鑑與直觀步行導航，為 YZU 師生串聯健康與永續的每一餐。
          </p>

          {/* 按鍵 * 2 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24 w-full sm:w-auto">
            <button 
              onClick={() => setActiveTab('map')}
              className="w-full sm:w-auto px-10 py-4 bg-transparent border border-[#1A1A1A] text-[#1A1A1A] text-xs tracking-[0.2em] font-bold uppercase hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
            >
              開啟步行地圖
            </button>
            <button 
              onClick={() => setActiveTab('menu')}
              className="w-full sm:w-auto px-10 py-4 bg-[#1A1A1A] border border-[#1A1A1A] text-white text-xs tracking-[0.2em] font-bold uppercase hover:bg-transparent hover:text-[#1A1A1A] transition-all duration-300"
            >
              探索美味餐點
            </button>
          </div>

          {/* 視覺主區塊 - 圖片 */}
          <div className="w-full max-w-6xl mx-auto h-[50vh] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1600&auto=format&fit=crop" 
              alt="Healthy Vegan Food" 
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2000ms]"
            />
          </div>
        </div>
      </section>

      {/* 素食資訊區 (為什麼選擇蔬食？) */}
      <section className="py-24 border-t border-stone-200 mt-12 bg-white/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] text-[#1A1A1A] mb-4">為什麼選擇蔬食？</h2>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400">Why Vegan?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            
            {/* SDG 3 */}
            <div className="flex flex-col items-center text-center group">
              <h3 className="text-xl font-bold text-[#1A1A1A] tracking-[0.15em] mb-6 flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500">
                SDG 3 健康與福祉
              </h3>
              <p className="text-stone-500 leading-loose tracking-wide font-medium">
                減少非傳染性疾病風險，平衡外食攝取不均，從心出發保持輕盈。
              </p>
            </div>

            {/* SDG 12 */}
            <div className="flex flex-col items-center text-center group">
              <h3 className="text-xl font-bold text-[#1A1A1A] tracking-[0.15em] mb-6 flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500">
                SDG 12 責任消費
              </h3>
              <p className="text-stone-500 leading-loose tracking-wide font-medium">
                降低獲取資訊門檻，將永續融入日常消費。每一口都是對地球的溫柔。
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 餐點推薦區 */}
      <section className="py-24 overflow-hidden bg-[#1A1A1A] text-white mt-12">
        <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
           <div>
             <h2 className="text-3xl md:text-4xl font-light tracking-[0.1em] mb-4">餐點推薦</h2>
             <p className="text-xs font-bold tracking-[0.3em] uppercase text-stone-500">Top Recommendations</p>
           </div>
           <button 
             onClick={() => setActiveTab('menu')}
             className="flex items-center text-xs tracking-[0.2em] font-bold text-stone-400 hover:text-white transition-colors uppercase pb-2 border-b border-stone-700 hover:border-white"
           >
             View All Menu <ArrowRight size={14} className="ml-2" />
           </button>
        </div>

        <div className="flex overflow-x-auto gap-8 px-6 md:px-12 pb-12 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {RECOMMEND_DISHES.map((dish, index) => (
            <div 
              key={dish.id} 
              className="flex-shrink-0 w-[260px] md:w-[320px] group cursor-pointer snap-center"
              onClick={() => setActiveTab('menu')}
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden mb-6 bg-stone-800">
                <img 
                  src={dish.img} 
                  alt={dish.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                />
                <div className="absolute top-0 left-0 bg-[#1A1A1A] text-white px-3 py-2 text-xs font-black tracking-widest">
                  0{index + 1}
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] text-stone-500 font-bold mb-2 uppercase tracking-[0.2em]">{dish.shop}</p>
                <h3 className="text-lg font-light tracking-[0.1em] text-white mb-4 group-hover:text-stone-300 transition-colors">{dish.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold tracking-widest text-stone-400">NT$ {dish.price}</span>
                  <ArrowRight size={16} className="text-stone-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

const FadeInCard = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.1 }); 
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div 
      ref={domRef} 
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- 視圖：店家資訊頁 (單純列表，點擊跳轉詳細頁) ---
function ShopsView({ setSelectedShop, setActiveTab }) {
  const [filterType, setFilterType] = useState('全部');
  const [filterTime, setFilterTime] = useState('全部');

  const filteredShops = RESTAURANTS.filter(shop => {
    if (filterType !== '全部' && shop.type !== filterType) return false;
    if (filterTime !== '全部' && shop.distance > parseInt(filterTime)) return false;
    return true;
  });

  return (
    <div className="py-12 px-6 max-w-5xl mx-auto min-h-screen animate-in fade-in duration-1000">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-stone-200 pb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-[#1A1A1A] mb-3 uppercase">店家資訊</h1>
          <p className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase">Vegan Shops Guide</p>
        </div>
        
        <div className="flex space-x-8 mt-8 md:mt-0">
          <div className="flex flex-col">
            <label className="text-[9px] font-bold tracking-[0.2em] text-stone-400 mb-2 uppercase">素食分類</label>
            <div className="relative">
              <select 
                className="appearance-none bg-transparent border-b border-[#1A1A1A] text-[#1A1A1A] text-xs font-bold tracking-[0.1em] pb-2 pr-6 focus:outline-none cursor-pointer"
                value={filterType}
                onChange={e => setFilterType(e.target.value)}
              >
                <option value="全部">所有分類</option>
                <option value="全素">全素</option>
                <option value="蛋奶素">蛋奶素</option>
                <option value="五辛素">五辛素</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-[9px] font-bold tracking-[0.2em] text-stone-400 mb-2 uppercase">步行時間</label>
            <div className="relative">
              <select 
                className="appearance-none bg-transparent border-b border-[#1A1A1A] text-[#1A1A1A] text-xs font-bold tracking-[0.1em] pb-2 pr-6 focus:outline-none cursor-pointer"
                value={filterTime}
                onChange={e => setFilterTime(e.target.value)}
              >
                <option value="全部">不限時間</option>
                <option value="5">5 分鐘以內</option>
                <option value="10">10 分鐘以內</option>
                <option value="15">15 分鐘以內</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        {filteredShops.map((shop, idx) => (
          <FadeInCard key={shop.id} delay={(idx % 5) * 100}>
            <div 
              className="group relative bg-[#FDFCF8] flex flex-col p-6 md:p-8 border border-stone-200 hover:border-[#1A1A1A] hover:shadow-xl transition-all duration-500 cursor-pointer"
              onClick={() => {
                setSelectedShop(shop);
                setActiveTab('shopDetail');
                window.scrollTo(0,0);
              }}
            >
              
              <div className="flex flex-col mb-6 border-b border-stone-100 pb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold tracking-[0.15em] text-[#1A1A1A]">{shop.name}</h3>
                  <span className="px-2 py-0.5 border border-[#1A1A1A] text-[9px] font-bold tracking-[0.1em] text-[#1A1A1A] uppercase">
                    {shop.type}
                  </span>
                </div>
                
                <div className="flex items-center text-xs font-bold tracking-[0.1em] text-stone-400 space-x-5">
                  <span className="flex items-center"><MapPin size={12} className="mr-1 text-stone-300" /> {shop.distance} min</span>
                  <span className="flex items-center"><Clock size={12} className="mr-1 text-stone-300" /> {shop.open}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 mb-6">
                {shop.recommendations.map((dish, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 overflow-hidden rounded-md border border-stone-200">
                      <img 
                        src={dish.img} 
                        alt={dish.name} 
                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" 
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-sm font-bold text-[#1A1A1A] tracking-[0.1em] mb-1">{dish.name}</span>
                      <span className="text-xs font-bold text-stone-400 tracking-wider">NT$ {dish.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end w-full">
                <button 
                  className="flex items-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-[#1A1A1A] border-b border-[#1A1A1A] pb-1 uppercase hover:text-stone-400 hover:border-stone-400 transition-colors"
                >
                  <span>查看店家詳情</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </FadeInCard>
        ))}

        {filteredShops.length === 0 && (
          <div className="py-24 text-center">
            <Leaf size={32} className="mx-auto text-stone-300 mb-4" />
            <p className="text-stone-400 text-xs tracking-[0.2em] font-bold uppercase">無符合篩選條件的店家</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- 視圖：單獨大店家資訊頁 (ShopDetailView) ---
function ShopDetailView({ shop, setActiveTab }) {
  const [selectedMenu, setSelectedMenu] = useState(null);

  if (!shop) {
    setActiveTab('shops');
    return null;
  }

  return (
    <div className="py-12 px-6 max-w-6xl mx-auto min-h-screen animate-in fade-in duration-1000">
      
      {/* 頂部：返回按鈕 */}
      <button 
        onClick={() => setActiveTab('shops')} 
        className="flex items-center text-xs font-bold tracking-[0.2em] text-stone-400 hover:text-[#1A1A1A] uppercase mb-10 transition-colors group"
      >
        <ChevronLeft size={16} className="mr-1 group-hover:-translate-x-1 transition-transform" /> 返回列表
      </button>

      {/* 標題與簡介 */}
      <div className="mb-12 border-b border-stone-200 pb-8">
        <h1 className="text-4xl md:text-5xl font-light tracking-[0.15em] text-[#1A1A1A] mb-6">{shop.name}</h1>
        <div className="flex flex-wrap items-center text-xs font-bold tracking-[0.1em] text-stone-500 gap-6">
          <span className="px-3 py-1 border border-[#1A1A1A] text-[#1A1A1A] uppercase">{shop.type}</span>
          <span className="flex items-center"><MapPin size={14} className="mr-1.5"/> 步行 {shop.distance} 分鐘</span>
          <span className="flex items-center"><Star size={14} className="mr-1.5 text-[#1A1A1A]" fill="currentColor"/> {shop.rating} ({shop.reviews})</span>
        </div>
      </div>

      {/* 圖片展示區 (門面 + 特色餐點) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="md:col-span-2 relative aspect-[16/9] md:aspect-auto rounded-xl overflow-hidden shadow-sm">
          <img src={shop.storefrontImg} alt="門面空間" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]" />
          <span className="absolute top-4 left-4 bg-[#1A1A1A]/80 backdrop-blur text-white text-[10px] px-3 py-1.5 tracking-widest font-bold uppercase shadow-sm">門面空間</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-6">
          {shop.mealImgs.map((img, i) => (
            <div key={i} className="relative aspect-square md:aspect-[4/3] rounded-xl overflow-hidden shadow-sm">
              <img src={img} alt={`特色素食 ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]" />
              <span className="absolute top-4 left-4 bg-[#1A1A1A]/80 backdrop-blur text-white text-[10px] px-3 py-1.5 tracking-widest font-bold uppercase shadow-sm">特色素食</span>
            </div>
          ))}
        </div>
      </div>

      {/* 資訊內容區 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* 左側：詳細資訊清單 & 完整菜單按鈕 */}
        <div className="lg:col-span-1 space-y-12">
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-6 flex items-center border-b border-stone-200 pb-3">
               <Info size={16} className="mr-2"/> 詳細資訊
            </h3>
            <ul className="space-y-4 text-sm text-[#1A1A1A] tracking-widest font-medium">
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">素食類別</span> <span>{shop.type}</span></li>
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">價位區間</span> <span>{shop.priceRange}</span></li>
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">營業時間</span> <span>{shop.open}</span></li>
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">付款方式</span> <span>{shop.payment.join('、')}</span></li>
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">可否訂位</span> <span>{shop.reservation ? '可訂位' : '現場候位'}</span></li>
               <li className="flex justify-between border-b border-stone-100 pb-3"><span className="text-stone-500">洗手間</span> <span>{shop.restroom ? '有提供' : '無提供'}</span></li>
            </ul>
          </div>

          <button
            onClick={() => setSelectedMenu(shop.menuImg)}
            className="w-full py-4 bg-[#1A1A1A] text-white text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-stone-700 flex items-center justify-center space-x-2"
          >
            <span>查看完整菜單</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 右側：店家特色與推薦餐點 */}
        <div className="lg:col-span-2 space-y-16">
          
          {/* 特色說明 */}
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-6 flex items-center border-b border-stone-200 pb-3">
               <Star size={16} className="mr-2"/> 店家特色說明
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
               <div className="bg-white p-6 border border-stone-200 shadow-sm rounded-xl">
                  <h4 className="text-[10px] font-black tracking-widest text-[#1A1A1A] mb-3 uppercase">份量</h4>
                  <p className="text-sm text-stone-500 leading-loose font-medium">{shop.features.portion}</p>
               </div>
               <div className="bg-white p-6 border border-stone-200 shadow-sm rounded-xl">
                  <h4 className="text-[10px] font-black tracking-widest text-[#1A1A1A] mb-3 uppercase">美觀</h4>
                  <p className="text-sm text-stone-500 leading-loose font-medium">{shop.features.aesthetics}</p>
               </div>
               <div className="bg-white p-6 border border-stone-200 shadow-sm rounded-xl">
                  <h4 className="text-[10px] font-black tracking-widest text-[#1A1A1A] mb-3 uppercase">環境</h4>
                  <p className="text-sm text-stone-500 leading-loose font-medium">{shop.features.environment}</p>
               </div>
            </div>
          </div>

          {/* 推薦餐點 */}
          <div>
            <h3 className="text-sm font-bold tracking-[0.2em] text-stone-400 uppercase mb-6 flex items-center border-b border-stone-200 pb-3">
               <Utensils size={16} className="mr-2"/> 推薦餐點資訊
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {shop.recommendations.map((dish, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 bg-white border border-stone-200 shadow-sm rounded-xl hover:shadow-md hover:border-[#1A1A1A] transition-all">
                     <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                        <img src={dish.img} alt={dish.name} className="w-full h-full object-cover" />
                     </div>
                     <div className="flex flex-col justify-center flex-grow">
                        <span className="text-sm font-bold text-[#1A1A1A] tracking-[0.15em] mb-2">{dish.name}</span>
                        <span className="text-xs font-bold text-stone-400 tracking-wider">NT$ {dish.price}</span>
                     </div>
                  </div>
               ))}
            </div>
          </div>
        </div>

      </div>

      {/* 線上菜單放大燈箱 (Modal) */}
      {selectedMenu && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#1A1A1A]/95 backdrop-blur-sm p-6 animate-in fade-in duration-300" onClick={() => setSelectedMenu(null)}>
          <div className="relative max-w-2xl w-full h-[80vh] flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedMenu(null)}
              className="absolute -top-12 right-0 text-white hover:text-stone-400 transition-colors flex items-center space-x-2 text-[10px] tracking-[0.2em] uppercase font-bold"
            >
              <span>Close</span> <X size={18} />
            </button>
            <div className="w-full h-full bg-[#F6F6F4] p-2 overflow-hidden shadow-2xl border border-stone-800">
              <img 
                src={selectedMenu} 
                className="w-full h-full object-contain" 
                alt="線上完整菜單" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- 視圖：圖鑑頁 ---
function MenuView({ setActiveTab, setSelectedShop }) {
  const rows = [];
  for (let i = 0; i < ALL_DISHES.length; i += 4) {
    rows.push(ALL_DISHES.slice(i, i + 4));
  }

  const [expandedRows, setExpandedRows] = useState(() => {
    const init = {};
    rows.forEach((_, rowIndex) => {
      init[rowIndex] = rowIndex % 4;
    });
    return init;
  });

  return (
    <div className="py-12 px-6 max-w-[1400px] mx-auto min-h-screen animate-in fade-in duration-1000">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-[#1A1A1A] mb-3 uppercase">餐點圖鑑</h1>
        <p className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase">Vegan Menu Gallery</p>
      </div>

      <div className="flex flex-col space-y-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex w-full h-[30vh] md:h-[40vh] gap-2 justify-around">
            {row.map((dish, colIndex) => {
              const isExpanded = expandedRows[rowIndex] === colIndex;
              
              return (
                <div 
                  key={dish.id} 
                  onMouseEnter={() => setExpandedRows(prev => ({ ...prev, [rowIndex]: colIndex }))}
                  className={`relative transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] overflow-hidden bg-stone-900 cursor-pointer ${isExpanded ? 'flex-[4]' : 'flex-1'}`}
                >
                  <img 
                    src={dish.img} 
                    alt={dish.name} 
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isExpanded ? 'grayscale-0 opacity-100' : 'grayscale-[0.3] opacity-60'}`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}></div>

                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                     <span className="text-white text-sm md:text-lg tracking-[0.3em] font-light uppercase [writing-mode:vertical-rl] drop-shadow-md">
                       {dish.shop}
                     </span>
                  </div>
                  
                  <div className={`absolute top-4 left-4 md:top-6 md:left-6 text-white transition-opacity duration-500 delay-100 z-10 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <h3 className="text-base md:text-xl font-bold tracking-[0.1em] whitespace-nowrap drop-shadow-md">
                      {dish.name}
                    </h3>
                  </div>

                  <div className={`absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white transition-opacity duration-500 delay-100 z-10 ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <span className="text-sm md:text-base font-bold tracking-widest whitespace-nowrap drop-shadow-md">
                      NT$ {dish.price}
                    </span>
                  </div>

                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      const targetShop = RESTAURANTS.find(r => r.name === dish.shop);
                      if(targetShop) {
                        setSelectedShop(targetShop);
                      }
                      setActiveTab('map');
                    }}
                    className={`absolute bottom-4 right-4 md:bottom-6 md:right-6 text-white border-b border-transparent hover:text-stone-300 hover:border-stone-300 transition-colors z-20 flex items-center space-x-1 duration-500 delay-100 cursor-pointer ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  >
                    <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] whitespace-nowrap uppercase drop-shadow-md">
                      {dish.shop}
                    </span>
                    <MapPin size={14} className="hidden md:block drop-shadow-md" />
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 視圖：步行地圖頁 ---
function MapView({ selectedShop, setSelectedShop }) {
  const [filterTime, setFilterTime] = useState('15');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const filteredShops = RESTAURANTS.filter(shop => {
    if (filterTime !== '全部' && shop.distance > parseInt(filterTime)) return false;
    if (searchQuery && !shop.name.includes(searchQuery) && !shop.type.includes(searchQuery)) return false;
    return true;
  });

  return (
    <div className="relative w-full h-full bg-[#E5E3DF] overflow-hidden flex animate-in fade-in duration-700">
      <div 
        className={`absolute top-0 left-0 h-full w-full md:w-[400px] bg-white shadow-[4px_0_24px_rgba(0,0,0,0.1)] z-40 flex flex-col transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-1/2 -right-6 w-6 h-14 bg-white border border-stone-200 border-l-0 rounded-r-md flex items-center justify-center shadow-sm text-stone-400 hover:text-[#1A1A1A] z-50 transition-colors"
        >
          {isSidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {selectedShop ? (
          <div className="flex-1 flex flex-col bg-white overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="relative w-full h-56 flex-shrink-0">
              <img src={selectedShop.img} className="w-full h-full object-cover" alt={selectedShop.name}/>
              <button 
                onClick={() => setSelectedShop(null)} 
                className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-[#1A1A1A] hover:bg-white shadow-sm transition-transform hover:scale-110"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h2 className="text-2xl font-black text-[#1A1A1A] mb-1">{selectedShop.name}</h2>
              <div className="flex items-center text-sm mb-4">
                <span className="font-bold text-[#1A1A1A] mr-1">{selectedShop.rating}</span>
                <div className="flex text-amber-500 mr-2">
                  {[...Array(5)].map((_,i) => <Star key={i} size={14} fill="currentColor"/>)}
                </div>
                <span className="text-stone-500">({selectedShop.reviews}) · $1-200</span>
              </div>
              <div className="flex space-x-6 border-b border-stone-200 text-sm font-bold text-stone-500 mb-6">
                <span className="text-emerald-700 border-b-2 border-emerald-700 pb-2">總覽</span>
                <span className="pb-2 hover:text-stone-800 cursor-pointer">菜單</span>
              </div>
              <div className="space-y-4 text-sm text-stone-700 border-t border-stone-100 pt-6">
                <div className="flex items-start space-x-3">
                  <div className="w-5 text-center mt-0.5"><Utensils size={18} className="text-stone-400" /></div>
                  <div className="flex items-center text-stone-600">
                    <span className="font-bold text-emerald-700 mr-2">{selectedShop.type}</span> · 內用 · 外帶
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 text-center mt-0.5"><MapPin size={18} className="text-stone-400" /></div>
                  <div>距離校門步行 {selectedShop.distance} 分鐘</div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-5 text-center mt-0.5"><Clock size={18} className="text-stone-400" /></div>
                  <div><span className="text-emerald-600 font-bold mr-2">營業中</span> · 打烊時間: {selectedShop.open.split(' - ')[1] || '20:00'}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            <div className="p-4 border-b border-stone-100 flex-shrink-0 z-10 bg-white">
               <div className="flex items-center bg-white border border-stone-200 shadow-sm rounded-full px-4 py-2.5 mb-3 focus-within:shadow-md transition-shadow">
                 <Search size={18} className="text-stone-400 mr-3 flex-shrink-0" />
                 <input 
                   type="text" 
                   placeholder="搜尋蔬食店家、分類..." 
                   className="flex-1 bg-transparent text-sm font-medium text-[#1A1A1A] focus:outline-none placeholder-stone-400" 
                   value={searchQuery} 
                   onChange={e => setSearchQuery(e.target.value)}
                 />
                 {searchQuery && <X size={18} className="text-stone-400 cursor-pointer" onClick={() => setSearchQuery('')}/>}
               </div>
               <div className="flex space-x-2 overflow-x-auto no-scrollbar">
                 <div className="flex items-center border border-stone-200 rounded-full px-3 py-1.5 text-xs text-stone-600 bg-white">
                   <Clock size={12} className="mr-1.5 text-stone-400"/>
                   <select 
                     className="bg-transparent focus:outline-none font-bold cursor-pointer"
                     value={filterTime}
                     onChange={(e) => setFilterTime(e.target.value)}
                   >
                     <option value="全部">不限距離</option>
                     <option value="15">步行 15分內</option>
                     <option value="10">步行 10分內</option>
                     <option value="5">步行 5分內</option>
                   </select>
                 </div>
               </div>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar bg-white">
               {filteredShops.map(shop => (
                 <div 
                   key={shop.id} 
                   className="p-5 border-b border-stone-100 flex cursor-pointer hover:bg-stone-50 transition-colors" 
                   onClick={() => setSelectedShop(shop)}
                 >
                    <div className="flex-1 pr-4">
                      <h3 className="font-bold text-[#1A1A1A] text-base mb-1">{shop.name}</h3>
                      <div className="flex items-center text-[11px] text-stone-500 mb-1.5">
                        <span className="text-[#1A1A1A] font-bold mr-1">{shop.rating}</span>
                        <div className="flex text-amber-500 mr-1">
                          {[...Array(5)].map((_,i) => <Star key={i} size={10} fill="currentColor"/>)}
                        </div>
                      </div>
                      <div className="text-[11px] text-stone-500 mb-1">
                        <span className="text-emerald-700 font-bold">{shop.type}</span> · 步行 {shop.distance}m
                      </div>
                    </div>
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-stone-100">
                      <img src={shop.img} className="w-full h-full object-cover" alt={shop.name}/>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        )}
      </div>

      {/* 右側地圖區域 */}
      <div className="flex-1 relative bg-[#E8EAED]">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute top-[45%] left-[55%] z-10 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-10 h-10 bg-emerald-600 rounded-full shadow-lg border-[3px] border-white flex items-center justify-center text-white mb-1">
            <span className="text-[10px] font-black">YZU</span>
          </div>
          <span className="bg-white/80 backdrop-blur px-2 py-0.5 rounded shadow text-[9px] font-bold text-[#1A1A1A]">元智大學</span>
        </div>
        {filteredShops.map(r => (
          <div 
            key={r.id}
            className="absolute cursor-pointer transition-all z-20 group"
            style={{ 
              top: `${45 + (r.distance % 2 === 0 ? 1 : -1) * (r.distance * 1.5)}%`, 
              left: `${55 + (r.id % 2 === 0 ? 1 : -1) * (r.distance * 2)}%` 
            }}
            onClick={() => { setSelectedShop(r); setIsSidebarOpen(true); }}
          >
            <div className="flex flex-col items-center relative">
              <div className={`px-2 py-1 rounded-md shadow-md text-[10px] font-bold mb-1 transition-colors ${selectedShop?.id === r.id ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#1A1A1A]'}`}>
                {r.name}
              </div>
              <MapPin 
                size={24} 
                className={`${selectedShop?.id === r.id ? 'text-[#1A1A1A] scale-110' : 'text-emerald-600'} drop-shadow-sm transition-all`} 
                fill={selectedShop?.id === r.id ? '#1A1A1A' : '#ffffff'}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 視圖：素食小百科 (InfoView) ---
const NutritionRadarChart = ({ data }) => {
  const maxVal = Math.max(...data.map(d => d.value), 100) * 1.3; 

  const getPoint = (value, i) => {
    const r = (value / maxVal) * 35; 
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2; 
    return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`;
  };

  const points = data.map((d, i) => getPoint(d.value, i)).join(' ');
  const baseScales = [1, 0.8, 0.6, 0.4, 0.2];

  return (
    <svg viewBox="-20 -20 140 140" className="w-full max-w-[280px] h-auto drop-shadow-sm transition-all duration-500 mx-auto">
      {baseScales.map((scale, idx) => (
        <polygon
          key={idx}
          points={[0, 1, 2, 3, 4].map(i => getPoint(maxVal * scale, i)).join(' ')}
          fill={idx % 2 === 0 ? "rgba(246, 246, 244, 0.5)" : "none"}
          stroke="#E5E3DF"
          strokeWidth="0.5"
        />
      ))}
      {[0, 1, 2, 3, 4].map(i => (
        <line
          key={i}
          x1="50"
          y1="50"
          x2={50 + 35 * Math.cos((Math.PI * 2 * i) / 5 - Math.PI / 2)}
          y2={50 + 35 * Math.sin((Math.PI * 2 * i) / 5 - Math.PI / 2)}
          stroke="#E5E3DF"
          strokeWidth="0.5"
        />
      ))}
      <polygon points={points} fill="rgba(26, 26, 26, 0.1)" stroke="#1A1A1A" strokeWidth="1.5" className="transition-all duration-500" />
      
      {data.map((d, i) => {
        const cx = 50 + (d.value / maxVal) * 35 * Math.cos((Math.PI * 2 * i) / 5 - Math.PI / 2);
        const cy = 50 + (d.value / maxVal) * 35 * Math.sin((Math.PI * 2 * i) / 5 - Math.PI / 2);
        return (
          <circle
            key={`point-${i}`}
            cx={cx}
            cy={cy}
            r="2"
            fill="#1A1A1A"
            className="transition-all duration-500"
          />
        );
      })}

      {data.map((d, i) => {
        const r = 48; 
        const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
        const x = 50 + r * Math.cos(angle);
        const y = 50 + r * Math.sin(angle);
        const unit = d.name === '熱量' ? 'kcal' : 'g';
        return (
          <text key={i} x={x} y={y} fontSize="4" fill="#666" textAnchor="middle" alignmentBaseline="middle" className="font-bold tracking-widest transition-all duration-500">
            <tspan x={x} dy="-3">{d.name}</tspan>
            <tspan x={x} dy="4.5" fontSize="3" fill="#999">({unit})</tspan>
            <tspan x={x} dy="5" fontSize="4.5" fill="#1A1A1A" className="font-black">{d.value}{unit}</tspan>
          </text>
        );
      })}
    </svg>
  );
};

function InfoView() {
  const [selectedCategory, setSelectedCategory] = useState('飯麵類');

  const categories = [
    { title: '全素 / 純素', desc: '不含動物性成分，且不包含五辛。' },
    { title: '蛋奶素', desc: '可食用植物性食物、蛋類及奶製品。' },
    { title: '五辛素', desc: '除了植物外，亦含蔥、蒜、韭、蕎及洋蔥。' },
    { title: '彈性素', desc: '多數時間維持蔬食，僅偶爾食用肉類。' },
  ];

  const NUTRITION_DATA = {
    '飯麵類': [
      { name: '白飯', values: [{name: '熱量', value: 183}, {name: '糖分', value: 40}, {name: '蛋白質', value: 3}, {name: '脂肪', value: 0.3}, {name: '纖維', value: 0.4}] },
      { name: '糙米飯', values: [{name: '熱量', value: 111}, {name: '糖分', value: 23}, {name: '蛋白質', value: 2.6}, {name: '脂肪', value: 0.9}, {name: '纖維', value: 1.8}] },
      { name: '胚芽飯', values: [{name: '熱量', value: 160}, {name: '糖分', value: 34}, {name: '蛋白質', value: 3.5}, {name: '脂肪', value: 1.2}, {name: '纖維', value: 1.5}] },
      { name: '地瓜', values: [{name: '熱量', value: 86}, {name: '糖分', value: 20}, {name: '蛋白質', value: 1.6}, {name: '脂肪', value: 0.1}, {name: '纖維', value: 3}] }
    ],
    '蔬菜類': [
      { name: '高麗菜', values: [{name: '熱量', value: 25}, {name: '糖分', value: 5}, {name: '蛋白質', value: 1.3}, {name: '脂肪', value: 0.2}, {name: '纖維', value: 2.5}] },
      { name: '花椰菜', values: [{name: '熱量', value: 34}, {name: '糖分', value: 7}, {name: '蛋白質', value: 2.8}, {name: '脂肪', value: 0.4}, {name: '纖維', value: 2.6}] },
      { name: '地瓜葉', values: [{name: '熱量', value: 22}, {name: '糖分', value: 4}, {name: '蛋白質', value: 2.5}, {name: '脂肪', value: 0.2}, {name: '纖維', value: 3.3}] },
      { name: '菠菜', values: [{name: '熱量', value: 23}, {name: '糖分', value: 4}, {name: '蛋白質', value: 2.9}, {name: '脂肪', value: 0.4}, {name: '纖維', value: 2.2}] }
    ],
    '豆製品': [
      { name: '嫩豆腐', values: [{name: '熱量', value: 50}, {name: '糖分', value: 2}, {name: '蛋白質', value: 5.3}, {name: '脂肪', value: 3.0}, {name: '纖維', value: 0.2}] },
      { name: '板豆腐', values: [{name: '熱量', value: 85}, {name: '糖分', value: 3}, {name: '蛋白質', value: 8.5}, {name: '脂肪', value: 5.0}, {name: '纖維', value: 0.6}] },
      { name: '毛豆', values: [{name: '熱量', value: 125}, {name: '糖分', value: 11}, {name: '蛋白質', value: 12.0}, {name: '脂肪', value: 6.0}, {name: '纖維', value: 4.2}] },
      { name: '無糖豆漿', values: [{name: '熱量', value: 35}, {name: '糖分', value: 1}, {name: '蛋白質', value: 3.6}, {name: '脂肪', value: 2.0}, {name: '纖維', value: 0.2}] }
    ]
  };

  return (
    <div className="py-12 px-6 max-w-6xl mx-auto animate-in fade-in duration-1000">
      
      <div className="text-center mb-20">
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-[#1A1A1A] mb-4 uppercase">素食小百科</h1>
        <p className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase">Vegan Knowledge Base</p>
      </div>

      <div className="mb-24">
        <div className="flex items-center space-x-3 mb-8 border-b border-stone-200 pb-4">
          <Info size={18} className="text-[#1A1A1A]" />
          <h2 className="text-xl font-bold tracking-[0.15em] text-[#1A1A1A]">素食分類介紹</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-white p-8 border border-stone-200 hover:border-[#1A1A1A] hover:-translate-y-1 transition-all duration-300">
              {/* 移除了數標 01, 02... */}
              <h3 className="text-sm font-bold tracking-[0.1em] text-[#1A1A1A] mb-3">{cat.title}</h3>
              <p className="text-xs text-stone-500 tracking-wider leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b border-stone-200 pb-4 gap-4">
          <div className="flex items-center space-x-3">
            <Activity size={18} className="text-[#1A1A1A]" />
            <h2 className="text-xl font-bold tracking-[0.15em] text-[#1A1A1A]">常見蔬食食材五角圖 (每100克)</h2>
          </div>
          
          <div className="flex space-x-2 overflow-x-auto no-scrollbar max-w-full pb-2 md:pb-0">
            {Object.keys(NUTRITION_DATA).map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`py-2 px-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border rounded-full whitespace-nowrap ${
                  selectedCategory === cat 
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' 
                    : 'bg-white text-stone-500 border-stone-200 hover:border-[#1A1A1A] hover:text-[#1A1A1A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {NUTRITION_DATA[selectedCategory].map((item, idx) => (
            <div key={idx} className="flex-shrink-0 w-[260px] md:w-[300px] snap-center bg-white border border-stone-200 p-6 flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <NutritionRadarChart data={item.values} />
              <h3 className="text-sm font-bold tracking-[0.15em] text-[#1A1A1A] mt-6">{item.name}</h3>
            </div>
          ))}
        </div>

        <p className="text-right text-[10px] text-stone-400 font-bold tracking-widest mt-6">
          * 以上數據比例僅供參考，實際數值會依烹調方式與食材產地有所差異。
        </p>
      </div>
    </div>
  );
}

// --- 視圖：關於我們 (AboutView) ---
function AboutView() {
  const teamMembers = [
    { name: "王大明", role: "Project Lead", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" },
    { name: "李小華", role: "UI/UX Design", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
    { name: "陳阿強", role: "Frontend Dev", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" },
    { name: "張小美", role: "Data Analysis", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
    { name: "林小宇", role: "Marketing", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop" }
  ];

  return (
    <div className="py-12 md:py-24 px-6 max-w-6xl mx-auto animate-in fade-in duration-1000">

      <div className="text-center mb-24">
        <h1 className="text-3xl md:text-4xl font-light tracking-[0.2em] text-[#1A1A1A] mb-4 uppercase">關於我們</h1>
        <p className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase">About YZU Veggie</p>
      </div>

      <div className="mb-32 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-light tracking-[0.1em] text-[#1A1A1A] leading-[1.5] mb-16 relative inline-block">
          <span className="absolute -top-8 -left-8 text-stone-200">
            <Leaf size={48} strokeWidth={1} />
          </span>
          不僅是飲食，<br className="md:hidden" />更是對生命的承諾。
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div className="space-y-4">
            <h3 className="text-sm font-bold tracking-[0.15em] text-[#1A1A1A] border-b border-[#1A1A1A] pb-2 inline-block uppercase">設計緣由</h3>
            <p className="text-sm text-stone-500 leading-loose tracking-wide font-medium">
              元智大學生活圈雖然美食林立，但長期以來存在資訊不對稱與選擇門檻高的問題。學生午休時間有限，若不清楚哪家店有提供蔬食，往往會因「尋找餐廳太麻煩」而放棄健康的飲食選項。<br /><br />
              本平台透過數位工具，消除「懶」的障礙，讓健康與永續成為元智人的日常。
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold tracking-[0.15em] text-[#1A1A1A] border-b border-[#1A1A1A] pb-2 inline-block uppercase">核心價值</h3>
            <p className="text-sm text-stone-500 leading-loose tracking-wide font-medium">
              我們相信，當你開始了解每一口食物的分類與能量，你就已經在為校園的永續轉型貢獻力量。<br /><br />
              <span className="text-[#1A1A1A] font-bold">透明的飲食資訊不僅是實踐「責任消費」的第一步，更是落實「健康與福祉」的核心基石。</span>
            </p>
          </div>
        </div>
      </div>

      <div className="pt-16 border-t border-stone-200">
        <div className="text-center mb-16">
          <h2 className="text-xl font-bold tracking-[0.2em] text-[#1A1A1A] uppercase mb-2">網站成員</h2>
          <p className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase">Team Members</p>
        </div>

        {/* 確保 5 個人排在同一行，手機版可水平滑動 */}
        <div className="flex flex-nowrap md:grid md:grid-cols-5 gap-6 md:gap-4 overflow-x-auto no-scrollbar pb-8 snap-x justify-start md:justify-items-center">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="flex flex-col items-center flex-shrink-0 w-32 md:w-auto snap-center group cursor-default">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-5 border border-stone-200 group-hover:border-[#1A1A1A] transition-colors duration-500 shadow-sm">
                 <img
                   src={member.img}
                   alt={member.name}
                   className="w-full h-full object-cover grayscale-[0.8] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                 />
              </div>
              <h3 className="text-sm font-bold tracking-[0.2em] text-[#1A1A1A] mb-1.5">{member.name}</h3>
              <p className="text-[9px] font-bold tracking-widest text-stone-400 uppercase text-center">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}