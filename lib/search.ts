import { createServiceClient } from "./supabase/service";
import { embedText } from "./embeddings";
import { SEARCH } from "./constants";
import type { SearchResult } from "@/types";

interface RawMatch {
  id: string;
  track_id: string;
  title: string;
  composer: string;
  description: string | null;
  moods: string[];
  genres: string[];
  preview_url: string | null;
  album_name: string | null;
  similarity: number;
}

export async function searchTracks(
  query: string
): Promise<Omit<SearchResult, "explanation">[]> {
  const supabase = createServiceClient();

  let results: Omit<SearchResult, "explanation">[] = [];

  // Try vector search
  try {
    const embedding = await embedText(query);
    const { data: matches, error } = await supabase.rpc("match_tracks", {
      query_embedding: embedding,
      match_threshold: SEARCH.similarityThreshold,
      match_count: SEARCH.maxResults,
    });

    if (!error && matches && matches.length > 0) {
      // Filter by threshold in application code (RPC returns top-N for index efficiency)
      const filtered = (matches as RawMatch[]).filter(
        (m) => m.similarity >= SEARCH.similarityThreshold
      );
      if (filtered.length > 0) {
        results = await enrichWithPlacements(supabase, filtered);
      }
    }
  } catch (err) {
    console.error("Vector search failed, falling back to full-text:", err);
  }

  // Fallback: supplement with full-text if < 3 results above threshold
  if (results.length < 3) {
    const existingIds = new Set(results.map((r) => r.id));
    const { data: textResults } = await supabase
      .from("tracks")
      .select("id, track_id, title, composer, description, moods, genres, preview_url, album_name")
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .limit(SEARCH.maxResults - results.length);

    if (textResults) {
      const newResults = textResults
        .filter((r) => !existingIds.has(r.id))
        .map((r) => ({
          ...r,
          trackId: r.track_id,
          previewUrl: r.preview_url,
          similarity: 0,
          placements: [],
        }));
      const enriched = await enrichWithPlacements(
        supabase,
        newResults.map((r) => ({
          id: r.id,
          track_id: r.trackId,
          title: r.title,
          composer: r.composer,
          description: r.description,
          moods: r.moods ?? [],
          genres: r.genres ?? [],
          preview_url: r.previewUrl,
          album_name: (r as any).album_name ?? null,
          similarity: 0,
        }))
      );
      results = [...results, ...enriched];
    }
  }

  return results;
}

async function enrichWithPlacements(
  supabase: ReturnType<typeof createServiceClient>,
  matches: RawMatch[]
): Promise<Omit<SearchResult, "explanation">[]> {
  if (matches.length === 0) return [];

  const trackIds = matches.map((m) => m.id);
  const { data: placements } = await supabase
    .from("placements")
    .select("track_id, show_name, network, scene_type")
    .in("track_id", trackIds);

  const placementMap = new Map<
    string,
    { showName: string; network: string | null; sceneType: string | null }[]
  >();
  for (const p of placements ?? []) {
    const list = placementMap.get(p.track_id) ?? [];
    list.push({
      showName: p.show_name,
      network: p.network,
      sceneType: p.scene_type,
    });
    placementMap.set(p.track_id, list);
  }

  return matches.map((m) => ({
    id: m.id,
    trackId: m.track_id,
    title: m.title,
    composer: m.composer,
    description: m.description,
    moods: m.moods ?? [],
    genres: m.genres ?? [],
    albumName: m.album_name,
    previewUrl: m.preview_url,
    similarity: m.similarity,
    placements: placementMap.get(m.id) ?? [],
  }));
}
