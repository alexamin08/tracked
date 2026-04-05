"use client";

import { CinematicTrackCard } from "@/components/track/CinematicTrackCard";
import { SimpleTrackTable } from "@/components/simple/SimpleTrackTable";
import { useActiveTheme } from "@/hooks/useActiveTheme";
import type { SearchResult } from "@/types";

export function CollectionTrackList({ tracks }: { tracks: SearchResult[] }) {
  const theme = useActiveTheme();

  if (tracks.length === 0) {
    return (
      <div style={{ textAlign: "center", paddingTop: 64, paddingBottom: 64 }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--color-on-surface-variant)" }}>
          No tracks in this collection.
        </p>
      </div>
    );
  }

  if (theme === "simple") {
    return <SimpleTrackTable tracks={tracks} totalCount={tracks.length} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {tracks.map((track) => (
        <CinematicTrackCard key={track.id} track={track} />
      ))}
    </div>
  );
}
