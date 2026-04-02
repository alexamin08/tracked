"use client";

import { TrackCard } from "./track-card";
import type { SearchResult } from "@/types";

interface SearchResultsProps {
  results: SearchResult[];
  fallback?: boolean;
}

export function SearchResults({ results, fallback }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="t-headline-sm" style={{ color: "var(--t-color-text-muted)" }}>No matches found</p>
        <p className="t-body-md mt-2" style={{ color: "var(--t-color-text-muted)" }}>
          Try adding more detail: mood, energy level, or reference a show
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-baseline mb-6">
        <h2 className="t-label-md" style={{ color: "var(--t-color-primary)" }}>
          AI Curated Matches
        </h2>
        <span className="t-body-sm" style={{ color: "var(--t-color-text-muted)" }}>
          {results.length} track{results.length !== 1 ? "s" : ""}
          {fallback ? " (keyword results)" : ""}
        </span>
      </div>

      <div className="space-y-4">
        {results.map((result) => (
          <TrackCard key={result.id} track={result} />
        ))}
      </div>
    </div>
  );
}
