import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "cyan" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  href,
  isExternal,
  icon,
  children,
  className,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-mono font-bold tracking-tight uppercase transition-all duration-150 cursor-pointer select-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#050505] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]";

  const variantStyles = {
    primary:
      "bg-[#050505] text-[#F5F5F0] border-2 border-[#050505] shadow-[4px_4px_0_#050505] hover:bg-[#1f1f1f] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#050505]",
    cyan:
      "bg-[#00F0FF] text-[#050505] border-2 border-[#050505] shadow-[4px_4px_0_#050505] hover:bg-[#33f3ff] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#050505]",
    secondary:
      "bg-[#FFFFFF] text-[#050505] border-2 border-[#050505] shadow-[4px_4px_0_#050505] hover:bg-[#f0f0eb] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0_#050505]",
    outline:
      "bg-transparent text-[#050505] border-2 border-[#050505] shadow-[3px_3px_0_#050505] hover:bg-[#00F0FF] hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[5px_5px_0_#050505]",
  };

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5",
  };

  const combinedClasses = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        <span>{children}</span>
        {icon && <span className="shrink-0">{icon}</span>}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      <span>{children}</span>
      {icon && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
