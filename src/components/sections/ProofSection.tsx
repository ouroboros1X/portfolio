import React from "react";
import { proofCards } from "@/data/proofMetrics";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { TechBadge } from "@/components/ui/TechBadge";

export const ProofSection: React.FC = () => {
  return (
    <section id="proof" className="py-20 sm:py-24 border-b border-[#050505]">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <SectionLabel label="PROOF, NOT ADJECTIVES" />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#050505] mt-3">
            BUILT. TESTED. SHIPPED.
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#050505]/70 mt-2 max-w-xl">
            Empirical evidence of working systems over buzzwords. Ground-up implementations, native runtimes, and verified code.
          </p>
        </div>

        {/* Proof Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {proofCards.map((card) => (
            <BrutalCard
              key={card.id}
              borderWidth={2}
              shadow="normal"
              hoverEffect
              className="bg-white p-6 flex flex-col justify-between relative group"
            >
              <div>
                {/* Eyebrow */}
                <div className="font-mono text-[10px] text-[#050505]/60 font-semibold uppercase tracking-wider mb-2">
                  {card.eyebrow}
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-black uppercase tracking-tight text-[#050505] leading-tight mb-2">
                  {card.title}
                </h3>

                {/* Cyan Underline accent */}
                <div className="w-12 h-1 bg-[#00F0FF] mb-4 group-hover:w-full transition-all duration-300" />

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#050505]/80 leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              {/* Bottom Metadata & Badges */}
              <div className="pt-4 border-t border-black/15">
                <div className="font-mono text-[10px] text-[#050505]/60 uppercase mb-1">
                  {card.metadata.label}
                </div>
                <div className="font-mono text-xs font-bold text-[#050505] mb-3">
                  {card.metadata.value}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <TechBadge key={tag} label={tag} variant="ghost" />
                  ))}
                </div>
              </div>
            </BrutalCard>
          ))}
        </div>
      </div>
    </section>
  );
};
