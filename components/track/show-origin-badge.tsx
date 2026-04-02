interface ShowOriginBadgeProps {
  /** Show name from show_origin field (when ST provides it) */
  showOrigin?: string | null;
  /** Album name fallback (always available) */
  albumName?: string | null;
}

/**
 * Show Origin Badge — DESIGN.md §7.3
 * Prestige signal on every track card.
 * Uses show_origin when available, falls back to album_name.
 */
export function ShowOriginBadge({ showOrigin, albumName }: ShowOriginBadgeProps) {
  const source = showOrigin || albumName;
  if (!source) return null;

  const prefix = showOrigin ? "AS HEARD ON" : "FROM";

  return (
    <span
      className="t-label-sm inline-flex items-center gap-1.5 px-3 py-1.5"
      style={{
        background: "var(--t-color-surface-highest)",
        border: "1px solid var(--t-color-border)",
        borderRadius: "var(--t-radius-sm)",
        color: "var(--t-color-text-muted)",
        letterSpacing: "0.08em",
        whiteSpace: "nowrap",
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      <span style={{ opacity: 0.6 }}>{prefix}</span>{" "}
      <span style={{ color: "var(--t-color-text)" }}>{source}</span>
    </span>
  );
}
