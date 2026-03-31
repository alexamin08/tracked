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
        <p className="text-gray-500 text-lg">No matches found</p>
        <p className="text-gray-400 text-sm mt-2">
          Try adding more detail: mood, energy level, or reference a show
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-baseline mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          {results.length} track{results.length !== 1 ? "s" : ""} matched
        </h2>
        {fallback && (
          <span className="text-xs text-gray-400">
            Showing keyword results
          </span>
        )}
        {!fallback && (
          <span className="text-xs text-gray-400">
            Sorted by scene relevance
          </span>
        )}
      </div>

      <div className="space-y-4">
        {results.map((result) => (
          <TrackCard key={result.id} track={result} />
        ))}
      </div>
    </div>
  );
}
