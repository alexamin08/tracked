import { displayName } from "@/lib/utils";

interface PlacementBadgeProps {
  showName: string;
  sceneType?: string | null;
}

export function PlacementBadge({ showName, sceneType }: PlacementBadgeProps) {
  const label = sceneType ? `${displayName(showName)} · ${displayName(sceneType)}` : displayName(showName);

  return (
    <span
      className="t-label-sm inline-block px-3 py-1"
      style={{
        borderRadius: "var(--t-radius-pill)",
        background: "var(--t-color-surface-highest)",
        color: "var(--t-color-text-muted)",
      }}
    >
      {label}
    </span>
  );
}
