// src/components/ui/NutritionRadarChart.jsx

import React from 'react';

export default function NutritionRadarChart({ data }) {
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
}