import React from "react";
import { siteConfig } from "@/data/siteConfig";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { BrutalCard } from "@/components/ui/BrutalCard";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 border-b border-[#050505]">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Oversized Editorial Statement (6 cols) */}
          <div className="lg:col-span-6">
            <SectionLabel label="ABOUT" />
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-[#050505] leading-[0.95] mt-4 mb-6">
              I BUILD.
              <br />
              I BREAK.
              <br />
              <span className="bg-[#00F0FF] text-[#050505] px-2 py-0.5 inline-block border-2 border-[#050505] shadow-[3px_3px_0_#050505] mt-1">
                I UNDERSTAND.
              </span>
              <br />
              I SHIP.
            </h2>

            <div className="font-mono text-xs text-[#050505]/70 space-y-1 mt-6">
              <p>LOCATION: {siteConfig.location} [UTC+5:30]</p>
              <p>BACKGROUND: COMPUTER SYSTEMS & INFRASTRUCTURE</p>
              <p>OPERATING POSTURE: FIRST-PRINCIPLES ONLY</p>
            </div>
          </div>

          {/* Right Column: Authentic Engineering Narrative & Proof (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <BrutalCard
              borderWidth={2}
              shadow="normal"
              className="bg-white p-6 sm:p-8 space-y-4"
            >
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#050505] flex items-center gap-2">
                <span className="w-2 h-2 bg-[#00F0FF] border border-[#050505]" />
                <span>DIRECT MANIFESTO</span>
              </h3>

              <p className="text-base sm:text-lg text-[#050505] leading-relaxed font-normal">
                I&apos;m <span className="font-bold">{siteConfig.fullName}</span>, a software engineer and builder interested in AI, systems, and the infrastructure that makes software work.
              </p>

              <p className="text-sm sm:text-base text-[#050505]/85 leading-relaxed">
                I don&apos;t just construct user interfaces. I like building things from the ground up, understanding why they work, and pushing them until I understand where they break.
              </p>

              <p className="text-sm sm:text-base text-[#050505]/85 leading-relaxed">
                Whether writing a pure C++ Transformer inference engine without PyTorch, engineering an in-memory limit order matching engine, or automating container clusters in Linux — I care about determinism, performance, and shipping things that actually execute.
              </p>

              {/* Direct Link Actions */}
              <div className="pt-6 border-t-2 border-[#050505] flex flex-wrap gap-3">
                <Button
                  href={siteConfig.github}
                  variant="primary"
                  size="sm"
                  isExternal
                  id="about-github-btn"
                >
                  GITHUB →
                </Button>
                <Button
                  href={siteConfig.linkedin}
                  variant="cyan"
                  size="sm"
                  isExternal
                  id="about-linkedin-btn"
                >
                  LINKEDIN →
                </Button>
                <Button
                  href={`mailto:${siteConfig.email}`}
                  variant="secondary"
                  size="sm"
                  id="about-email-btn"
                >
                  EMAIL →
                </Button>
                <Button
                  href={siteConfig.resumeUrl}
                  variant="outline"
                  size="sm"
                  isExternal
                  id="about-resume-btn"
                >
                  RESUME ↗
                </Button>
              </div>
            </BrutalCard>
          </div>
        </div>
      </div>
    </section>
  );
};
