"use client";

import { useAudio } from "./audio-provider";

export function AudioPlayer() {
  const { state, toggle, seek } = useAudio();

  if (!state.trackId) return null;

  const progress =
    state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 glass-panel flex items-center px-6 gap-4"
      style={{
        height: "72px",
        zIndex: 50,
        boxShadow: "var(--t-shadow-player)",
      }}
    >
      <button
        onClick={toggle}
        className="w-10 h-10 flex items-center justify-center shrink-0 text-sm focus-glow"
        style={{
          borderRadius: "var(--t-radius-pill)",
          background: "var(--t-color-primary)",
          color: "var(--t-color-on-primary)",
          border: "none",
          cursor: "pointer",
        }}
        aria-label={state.isPlaying ? "Pause" : "Play"}
      >
        {state.isPlaying ? "⏸" : "▶"}
      </button>

      <div className="flex-1 min-w-0">
        <p className="t-body-md truncate" style={{ color: "var(--t-color-text)", fontWeight: 600 }}>
          {state.title}
        </p>
        <p className="t-body-sm truncate" style={{ color: "var(--t-color-text-muted)" }}>
          {state.composer}
        </p>
      </div>

      <div
        className="flex-[2] h-1 cursor-pointer relative"
        style={{ background: "var(--t-color-surface-high)", borderRadius: "9999px" }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const pct = x / rect.width;
          seek(pct * state.duration);
        }}
      >
        <div
          className="absolute left-0 top-0 h-full"
          style={{
            background: "var(--t-color-primary)",
            borderRadius: "9999px",
            width: `${progress}%`,
            transition: "width 100ms linear",
          }}
        />
      </div>

      <span className="t-body-sm tabular-nums shrink-0" style={{ color: "var(--t-color-text-muted)" }}>
        {formatTime(state.currentTime)} / {formatTime(state.duration)}
      </span>

      {/* LICENSE TRACK CTA */}
      <button
        className="t-label-md focus-glow hidden md:block"
        style={{
          background: "var(--t-color-primary)",
          color: "var(--t-color-on-primary)",
          border: "none",
          borderRadius: "var(--t-radius-pill)",
          padding: "8px 16px",
          cursor: "pointer",
          textTransform: "var(--t-button-case)" as "uppercase",
        }}
      >
        License Track
      </button>
    </div>
  );
}
