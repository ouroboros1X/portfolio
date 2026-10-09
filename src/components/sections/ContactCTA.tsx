"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { BrutalCard } from "@/components/ui/BrutalCard";

export const ContactCTA: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Light cyan wrapper container */}
        <div className="bg-[#E6FCFE] border-2 border-[#050505] p-6 sm:p-10 md:p-14 shadow-[8px_8px_0_#050505] relative">
          {/* Top Decorative Label */}
          <div className="mb-8">
            <SectionLabel label="LET'S BUILD" accent />
          </div>

          {/* Inner Large White Card */}
          <BrutalCard
            borderWidth={2}
            shadow="lg"
            className="bg-white p-8 sm:p-12 md:p-14 relative"
          >
            <div className="max-w-3xl">
              {/* Massive Headline */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-[#050505] leading-[0.95] mb-6">
                HAVE SOMETHING
                <br />
                <span className="bg-[#00F0FF] text-[#050505] px-2 py-0.5 inline-block border-2 border-[#050505] shadow-[3px_3px_0_#050505] mt-1">
                  WORTH BUILDING?
                </span>
              </h2>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg md:text-xl text-[#050505]/85 leading-relaxed font-normal mb-8 sm:mb-10">
                Have a project, idea, internship opportunity, collaboration or interesting engineering problem?
                <br />
                <span className="font-bold text-[#050505]">Let&apos;s talk.</span>
              </p>

              {/* Direct Email Address Bar */}
              <div className="bg-[#F5F5F0] border-2 border-[#050505] p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#00F0FF] border border-[#050505]" />
                  <span className="text-[#050505]/60 font-semibold">EMAIL:</span>
                  <span className="font-bold text-[#050505] break-all">
                    {siteConfig.email}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="px-3 py-1 bg-white border border-[#050505] font-bold text-xs uppercase hover:bg-[#00F0FF] transition-colors brutal-shadow-sm self-start sm:self-auto cursor-pointer"
                  id="copy-email-btn"
                >
                  {copied ? "COPIED TO CLIPBOARD ✓" : "COPY EMAIL"}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  href={`mailto:${siteConfig.email}?subject=Let's%20Build%20Together`}
                  variant="cyan"
                  size="lg"
                  id="contact-primary-btn"
                >
                  GET IN TOUCH →
                </Button>
                <Button
                  href={siteConfig.github}
                  variant="primary"
                  size="lg"
                  isExternal
                  id="contact-github-btn"
                >
                  GITHUB →
                </Button>
                <Button
                  href={siteConfig.linkedin}
                  variant="secondary"
                  size="lg"
                  isExternal
                  id="contact-linkedin-btn"
                >
                  LINKEDIN →
                </Button>
                <Button
                  href={`mailto:${siteConfig.email}`}
                  variant="outline"
                  size="lg"
                  id="contact-email-btn"
                >
                  EMAIL →
                </Button>
              </div>
            </div>
          </BrutalCard>
        </div>
      </div>
    </section>
  );
};
