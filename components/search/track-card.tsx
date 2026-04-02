"use client";

import { useAudio } from "@/components/audio/audio-provider";
import { ShowOriginBadge } from "@/components/track/show-origin-badge";
import { DownloadButton } from "@/components/track/download-button";
import { Badge } from "@/components/ui/badge";
import { trackPreview } from "@/lib/analytics";
import { displayName } from "@/lib/utils";
import type { SearchResult } from "@/types";

export function TrackCard({ track }: { track: SearchResult }) {
  const { state, play, pause } = useAudio();
  const isCurrentTrack = state.trackId === track.id;
  const isPlaying = isCurrentTrack && state.isPlaying;

  function handlePlay() {
    if (isPlaying) { pause(); return; }
    if (!track.previewUrl) return;
    play({ id: track.id, title: track.title, composer: track.composer, previewUrl: track.previewUrl });
    trackPreview(track.id);
  }

  return (
    <div
      className="hover-lift"
      style={{
        background: "var(--t-color-surface)",
        borderRadius: "var(--t-radius-lg)",
        padding: "var(--t-space-6)",
        transition: "transform 0.2s ease, background-color 0.2s ease",
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = "var(--t-color-surface-high)"}
      onMouseLeave={(e) => e.currentTarget.style.background = "var(--t-color-surface)"}
    >
      <div className="flex items-start gap-4">
        {/* Album art placeholder */}
        <div
          className="w-14 h-14 shrink-0"
          style={{
            borderRadius: "var(--t-radius-md)",
            background: "linear-gradient(135deg, var(--t-color-surface-lowest), var(--t-color-primary))",
          }}
        />

        {/* Title + composer + placements */}
        <div className="flex-1 min-w-0">
          {/* Track title — display font, normal case */}
          <h3 className="t-headline-md" style={{ color: "var(--t-color-text)" }}>
            {displayName(track.title)}
          </h3>
          {/* Composer — label, uppercase */}
          <p className="t-label-md mt-0.5" style={{ color: "var(--t-color-text-muted)" }}>
            {displayName(track.composer)}
          </p>

          {/* Show Origin Badge — every card, no exceptions (DESIGN.md §7.3) */}
          <div className="mt-2">
            <ShowOriginBadge
              showOrigin={track.placements[0]?.showName}
              albumName={track.albumName}
            />
          </div>

        </div>

        {/* Match % + Download — stacked vertically, no overlap */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          {track.similarity > 0 && (
            <span
              className="t-label-md"
              style={{ color: "var(--t-color-accent)", fontWeight: 700 }}
            >
              {Math.round(track.similarity * 100)}% match
            </span>
          )}
          <DownloadButton trackId={track.id} />
        </div>
      </div>

      {/* AI explanation — body font, italic */}
      {track.explanation && (
        <p
          className="t-body-lg mt-3"
          style={{
            color: "var(--t-color-text-muted)",
            fontStyle: "italic",
            paddingLeft: "calc(56px + var(--t-space-4))",
          }}
        >
          &ldquo;{track.explanation}&rdquo;
        </p>
      )}

      {/* Waveform / play area */}
      <div
        className="flex items-center gap-3 mt-3 px-4 py-3"
        style={{
          background: "var(--t-color-surface-low)",
          borderRadius: "var(--t-radius-md)",
        }}
      >
        <button
          onClick={handlePlay}
          disabled={!track.previewUrl}
          className="w-8 h-8 flex items-center justify-center text-xs shrink-0 disabled:opacity-30 focus-glow"
          style={{
            borderRadius: "var(--t-radius-pill)",
            background: "var(--t-color-primary)",
            color: "var(--t-color-on-primary)",
            border: "none",
            cursor: "pointer",
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <div
          className="flex-1 h-1 relative"
          style={{ background: "var(--t-color-surface-high)", borderRadius: "9999px" }}
        >
          {isCurrentTrack && (
            <div
              className="absolute left-0 top-0 h-full"
              style={{
                background: "linear-gradient(90deg, var(--t-color-primary), var(--t-color-secondary))",
                borderRadius: "9999px",
                width: `${state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0}%`,
              }}
            />
          )}
        </div>

        {!track.previewUrl && (
          <span className="t-label-sm" style={{ color: "var(--t-color-text-muted)" }}>
            Preview unavailable
          </span>
        )}
      </div>

      {/* Mood tags — label style */}
      <div
        className="flex gap-2 mt-3"
        style={{ paddingLeft: "calc(56px + var(--t-space-4))" }}
      >
        {track.moods.slice(0, 3).map((mood) => (
          <Badge key={mood} label={mood} />
        ))}
      </div>
    </div>
  );
}
