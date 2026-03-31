"use client";

interface BadgeProps {
  label: string;
  variant?: "azure" | "neutral";
}

export function Badge({ label, variant = "neutral" }: BadgeProps) {
  const variants = {
    azure:
      "bg-azure-50 text-azure-500 border-none",
    neutral: "bg-gray-100 text-gray-600 border-none",
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-pill text-[11px] font-semibold uppercase tracking-wide ${variants[variant]}`}
    >
      {label}
    </span>
  );
}
