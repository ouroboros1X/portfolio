"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { projectsData } from "@/data/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/projects/ProjectCard";

export const SelectedWork: React.FC = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const [entryDistance, setEntryDistance] = useState<number>(1100);

  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const totalProjects = projectsData.length;

  // Track viewport dimensions for responsive handling & precise off-screen positioning
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      // Desktop sticky-stage requires >= 1024px width and reasonable viewport height
      setIsDesktop(width >= 1024 && height >= 640);
      setEntryDistance(Math.max(height + 150, 1000));
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll tracking on the tall projects-section wrapper
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track active foreground card for depth cues & indicator
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.4) {
      setActiveCardIndex(0);
    } else if (latest < 0.75) {
      setActiveCardIndex(1);
    } else {
      setActiveCardIndex(2);
    }
  });

  // Mathematical Stacking Geometry (Balanced Two-Column Cards):
  // Card 0 rests at x = (totalProjects - 1 - 0) * stepX, y = 0px
  // Card 1 rests at x = (totalProjects - 1 - 1) * stepX, y = 22px
  // Card 2 rests at x = (totalProjects - 1 - 2) * stepX, y = 44px
  const stepX = 18;
  const stepY = 22;
  const totalOffset = (totalProjects - 1) * stepX; // 36px for 3 cards
  const cardHeight = 550; // Proportional height for balanced 2-column content

  // Card 1 arrival transforms (enters smoothly between scroll progress 0.15 and 0.40)
  const y1 = useTransform(
    scrollYProgress,
    [0, 0.15, 0.4, 1],
    [entryDistance, entryDistance, 0, 0]
  );
  const opacity1 = useTransform(
    scrollYProgress,
    [0, 0.13, 0.18, 1],
    [0, 0, 1, 1]
  );

  // Card 2 arrival transforms (enters smoothly between scroll progress 0.50 and 0.75)
  const y2 = useTransform(
    scrollYProgress,
    [0, 0.5, 0.75, 1],
    [entryDistance, entryDistance, 0, 0]
  );
  const opacity2 = useTransform(
    scrollYProgress,
    [0, 0.48, 0.53, 1],
    [0, 0, 1, 1]
  );

  const cardTransforms = [
    { y: 0, opacity: 1 },
    { y: y1, opacity: opacity1 },
    { y: y2, opacity: opacity2 },
  ];

  // Toggle case study handler with smooth scroll anchoring
  const handleToggleCaseStudy = (projectId: string) => {
    if (expandedCardId === projectId) {
      // Collapsing active case study -> restore sticky stack
      const cardIndex = projectsData.findIndex((p) => p.id === projectId);
      setExpandedCardId(null);
      setTimeout(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const containerTop = window.scrollY + rect.top;
          const containerHeight = containerRef.current.offsetHeight;
          let progress = 0.05;
          if (cardIndex === 1) progress = 0.45;
          if (cardIndex === 2) progress = 0.85;
          window.scrollTo({
            top: containerTop + (containerHeight - window.innerHeight) * progress,
            behavior: "smooth",
          });
        }
      }, 80);
    } else {
      // Expanding case study -> suspend sticky pinning & scroll into view
      setExpandedCardId(projectId);
      setTimeout(() => {
        const el = document.getElementById(`project-card-${projectId}`);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 85;
          window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
        }
      }, 80);
    }
  };

  return (
    <section id="work" className="border-b border-[#050505] relative bg-[#F5F5F0]">
      {/* Section Header Introduction */}
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-6 sm:pb-8">
        <SectionLabel label="SELECTED WORK" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-2.5">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#050505]">
              THINGS I&apos;VE BUILT.
            </h2>
            <p className="font-mono text-xs sm:text-sm text-[#050505]/70 mt-1.5 max-w-xl">
              Engineering projects and functional systems built from first principles. Rich previews with architecture diagrams by default — expand any case study for deep dives.
            </p>
          </div>

          {/* Interactive Stack Depth Indicator */}
          <div className="hidden lg:flex items-center gap-3 font-mono text-xs text-[#050505] bg-white border-2 border-[#050505] px-3.5 py-2 shadow-[3px_3px_0_#050505] shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] border border-[#050505] animate-pulse" />
            <span className="font-bold tracking-wider">
              {expandedCardId ? "CASE STUDY:" : "STACK DEPTH:"}
            </span>
            <span className="bg-[#050505] text-[#00F0FF] px-2 py-0.5 font-bold text-[11px] border border-[#050505]">
              0{activeCardIndex + 1} / 0{totalProjects}
            </span>
            <span className="text-[#050505]/60 text-[11px] uppercase truncate max-w-[140px]">
              {projectsData[activeCardIndex]?.title || "PROJECT"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Presentation */}
      {isDesktop && !prefersReducedMotion && expandedCardId === null ? (
        /* Desktop: Scroll-Driven Overlapping Sticky Stack */
        <div
          ref={containerRef}
          className="relative w-full"
          style={{ height: `${(totalProjects - 1) * 115 + 110}vh` }}
        >
          {/* Sticky Stacking Stage */}
          <div className="sticky top-[68px] lg:top-20 w-full px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20 flex justify-center">
            {/* Unified Stacking Geometry Canvas */}
            <div
              className="relative w-full max-w-[1250px]"
              style={{
                minHeight: `${cardHeight + (totalProjects - 1) * stepY + 48}px`,
              }}
            >
              {projectsData.map((project, idx) => {
                const restX = (totalProjects - 1 - idx) * stepX;
                const restY = idx * stepY;
                const zIndex = (idx + 1) * 10;
                const isForeground = activeCardIndex === idx;
                const transformConfig = cardTransforms[idx] || { y: 0, opacity: 1 };

                return (
                  <motion.div
                    key={project.id}
                    id={`project-card-${project.id}`}
                    className="absolute"
                    style={{
                      left: `${restX}px`,
                      top: `${restY}px`,
                      width: `calc(100% - ${totalOffset}px)`,
                      minHeight: `${cardHeight}px`,
                      zIndex: zIndex,
                      y: transformConfig.y,
                      opacity: transformConfig.opacity,
                      pointerEvents: idx <= activeCardIndex ? "auto" : "none",
                    }}
                  >
                    <ProjectCard
                      project={project}
                      idx={idx}
                      totalProjects={totalProjects}
                      isActive={isForeground}
                      isExpanded={false}
                      onToggleCaseStudy={handleToggleCaseStudy}
                      shadow={isForeground ? "lg" : "normal"}
                      className={
                        isForeground
                          ? "shadow-[8px_8px_0_#050505]"
                          : "shadow-[5px_5px_0_#050505]"
                      }
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      ) : isDesktop && !prefersReducedMotion && expandedCardId !== null ? (
        /* Desktop: Expanded Case Study View (Sticky Released for Natural Scrolling & Zero Clipping) */
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-2">
          {/* Active Case Study Banner with Instant Stack Restore */}
          <div className="mb-6 p-3 bg-white border-2 border-[#050505] shadow-[4px_4px_0_#050505] flex items-center justify-between">
            <div className="flex items-center gap-2.5 font-mono text-xs">
              <span className="w-2.5 h-2.5 bg-[#00F0FF] border border-[#050505] animate-pulse" />
              <span className="font-bold text-[#050505]">ACTIVE CASE STUDY:</span>
              <span className="font-black uppercase text-[#050505]">
                {projectsData.find((p) => p.id === expandedCardId)?.title}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleToggleCaseStudy(expandedCardId)}
              className="font-mono text-xs font-bold text-[#050505] hover:bg-[#050505] hover:text-[#00F0FF] px-3 py-1 border border-[#050505] bg-white transition-colors cursor-pointer"
            >
              RESTORE STACK VIEW ↑
            </button>
          </div>

          <div className="space-y-8">
            {projectsData.map((project, idx) => {
              const isExpanded = project.id === expandedCardId;
              return (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  className="transition-all duration-200"
                >
                  <ProjectCard
                    project={project}
                    idx={idx}
                    totalProjects={totalProjects}
                    isActive={isExpanded}
                    isExpanded={isExpanded}
                    onToggleCaseStudy={handleToggleCaseStudy}
                    shadow={isExpanded ? "lg" : "normal"}
                    className={
                      isExpanded
                        ? "shadow-[8px_8px_0_#050505]"
                        : "shadow-[5px_5px_0_#050505]"
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Mobile / Small Screens & Reduced-Motion: Layered Responsive Stack */
        <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="relative space-y-8 sm:space-y-12">
            {projectsData.map((project, idx) => {
              const isExpanded = expandedCardId === project.id;

              return (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  className="transition-all duration-200"
                  style={{
                    zIndex: isExpanded ? 50 : (idx + 1) * 10,
                  }}
                >
                  <ProjectCard
                    project={project}
                    idx={idx}
                    totalProjects={totalProjects}
                    isActive={true}
                    isExpanded={isExpanded}
                    onToggleCaseStudy={handleToggleCaseStudy}
                    shadow="lg"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Section Bottom Clearance & Smooth Transition */}
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pb-24">
        <div className="flex items-center justify-between border-t-2 border-[#050505] pt-4 font-mono text-xs text-[#050505]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#00F0FF] border border-[#050505]" />
            <span className="font-bold tracking-wider">
              END OF SELECTED WORK · 03/03
            </span>
          </div>
          <a
            href="#stack"
            className="hover:text-[#00F0FF] hover:bg-[#050505] font-bold text-[#050505] px-2.5 py-1 border border-[#050505] bg-white shadow-[2px_2px_0_#050505] hover:shadow-none transition-all cursor-pointer"
          >
            NEXT: TECHNOLOGY STACK ↓
          </a>
        </div>
      </div>
    </section>
  );
};
