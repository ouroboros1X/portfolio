import React from "react";
import { cn } from "@/lib/utils";

interface BrutalCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  shadow?: "normal" | "sm" | "lg" | "cyan" | "none";
  hoverEffect?: boolean;
  borderWidth?: 1 | 2;
  bg?: "white" | "canvas" | "dark" | "cyan";
  className?: string;
}

export const BrutalCard: React.FC<BrutalCardProps> = ({
  children,
  shadow = "normal",
  hoverEffect = false,
  borderWidth = 2,
  bg = "white",
  className,
  ...props
}) => {
  const shadowStyles = {
    normal: "shadow-[4px_4px_0_#050505]",
    sm: "shadow-[2px_2px_0_#050505]",
    lg: "shadow-[6px_6px_0_#050505]",
    cyan: "shadow-[4px_4px_0_#00F0FF]",
    none: "",
  };

  const bgStyles = {
    white: "bg-[#FFFFFF] text-[#050505]",
    canvas: "bg-[#F5F5F0] text-[#050505]",
    dark: "bg-[#050505] text-[#F5F5F0]",
    cyan: "bg-[#E6FCFE] text-[#050505]",
  };

  const borderClass =
    borderWidth === 2 ? "border-2 border-[#050505]" : "border border-[#050505]";

  const hoverClass = hoverEffect
    ? "transition-all duration-150 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#050505]"
    : "";

  return (
    <div
      className={cn(
        borderClass,
        bgStyles[bg],
        shadowStyles[shadow],
        hoverClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
