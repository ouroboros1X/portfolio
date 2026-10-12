"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface Step {
  name: string;
  desc?: string;
  badge?: string;
}

interface CompactArchitecturePreviewProps {
  steps: Step[];
  title?: string;
  projectId: string;
  className?: string;
}

function getTechnicalProperty(projectId: string): string {
  switch (projectId) {
    case "gpt2-inference-engine":
      return "RUNTIME: PURE C++17 · ZERO RUNTIMES";
    case "ai-coding-harness":
      return "PROTOCOL: CLI HARNESS · LOCAL AGENT LOOP";
    case "cex-matching-engine":
      return "ENGINE: IN-MEMORY FIFO · DOUBLE-ENTRY";
    default:
      return "FIRST-PRINCIPLES ARCHITECTURE";
  }
}

export const CompactArchitecturePreview: React.FC<
  CompactArchitecturePreviewProps
> = ({ steps, title = "EXECUTION ARCHITECTURE", projectId, className }) => {
  const propertyLabel = getTechnicalProperty(projectId);

  return (
    <div
      className={cn(
        "bg-[#050505] text-[#F5F5F0] border-2 border-[#050505] p-3 sm:p-3.5 font-mono shadow-[3px_3px_0_#050505] flex flex-col justify-between h-full",
        className
      )}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-2.5">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-[#00F0FF]">
            <span className="w-2 h-2 bg-[#00F0FF] inline-block animate-pulse shrink-0" />
            <span className="truncate uppercase">{title}</span>
          </div>
          <span className="text-[9px] text-white/50 tracking-wider uppercase shrink-0 font-medium">
            COMPACT PREVIEW
          </span>
        </div>

        {/* Sequential Execution Stages */}
        <div className="space-y-1">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1;
            return (
              <div key={step.name} className="flex flex-col">
                <div className="flex items-center justify-between bg-[#141414] hover:bg-[#1f1f1f] border border-white/10 px-2 py-1 text-[11px] transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[#00F0FF] text-[10px] font-bold shrink-0">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-bold text-white text-[10px] sm:text-[11px] tracking-wide truncate">
                      {step.name}
                    </span>
                  </div>
                  {step.badge && (
                    <span className="text-[9px] bg-black text-[#00F0FF] border border-[#00F0FF]/40 px-1.5 py-0.2 shrink-0 truncate max-w-[110px]">
                      {step.badge}
                    </span>
                  )}
                </div>

                {!isLast && (
                  <div className="flex items-center justify-center py-0.5">
                    <span className="text-[8px] text-[#00F0FF] leading-none">
                      ↓
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Technical Status Badge */}
      <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-[9px] text-white/60">
        <span className="flex items-center gap-1.5 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shrink-0" />
          <span className="truncate">{propertyLabel}</span>
        </span>
        <span className="text-[#00F0FF] font-bold uppercase shrink-0 ml-2">
          VERIFIED
        </span>
      </div>
    </div>
  );
};
