// src/components/ui/NutritionCard_old.jsx

import React from 'react';

const THUMBNAIL_VARIANTS = {
  square: 'rounded-[28px] aspect-square',
  rounded: 'rounded-[32px] aspect-[4/3]',
  wide: 'rounded-[28px] aspect-[5/4]',
  tall: 'rounded-[30px] aspect-[4/5]',
  small: 'rounded-[999px] aspect-square'
};

export default function NutritionCard({ topic, children }) {
  const {
    title,
    description,
    mainImage,
    mainImageAlt,
    thumbnails,
    theme
  } = topic;

  return (
    <section className="relative isolate overflow-hidden rounded-[32px] px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div
          className="absolute h-[84rem] w-[84rem] rounded-full"
          style={{ background: theme.circlePrimaryGradient, left: '-26%', top: '10%' }}
        />
        <div
          className="absolute h-[44rem] w-[44rem] rounded-full opacity-40"
          style={{ background: theme.circleSecondary, right: '-12%', bottom: '-6%' }}
        />
      </div>

      <article className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-between gap-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <section className="flex flex-col justify-center text-white">
            <header className="space-y-5">
              <h1 className="text-[clamp(2.75rem,6vw,4.25rem)] font-medium leading-none tracking-[0.05em] drop-shadow-lg">
                {title}
              </h1>
              <p className="max-w-[32rem] text-[clamp(1rem,2vw,1.5rem)] leading-[1.85] tracking-[0.18em] text-white/90 text-justify">
                {description}
              </p>
            </header>

            <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-12 lg:gap-6">
              {thumbnails.map((thumb) => {
                const thumbnailVariant = THUMBNAIL_VARIANTS[thumb.variant] ?? THUMBNAIL_VARIANTS.square;

                return (
                  <li key={thumb.alt} className="relative">
                    <figure
                      className={`relative overflow-hidden bg-white/5 ${thumbnailVariant}`}
                      style={{ boxShadow: '0 18px 35px rgba(0, 0, 0, 0.18)' }}
                    >
                      <img
                        src={thumb.src}
                        alt={thumb.alt}
                        className="h-full w-full object-contain p-2 sm:p-3"
                        loading="lazy"
                      />
                      {thumb.underline && (
                        <span
                          className="absolute left-1/2 bottom-3 h-0.5 w-1/2 -translate-x-1/2 rounded-full"
                          style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                        />
                      )}
                    </figure>
                  </li>
                );
              })}
            </ul>
          </section>

          <figure className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-[44rem]">
              <img
                src={mainImage}
                alt={mainImageAlt}
                className="h-auto w-full object-contain drop-shadow-[0_30px_55px_rgba(0,0,0,0.22)]"
                loading="lazy"
              />
            </div>
          </figure>
        </div>

        <nav aria-label="素食分類切換" className="flex flex-wrap gap-4 sm:gap-6">
          {children}
        </nav>
      </article>
    </section>
  );
}