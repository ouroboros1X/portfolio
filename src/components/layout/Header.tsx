"use client";

import React, { useEffect, useState } from "react";
import { ScrollProgress } from "./ScrollProgress";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "WORK", href: "#work" },
  { label: "ABOUT", href: "#about" },
  { label: "BUILDING", href: "#building" },
  { label: "CONTACT", href: "#contact" },
];

export const Header: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("work");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const sectionIds = ["work", "about", "building", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F5F5F0]/95 backdrop-blur-sm border-b border-[#050505] transition-colors">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="group inline-flex items-center gap-2.5 font-mono text-sm tracking-tight text-[#050505] focus:outline-none"
          id="nav-brand-logo"
        >
          <span className="inline-flex items-center justify-center bg-[#050505] text-[#00F0FF] px-1.5 py-0.5 font-bold text-xs border border-[#050505] group-hover:bg-[#00F0FF] group-hover:text-[#050505] transition-colors">
            VX
          </span>
          <span className="font-extrabold tracking-wider text-base">VINAYAK</span>
          <span className="hidden sm:inline-block text-[11px] text-[#050505]/50 font-normal">
            / SWE · SYSTEMS
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center space-x-1 lg:space-x-2 font-mono text-xs font-bold"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 transition-all relative border border-transparent hover:border-[#050505]",
                  isActive
                    ? "bg-[#00F0FF] text-[#050505] border-[#050505] font-bold"
                    : "text-[#050505] hover:bg-black/5"
                )}
              >
                {isActive && (
                  <span
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#050505]"
                    aria-hidden="true"
                  />
                )}
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button
            href="#contact"
            variant="cyan"
            size="sm"
            className="hidden sm:inline-flex"
            id="nav-cta-btn"
          >
            LET&apos;S BUILD →
          </Button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 border-2 border-[#050505] bg-white text-[#050505] brutal-shadow-sm active:translate-x-[1px] active:translate-y-[1px]"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            <span className="font-mono text-xs font-bold">
              {mobileMenuOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[#050505] bg-[#F5F5F0] px-4 py-4 space-y-2 brutal-shadow">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 font-mono text-sm font-bold border-2 border-[#050505] transition-colors",
                  isActive
                    ? "bg-[#00F0FF] text-[#050505]"
                    : "bg-white text-[#050505] hover:bg-[#00F0FF]/30"
                )}
              >
                ■ {item.label}
              </a>
            );
          })}
          <div className="pt-2">
            <Button
              href="#contact"
              variant="cyan"
              size="md"
              className="w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              LET&apos;S BUILD →
            </Button>
          </div>
        </div>
      )}

      {/* Dynamic Scroll Progress Line */}
      <ScrollProgress />
    </header>
  );
};
