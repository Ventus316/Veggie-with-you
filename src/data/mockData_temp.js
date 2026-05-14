export const RESTAURANTS = [
  { 
    id: 1, 
    name: "素窩-素食早午餐", 
    distance: { walking: 5, scooter: 2 }, 
    address: "桃園市中壢區興仁路二段67巷79弄7號",
    phone: "03-456-7890", 
    priceRange: "NT$ 50 - 150", 
    open: [
      { day: '一', time: '08:00-19:00' },
      { day: '二', time: '08:00-19:00' },
      { day: '三', time: '08:00-19:00' },
      { day: '四', time: '08:00-19:00' },
      { day: '五', time: '08:00-19:00' },
      { day: '六', time: '08:00-13:30' },
      { day: '日', time: '08:00-13:30' }
    ], 
    type: "素食早午餐",
    rating: "4.8", reviews: "120", 
    features: {
      portion: "份量正常偏多",
      environment: "裝潢簡約、舒適乾淨",
      restroom: "不外借",
      payment: "只收現金",
      reservation: "不可訂位"
    },
    menuImg: "images/suwo_menu1.jpeg",
    img: "images/suwo_store2.jpeg", 
    recommendations: [
      { name: "薯餅漢堡", price: null, img: "images/suwo_burger.jpeg" }, 
      { name: "素煎餃", price: 65, img: "images/suwo_dumpling.jpeg" }
    ],
    lat: 24.9678, lng: 121.2636 
  },
  { 
    id: 2, 
    name: "天然素食", 
    distance: { walking: 5, scooter: 2 }, 
    address: "桃園市中壢區興仁路一段86號",
    phone: "03-456-7890", 
    priceRange: "NT$ 50 - 150", 
    open: [
      { day: '一', time: '休息' },
      { day: '二', time: '11:00-14:00\n16:30-19:30' },
      { day: '三', time: '11:00-14:00\n16:30-19:30' },
      { day: '四', time: '11:00-14:00\n16:30-19:30' },
      { day: '五', time: '11:00-14:00\n16:30-19:30' },
      { day: '六', time: '11:00-14:00\n16:30-19:30' },
      { day: '日', time: '11:00-14:00\n16:30-19:30' }
    ], 
    type: "傳統素食",
    rating: "4.5", reviews: "85", 
    features: {
      portion: "份量正常",
      environment: "店面較老舊",
      restroom: "無",
      payment: "只收現金",
      reservation: "不可訂位"
    },
    menuImg: "images/tianran_menu.jpeg", 
    img: "images/tianran_store1.jpeg", 
    recommendations: [
      { name: "素蚵仔煎", price: 60, img: "images/tianran_oyster.jpeg" }, 
      { name: "素水餃", price: 50, img: "images/tianran_dumpling.jpeg" }
    ],
    lat: 24.9711, lng: 121.2604
  },
  { 
    id: 3, 
    name: "十味健康素食-中壢環中店", 
    distance: { walking: 5, scooter: 2 }, 
    address: "桃園市中壢區環中東路96號",
    phone: "03-456-7890", 
    priceRange: "NT$ 50 - 150", 
    open: [
      { day: '一', time: '休息' },
      { day: '二', time: '11:00-14:00\n17:00-19:30' },
      { day: '三', time: '11:00-14:00\n17:00-19:30' },
      { day: '四', time: '休息' },
      { day: '五', time: '11:00-14:00\n17:00-19:30' },
      { day: '六', time: '11:00-14:00\n17:00-19:30' },
      { day: '日', time: '11:00-14:00\n17:00-19:30' }
    ], 
    type: "健康素食",
    rating: "4.7", reviews: "156", 
    features: {
      portion: "份量正常",
      environment: "店面寬敞乾淨",
      restroom: "有",
      payment: "只收現金",
      reservation: "不可訂位"
    },
    menuImg: "images/shiwei_menu1.jpeg", 
    img: "images/shiwei_store1.jpeg", 
    recommendations: [
      { name: "素咖哩烏龍麵", price: 125, img: "images/shiwei_udon.jpg" }, 
      { name: "素魯飯", price: 45, img: "images/shiwei_rice.jpeg" }
    ],
    lat: 24.9772, lng: 121.2532 
  },
  { 
    id: 4, 
    name: "蓮生健康素食", 
    distance: { walking: 5, scooter: 2 }, 
    address: "桃園市中壢區榮民路220-2號",
    phone: "03-456-7890", 
    priceRange: "NT$ 50 - 150", 
    open: [
      { day: '一', time: '11:00-14:00' },
      { day: '二', time: '11:00-14:00' },
      { day: '三', time: '11:00-14:00' },
      { day: '四', time: '11:00-14:00' },
      { day: '五', time: '11:00-14:00' },
      { day: '六', time: '休息' },
      { day: '日', time: '休息' }
    ], 
    type: "素食便當",
    rating: "4.6", reviews: "92", 
    features: {
      portion: "份量偏多",
      environment: "環境明亮乾淨",
      restroom: "有",
      payment: "只收現金",
      reservation: "不可訂位"
    },
    menuImg: "images/liansheng_menu1.jpeg", 
    img: "images/liansheng_store.jpeg", 
    recommendations: [
      { name: "素排飯", price: 90, img: "images/liansheng_rice.jpeg" }, 
      { name: "青菜豆腐湯", price: null, img: "images/liansheng_soup.jpeg" }
    ],
    lat: 24.9654, lng: 121.2610 
  },
  { 
    id: 5, 
    name: "拼拼蔬食", 
    distance: { walking: 5, scooter: 2 }, 
    address: "桃園市中壢區福德路129巷1號",
    phone: "03-456-7890", 
    priceRange: "NT$ 50 - 150", 
    open: [
      { day: '一', time: '休息' },
      { day: '二', time: '11:00-14:00\n16:30-20:30' },
      { day: '三', time: '11:00-14:00\n16:30-20:30' },
      { day: '四', time: '11:00-14:00\n16:30-20:30' },
      { day: '五', time: '11:00-14:00\n16:30-20:30' },
      { day: '六', time: '休息' },
      { day: '日', time: '休息' }
    ], 
    type: "客製滷味/麵食",
    rating: "4.8", reviews: "210", 
    features: {
      portion: "份量正常",
      environment: "明亮乾淨",
      restroom: "無",
      payment: "只收現金",
      reservation: "不可訂位"
    },
    menuImg: "images/pinpin_menu.jpeg", 
    img: "images/pinpin_store.jpeg", 
    recommendations: [
      { name: "香椿湯麵", price: 80, img: "images/pinpin_noodle.jpeg" }, 
      { name: "客製滷味", price: null, img: "images/pinpin_luwei.jpeg" }
    ],
    lat: 24.9763, lng: 121.2573 
  },
  { 
    id: 6, 
    name: "5+2素食坊", 
    distance: { walking: 5, scooter: 2 }, 
    address: "桃園市中壢區成章二街42號",
    phone: "03-456-7890", 
    priceRange: "NT$ 50 - 150", 
    open: [
      { day: '一', time: '休息' },
      { day: '二', time: '11:00-20:00' },
      { day: '三', time: '11:00-20:00' },
      { day: '四', time: '11:00-20:00' },
      { day: '五', time: '11:00-20:00' },
      { day: '六', time: '休息' },
      { day: '日', time: '休息' }
    ], 
    type: "小吃麵館",
    rating: "4.4", reviews: "68", 
    features: {
      portion: "份量正常",
      environment: "一般小吃店",  
      restroom: "無",
      payment: "只收現金",
      reservation: "不可訂位"
    },
    menuImg: "images/5plus2_menu.jpeg", 
    img: "images/5plus2_store1.jpeg", 
    recommendations: [
      { name: "素圓", price: 20, img: "images/5plus2_meatball.jpeg" }, 
      { name: "素香麵", price: 60, img: "images/5plus2_noodle.jpeg" }
    ],
    lat: 24.9784, lng: 121.2582 
  },
  { 
    id: 7, 
    name: "蔬適圈串物坊", 
    distance: { walking: 5, scooter: 2 }, 
    address: "桃園市中壢區文化路54號",
    phone: "03-456-7890", 
    priceRange: "NT$ 50 - 150", 
    open: [
      { day: '一', time: '休息' },
      { day: '二', time: '17:00-23:00' },
      { day: '三', time: '17:00-23:00' },
      { day: '四', time: '17:00-23:00' },
      { day: '五', time: '17:00-23:00' },
      { day: '六', time: '休息' },
      { day: '日', time: '休息' }
    ], 
    type: "素食串烤/炸物",
    rating: "4.9", reviews: "188", 
    features: {
      portion: "份量正常偏少",
      environment: "環境整潔乾淨",
      restroom: "無",
      payment: "只收現金",
      reservation: "可訂位 (需預訂)"
    },
    menuImg: "images/comfortzone_menu.jpeg", 
    img: "images/comfortzone_store.jpeg", 
    recommendations: [
      { name: "起司馬鈴薯", price: 100, img: "images/comfortzone_potato.png" }, 
      { name: "起司豆皮", price: 50, img: "images/comfortzone_tofu.png" }
    ],
    lat: 24.9730, lng: 121.2545 
  },
  { 
    id: 8, 
    name: "義式美味素食", 
    distance: { walking: 5, scooter: 2 }, 
    address: "桃園市中壢區中華路一段616號",
    phone: "03-456-7890", 
    priceRange: "NT$ 50 - 150", 
    open: [
      { day: '一', time: '11:00-14:00\n16:00-20:00' },
      { day: '二', time: '11:00-14:00\n16:00-20:00' },
      { day: '三', time: '11:00-14:00\n16:00-20:00' },
      { day: '四', time: '11:00-14:00\n16:00-20:00' },
      { day: '五', time: '11:00-14:00\n16:00-20:00' },
      { day: '六', time: '11:00-15:00\n16:00-20:00' },
      { day: '日', time: '休息' }
    ], 
    type: "義式料理",
    rating: "4.8", reviews: "312", 
    features: {
      portion: "份量正常",
      environment: "店面整體乾淨明亮，適合聚會",
      restroom: "有",
      payment: "現金、信用卡、行動支付",
      reservation: "可訂位"
    },
    menuImg: "images/italian_menu1.jpeg", 
    img: "images/italian_store.jpeg", 
    recommendations: [
      { name: "招牌總匯披薩", price: 130, img: "images/italian_pizza.jpeg" }, 
      { name: "田園風味焗烤飯", price: 115, img: "images/italian_rice.jpeg" }
    ],
    lat: 24.9696, lng: 121.2505 
  },
  { 
    id: 9, 
    name: "福緣素食", 
    distance: { walking: 5, scooter: 2 }, 
    address: "桃園市中壢區榮民路227號",
    phone: "03-456-7890", 
    priceRange: "NT$ 50 - 150", 
    open: [
      { day: '一', time: '10:00-13:00\n17:00-20:00' },
      { day: '二', time: '10:00-13:00\n17:00-20:00' },
      { day: '三', time: '10:00-13:00\n17:00-20:00' },
      { day: '四', time: '10:00-13:00\n17:00-20:00' },
      { day: '五', time: '10:00-13:00\n17:00-20:00' },
      { day: '六', time: '10:00-13:00\n17:00-20:00' },
      { day: '日', time: '休息' }
    ], 
    type: "全素餐點",
    rating: "4.5", reviews: "88", 
    features: {
      portion: "價格親民，份量十足",
      environment: "傳統小吃店，有提供兒童高腳椅",
      restroom: "無",
      payment: "只收現金",
      reservation: "現場候位"
    },
    menuImg: "images/fuyuan_menu.jpeg",
    img: "images/fuyuan_store.jpeg", 
    recommendations: [
      { name: "什錦炒麵", price: 50, img: "images/fuyuan_noodles.jpeg" }, 
      { name: "招牌便當", price: 95, img: "images/fuyuan_bento.jpeg" }
    ],
    lat: 24.9650, lng: 121.2580 
  },
  { 
    id: 10, 
    name: "蔬菓食堂 Vege&Dessert", 
    distance: { walking: 5, scooter: 2 }, 
    address: "桃園市八德區永福西街68-1號",
    phone: "03-456-7890", 
    priceRange: "NT$ 50 - 150", 
    open: [
      { day: '一', time: '11:00-14:30\n17:00-20:00' },
      { day: '二', time: '11:00-14:30\n17:00-20:00' },
      { day: '三', time: '11:00-14:30\n17:00-20:00' },
      { day: '四', time: '休息' },
      { day: '五', time: '11:00-14:30\n17:00-20:00' },
      { day: '六', time: '11:00-14:30\n17:00-20:00' },
      { day: '日', time: '11:00-14:30\n17:00-20:00' }
    ], 
    type: "素食精緻料理",
    rating: "4.8", reviews: "156", 
    features: {
      portion: "精緻套餐，配菜豐富",
      environment: "健康天然無添加味精，裝潢有質感",
      restroom: "有",
      payment: "只收現金",
      reservation: "可訂位"
    },
    menuImg: "images/vege_menu.jpeg",
    img: "images/vege_store.jpeg", 
    recommendations: [
      { name: "藥膳十全大補鍋", price: 228, img: "images/vege_hotpot.jpeg" }, 
      { name: "脆皮叉燒飯(純素)", price: 130, img: "images/vege_rice.jpeg" }
    ],
    lat: 24.9620, lng: 121.2750 
  },
  { 
    id: 11, 
    name: "得來素素食餐飲 (中原店)", 
    distance: { walking: 5, scooter: 2 }, 
    address: "桃園市中壢區弘揚路77號",
    phone: "03-456-7890", 
    priceRange: "NT$ 50 - 150", 
    open: [
      { day: '一', time: '06:15-13:00' },
      { day: '二', time: '06:15-13:00' },
      { day: '三', time: '06:15-13:00' },
      { day: '四', time: '06:15-13:00' },
      { day: '五', time: '06:15-13:00' },
      { day: '六', time: '06:15-13:00' },
      { day: '日', time: '休息' }
    ], 
    type: "素食早午餐",
    rating: "4.7", reviews: "185", 
    features: {
      portion: "選擇多樣，適合年輕人口味",
      environment: "連鎖店裝潢，明亮乾淨",
      restroom: "有",
      payment: "只收現金",
      reservation: "現場候位"
    },
    menuImg: "images/delaisu_menu.jpeg",
    img: "images/delaisu_store.jpeg", 
    recommendations: [
      { name: "薯餅堡", price: 50, img: "images/delaisu_burger.jpeg" }, 
      { name: "起司蛋餅", price: 40, img: "images/delaisu_egg.jpeg" }
    ],
    lat: 24.9580, lng: 121.2410 
  },
  { 
    id: 12,
    name: "越式素食 歡喜吃素", 
    distance: { walking: 5, scooter: 2 }, 
    address: "桃園市桃園區正康二街70號",
    phone: "03-456-7890", 
    priceRange: "NT$ 50 - 150", 
    open: [
      { day: '一', time: '11:00-20:00' },
      { day: '二', time: '11:00-20:00' },
      { day: '三', time: '休息' },
      { day: '四', time: '休息' },
      { day: '五', time: '11:00-20:00' },
      { day: '六', time: '11:00-20:00' },
      { day: '日', time: '11:00-20:00' }
    ], 
    type: "越式素食料理",
    rating: "4.8", reviews: "112", 
    features: {
      portion: "份量適中，充滿越式風味",
      environment: "溫馨乾淨的小店面",
      restroom: "有",
      payment: "只收現金",
      reservation: "接受訂位"
    },
    menuImg: "images/hoanhy_menu.jpeg",
    img: "images/hoanhy_store.jpeg", 
    recommendations: [
      { name: "什錦米粉", price: 90, img: "images/hoanhy_noodles.jpeg" }, 
      { name: "月亮煎餅", price: 110, img: "images/hoanhy_pancake.jpeg" }
    ],
    lat: 24.9980, lng: 121.3050 
  }
];