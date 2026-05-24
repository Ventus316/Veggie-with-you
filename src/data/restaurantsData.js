// src/data/restaurantsData.js

export const RESTAURANTS = [
  { 
    id: 1, 
    name: "素窩-素食早午餐", 
    distance: { walking: 5, bicycle: 2, scooter: 2 },
    address: "桃園市中壢區興仁路二段67巷79弄7號",
    phone: "03-285-0018", 
    priceRange: "NT$ 30 - 200", 
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
    menuImg: "shops/images/suwo_menu1.jpeg",
    img: "shops/images/suwo_store2.jpeg", 
    shopLogo: "/shops/icons/suwo.svg",
    shopBg: "/shops/enviroment/suwo.png",
    recommendations: [
      { name: "薯餅漢堡", price: 55, img: "shops/images/suwo_burger.jpeg" }, 
      { name: "素煎餃", price: 65, img: "shops/images/suwo_dumpling.jpeg" }
    ],
    lat: 24.9678, lng: 121.2636 
  },
  { 
    id: 2, 
    name: "天然素食", 
    distance: { walking: 8, bicycle: 4, scooter: 4 },
    address: "桃園市中壢區興仁路一段86號",
    phone: "03-451-9063", 
    priceRange: "NT$ 30 - 200", 
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
    menuImg: "shops/images/tianran_menu.jpeg", 
    img: "shops/images/tianran_store1.jpeg", 
    shopLogo: "/shops/icons/tianran.svg",
    shopBg: "/shops/enviroment/tianran.png",
    recommendations: [
      { name: "素蚵仔煎", price: 50, img: "shops/images/tianran_oyster.jpeg" }, 
      { name: "素水餃", price: 50, img: "shops/images/tianran_dumpling.jpeg" }
    ],
    lat: 24.9711, lng: 121.2604
  },
  { 
    id: 3, 
    name: "十味健康素食", 
    distance: { walking: 12, bicycle: 5, scooter: 4 },
    address: "桃園市中壢區環中東路96號",
    phone: "03-463-8858", 
    priceRange: "NT$ 50 - 200", 
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
    menuImg: "shops/images/shiwei_menu2.jpeg", 
    img: "shops/images/shiwei_store1.jpeg", 
    shopLogo: "/shops/icons/shiwei.svg",
    shopBg: "/shops/enviroment/shiwei.png",
    recommendations: [
      { name: "咖哩烏龍麵", price: 125, img: "shops/images/shiwei_udon.jpg" }, 
      { name: "素魯飯", price: 45, img: "shops/images/shiwei_rice.jpeg" }
    ],
    lat: 24.9772, lng: 121.2532 
  },
  { 
    id: 4, 
    name: "蓮生健康素食", 
    distance: { walking: 10, bicycle: 4, scooter: 3 },
    address: "桃園市中壢區榮民路220-2號",
    phone: "03-461-5338", 
    priceRange: "NT$ 30 - 200", 
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
    menuImg: "shops/images/liansheng_menu1.jpeg", 
    img: "shops/images/liansheng_store.jpeg", 
    shopLogo: "/shops/icons/liansheng.svg",
    shopBg: "/shops/enviroment/liansheng.png",
    recommendations: [
      { name: "素排飯", price: 90, img: "shops/images/liansheng_rice.jpeg" }, 
      { name: "青菜豆腐湯", price: 35, img: "shops/images/liansheng_soup.jpeg" }
    ],
    lat: 24.9654, lng: 121.2610 
  },
  { 
    id: 5, 
    name: "拼拼蔬食", 
    distance: { walking: 17, bicycle: 6, scooter: 4 },
    address: "桃園市中壢區福德路129巷1號",
    phone: "03-453-5089", 
    priceRange: "NT$ 30 - 200", 
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
    menuImg: "shops/images/pinpin_menu.jpeg", 
    img: "shops/images/pinpin_store.jpeg", 
    shopLogo: "/shops/icons/pinpin.svg",
    shopBg: "/shops/enviroment/pinpin.png",
    recommendations: [
      { name: "香椿湯麵", price: 80, img: "shops/images/pinpin_noodle.jpeg" }, 
      { name: "客製滷味", price: '自由搭配', img: "shops/images/pinpin_luwei.jpeg" }
    ],
    lat: 24.9763, lng: 121.2573 
  },
  { 
    id: 6, 
    name: "5+2素食坊", 
    distance: { walking: 19, bicycle: 7, scooter: 5 },
    address: "桃園市中壢區成章二街42號",
    phone: "0919-578-019", 
    priceRange: "NT$ 10 - 150", 
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
      environment: "店面較老舊，位置較少",  
      restroom: "無",
      payment: "只收現金",
      reservation: "不可訂位"
    },
    menuImg: "shops/images/5plus2_menu.jpeg", 
    img: "shops/images/5plus2_store1.jpeg", 
    shopLogo: "/shops/icons/5plus2.svg",
    shopBg: "/shops/enviroment/5plus2.png",
    recommendations: [
      { name: "素圓", price: 20, img: "shops/images/5plus2_meatball.jpeg" }, 
      { name: "素香麵", price: 60, img: "shops/images/5plus2_noodle.jpeg" }
    ],
    lat: 24.9784, lng: 121.2582 
  },
  { 
    id: 7, 
    name: "蔬適圈串物坊", 
    distance: { walking: 20, bicycle: 7, scooter: 5 },
    address: "桃園市中壢區文化路54號",
    phone: "0901-063-116", 
    priceRange: "NT$ 40 - 400", 
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
    menuImg: "shops/images/comfortzone_menu.jpeg", 
    img: "shops/images/comfortzone_store.jpeg", 
    shopLogo: "/shops/icons/comfortzone.svg",
    shopBg: "/shops/enviroment/comfortzone.png",
    recommendations: [
      { name: "起司馬鈴薯", price: 100, img: "shops/images/comfortzone_potato.png" }, 
      { name: "起司豆皮", price: 50, img: "shops/images/comfortzone_tofu.png" }
    ],
    lat: 24.9730, lng: 121.2545 
  },
  { 
    id: 8, 
    name: "義式美味素食", 
    distance: { walking: 26, bicycle: 11, scooter: 6 },
    address: "桃園市中壢區中華路一段616號",
    phone: "03-455-3019", 
    priceRange: "NT$ 60 - 200", 
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
    menuImg: "shops/images/italian_menu1.jpeg", 
    img: "shops/images/italian_store.jpeg", 
    shopLogo: "/shops/icons/italian.svg",
    shopBg: "/shops/enviroment/italian.png",
    recommendations: [
      { name: "招牌總匯披薩", price: 130, img: "shops/images/italian_pizza.jpeg" }, 
      { name: "田園風味焗烤飯", price: 115, img: "shops/images/italian_rice.jpeg" }
    ],
    lat: 24.9696, lng: 121.2505 
  },
  { 
    id: 9, 
    name: "福緣素食", 
    distance: { walking: 11, bicycle: 4, scooter: 3 },
    address: "桃園市中壢區榮民路227號",
    phone: "03-462-9168", 
    priceRange: "NT$ 30 - 150", 
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
    menuImg: "shops/images/fuyuan_menu.png",
    img: "shops/images/fuyuan_store.png", 
    shopLogo: "/shops/icons/fuyuan.svg",
    shopBg: "/shops/enviroment/fuyuan.png",
    recommendations: [
      { name: "什錦炒麵", price: 50, img: "shops/images/fuyuan_noodles.png" }, 
      { name: "招牌便當", price: 95, img: "shops/images/fuyuan_bento.png" }
    ],
    lat: 24.9650, lng: 121.2580 
  },
  { 
    id: 10, 
    name: "蔬菓食堂", 
    distance: { walking: 63, bicycle: 16, scooter: 12 },
    address: "桃園市八德區永福西街68-1號",
    phone: "0910-016-798", 
    priceRange: "NT$ 80 - 250", 
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
    menuImg: "shops/images/vege_menu.jpg",
    img: "shops/images/vege_store.png", 
    shopLogo: "/shops/icons/vege.svg",
    shopBg: "/shops/enviroment/vege.png",
    recommendations: [
      { name: "藥膳十全大補鍋", price: 228, img: "shops/images/vege_hotpot.png" }, 
      { name: "脆皮叉燒飯", price: 130, img: "shops/images/vege_rice.png" }
    ],
    lat: 24.9620, lng: 121.2750 
  },
  { 
    id: 11, 
    name: "得來素素食餐飲", 
    distance: { walking: 44, bicycle: 14, scooter: 10 },
    address: "桃園市中壢區弘揚路77號",
    phone: "03-436-7111", 
    priceRange: "NT$ 30 - 150", 
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
    menuImg: "shops/images/delaisu_menu.jpg",
    img: "shops/images/delaisu_store.png", 
    shopLogo: "/shops/icons/delaisu.svg",
    shopBg: "/shops/enviroment/delaisu.png",
    recommendations: [
      { name: "薯餅堡", price: 50, img: "shops/images/delaisu_burger.png" }, 
      { name: "起司蛋餅", price: 40, img: "shops/images/delaisu_egg.png" }
    ],
    lat: 24.9580, lng: 121.2410 
  },
  { 
    id: 12,
    name: "越式素食 歡喜吃素", 
    distance: { walking: 93, bicycle: 30, scooter: 18 },
    address: "桃園市桃園區正康二街70號",
    phone: "0966-996-633", 
    priceRange: "NT$ 70 - 300", 
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
    menuImg: "shops/images/hoanhy_menu.jpg",
    img: "shops/images/hoanhy_store.png", 
    shopLogo: "/shops/icons/hoanhy.svg",
    shopBg: "/shops/enviroment/hoanhy.png",
    recommendations: [
      { name: "什錦米粉", price: 90, img: "shops/images/hoanhy_noodles.png" }, 
      { name: "月亮煎餅", price: 110, img: "shops/images/hoanhy_pancake.png" }
    ],
    lat: 24.9980, lng: 121.3050 
  }
];