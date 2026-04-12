// src/data/mockData.js

export const RECOMMEND_DISHES = [
  { id: 1, shop: "綠意植物料理", name: "招牌牛油果藜麥沙拉", price: 120, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop" },
  { id: 2, shop: "興仁路清爽蔬食", name: "日式胡麻時蔬拌麵", price: 85, img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop" },
  { id: 3, shop: "內壢巷弄健康餐", name: "溫補鮮蔬羅宋湯", price: 95, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop" },
  { id: 4, shop: "純植系手作", name: "松露野菇義大利麵", price: 150, img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop" },
  { id: 5, shop: "元智二門蔬食", name: "植物肉手打漢堡", price: 110, img: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?q=80&w=800&auto=format&fit=crop" }
];

export const RESTAURANTS = [
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
];

export const ALL_DISHES = [
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

export const INFO_CATEGORIES = [
  { title: '全素 / 純素', desc: '不含動物性成分，且不包含五辛。' },
  { title: '蛋奶素', desc: '可食用植物性食物、蛋類及奶製品。' },
  { title: '五辛素', desc: '除了植物外，亦含蔥、蒜、韭、蕎及洋蔥。' },
  { title: '彈性素', desc: '多數時間維持蔬食，僅偶爾食用肉類。' },
];

export const NUTRITION_DATA = {
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

export const TEAM_MEMBERS = [
  { name: "王大明", role: "Project Lead", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" },
  { name: "李小華", role: "UI/UX Design", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { name: "陳阿強", role: "Frontend Dev", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" },
  { name: "張小美", role: "Data Analysis", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
  { name: "林小宇", role: "Marketing", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop" }
];