"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/siteConfig";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { BrutalCard } from "@/components/ui/BrutalCard";

interface HeroPhrase {
  full: string;
  line1: string;
  line2: string;
}

const HERO_PHRASES: HeroPhrase[] = [
  { full: "ACTUALLY RUN.", line1: "ACTUALLY", line2: "RUN." },
  { full: "SOLVE REAL PROBLEMS.", line1: "SOLVE REAL", line2: "PROBLEMS." },
  { full: "SHIP REAL PRODUCTS.", line1: "SHIP REAL", line2: "PRODUCTS." },
  { full: "SCALE WITH PURPOSE.", line1: "SCALE WITH", line2: "PURPOSE." },
  { full: "WORK RELIABLY.", line1: "WORK", line2: "RELIABLY." },
  { full: "MAKE AN IMPACT.", line1: "MAKE AN", line2: "IMPACT." },
];

export const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_PHRASES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const currentPhrase = prefersReducedMotion ? HERO_PHRASES[0] : HERO_PHRASES[index];

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
            <h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.95] uppercase text-[#050505] mb-6 sm:mb-8 select-none"
              aria-label={`I BUILD THINGS THAT ${currentPhrase.full}`}
            >
              I BUILD
              <br />
              THINGS THAT
              <br />
              <span className="bg-[#00F0FF] text-[#050505] px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 inline-grid grid-cols-1 grid-rows-1 border-2 sm:border-[3px] border-[#050505] shadow-[4px_4px_0_#050505] sm:shadow-[5px_5px_0_#050505] md:shadow-[6px_6px_0_#050505] mt-2 sm:mt-3 md:mt-3.5 align-middle select-none max-w-full text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[2.35rem] xl:text-[3.15rem] 2xl:text-[3.35rem] leading-[1.05] relative overflow-hidden">
                {/* Phantom spacer: locks dimensions to the longest phrase preventing any layout shifts */}
                <span
                  className="invisible pointer-events-none select-none opacity-0 col-start-1 row-start-1"
                  aria-hidden="true"
                >
                  <span className="sm:inline hidden">SOLVE REAL PROBLEMS.</span>
                  <span className="sm:hidden inline">
                    SOLVE REAL
                    <br />
                    PROBLEMS.
                  </span>
                </span>

                {/* Active animated phrase */}
                <span className="col-start-1 row-start-1 flex items-center justify-start relative overflow-hidden w-full h-full">
                  {prefersReducedMotion ? (
                    <span className="inline-block">
                      <span className="sm:inline hidden">{HERO_PHRASES[0].full}</span>
                      <span className="sm:hidden inline">
                        {HERO_PHRASES[0].line1}
                        <br />
                        {HERO_PHRASES[0].line2}
                      </span>
                    </span>
                  ) : (
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={currentPhrase.full}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-block"
                      >
                        <span className="sm:inline hidden">{currentPhrase.full}</span>
                        <span className="sm:hidden inline">
                          {currentPhrase.line1}
                          <br />
                          {currentPhrase.line2}
                        </span>
                      </motion.span>
                    </AnimatePresence>
                  )}
                </span>
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg md:text-xl text-[#050505]/85 font-normal leading-relaxed max-w-xl mb-8 sm:mb-10">
              I build web applications, SaaS products, and backend systems. Along the way, I explore how AI works from the ground up.
              <span className="block mt-2.5 font-mono text-xs sm:text-sm text-[#050505]/65">
                &ldquo;{siteConfig.subQuote}&rdquo;
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
              <div className="space-y-3 font-mono text-xs sm:text-sm divide-y divide-black/10">
                <div className="flex justify-between items-center pt-2 first:pt-0">
                  <span className="text-[#050505]/60 font-semibold">PRIMARY FOCUS</span>
                  <span className="font-bold text-[#050505] text-right">
                    {siteConfig.spec.primaryFocus}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#050505]/60 font-semibold">BUILDING</span>
                  <span className="font-bold text-[#050505] text-right">
                    {siteConfig.spec.building}
                  </span>
                </div>

                <div className="flex justify-between items-start pt-2">
                  <span className="text-[#050505]/60 font-semibold shrink-0">ALSO EXPLORING</span>
                  <span className="font-bold text-[#050505] text-right">
                    {siteConfig.spec.exploring}
                  </span>
                </div>

                <div className="flex justify-between items-start pt-2">
                  <span className="text-[#050505]/60 font-semibold shrink-0">BACKEND</span>
                  <span className="font-bold text-[#050505] text-right">
                    {siteConfig.spec.backend}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#050505]/60 font-semibold">ENVIRONMENT</span>
                  <span className="font-bold text-[#050505] text-right">
                    {siteConfig.spec.env}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[#050505]/60 font-semibold">LOCATION</span>
                  <span className="font-bold text-[#050505] text-right">
                    {siteConfig.spec.location}
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
              <div className="mt-5 pt-3.5 border-t-2 border-dashed border-[#050505]/25 flex items-center justify-between font-mono text-[10px] text-[#050505]/60">
                <span>CORE STACK: TS · REACT · NODE</span>
                <span>TIMEZONE: UTC+05:30</span>
              </div>
            </BrutalCard>
          </div>
        </div>
      </div>
    </section>
  );
};
