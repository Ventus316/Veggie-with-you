import React, { useState } from 'react';
import NutritionCard from '../components/ui/NutritionCard';
import { NUTRITION_TOPICS } from '../data/mockData';

export default function InfoView() {
  const [activeTopicId, setActiveTopicId] = useState(NUTRITION_TOPICS[0].id);
  const activeTopic = NUTRITION_TOPICS.find((topic) => topic.id === activeTopicId) ?? NUTRITION_TOPICS[0];

  return (
    <div className="bg-[#ffe8bf] px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1600px]">
        <NutritionCard topic={activeTopic}>
          {NUTRITION_TOPICS.map((topic) => {
            const isActive = topic.id === activeTopic.id;

            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setActiveTopicId(topic.id)}
                aria-pressed={isActive}
                className={`min-w-[9.75rem] rounded-[999px] px-6 py-4 text-sm font-medium tracking-[0.18em] text-white transition-all sm:min-w-[11.5rem] sm:px-7 sm:text-base lg:min-w-[13rem] lg:px-8 lg:text-lg ${
                  isActive
                    ? 'bg-black shadow-[0_14px_30px_rgba(0,0,0,0.22)]'
                    : 'bg-[linear-gradient(101.459deg,rgba(0,0,0,0.2)_7.3824%,rgba(255,255,255,0.2)_95.579%)]'
                }`}
              >
                {topic.tabLabel}
              </button>
            );
          })}
        </NutritionCard>
      </div>
    </div>
  );
}