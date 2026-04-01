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
  ...props
}: ButtonProps) {
  const base =
    "rounded-pill font-semibold transition-colors duration-base focus:outline-none focus:ring-2 focus:ring-ring-focus disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-content-on-primary hover:bg-primary-hover",
    secondary: "bg-surface-tertiary text-content hover:bg-border",
    ghost: "bg-transparent text-content-secondary hover:bg-surface-tertiary",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}
