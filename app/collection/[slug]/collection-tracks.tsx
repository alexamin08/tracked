"use client";

import { CinematicTrackCard } from "@/components/track/CinematicTrackCard";
import type { SearchResult } from "@/types";

export function CollectionTrackList({ tracks }: { tracks: SearchResult[] }) {
  if (tracks.length === 0) {
    return (
      <div style={{ textAlign: "center", paddingTop: 64, paddingBottom: 64 }}>
        <p style={{ fontFamily: "var(--font-display)", fontSize: 24, fontStyle: "italic", color: "var(--color-on-surface-variant)" }}>
          No tracks in this collection.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {tracks.map((track) => (
        <CinematicTrackCard key={track.id} track={track} />
      ))}
    </div>
  );
}
