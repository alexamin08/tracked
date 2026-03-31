"use client";

import { useAudio } from "@/components/audio/audio-provider";
import { PlacementBadge } from "@/components/track/placement-badge";
import { DownloadButton } from "@/components/track/download-button";
import { Badge } from "@/components/ui/badge";
import { trackPreview } from "@/lib/analytics";
import type { SearchResult } from "@/types";

interface TrackCardProps {
  track: SearchResult;
}

export function TrackCard({ track }: TrackCardProps) {
  const { state, play, pause } = useAudio();
  const isCurrentTrack = state.trackId === track.id;
  const isPlaying = isCurrentTrack && state.isPlaying;

  function handlePlay() {
    if (isPlaying) {
      pause();
      return;
    }
    if (!track.previewUrl) return;
    play({
      id: track.id,
      title: track.title,
      composer: track.composer,
      previewUrl: track.previewUrl,
    });
    trackPreview(track.id);
  }

  return (
    <div className="bg-white rounded-2xl p-6 relative">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-surface-dark to-azure shrink-0" />

        <div className="flex-1 min-w-0">
          <h3 className="text-[17px] font-semibold">{track.title}</h3>
          <p className="text-[13px] text-gray-500 mt-0.5">{track.composer}</p>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {track.placements.slice(0, 2).map((p, i) => (
              <PlacementBadge
                key={i}
                showName={p.showName}
                sceneType={p.sceneType}
              />
            ))}
          </div>
        </div>

        <DownloadButton trackId={track.id} />
      </div>

      {track.explanation && (
        <p className="text-[13px] text-gray-500 italic mt-3 pl-20">
          &ldquo;{track.explanation}&rdquo;
        </p>
      )}

      <div className="flex items-center gap-3 mt-3 bg-gray-50 rounded-lg px-4 py-3">
        <button
          onClick={handlePlay}
          disabled={!track.previewUrl}
          className="w-8 h-8 rounded-pill bg-azure text-white flex items-center justify-center text-xs shrink-0 disabled:opacity-30"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <div className="flex-1 h-1 bg-gray-200 rounded-full relative">
          {isCurrentTrack && (
            <div
              className="absolute left-0 top-0 h-full bg-azure rounded-full"
              style={{
                width: `${state.duration > 0 ? (state.currentTime / state.duration) * 100 : 0}%`,
              }}
            />
          )}
        </div>

        {!track.previewUrl && (
          <span className="text-[11px] text-gray-400">Preview unavailable</span>
        )}
      </div>

      <div className="flex gap-2 mt-3 pl-20">
        {track.moods.slice(0, 3).map((mood) => (
          <Badge key={mood} label={mood} />
        ))}
      </div>
    </div>
  );
}
