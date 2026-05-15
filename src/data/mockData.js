// src/data/mockData.js

import { RESTAURANTS } from './restaurantsData';

// 根據上方的 RESTAURANTS 動態生成首頁的熱門餐點
export const RECOMMEND_DISHES = RESTAURANTS.flatMap(shop => 
  shop.recommendations.map((dish, index) => ({
    id: `${shop.id}-${index}`,
    shop: shop.name,
    name: dish.name,
    price: dish.price,
    img: dish.img
  }))
).slice(0, 8); // 取前8個展示

export const ALL_DISHES = RESTAURANTS.flatMap(shop => 
  shop.recommendations.map((dish, index) => ({
    id: `${shop.id}-${index}`,
    shop: shop.name,
    name: dish.name,
    price: dish.price,
    img: dish.img
  }))
);

export const INFO_CATEGORIES = [
  { title: '全素 / 純素', desc: '不含動物性成分，且不包含五辛。' },
  { title: '蛋奶素', desc: '可食用植物性食物、蛋類及奶製品。' },
  { title: '五辛素', desc: '除了植物外，亦含蔥、蒜、韭、蕎及洋蔥。' },
  { title: '彈性素', desc: '多數時間維持蔬食，僅偶爾食用肉類。' },
];

// 小百科的詳細資料結構 (保留原有的工程邏輯)
const localAsset = (fileName) => `${fileName}`;

export const NUTRITION_TOPICS = [
  {
    id: 'rice',
    tabLabel: '飯麵類',
    title: '白飯',
    description: '白米飯是穩定的碳水化合物來源，能快速提供能量，且低脂、易消化、不含麩質，是維持體力的基礎。',
    theme: {
      canvas: '#ffe8bf',
      circlePrimary: '#211106',
      circlePrimaryGradient: 'radial-gradient(51.09% 50% at 50% 50%, #874419 0%, #211106 100%)',
      circleSecondary: '#a65f29',
      text: '#ffffff',
    },
    // 🌟 這裡換回你的主視覺大圖
    mainImage: localAsset('rice_1.png'),
    mainImageAlt: '白飯',
    thumbnails: [
      // 🌟 這裡換回你的 6 個小碗圖 (請確保 public 資料夾裡的檔名也是用底線)
      { src: localAsset('strongrice_2.png'), alt: '糙米飯', variant: 'square' },
      { src: localAsset('noodle_2.png'), alt: '麵條', variant: 'rounded' },
      { src: localAsset('fullnoodle_2.png'), alt: '拉麵', variant: 'wide' },
      { src: localAsset('purplerice_2.png'), alt: '紫米飯', variant: 'rounded' },
      { src: localAsset('animnoodle_2.png'), alt: '烏龍麵', variant: 'wide' },
      { src: localAsset('rice_1.png'), alt: '白飯', variant: 'square', underline: true }
    ],
    panelLabel: '飯麵類'
  },
  {
    id: 'vegetable',
    tabLabel: '蔬菜類',
    title: '菠菜',
    description: '富含鐵質、葉酸與維生素K，有助於補血及維持骨骼健康。其豐富的葉黃素與胡蘿蔔素也能保護視力，是營養價值極高的深綠色蔬菜。',
    theme: {
      canvas: '#8bc34a',
      circlePrimary: '#7bb12e',
      circlePrimaryGradient: 'radial-gradient(50% 50% at 50% 50%, #8ac93f 0%, #7bb12e 100%)',
      circleSecondary: '#c8df9c',
      text: '#ffffff',
    },
    mainImage: localAsset('green_4.png'), // 請確認此檔名
    mainImageAlt: '菠菜',
    thumbnails: [
      { src: localAsset('green_5.png'), alt: '菠菜小株', variant: 'small' },
      { src: localAsset('green2_2.png'), alt: '高麗菜', variant: 'square' },
      { src: localAsset('green3_2.png'), alt: '花椰菜', variant: 'square' },
      { src: localAsset('redgreen_2.png'), alt: '胡蘿蔔', variant: 'tall' },
      { src: localAsset('purplegreen_2.png'), alt: '茄子', variant: 'rounded' },
      { src: localAsset('green1_2.png'), alt: '青江菜', variant: 'square', underline: true }
    ],
    panelLabel: '蔬菜類'
  },
  {
    id: 'bean',
    tabLabel: '豆製類',
    title: '傳統豆腐',
    description: '富含植物性蛋白質與鈣質，有助於肌肉生長與骨骼健康。其飽和脂肪低且不含膽固醇，是大豆異黃酮的優質來源，能幫助調節生理機能。',
    theme: {
      canvas: '#ddd8d8',
      circlePrimary: '#333333',
      circlePrimaryGradient: 'linear-gradient(180deg, #868686 0%, #222222 100%)',
      circleSecondary: '#c8c8c8',
      text: '#ffffff',
    },
    mainImage: localAsset('tofu_1.png'), // 請確認此檔名
    mainImageAlt: '傳統豆腐',
    thumbnails: [
      { src: localAsset('drytofu_2.png'), alt: '煎豆腐', variant: 'square' },
      { src: localAsset('greenmeat_2.png'), alt: '豆皮排', variant: 'wide' },
      { src: localAsset('beanwater_2.png'), alt: '豆漿', variant: 'tall' },
      { src: localAsset('bean_2.png'), alt: '毛豆', variant: 'square' },
      { src: localAsset('japanbean_2.png'), alt: '納豆', variant: 'square' },
      { src: localAsset('tofu_1.png'), alt: '傳統豆腐', variant: 'square', underline: true }
    ],
    panelLabel: '豆製類'
  }
];

export const TEAM_MEMBERS = [
  { name: "王大明", role: "Project Lead", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" },
  { name: "李小華", role: "UI/UX Design", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { name: "陳阿強", role: "Frontend Dev", img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" },
  { name: "張小美", role: "Data Analysis", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
  { name: "林小宇", role: "Marketing", img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop" }
];
