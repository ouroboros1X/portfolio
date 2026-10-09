import React from "react";
import { siteConfig } from "@/data/siteConfig";

export const TechTicker: React.FC = () => {
  // Duplicate array to ensure seamless infinite looping marquee
  const tickerItems = [...siteConfig.tickerItems, ...siteConfig.tickerItems];

  return (
    <div
      className="w-full bg-[#050505] text-[#F5F5F0] border-b-2 border-[#050505] overflow-hidden py-3 select-none"
      role="region"
      aria-label="Technologies Marquee"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {tickerItems.map((tech, index) => (
          <div
            key={`${tech}-${index}`}
            className="inline-flex items-center gap-4 px-4 font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#F5F5F0]"
          >
            <span>{tech}</span>
            <span className="text-[#00F0FF] font-bold text-xs" aria-hidden="true">
              •
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
