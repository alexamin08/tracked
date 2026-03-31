import { Header } from "@/components/layout/header";
import { SearchInput } from "@/components/search/search-input";
import { SearchResults } from "@/components/search/search-results";
import { AudioPlayer } from "@/components/audio/audio-player";
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
      <Header />

      <main className="pt-24 pb-24">
        {/* Search bar */}
        <section className="bg-gradient-to-br from-surface-dark via-surface-dark-mid to-surface-dark px-6 py-12 flex justify-center">
          <SearchInput initialQuery={query} />
        </section>

        {/* Results */}
        <section className="max-w-3xl mx-auto px-6 py-8">
          {data ? (
            <SearchResults
              results={data.results}
              fallback={data.fallback}
            />
          ) : query ? (
            <p className="text-center text-gray-500 py-16">
              Search is temporarily unavailable. Please try again.
            </p>
          ) : null}
        </section>
      </main>

      <AudioPlayer />
    </>
  );
}
