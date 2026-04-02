"use client";

import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  style,
  ...props
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    borderRadius: "var(--t-radius-pill)",
    fontFamily: "var(--t-font-body)",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease, transform 0.15s ease",
    textTransform: "var(--t-button-case)" as "uppercase",
    ...style,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: "var(--t-color-primary)",
      color: "var(--t-color-on-primary)",
    },
    secondary: {
      background: "var(--t-color-surface-high)",
      color: "var(--t-color-text)",
    },
    ghost: {
      background: "transparent",
      color: "var(--t-color-text-muted)",
    },
  };

  const sizeClasses: Record<string, string> = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button
      className={`focus-glow disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${className}`}
      style={{ ...baseStyle, ...variantStyles[variant] }}
      {...props}
    />
  );
}
