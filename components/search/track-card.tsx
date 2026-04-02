"use client";

import { useAudio } from "@/components/audio/audio-provider";
import { PlacementBadge } from "@/components/track/placement-badge";
import { DownloadButton } from "@/components/track/download-button";
import { Badge } from "@/components/ui/badge";
import { trackPreview } from "@/lib/analytics";
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
      className="hover-lift p-6 relative group"
      style={{
        background: "var(--t-color-surface)",
        borderRadius: "var(--t-radius-lg)",
        transition: "transform 0.2s ease, background-color 0.2s ease",
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = "var(--t-color-surface-high)"}
      onMouseLeave={(e) => e.currentTarget.style.background = "var(--t-color-surface)"}
    >
      <div className="flex items-start gap-4">
        {/* Album art placeholder */}
        <div
          className="w-16 h-16 shrink-0"
          style={{
            borderRadius: "var(--t-radius-md)",
            background: `linear-gradient(135deg, var(--t-color-surface-lowest), var(--t-color-primary))`,
          }}
        />

        <div className="flex-1 min-w-0">
          <h3 className="t-headline-md" style={{ color: "var(--t-color-text)" }}>
            {track.title}
          </h3>
          <p className="t-label-md mt-0.5" style={{ color: "var(--t-color-text-muted)" }}>
            {track.composer}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {track.placements.slice(0, 2).map((p, i) => (
              <PlacementBadge key={i} showName={p.showName} sceneType={p.sceneType} />
            ))}
          </div>
        </div>

        <DownloadButton trackId={track.id} />
      </div>

      {/* AI explanation */}
      {track.explanation && (
        <p
          className="t-body-lg mt-3 pl-20"
          style={{ color: "var(--t-color-text-muted)", fontStyle: "italic" }}
        >
          &ldquo;{track.explanation}&rdquo;
        </p>
      )}

      {/* Match badge */}
      {track.similarity > 0 && (
        <span
          className="t-label-md absolute top-6 right-24"
          style={{ color: "var(--t-color-accent)", fontWeight: 700 }}
        >
          {Math.round(track.similarity * 100)}% match
        </span>
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

        {/* Progress bar with gradient */}
        <div
          className="flex-1 h-1 relative"
          style={{
            background: "var(--t-color-surface-high)",
            borderRadius: "9999px",
          }}
        >
          {isCurrentTrack && (
            <div
              className="absolute left-0 top-0 h-full"
              style={{
                background: `linear-gradient(90deg, var(--t-color-primary), var(--t-color-secondary))`,
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

      {/* Mood tags */}
      <div className="flex gap-2 mt-3 pl-20">
        {track.moods.slice(0, 3).map((mood) => (
          <Badge key={mood} label={mood} />
        ))}
      </div>
    </div>
  );
}
