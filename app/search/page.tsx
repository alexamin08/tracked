import { TopNav } from "@/components/nav/TopNav";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";
import { SearchPageClient } from "./search-client";
import { searchTracks } from "@/lib/search";
import { batchExplain } from "@/lib/explain";
import { SEARCH } from "@/lib/constants";
import type { SearchResponse } from "@/types";

async function getResults(query: string): Promise<SearchResponse | null> {
  if (!query || query.length < SEARCH.minQueryLength) return null;

  try {
    const results = await searchTracks(query);
    const fallback = results.length > 0 && results[0].similarity === 0;

    const explanations = await batchExplain(query, results);
    const resultsWithExplanations = results.map((r, i) => ({
      ...r,
      explanation: explanations[i] ?? "",
    }));

    return {
      results: resultsWithExplanations,
      sessionId: "",
      fallback,
    };
  } catch (error) {
    console.error("Search error:", error);
    return null;
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q ?? "";
  const data = await getResults(query);

  return (
    <>
      <TopNav />
      <SearchPageClient query={query} data={data} />
      <FloatingPlayer />
    </>
  );
}
