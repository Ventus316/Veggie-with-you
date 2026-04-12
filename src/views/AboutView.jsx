// src/views/AboutView.jsx

import React from 'react';
import { Leaf } from 'lucide-react';
import { TEAM_MEMBERS } from '../data/mockData';

export default function AboutView() {
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

        <div className="flex flex-nowrap md:grid md:grid-cols-5 gap-6 md:gap-4 overflow-x-auto no-scrollbar pb-8 snap-x justify-start md:justify-items-center">
          {TEAM_MEMBERS.map((member, idx) => (
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