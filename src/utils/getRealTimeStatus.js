// src/utils/getRealTimeStatus.js

export const getRealTimeStatus = (openData) => {
  // 防呆：沒有資料一律視為公休
  if (!openData || !Array.isArray(openData)) return { text: "公休", isOpen: false };

  const daysMap = ['日', '一', '二', '三', '四', '五', '六'];
  const now = new Date();
  const todayStr = daysMap[now.getDay()];
  const todayData = openData.find(item => item.day === todayStr);

  // 今日無資料或標記為休息
  if (!todayData || !todayData.time || todayData.time === '休息') {
    return { text: "公休", isOpen: false };
  }

  // 拆解時間段 (支援 11:00-14:00, 17:00-20:00 這種多段班)
  const timeRanges = todayData.time.split('\n').flatMap(t => t.split(','));
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (let range of timeRanges) {
    const [startStr, endStr] = range.trim().split('-');
    if (!startStr || !endStr) continue;

    const [sH, sM] = startStr.split(':').map(Number);
    const [eH, eM] = endStr.split(':').map(Number);

    const startMinutes = sH * 60 + sM;
    let endMinutes = eH * 60 + eM;

    // 處理跨夜營業的情況
    if (endMinutes < startMinutes) endMinutes += 24 * 60;

    if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
      return { text: "營業中", isOpen: true };
    }
  }

  return { text: "公休", isOpen: false };
};