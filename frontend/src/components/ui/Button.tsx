"use client";

import { LucideIcon } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  isLoading,
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-accent hover:bg-accent-dark text-black font-bold shadow-lg shadow-accent/20",
    outline: "bg-transparent border border-[var(--border)] hover:border-[var(--border-hover)] text-[var(--text-primary)]",
    ghost: "bg-transparent hover:bg-[var(--bg-card)] text-[var(--text-primary)]",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm rounded-md",
    md: "px-6 py-2.5 rounded-lg",
    lg: "px-8 py-3.5 text-lg rounded-xl",
  };

  return (
    <button
      disabled={isLoading || props.disabled}
      className={`
        inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      ) : (
        Icon && <Icon size={size === "sm" ? 16 : 20} />
      )}
      {children}
    </button>
  );
}
