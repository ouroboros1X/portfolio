"use client";

import React, { useState } from "react";
import { projectsData, Project } from "@/data/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { TechBadge } from "@/components/ui/TechBadge";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { CaseStudyModal } from "@/components/projects/CaseStudyModal";

export const SelectedWork: React.FC = () => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(
    null
  );

  return (
    <section id="work" className="py-20 sm:py-28 border-b border-[#050505]">
      <div className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <SectionLabel label="SELECTED WORK" />
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#050505] mt-3">
            THINGS I&apos;VE BUILT.
          </h2>
          <p className="font-mono text-xs sm:text-sm text-[#050505]/70 mt-2 max-w-xl">
            Engineering projects and functional systems built from first principles. No superficial mockups — every project runs real code.
          </p>
        </div>

        {/* Large Horizontal Project Sections */}
        <div className="space-y-16 sm:space-y-20">
          {projectsData.map((project, idx) => (
            <BrutalCard
              key={project.id}
              borderWidth={2}
              shadow="lg"
              className="bg-white p-6 sm:p-8 md:p-10 relative overflow-hidden"
            >
              {/* Horizontal Layout Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* Left: Project Details (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    {/* Project Eyebrow & Number */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-[#00F0FF] text-[#050505] font-mono font-bold text-xs px-2.5 py-0.5 border border-[#050505]">
                        {project.number}
                      </span>
                      <span className="font-mono text-xs text-[#050505]/60 uppercase tracking-wider font-semibold">
                        {project.category}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-2xl sm:text-4xl lg:text-4xl font-black uppercase tracking-tight text-[#050505] mb-3">
                      {project.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-sm sm:text-base font-semibold text-[#050505] mb-4">
                      {project.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#050505]/80 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Technical Highlights */}
                    <div className="mb-6 space-y-2 bg-[#F5F5F0] p-4 border border-[#050505]">
                      <div className="font-mono text-[10px] sm:text-xs font-bold text-[#050505] uppercase tracking-wider">
                        KEY IMPLEMENTATION HIGHLIGHTS:
                      </div>
                      <ul className="space-y-1.5 text-xs text-[#050505]/90">
                        {project.technicalDetails.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <span className="text-[#050505] font-bold">■</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {project.tags.map((tag) => (
                        <TechBadge key={tag} label={tag} variant="default" />
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-black/15">
                    <Button
                      href={project.githubUrl}
                      variant="primary"
                      size="md"
                      isExternal
                      id={`project-gh-${idx}`}
                    >
                      {project.sourceCtaLabel || "GITHUB →"}
                    </Button>
                    <Button
                      variant="cyan"
                      size="md"
                      href={project.liveUrl}
                      isExternal={Boolean(project.liveUrl)}
                      onClick={
                        project.liveUrl
                          ? undefined
                          : () => setSelectedCaseStudy(project)
                      }
                      id={`project-case-study-${idx}`}
                    >
                      {project.exploreCtaLabel || "CASE STUDY →"}
                    </Button>
                  </div>
                </div>

                {/* Right: Technical Diagram & Metrics (5 cols) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {/* Architecture Diagram */}
                  <ArchitectureDiagram
                    steps={project.pipeline.steps}
                    title={project.pipeline.title}
                  />

                  {/* Quick Metrics Bar */}
                  <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                    {project.metrics.map((m, mIdx) => (
                      <div
                        key={m.label}
                        className={`p-2.5 bg-[#F5F5F0] border border-[#050505] ${
                          mIdx === project.metrics.length - 1 &&
                          project.metrics.length % 2 === 1
                            ? "col-span-2"
                            : ""
                        }`}
                      >
                        <div className="text-[10px] text-[#050505]/60 uppercase">
                          {m.label}
                        </div>
                        <div className="font-bold text-[#050505] text-xs truncate mt-0.5">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </BrutalCard>
          ))}
        </div>
      </div>

      {/* Case Study Deep-Dive Modal */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </section>
  );
};
