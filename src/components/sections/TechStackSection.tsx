"use client";

import React from "react";
import { stackCategories } from "@/data/techStack";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BrutalCard } from "@/components/ui/BrutalCard";

export const TechStackSection: React.FC = () => {
  const getBadgeStyle = () => {
    return "bg-white text-[#050505] border-[#050505]";
  };

  return (
    <section id="stack" className="py-20 sm:py-28 border-b border-[#050505]">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <SectionLabel label="TECHNOLOGY STACK" accent={false} />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#050505] mt-3">
            TOOLS &amp; TECHNOLOGIES.
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#050505]/70 mt-2 max-w-xl">
            Technologies I use to build full-stack web products, plus systems and AI tools I explore from first principles. Categorised by real-world usage.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 mt-6 font-mono text-[11px] text-[#050505]/80">
            <span className="font-bold uppercase text-[#050505]">POSTURE LEGEND:</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white border border-[#050505]">
              <span className="font-bold text-[#050505]">[B]</span>
              <span>BUILDING (ACTIVE / PRODUCTION)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white border border-[#050505]">
              <span className="font-bold text-[#050505]">[L]</span>
              <span>LEARNING (DEVELOPING PROFICIENCY)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white border border-[#050505]">
              <span className="font-bold text-[#050505]">[E]</span>
              <span>EXPLORING (FIRST-PRINCIPLES LABS)</span>
            </span>
          </div>
        </div>

        {/* 6-Card Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {stackCategories.map((cat) => (
            <BrutalCard
              key={cat.id}
              borderWidth={2}
              shadow="normal"
              className="bg-white p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                {/* Header: Posture Eyebrow */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="bg-white text-[#050505] font-mono font-bold text-[10px] px-2 py-0.5 border border-[#050505]">
                    {cat.posture}
                  </span>
                </div>

                {/* Category Title */}
                <h3 className="text-xl font-black uppercase tracking-tight text-[#050505] mb-2.5">
                  {cat.category}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#050505]/80 leading-relaxed mb-6 font-sans">
                  {cat.description}
                </p>

                {/* Skills Chips */}
                <div className="space-y-2 mb-6">
                  <div className="font-mono text-[10px] font-bold text-[#050505]/60 uppercase tracking-wider">
                    VERIFIED TECHNOLOGIES:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-mono font-semibold border ${getBadgeStyle()}`}
                      >
                        <span>{skill.name}</span>
                        <span className="text-[9px] text-[#050505]/50 font-normal">
                          [{skill.level[0]}]
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Project Link */}
              {cat.projectReference && (
                <div className="pt-4 border-t border-black/15 flex items-center justify-between font-mono text-xs">
                  <span className="text-[#050505]/60">APPLIED IN:</span>
                  <a
                    href={cat.projectReference.href}
                    className="font-bold text-[#050505] hover:text-white hover:bg-[#050505] px-1 py-0.5 transition-colors"
                  >
                    {cat.projectReference.name} →
                  </a>
                </div>
              )}
            </BrutalCard>
          ))}
        </div>
      </div>
    </section>
  );
};

