// src/assets/iconHub.js

// 🌟 1. Logo 素材
import logo_long from "./logo/Logo_long.svg";
import logo_short from "./logo/Logo_short.svg";

// 🌟 2. 星期圖示
import iconMon from './weekday/Mon.png';
import iconTues from './weekday/Tues.png';
import iconWed from './weekday/Wed.png';
import iconThur from './weekday/Thur.png';
import iconFri from './weekday/Fri.png';
import iconSatu from './weekday/Satu.png';
import iconSun from './weekday/Sun.png';

// 🌟 3. 交通方式圖示
import iconWalk from './sort/icon_walking.png';
import iconBicycle from './sort/icon_bicycle.svg';
import iconScooter from './sort/icon_scooter.svg';

// ==========================================
// 📦 統一對外導出 (Export)
// ==========================================
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
};