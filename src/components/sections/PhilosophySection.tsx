import React from "react";
import { philosophyPrinciples } from "@/data/philosophy";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BrutalCard } from "@/components/ui/BrutalCard";

export const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="py-20 sm:py-28 border-b border-[#050505]">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <SectionLabel label="ENGINEERING PHILOSOPHY" />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#050505] mt-3">
            FIRST PRINCIPLES.
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#050505]/70 mt-2 max-w-xl">
            Four guiding invariants for building systems that last.
          </p>
        </div>

        {/* 4 Principles Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {philosophyPrinciples.map((principle) => (
            <BrutalCard
              key={principle.number}
              borderWidth={2}
              shadow="normal"
              hoverEffect
              className="bg-white p-8 flex flex-col justify-between group"
            >
              <div>
                {/* Number & Headline */}
                <div className="flex items-center justify-between border-b-2 border-[#050505] pb-3 mb-6">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-[#050505] group-hover:text-[#00F0FF] transition-colors">
                    {principle.number}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#050505]/60">
                    INVARIANT {principle.number}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#050505] mb-3">
                  {principle.title}
                </h3>

                <p className="text-base sm:text-lg font-bold text-[#050505] mb-4 leading-snug">
                  &ldquo;{principle.coreStatement}&rdquo;
                </p>

                <p className="text-xs sm:text-sm text-[#050505]/80 leading-relaxed font-normal">
                  {principle.elaboration}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-black/10 flex items-center justify-between font-mono text-[11px] text-[#050505]/60">
                <span>VERIFIED RULE</span>
                <span className="text-[#050505] font-bold">STRICT ADHERENCE</span>
              </div>
            </BrutalCard>
          ))}
        </div>
      </div>
    </section>
  );
};
