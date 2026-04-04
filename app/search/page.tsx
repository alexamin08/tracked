import { TopNav } from "@/components/nav/TopNav";
import { FloatingPlayer } from "@/components/player/FloatingPlayer";
import { SearchPageClient } from "./search-client";
import type { SearchResponse } from "@/types";
import { SEARCH } from "@/lib/constants";

async function fetchResults(query: string): Promise<SearchResponse | null> {
  if (!query || query.length < SEARCH.minQueryLength) return null;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q ?? "";
  const data = await fetchResults(query);

  return (
    <>
      <TopNav />
      <SearchPageClient query={query} data={data} />
      <FloatingPlayer />
    </>
  );
}
