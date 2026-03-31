interface PlacementBadgeProps {
  showName: string;
  sceneType?: string | null;
}

export function PlacementBadge({ showName, sceneType }: PlacementBadgeProps) {
  const label = sceneType
    ? `${showName} · ${sceneType}`
    : showName;

  return (
    <span className="inline-block px-3 py-1 rounded-pill bg-azure-50 text-azure text-[11px] font-semibold uppercase tracking-wide">
      {label}
    </span>
  );
}
