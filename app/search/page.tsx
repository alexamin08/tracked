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
      <main className="pt-24 pb-24" style={{ background: "var(--t-color-bg)" }}>
        {/* Search bar on surface-low */}
        <section
          className="px-6 py-12 flex justify-center relative overflow-hidden"
          style={{ background: "var(--t-color-surface-low)" }}
        >
          {/* Subtle glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "0",
              left: "50%",
              transform: "translateX(-50%)",
              width: "600px",
              height: "300px",
              background: `radial-gradient(ellipse at center, var(--t-color-primary) 0%, transparent 70%)`,
              opacity: "calc(var(--t-glow-opacity) * 0.5)",
            }}
          />
          <SearchInput initialQuery={query} />
        </section>

        {/* Results on bg canvas */}
        <section className="max-w-3xl mx-auto px-6 py-10">
          {data ? (
            <SearchResults results={data.results} fallback={data.fallback} />
          ) : query ? (
            <p className="text-center t-body-lg py-16" style={{ color: "var(--t-color-text-muted)" }}>
              Search is temporarily unavailable. Please try again.
            </p>
          ) : null}
        </section>
      </main>
      <AudioPlayer />
    </>
  );
}
