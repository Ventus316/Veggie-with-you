// src/data/Data.js

import { RESTAURANTS } from './restaurantsData';

import logo_long from "../assets/logo/Logo_long.svg";
import logo_short from "../assets/logo/Logo_short.svg";

import iconMon from '../assets/weekday/Mon.png';
import iconTues from '../assets/weekday/Tues.png';
import iconWed from '../assets/weekday/Wed.png';
import iconThur from '../assets/weekday/Thur.png';
import iconFri from '../assets/weekday/Fri.png';
import iconSatu from '../assets/weekday/Satu.png';
import iconSun from '../assets/weekday/Sun.png';

import iconWalk from '../assets/sort/icon_walking.png';
import iconBicycle from '../assets/sort/icon_bicycle.svg';
import iconScooter from '../assets/sort/icon_scooter.svg';

export const LOGO_LONG = logo_long;
export const LOGO_SHORT = logo_short;

export const WEEKDAY_ICONS = {
  '一': iconMon,
  '二': iconTues,
  '三': iconWed,
  '四': iconThur,
  '五': iconFri,
  '六': iconSatu,
  '日': iconSun,
};

export const SORT_ICONS = { 
  walking: iconWalk,
  bicycle: iconBicycle,
  scooter: iconScooter
}


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
const localAsset = (fileName) => `info/${fileName}`;

export const NUTRITION_TOPICS = [
  {
    id: 'rice',
    tabLabel: '飯麵類',
    // 移除了外層的 title 和 description，因為現在每個食材都有自己的了！
    theme: {
      canvas: '#ffe8bf',
      circlePrimary: '#211106',
      circlePrimaryGradient: 'radial-gradient(51.09% 50% at 50% 50%, #874419 0%, #211106 100%)',
      circleSecondary: '#a65f29',
      text: '#ffffff',
    },
    mainImage: localAsset('rice.png'),
    mainImageAlt: '白飯',
    thumbnails: [
      { 
        src: localAsset('rice.png'), 
        alt: '白飯', 
        description: '白飯是穩定的碳水化合物來源，能快速提供能量，且低脂、易消化、不含麩質，是維持體力的基礎。',
        variant: 'square', underline: true 
      },
      { 
        src: localAsset('strongrice.png'), 
        alt: '糙米飯', 
        description: '保留了米糠與胚芽，富含膳食纖維、維生素 B 群及礦物質，GI 值較低，能帶來更持久的飽足感與穩定能量。',
        variant: 'square' 
      },
      { 
        src: localAsset('purplerice.png'), 
        alt: '紫米飯', 
        description: '富含天然花青素，具有優良的抗氧化效果，並提供豐富的鐵質與維生素，有助於維持紅潤氣色與新陳代謝。',
        variant: 'rounded' 
      },
      { 
        src: localAsset('fullnoodle.png'), 
        alt: '全麥麵', 
        description: '由小麥粉製成的麵條，口感 Q 彈有嚼勁，能快速補充碳水化合物，搭配豐富的蔬菜配料能讓營養更加均衡。',
        variant: 'wide' ,
        offset: { top:"-40px", left:"114px" }
      },
      { 
        src: localAsset('noodle.png'), 
        alt: '蕎麥麵', 
        description: '傳統的小麥麵條，提供日常所需的澱粉與熱量，烹調方式多樣，是亞洲飲食文化中不可或缺的重要主食。',
        variant: 'rounded' ,
        offset: { top:"-50px", left:"136px" }
      },
      { 
        src: localAsset('animnoodle.png'), 
        alt: '烏龍麵', 
        description: '粗實的日本傳統麵條，口感滑順且帶有極佳的嚼勁，易於消化且飽足感高，非常適合搭配清淡的高湯食用。',
        variant: 'wide' ,
        offset: { top:"-80px", left:"83px" }
      },
    ],
    panelLabel: '飯麵類'
  },
  {
    id: 'vegetable',
    tabLabel: '蔬菜類',
    theme: {
      canvas: '#8bc34a',
      circlePrimary: '#7bb12e',
      circlePrimaryGradient: 'radial-gradient(50% 50% at 50% 50%, #8ac93f 0%, #7bb12e 100%)',
      circleSecondary: '#c8df9c',
      text: '#ffffff',
    },
    mainImage: localAsset('green4.png'),
    mainImageAlt: '菠菜',
    thumbnails: [
      { 
        src: localAsset('green4.png'), 
        alt: '菠菜', 
        description: '富含鐵質、葉酸與維生素 K，有助於補血及維持骨骼健康。其豐富的葉黃素與胡蘿蔔素也能有效保護視力。',
        variant: 'small' 
      },
      { 
        src: localAsset('green2.png'), 
        alt: '高麗菜', 
        description: '含有豐富的維生素 C、維生素 K 與膳食纖維，獨特的維生素 U (高麗菜精) 更有助於保護消化道黏膜，清甜百搭。',
        variant: 'square' 
      },
      { 
        src: localAsset('green3.png'), 
        alt: '花椰菜', 
        description: '被譽為十字花科的營養明星！富含蘿蔔硫素、維生素 C 與豐富的膳食纖維，具有極佳的抗氧化與提升防護力效果。',
        variant: 'square' 
      },
      { 
        src: localAsset('redgreen.png'), 
        alt: '紅蘿蔔', 
        description: '富含大量的 β-胡蘿蔔素，能在體內轉化為維生素 A，對視力保健與皮膚黏膜健康極為有益，脂溶性特性適合炒食。',
        variant: 'tall' 
      },
      { 
        src: localAsset('purplegreen.png'), 
        alt: '茄子', 
        description: '深紫色的外皮富含花青素與抗氧化物質，柔軟的果肉含有豐富的維生素 P，有助於維持微血管彈性與心血管健康。',
        variant: 'rounded' 
      },
      { 
        src: localAsset('green1.png'), 
        alt: '青江菜', 
        description: '十字花科蔬菜的一員，含鈣量高且草酸較低，是植物性鈣質的優良來源，同時提供豐富的維生素 A 與維生素 C。',
        variant: 'square', underline: true 
      }
    ],
    panelLabel: '蔬菜類'
  },
  {
    id: 'bean',
    tabLabel: '豆製類',
    theme: {
      canvas: '#ddd8d8',
      circlePrimary: '#333333',
      circlePrimaryGradient: 'linear-gradient(180deg, #868686 0%, #222222 100%)',
      circleSecondary: '#c8c8c8',
      text: '#ffffff',
    },
    mainImage: localAsset('tofu.png'),
    mainImageAlt: '傳統豆腐',
    thumbnails: [
      { 
        src: localAsset('tofu.png'), 
        alt: '傳統豆腐', 
        description: '富含植物性蛋白質與天然鈣質，有助於肌肉生長與骨骼健康。其飽和脂肪極低且不含膽固醇，是大豆異黃酮的優質來源。',
        variant: 'square', underline: true 
      },
      { 
        src: localAsset('greenmeat.png'), 
        alt: '素雞', 
        description: '由大豆蛋白濃縮而成的豆皮，蛋白質密度極高，口感扎實且富有層次，是許多素食者用來取代肉類口感的極佳選擇。',
        variant: 'wide' 
      },
      { 
        src: localAsset('beanwater.png'), 
        alt: '豆漿', 
        description: '被譽為「植物界的牛奶」，富含優質大豆蛋白、大豆異黃酮與卵磷脂，天然無乳糖且易於人體吸收，是極佳的營養飲品。',
        variant: 'tall' 
      },
      { 
        src: localAsset('drytofu.png'), 
        alt: '豆乾', 
        description: '經過少油慢煎的豆腐，外酥內嫩，不僅增添了迷人的豆香風味，還能提供豐富的植物性蛋白質與極佳的飽足感。',
        variant: 'square' 
      },
      { 
        src: localAsset('japanbean.png'), 
        alt: '納豆', 
        description: '經過枯草桿菌發酵的大豆，產生了獨特且珍貴的「納豆激酶」，有助於促進新陳代謝與維持循環順暢，營養價值極高。',
        variant: 'square' 
      },
      { 
        src: localAsset('bean.png'), 
        alt: '毛豆', 
        description: '未成熟的綠色大豆，不僅是優質的植物性蛋白質來源，還富含維生素 C、B 群及大量膳食纖維，是健康解饞的最佳零嘴。',
        variant: 'square' 
      }
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
