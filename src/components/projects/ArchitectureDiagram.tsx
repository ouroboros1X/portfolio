import React from "react";
import { cn } from "@/lib/utils";

interface Step {
  name: string;
  desc: string;
  badge?: string;
}

interface ArchitectureDiagramProps {
  steps: Step[];
  title?: string;
  className?: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  steps,
  title = "DATAFLOW PIPELINE",
  className,
}) => {
  return (
    <div
      className={cn(
        "bg-[#050505] text-[#F5F5F0] border-2 border-[#050505] p-5 font-mono",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/20 pb-2.5 mb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#00F0FF]">
          <span className="w-2 h-2 bg-[#00F0FF] inline-block animate-pulse" />
          <span>{title}</span>
        </div>
        <span className="text-[10px] text-white/50 tracking-wider">
          STEP-BY-STEP EXECUTION
        </span>
      </div>

      {/* Vertical / Staggered Flow */}
      <div className="space-y-2">
        {steps.map((step, idx) => {
          const isLast = idx === steps.length - 1;
          return (
            <div key={step.name} className="flex flex-col">
              <div className="flex items-center justify-between bg-[#151515] hover:bg-[#202020] border border-white/10 px-3 py-2 text-xs transition-colors">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-[#00F0FF] text-[10px] font-bold shrink-0">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="font-bold text-white tracking-wide truncate">
                    {step.name}
                  </span>
                </div>
                {step.badge && (
                  <span className="text-[10px] bg-black text-[#00F0FF] border border-[#00F0FF]/40 px-1.5 py-0.5 shrink-0">
                    {step.badge}
                  </span>
                )}
              </div>
              <div className="px-3 pt-0.5 text-[10px] text-white/60">
                {step.desc}
              </div>

              {!isLast && (
                <div className="flex items-center justify-center py-1">
                  <div className="w-px h-3 bg-white/20 relative">
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-[#00F0FF]">
                      ↓
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
