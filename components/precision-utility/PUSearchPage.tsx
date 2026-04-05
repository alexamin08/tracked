"use client";

import { PrecisionResultsLayout } from "./PrecisionResultsLayout";
import type { SearchResponse, SearchResult } from "@/types";

const DEMO_ROWS: SearchResult[] = [
  {
    id: "demo-1", trackId: "demo-1", title: "Midnight Heist", composer: "Marcus Thorne",
    description: "An undercover agent creeps through a darkened warehouse. High stakes, minimal synth pulse.",
    moods: ["Tense", "Dark"], genres: ["Cinematic", "Thriller"], albumName: null, previewUrl: null, similarity: 0.98,
    placements: [{ showName: "THE BEAR", network: "FX", sceneType: "Dramatic" }],
    explanation: "Matches your query's tense pacing with minor-key string ostinato and restrained percussion.",
  },
  {
    id: "demo-2", trackId: "demo-2", title: "Neon Frontier", composer: "Elena Volkov",
    description: "Cyberpunk cityscapes, night drives, high-speed chase sequences with a digital edge.",
    moods: ["Driving", "Electronic"], genres: ["Synthwave"], albumName: null, previewUrl: null, similarity: 0.94,
    placements: [{ showName: "SUCCESSION", network: "HBO", sceneType: "Dramatic" }],
    explanation: "Matches atmospheric requirements with expansive reverb and driving low-end bass synth.",
  },
  {
    id: "demo-3", trackId: "demo-3", title: "Quiet Resolution", composer: "Julian Gray",
    description: "Somber reflection, post-conflict dialogue, or a character coming to a difficult decision.",
    moods: ["Somber", "Reflective"], genres: ["Classical", "Drama"], albumName: null, previewUrl: null, similarity: 0.91,
    placements: [{ showName: "OPPENHEIMER", network: "Universal", sceneType: "Dramatic" }],
    explanation: "Matches emotional core with minimalist piano motifs and subtle cello undertones.",
  },
  {
    id: "demo-4", trackId: "demo-4", title: "Broken Circuit", composer: "Methodic",
    description: "Fast-cut action montages, high-tech infiltration, and chaotic confrontation scenes.",
    moods: ["Aggressive", "Chaotic"], genres: ["Industrial"], albumName: null, previewUrl: null, similarity: 0.87,
    placements: [{ showName: "MR. ROBOT", network: "USA", sceneType: "Action" }],
    explanation: "Matches aggressive intent with distorted glitch textures and heavy industrial drums.",
  },
];

interface PUSearchPageProps {
  query: string;
  data: SearchResponse | null;
}

export function PUSearchPage({ query, data }: PUSearchPageProps) {
  const results = data?.results ?? [];
  const rows = results.length > 0 ? results : DEMO_ROWS;
  const totalCount = results.length > 0 ? results.length : 1248;

  return (
    <PrecisionResultsLayout
      initialQuery={query}
      tracks={rows}
      totalCount={totalCount}
    />
  );
}
