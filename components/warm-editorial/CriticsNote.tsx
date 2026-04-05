"use client";

interface CriticsNoteProps {
  text: string;
  label?: string;
  icon?: string;
  standalone?: boolean;
  attribution?: string;
}

export function CriticsNote({
  text,
  label = "Critic's Note",
  icon = "auto_awesome",
  standalone = false,
  attribution,
}: CriticsNoteProps) {
  if (standalone) {
    return (
      <div
        style={{
          maxWidth: 896,
          margin: "0 auto",
          padding: 48,
          position: "relative",
          backgroundColor: "color-mix(in srgb, var(--color-tertiary-container) 5%, transparent)",
          borderTop: "1px dashed color-mix(in srgb, var(--color-tertiary) 20%, transparent)",
          borderBottom: "1px dashed color-mix(in srgb, var(--color-tertiary) 20%, transparent)",
          overflow: "hidden",
        }}
      >
        {/* Large decorative quote icon */}
        <span
          className="material-symbols-outlined"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            fontSize: 96,
            color: "color-mix(in srgb, var(--color-tertiary) 10%, transparent)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          format_quote
        </span>

        {/* Label pill */}
        <span
          style={{
            display: "inline-block",
            backgroundColor: "var(--color-tertiary)",
            color: "white",
            fontFamily: "var(--font-body)",
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "4px 12px",
            borderRadius: 9999,
            marginBottom: 24,
          }}
        >
          {label}
        </span>

        {/* Quote text */}
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: 30,
            fontWeight: 700,
            lineHeight: 1.2,
            color: "var(--color-on-surface-variant)",
            position: "relative",
            zIndex: 1,
          }}
        >
          &ldquo;{text}&rdquo;
        </p>

        {/* Attribution */}
        {attribution && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 24,
            }}
          >
            <div style={{ width: 40, height: 1, backgroundColor: "var(--color-tertiary)" }} />
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-on-surface-variant)",
              }}
            >
              {attribution}
            </span>
            <div style={{ width: 40, height: 1, backgroundColor: "var(--color-tertiary)" }} />
          </div>
        )}
      </div>
    );
  }

  // Inline variant (inside search results, pricing, etc.)
  return (
    <div
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-tertiary-container) 8%, transparent)",
        borderTop: "1px dashed color-mix(in srgb, var(--color-tertiary) 25%, transparent)",
        borderBottom: "1px dashed color-mix(in srgb, var(--color-tertiary) 25%, transparent)",
        padding: 24,
        display: "flex",
        gap: 12,
      }}
    >
      <span
        className="material-symbols-outlined"
        style={{
          fontSize: 14,
          color: "var(--color-tertiary)",
          flexShrink: 0,
          marginTop: 2,
        }}
      >
        {icon}
      </span>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          fontStyle: "italic",
          color: "var(--color-on-surface-variant)",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
}
