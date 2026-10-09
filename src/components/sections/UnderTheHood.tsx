"use client";

import React, { useState } from "react";
import { systemLayers } from "@/data/underTheHood";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { TechBadge } from "@/components/ui/TechBadge";
import { cn } from "@/lib/utils";

export const UnderTheHood: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string>("layer-code");
  const activeLayer =
    systemLayers.find((l) => l.id === selectedLayerId) || systemLayers[0];

  return (
    <section id="systems" className="py-20 sm:py-28 border-b border-[#050505]">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 sm:mb-20">
          <SectionLabel label="UNDER THE HOOD" />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#050505] mt-3 leading-none">
            I LIKE KNOWING
            <br />
            WHAT&apos;S HAPPENING
            <br />
            <span className="bg-[#00F0FF] text-[#050505] px-2 py-0.5 inline-block border-2 border-[#050505] shadow-[3px_3px_0_#050505] mt-1">
              UNDERNEATH.
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#050505]/80 max-w-2xl mt-6 leading-relaxed">
            From model inference and memory to APIs, containers, Linux and cloud infrastructure — I enjoy understanding the systems behind the interface.
          </p>
        </div>

        {/* Visual Engineering Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Map Nodes (5 cols) */}
          <div className="lg:col-span-5 flex flex-col font-mono" role="tablist" aria-label="System layers">
            {systemLayers.map((layer, idx) => {
              const isSelected = selectedLayerId === layer.id;
              const isLast = idx === systemLayers.length - 1;

              return (
                <div key={layer.id} className="flex flex-col">
                  {/* Layer Node Button */}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedLayerId(layer.id)}
                    className={cn(
                      "w-full text-left p-3.5 border-2 border-[#050505] transition-all flex items-center justify-between select-none cursor-pointer",
                      isSelected
                        ? "bg-[#050505] text-[#F5F5F0] shadow-[4px_4px_0_#00F0FF] translate-x-1"
                        : "bg-white text-[#050505] hover:bg-[#E6FCFE] shadow-[2px_2px_0_#050505]"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "w-6 h-6 flex items-center justify-center text-xs font-bold border",
                          isSelected
                            ? "bg-[#00F0FF] text-[#050505] border-[#00F0FF]"
                            : "bg-[#F5F5F0] text-[#050505] border-[#050505]"
                        )}
                      >
                        {layer.index}
                      </span>
                      <span className="font-extrabold tracking-wider text-sm sm:text-base">
                        {layer.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-[10px] tracking-wider uppercase hidden sm:inline-block",
                          isSelected ? "text-[#00F0FF]" : "text-[#050505]/60"
                        )}
                      >
                        {layer.scope}
                      </span>
                      <span
                        className={cn(
                          "text-xs font-bold",
                          isSelected ? "text-[#00F0FF]" : "text-[#050505]/40"
                        )}
                      >
                        →
                      </span>
                    </div>
                  </button>

                  {/* Connecting line with subtle animated data pulse */}
                  {!isLast && (
                    <div className="flex items-center justify-center py-1 select-none pointer-events-none">
                      <div className="w-[2px] h-5 bg-[#050505]/25 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-x-0 h-2 bg-[#00F0FF] animate-signal-pulse" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Layer Inspection & Engineering Insight (7 cols) */}
          <div className="lg:col-span-7">
            <BrutalCard
              borderWidth={2}
              shadow="lg"
              className="bg-white p-6 sm:p-8 relative min-h-[460px] flex flex-col justify-between"
            >
              <div>
                {/* Header Stamp */}
                <div className="flex items-center justify-between border-b-2 border-[#050505] pb-4 mb-6">
                  <div className="flex items-center gap-2.5 font-mono text-xs">
                    <span className="bg-[#00F0FF] text-[#050505] font-bold px-2 py-0.5 border border-[#050505]">
                      LAYER {activeLayer.index} / 07
                    </span>
                    <span className="font-bold text-[#050505]">
                      {activeLayer.name}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#050505]/60 uppercase">
                    SCOPE: {activeLayer.scope}
                  </span>
                </div>

                {/* Layer Description */}
                <h3 className="text-xl sm:text-2xl font-black uppercase text-[#050505] mb-4">
                  {activeLayer.scope}
                </h3>
                <p className="text-sm sm:text-base text-[#050505]/85 leading-relaxed mb-6">
                  {activeLayer.description}
                </p>

                {/* Key Inspection Focus */}
                <div className="p-4 bg-[#F5F5F0] border border-[#050505] mb-6 font-mono text-xs">
                  <span className="font-bold text-[#050505] block uppercase mb-1">
                    SYSTEM INVARIANTS & AUDIT:
                  </span>
                  <span className="text-[#050505]/80">
                    {activeLayer.keyInspection}
                  </span>
                </div>

                {/* Technologies at this layer */}
                <div>
                  <div className="font-mono text-[11px] font-bold text-[#050505]/60 uppercase tracking-wider mb-2">
                    TECHNOLOGIES OPERATING AT THIS LAYER:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeLayer.technologies.map((tech) => (
                      <TechBadge key={tech} label={tech} variant="cyan" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quote / Axiom */}
              <div className="mt-8 pt-4 border-t-2 border-dashed border-[#050505]/20 flex items-center justify-between font-mono text-xs text-[#050505]/70">
                <span>SYSTEM OBSERVABILITY: ACTIVE</span>
                <span className="text-[#050505] font-bold">CLICK LAYERS TO INSPECT</span>
              </div>
            </BrutalCard>
          </div>
        </div>
      </div>
    </section>
  );
};
