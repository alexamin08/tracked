"use client";

import { PrecisionResultsLayout } from "./PrecisionResultsLayout";
import type { SearchResult } from "@/types";

interface Props {
  collectionName: string;
  tracks: SearchResult[];
}

export function PrecisionCollectionPage({ collectionName, tracks }: Props) {
  return (
    <PrecisionResultsLayout
      initialQuery={collectionName}
      tracks={tracks}
      totalCount={tracks.length}
    />
  );
}
