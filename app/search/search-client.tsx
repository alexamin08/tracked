"use client";

import { useActiveTheme } from "@/hooks/useActiveTheme";
import { SimpleSearchPage } from "@/components/simple/SimpleSearchPage";
import { WESearchPage } from "@/components/warm-editorial/WESearchPage";
import { PUSearchPage } from "@/components/precision-utility/PUSearchPage";
import { CinematicSearchPage } from "./cinematic-search";
import type { SearchResponse } from "@/types";

interface SearchPageClientProps {
  query: string;
  data: SearchResponse | null;
}

export function SearchPageClient({ query, data }: SearchPageClientProps) {
  const theme = useActiveTheme();

  switch (theme) {
    case "simple":
      return <SimpleSearchPage query={query} data={data} />;
    case "warm-editorial":
      return <WESearchPage query={query} data={data} />;
    case "precision-utility":
      return <PUSearchPage query={query} data={data} />;
    default:
      return <CinematicSearchPage query={query} data={data} />;
  }
}
