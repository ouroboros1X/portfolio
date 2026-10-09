import React from "react";
import { cn } from "@/lib/utils";

interface DotBackgroundProps {
  className?: string;
  dotClassName?: string;
  faded?: boolean;
  children?: React.ReactNode;
}

export const DotBackground: React.FC<DotBackgroundProps> = ({
  className,
  dotClassName,
  faded = true,
  children,
}) => {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Dot Grid Layer */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(rgba(5,5,5,0.14)_1.2px,transparent_1.2px)]",
          dotClassName
        )}
        aria-hidden="true"
      />

      {/* Radial gradient overlay for faded vignette effect */}
      {faded && (
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-[#F5F5F0] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
          aria-hidden="true"
        />
      )}

      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
};
