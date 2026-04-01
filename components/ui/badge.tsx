"use client";

interface BadgeProps {
  label: string;
  variant?: "primary" | "neutral";
}

export function Badge({ label, variant = "neutral" }: BadgeProps) {
  const variants = {
    primary: "bg-primary-light text-primary",
    neutral: "bg-surface-tertiary text-content-secondary",
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-pill text-badge font-semibold uppercase tracking-wide ${variants[variant]}`}
    >
      {label}
    </span>
  );
}
