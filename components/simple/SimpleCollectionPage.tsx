"use client";

import { SimpleResultsLayout } from "./SimpleResultsLayout";
import type { SearchResult } from "@/types";

interface SimpleCollectionPageProps {
  collectionName: string;
  tracks: SearchResult[];
}

export function SimpleCollectionPage({ collectionName, tracks }: SimpleCollectionPageProps) {
  return (
    <SimpleResultsLayout
      initialQuery={collectionName}
      tracks={tracks}
      totalCount={tracks.length}
    />
  );
}
