"use client";

import React from "react";
import { Project } from "@/data/projects";
import { BrutalCard } from "@/components/ui/BrutalCard";
import { TechBadge } from "@/components/ui/TechBadge";
import { Button } from "@/components/ui/Button";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { CompactArchitecturePreview } from "@/components/projects/CompactArchitecturePreview";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  idx: number;
  totalProjects: number;
  isActive?: boolean;
  isExpanded?: boolean;
  onToggleCaseStudy: (projectId: string) => void;
  className?: string;
  shadow?: "normal" | "sm" | "lg" | "cyan" | "none";
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  idx,
  totalProjects,
  isActive = true,
  isExpanded = false,
  onToggleCaseStudy,
  className,
  shadow = "lg",
}) => {
  return (
    <BrutalCard
      borderWidth={2}
      shadow={shadow}
      data-active={isActive}
      className={cn(
        "bg-white p-0 relative transition-all duration-200 flex flex-col",
        className
      )}
    >
      {/* Exposed Upper Edge Tab — Visible even when layered in stack */}
      <div className="h-[22px] px-3 sm:px-6 md:px-8 bg-[#F0F0EB] border-b border-[#050505]/30 flex items-center justify-between text-[9px] sm:text-[10px] font-mono shrink-0 select-none">
        <div className="flex items-center gap-2 font-bold text-[#050505]">
          <span className="w-1.5 h-1.5 bg-[#00F0FF] border border-[#050505] inline-block" />
          <span>{project.number}</span>
          <span className="text-[#050505]/40 hidden xs:inline">/</span>
          <span className="text-[#050505]/80 truncate max-w-[200px] xs:max-w-[320px] sm:max-w-none">
            {project.title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[#050505]/60 font-medium">
          <span className="hidden sm:inline">STACK DEPTH</span>
          <span className="font-bold text-[#050505]">
            0{idx + 1}/0{totalProjects}
          </span>
        </div>
      </div>

      {/* Main Header Tab */}
      <div className="flex items-center justify-between px-3 sm:px-6 md:px-8 py-2.5 bg-[#FAFAFA] border-b-2 border-[#050505] shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="bg-[#00F0FF] text-[#050505] font-mono font-bold text-[11px] sm:text-xs px-2 sm:px-2.5 py-0.5 border border-[#050505] shadow-[2px_2px_0_#050505]">
            {project.number}
          </span>
          <span className="font-mono text-[10px] sm:text-xs text-[#050505] uppercase tracking-wider font-bold truncate max-w-[150px] xs:max-w-[220px] sm:max-w-none">
            {project.category}
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-[#050505]/60 uppercase tracking-widest shrink-0">
          <span className="hidden sm:inline">PROJECT STAGE</span>
          <span className="font-bold text-[#050505] bg-white border border-[#050505] px-1.5 py-0.5 shadow-[1px_1px_0_#050505]">
            0{idx + 1} / 0{totalProjects}
          </span>
        </div>
      </div>

      {/* Balanced Two-Column Default Project Card */}
      <div className="p-4 sm:p-6 lg:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Project Overview, Highlights, Tags, Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Headline */}
              <h3 className="text-xl sm:text-2xl lg:text-[26px] font-black uppercase tracking-tight text-[#050505] mb-1.5 leading-tight">
                {project.title}
              </h3>

              {/* Technical Subtitle */}
              <p className="font-mono text-xs sm:text-sm font-semibold text-[#050505] mb-2.5 leading-snug">
                {project.tagline}
              </p>

              {/* Detailed 3-5 Sentence Overview */}
              <p className="text-xs sm:text-[13px] text-[#050505]/85 leading-relaxed mb-3.5">
                {project.description}
              </p>

              {/* Key Implementation Highlights Panel (3-5 specific technical bullets) */}
              <div className="mb-3.5 bg-[#F5F5F0] p-3 sm:p-3.5 border border-[#050505] shadow-[2px_2px_0_#050505]">
                <div className="flex items-center gap-1.5 mb-2 font-mono text-[10px] sm:text-[11px] font-bold text-[#050505] uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-[#00F0FF] border border-[#050505]" />
                  <span>KEY IMPLEMENTATION HIGHLIGHTS:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[#050505]/90">
                  {project.technicalDetails.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="text-[#050505] font-bold text-[10px] mt-0.5 shrink-0">
                        ■
                      </span>
                      <span className="leading-snug">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <TechBadge key={tag} label={tag} variant="default" />
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-black/15">
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  variant="primary"
                  size="md"
                  isExternal
                  id={`project-gh-${idx}`}
                >
                  VIEW SOURCE →
                </Button>
              )}
              <Button
                variant="cyan"
                size="md"
                onClick={() => onToggleCaseStudy(project.id)}
                id={`project-case-study-${idx}`}
                aria-expanded={isExpanded}
                aria-controls={`case-study-panel-${idx}`}
              >
                {isExpanded ? "COLLAPSE CASE STUDY ↑" : "CASE STUDY →"}
              </Button>
            </div>
          </div>

          {/* Right Column: Compact Architecture / Execution Flow Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <CompactArchitecturePreview
              steps={project.pipeline.steps}
              title={project.pipeline.title || "EXECUTION ARCHITECTURE"}
              projectId={project.id}
            />
          </div>
        </div>
      </div>

      {/* Expandable Case-Study Panel (Click-To-Open: Reveals Complete Deep-Dive Details) */}
      {isExpanded && (
        <div
          id={`case-study-panel-${idx}`}
          className="border-t-2 border-[#050505] bg-[#FAFAF8] p-5 sm:p-7 space-y-6 text-[#050505] animate-in fade-in duration-200"
        >
          {/* Top Panel Bar with Fast Collapse Button */}
          <div className="flex items-center justify-between pb-3 border-b border-[#050505]/20">
            <div className="flex items-center gap-2 font-mono text-xs font-black uppercase tracking-wider">
              <span className="w-2.5 h-2.5 bg-[#00F0FF] border border-[#050505]" />
              <span>TECHNICAL CASE STUDY · DEEP DIVE</span>
            </div>
            <button
              type="button"
              onClick={() => onToggleCaseStudy(project.id)}
              className="font-mono text-xs font-bold text-[#050505] hover:bg-[#050505] hover:text-[#00F0FF] px-2.5 py-1 border border-[#050505] bg-white transition-colors cursor-pointer"
              aria-label="Collapse case study"
            >
              COLLAPSE CASE STUDY ↑
            </button>
          </div>

          {/* Section 1: OVERVIEW & ENGINEERING CHALLENGE */}
          <div className="space-y-2">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#050505] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#050505]" />
              <span>OVERVIEW & THE ENGINEERING CHALLENGE</span>
            </div>
            <div className="bg-white p-4 border border-[#050505] text-xs sm:text-sm text-[#050505]/90 leading-relaxed shadow-[2px_2px_0_#050505]">
              <p className="font-semibold text-[#050505] mb-2">
                {project.deepDive.problem}
              </p>
              <p className="text-[#050505]/80 text-xs leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          {/* Section 2: IMPLEMENTATION & ENGINEERING DECISIONS */}
          <div className="space-y-2">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#050505] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#00F0FF] border border-[#050505]" />
              <span>IMPLEMENTATION & ENGINEERING DECISIONS</span>
            </div>
            <div className="bg-white p-4 border border-[#050505] text-xs sm:text-sm text-[#050505]/90 leading-relaxed space-y-3.5 shadow-[2px_2px_0_#050505]">
              <p>{project.deepDive.implementation}</p>

              {/* Implementation Highlights List */}
              <div className="pt-2 border-t border-[#050505]/15 space-y-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#050505]/70 block">
                  KEY IMPLEMENTATION HIGHLIGHTS:
                </span>
                <ul className="space-y-1.5 text-xs text-[#050505]/90">
                  {project.technicalDetails.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2">
                      <span className="text-[#050505] font-bold shrink-0">■</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Source Code Kernel if present */}
              {project.deepDive.codeSnippet && (
                <div className="pt-2">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#050505]/70 mb-1">
                    <span>
                      SOURCE KERNEL: {project.deepDive.codeSnippet.filename}
                    </span>
                    <span>
                      {project.deepDive.codeSnippet.language.toUpperCase()}
                    </span>
                  </div>
                  <pre className="bg-[#050505] text-[#00F0FF] p-3.5 text-xs font-mono overflow-x-auto border border-[#050505] leading-relaxed">
                    <code>{project.deepDive.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: ARCHITECTURE & DETAILED DATAFLOW PIPELINE */}
          <div className="space-y-2">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#050505] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#050505]" />
              <span>ARCHITECTURE & DETAILED DATAFLOW PIPELINE</span>
            </div>
            <ArchitectureDiagram
              steps={project.pipeline.steps}
              title={project.pipeline.title}
              className="p-4"
            />
          </div>

          {/* Section 4: VERIFIED TECH STACK */}
          <div className="space-y-2">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#050505] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#00F0FF] border border-[#050505]" />
              <span>VERIFIED TECH STACK</span>
            </div>
            <div className="flex flex-wrap gap-2 bg-white p-3.5 border border-[#050505] shadow-[2px_2px_0_#050505]">
              {project.tags.map((tag) => (
                <TechBadge key={tag} label={tag} variant="cyan" />
              ))}
            </div>
          </div>

          {/* Section 5: RESULTS & EMPIRICAL METRICS */}
          <div className="space-y-2">
            <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#050505] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#050505]" />
              <span>RESULTS & EMPIRICAL METRICS</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-2.5 bg-white border border-[#050505] shadow-[2px_2px_0_#050505]"
                >
                  <div className="text-[10px] text-[#050505]/60 uppercase truncate">
                    {m.label}
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-[#050505] truncate mt-0.5">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Takeaway */}
            <div className="p-3.5 bg-[#E6FCFE] border border-[#050505] shadow-[2px_2px_0_#050505]">
              <span className="font-mono text-[10px] font-bold uppercase text-[#050505] block mb-1">
                KEY ENGINEERING TAKEAWAY:
              </span>
              <p className="text-xs font-medium text-[#050505]">
                {project.deepDive.keyTakeaway}
              </p>
            </div>
          </div>

          {/* Bottom Actions Bar */}
          <div className="pt-4 border-t border-[#050505]/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  variant="primary"
                  size="md"
                  isExternal
                >
                  VIEW SOURCE →
                </Button>
              )}
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  variant="cyan"
                  size="md"
                  isExternal
                >
                  EXPLORE PROJECT →
                </Button>
              )}
            </div>
            <Button
              variant="outline"
              size="md"
              onClick={() => onToggleCaseStudy(project.id)}
            >
              COLLAPSE CASE STUDY ↑
            </Button>
          </div>
        </div>
      )}
    </BrutalCard>
  );
};
