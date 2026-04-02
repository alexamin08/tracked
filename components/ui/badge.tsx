"use client";

interface BadgeProps {
  label: string;
  variant?: "primary" | "neutral";
}

export function Badge({ label, variant = "neutral" }: BadgeProps) {
  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: "color-mix(in srgb, var(--t-color-primary) 15%, transparent)",
      color: "var(--t-color-primary)",
    },
    neutral: {
      background: "var(--t-color-surface-high)",
      color: "var(--t-color-text-muted)",
    },
  };

  return (
    <span
      className="t-label-sm inline-block px-3 py-1"
      style={{
        borderRadius: "var(--t-radius-pill)",
        ...styles[variant],
      }}
    >
      {label}
    </span>
  );
}
