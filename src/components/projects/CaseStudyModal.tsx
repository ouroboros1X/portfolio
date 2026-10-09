"use client";

import React, { useEffect } from "react";
import { Project } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { TechBadge } from "@/components/ui/TechBadge";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="bg-[#F5F5F0] border-2 border-[#050505] shadow-[8px_8px_0_#050505] max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#050505]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#050505] text-[#F5F5F0] px-6 py-4 flex items-center justify-between border-b-2 border-[#050505]">
          <div className="flex items-center gap-3">
            <span className="bg-[#00F0FF] text-[#050505] font-mono font-bold text-xs px-2 py-0.5">
              {project.number}
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#F5F5F0]/70">
              {project.deepDive.modalEyebrow || "DEEP-DIVE CASE STUDY"}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border border-white/30 text-white font-mono hover:bg-[#00F0FF] hover:text-black hover:border-black transition-colors"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 font-sans">
          {/* Title & Tagline */}
          <div>
            <h3
              id="case-study-title"
              className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#050505]"
            >
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-[#050505]/80 font-mono mt-1">
              {project.tagline}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tags.map((tag) => (
                <TechBadge key={tag} label={tag} variant="cyan" />
              ))}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className={`grid grid-cols-2 ${project.metrics.length >= 5 ? "sm:grid-cols-3 lg:grid-cols-5" : "sm:grid-cols-4"} gap-3 bg-white p-4 border-2 border-[#050505]`}>
            {project.metrics.map((m) => (
              <div key={m.label} className="font-mono">
                <div className="text-[10px] text-[#050505]/60 uppercase">{m.label}</div>
                <div className="text-xs sm:text-sm font-bold text-[#050505] mt-0.5">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* The Engineering Problem */}
          <div className="space-y-2">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#050505] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#050505]" />
              <span>THE ENGINEERING CHALLENGE</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[#050505]/90 bg-white p-4 border border-[#050505]">
              {project.deepDive.problem}
            </p>
          </div>

          {/* Implementation Strategy */}
          <div className="space-y-2">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#050505] flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00F0FF] border border-[#050505]" />
              <span>SYSTEM ARCHITECTURE & IMPLEMENTATION</span>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-[#050505]/90 bg-white p-4 border border-[#050505]">
              {project.deepDive.implementation}
            </p>
          </div>

          {/* Code Snippet if present */}
          {project.deepDive.codeSnippet && (
            <div className="space-y-2">
              <div className="flex items-center justify-between font-mono text-xs font-bold uppercase text-[#050505]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#050505]" />
                  <span>CORE IMPLEMENTATION KERNEL</span>
                </div>
                <span className="text-[11px] text-[#050505]/60">
                  {project.deepDive.codeSnippet.filename}
                </span>
              </div>
              <pre className="bg-[#050505] text-[#00F0FF] p-4 text-xs font-mono overflow-x-auto border-2 border-[#050505] leading-relaxed">
                <code>{project.deepDive.codeSnippet.code}</code>
              </pre>
            </div>
          )}

          {/* Key Engineering Takeaway */}
          <div className="p-4 bg-[#E6FCFE] border-2 border-[#050505] shadow-[3px_3px_0_#050505]">
            <div className="font-mono text-xs font-bold uppercase text-[#050505] mb-1">
              KEY ENGINEERING TAKEAWAY:
            </div>
            <p className="text-xs sm:text-sm font-medium text-[#050505]">
              {project.deepDive.keyTakeaway}
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-white px-6 py-4 border-t-2 border-[#050505] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              href={project.githubUrl}
              variant="primary"
              size="md"
              isExternal
            >
              {project.sourceCtaLabel || "VIEW ON GITHUB →"}
            </Button>
            {project.liveUrl && (
              <Button
                href={project.liveUrl}
                variant="cyan"
                size="md"
                isExternal
              >
                {project.exploreCtaLabel || "EXPLORE PROJECT →"}
              </Button>
            )}
          </div>
          <Button
            variant="outline"
            size="md"
            onClick={onClose}
          >
            CLOSE [ESC]
          </Button>
        </div>
      </div>
    </div>
  );
};
