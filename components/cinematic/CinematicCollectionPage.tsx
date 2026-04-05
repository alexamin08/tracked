"use client";

import { CinematicResultsLayout } from "./CinematicResultsLayout";
import type { SearchResult } from "@/types";

interface Props {
  collectionName: string;
  tracks: SearchResult[];
}

export function CinematicCollectionPage({ collectionName, tracks }: Props) {
  return (
    <CinematicResultsLayout
      initialQuery={collectionName}
      tracks={tracks}
      totalCount={tracks.length}
    />
  );
}
