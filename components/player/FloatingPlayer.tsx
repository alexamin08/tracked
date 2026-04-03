"use client";

import { useAudio } from "@/components/audio/audio-provider";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// Transport icon components
function ShuffleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
    </svg>
  );
}

function SkipBackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="19 20 9 12 19 4 19 20" />
      <line x1="5" y1="19" x2="5" y2="5" />
    </svg>
  );
}

function SkipForwardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 4 15 12 5 20 5 4" />
      <line x1="19" y1="5" x2="19" y2="19" />
    </svg>
  );
}

function RepeatIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}

export function FloatingPlayer() {
  const { state, toggle, seek } = useAudio();

  if (!state.trackId) return null;

  const progress =
    state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 72,
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "color-mix(in srgb, var(--color-surface-container-highest) 85%, transparent)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Left zone — art + track info + heart */}
      <div style={{ width: 280, display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
        {/* Album art placeholder */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--color-surface-container)",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--color-primary-container), var(--color-surface-container-high))" }} />
        </div>

        {/* Track info */}
        <div style={{ minWidth: 0, flex: 1 }}>
          <p
            className="ci-title-sm"
            style={{
              color: "var(--color-on-surface)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {state.title}
          </p>
          <p
            className="ci-label-sm"
            style={{
              color: "var(--color-on-surface-variant)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {state.composer}
          </p>
        </div>

        {/* Heart */}
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-on-surface-variant)",
            padding: 0,
            display: "flex",
          }}
        >
          <HeartIcon />
        </button>
      </div>

      {/* Center zone — transport + progress */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "0 24px" }}>
        {/* Transport controls */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", padding: 0, display: "flex" }}>
            <ShuffleIcon />
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", padding: 0, display: "flex" }}>
            <SkipBackIcon />
          </button>
          <button
            onClick={toggle}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              backgroundColor: "var(--color-primary)",
              color: "var(--color-on-primary)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label={state.isPlaying ? "Pause" : "Play"}
          >
            {state.isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", padding: 0, display: "flex" }}>
            <SkipForwardIcon />
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-on-surface-variant)", padding: 0, display: "flex" }}>
            <RepeatIcon />
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", maxWidth: 480 }}>
          <span className="ci-label-sm" style={{ color: "var(--color-on-surface-variant)", minWidth: 32, textAlign: "right" }}>
            {formatTime(state.currentTime)}
          </span>
          <div
            style={{
              flex: 1,
              height: 3,
              backgroundColor: "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
              borderRadius: 9999,
              cursor: "pointer",
              position: "relative",
            }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = (e.clientX - rect.left) / rect.width;
              seek(pct * state.duration);
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${progress}%`,
                backgroundColor: "var(--color-primary)",
                borderRadius: 9999,
                transition: "width 100ms linear",
              }}
            />
          </div>
          <span className="ci-label-sm" style={{ color: "var(--color-on-surface-variant)", minWidth: 32 }}>
            {formatTime(state.duration)}
          </span>
        </div>
      </div>

      {/* Right zone — waveform label, queue, volume */}
      <div style={{ width: 200, display: "flex", alignItems: "center", gap: 16, justifyContent: "flex-end", flexShrink: 0 }} className="hidden lg:flex">
        <span className="ci-label-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          WAVEFORM
        </span>
        <span className="ci-label-sm" style={{ color: "var(--color-on-surface-variant)" }}>
          QUEUE
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--color-on-surface-variant)", display: "flex" }}>
            <VolumeIcon />
          </span>
          <div
            style={{
              width: 80,
              height: 3,
              backgroundColor: "color-mix(in srgb, var(--color-outline-variant) 30%, transparent)",
              borderRadius: 9999,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: "70%",
                backgroundColor: "var(--color-on-surface-variant)",
                borderRadius: 9999,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
