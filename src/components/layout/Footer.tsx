import React from "react";
import { siteConfig } from "@/data/siteConfig";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#050505] text-[#F5F5F0] border-t-2 border-[#050505] mt-24">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/20">
          {/* Left: VINAYAK & Positioning */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2">
              <span className="bg-[#00F0FF] text-[#050505] font-mono font-bold text-xs px-1.5 py-0.5">
                VX
              </span>
              <span className="font-mono font-extrabold text-2xl tracking-wider text-white uppercase">
                {siteConfig.name}
              </span>
            </div>
            <p className="font-mono text-sm text-[#F5F5F0]/70">
              Software Engineer · Builder
            </p>
          </div>

          {/* Right: Clean Horizontal Links */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs font-bold"
          >
            <a
              href="#work"
              className="text-[#F5F5F0]/80 hover:text-[#00F0FF] transition-colors"
            >
              WORK
            </a>
            <a
              href="#about"
              className="text-[#F5F5F0]/80 hover:text-[#00F0FF] transition-colors"
            >
              ABOUT
            </a>
            <a
              href="#building"
              className="text-[#F5F5F0]/80 hover:text-[#00F0FF] transition-colors"
            >
              BUILDING
            </a>
            <a
              href="#contact"
              className="text-[#F5F5F0]/80 hover:text-[#00F0FF] transition-colors"
            >
              CONTACT
            </a>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5F5F0]/80 hover:text-[#00F0FF] transition-colors"
            >
              GITHUB ↗
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5F5F0]/80 hover:text-[#00F0FF] transition-colors"
            >
              LINKEDIN ↗
            </a>
          </nav>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#F5F5F0]/60">
          <p>© 2026 {siteConfig.name}</p>
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#00F0FF] inline-block" />
            <span>I BUILD THINGS THAT ACTUALLY RUN.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
