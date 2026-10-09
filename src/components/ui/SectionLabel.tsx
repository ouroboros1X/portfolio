import React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  className?: string;
  accent?: boolean;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  label,
  className,
  accent = true,
}) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold text-[#050505]",
        className
      )}
    >
      <span
        className={cn(
          "w-2 h-2 inline-block",
          accent ? "bg-[#00F0FF] border border-[#050505]" : "bg-[#050505]"
        )}
        aria-hidden="true"
      />
      <span>{label}</span>
    </div>
  );
};
