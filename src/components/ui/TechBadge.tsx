import React from "react";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  label: string;
  variant?: "default" | "cyan" | "dark" | "ghost";
  className?: string;
}

export const TechBadge: React.FC<TechBadgeProps> = ({
  label,
  variant = "default",
  className,
}) => {
  const styles = {
    default: "bg-[#FFFFFF] text-[#050505] border border-[#050505]",
    cyan: "bg-[#00F0FF] text-[#050505] border border-[#050505] font-semibold",
    dark: "bg-[#050505] text-[#F5F5F0] border border-[#050505]",
    ghost: "bg-transparent text-[#050505] border border-black/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide select-none",
        styles[variant],
        className
      )}
    >
      {label}
    </span>
  );
};
