"use client";

import { EditorialResultsLayout } from "./EditorialResultsLayout";
import type { SearchResult } from "@/types";

interface Props {
  collectionName: string;
  tracks: SearchResult[];
}

export function EditorialCollectionPage({ collectionName, tracks }: Props) {
  return (
    <EditorialResultsLayout
      initialQuery={collectionName}
      tracks={tracks}
      totalCount={tracks.length}
    />
  );
}
