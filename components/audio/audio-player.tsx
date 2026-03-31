"use client";

import { useAudio } from "./audio-provider";

export function AudioPlayer() {
  const { state, toggle, seek } = useAudio();

  if (!state.trackId) return null;

  const progress = state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0;

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[72px] glass-surface-light z-50 flex items-center px-6 gap-4">
      <button
        onClick={toggle}
        className="w-10 h-10 rounded-pill bg-azure text-white flex items-center justify-center shrink-0 text-sm"
        aria-label={state.isPlaying ? "Pause" : "Play"}
      >
        {state.isPlaying ? "⏸" : "▶"}
      </button>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate">{state.title}</p>
        <p className="text-xs text-gray-500 truncate">{state.composer}</p>
      </div>

      <div
        className="flex-[2] h-1 bg-gray-200 rounded-full cursor-pointer relative"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const pct = x / rect.width;
          seek(pct * state.duration);
        }}
      >
        <div
          className="absolute left-0 top-0 h-full bg-azure rounded-full transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="text-xs text-gray-500 tabular-nums shrink-0">
        {formatTime(state.currentTime)} / {formatTime(state.duration)}
      </span>
    </div>
  );
}
