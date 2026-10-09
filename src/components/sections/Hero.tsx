import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { BrutalCard } from "@/components/ui/BrutalCard";

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative pt-12 sm:pt-16 md:pt-24 pb-16 sm:pb-20 border-b border-[#050505]"
    >
      <div className="relative z-10 max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Left Column: Hero Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            {/* Top Eyebrow */}
            <div className="mb-4 sm:mb-6">
              <SectionLabel label="SOFTWARE ENGINEER · BUILDER" />
            </div>

            {/* Oversized Brutalist Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] uppercase text-[#050505] mb-6 sm:mb-8 select-none">
              I BUILD
              <br />
              THINGS THAT
              <br />
              <span className="bg-[#00F0FF] text-[#050505] px-2 py-0.5 inline-block border-2 border-[#050505] shadow-[3px_3px_0_#050505] mt-1">
                ACTUALLY RUN.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg md:text-xl text-[#050505]/80 font-normal leading-relaxed max-w-xl mb-8 sm:mb-10">
              Software engineer building across AI, systems, backend infrastructure and developer tooling.
              <span className="block mt-2 font-mono text-xs sm:text-sm text-[#050505]/60">
                &ldquo;{siteConfig.coreQuote}&rdquo;
              </span>
            </p>

            {/* Call to Actions - Two Main Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Button href="#work" variant="primary" size="lg" id="hero-view-work-btn">
                VIEW MY WORK ↓
              </Button>
              <Button
                href={siteConfig.github}
                variant="secondary"
                size="lg"
                isExternal
                id="hero-github-btn"
              >
                GITHUB →
              </Button>
            </div>
          </div>

          {/* Right Column: ENGINEER SPEC Panel */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <BrutalCard
              borderWidth={2}
              shadow="normal"
              className="bg-white p-6 sm:p-7 relative overflow-hidden"
              id="engineer-spec-card"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b-2 border-[#050505] pb-3 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#00F0FF] border border-[#050505]" />
                  <span className="font-mono font-bold text-xs sm:text-sm uppercase tracking-wider text-[#050505]">
                    ENGINEER SPEC
                  </span>
                </div>
                <span className="font-mono text-[10px] sm:text-xs text-[#050505]/50 uppercase">
                  SPEC: REV-2026.1
                </span>
              </div>

              {/* Technical Spec Rows */}
              <div className="space-y-3.5 font-mono text-xs sm:text-sm divide-y divide-black/10">
                <div className="flex justify-between items-center pt-2 first:pt-0">
                  <span className="text-[#050505]/60 font-semibold">FOCUS</span>
                  <span className="font-bold text-[#050505] text-right">
                    {siteConfig.spec.focus}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#050505]/60 font-semibold">BUILD</span>
                  <span className="font-bold text-[#050505] text-right">
                    {siteConfig.spec.build}
                  </span>
                </div>

                <div className="flex justify-between items-start pt-2">
                  <span className="text-[#050505]/60 font-semibold shrink-0">STACK</span>
                  <span className="font-bold text-[#050505] text-right">
                    {siteConfig.spec.stack}
                  </span>
                </div>

                <div className="flex justify-between items-start pt-2">
                  <span className="text-[#050505]/60 font-semibold shrink-0">ENV</span>
                  <span className="font-bold text-[#050505] text-right">
                    {siteConfig.spec.env}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#050505]/60 font-semibold">ARCH / OS</span>
                  <span className="font-bold text-[#050505] text-right">
                    {siteConfig.spec.arch}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#050505]/60 font-semibold">LOCATION</span>
                  <span className="font-bold text-[#050505] text-right">
                    {siteConfig.location}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#050505]/60 font-semibold">STATUS</span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-[#050505] bg-[#00F0FF]/30 border border-[#050505] px-2 py-0.5 text-xs">
                    <span className="w-2 h-2 rounded-full bg-[#050505] animate-ping" />
                    <span>● {siteConfig.spec.status}</span>
                  </span>
                </div>
              </div>

              {/* Spec Footer Stamp */}
              <div className="mt-6 pt-4 border-t-2 border-dashed border-[#050505]/30 flex items-center justify-between font-mono text-[10px] text-[#050505]/60">
                <span>SYSTEM ID: VX-9403</span>
                <span>STATUS: VERIFIED READY</span>
              </div>
            </BrutalCard>
          </div>
        </div>
      </div>
    </section>
  );
};
