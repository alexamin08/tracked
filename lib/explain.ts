import { getOpenAIClient } from "./openai";
import { EXPLANATION, SEARCH } from "./constants";
import type { SearchResult } from "@/types";

type TrackForExplanation = Omit<SearchResult, "explanation">;

export async function batchExplain(
  query: string,
  tracks: TrackForExplanation[]
): Promise<string[]> {
  if (tracks.length === 0) return [];

  const topTracks = tracks.slice(0, SEARCH.topResultsForExplanation);

  const tracksContext = topTracks
    .map((t, i) => {
      const placementInfo =
        t.placements.length > 0
          ? t.placements
              .map(
                (p) =>
                  `${p.showName}${p.sceneType ? ` (${p.sceneType})` : ""}`
              )
              .join(", ")
          : "No broadcast placements";
      return `Track ${i + 1}: "${t.title}" by ${t.composer}. ${t.description ?? ""}. Moods: ${t.moods.join(", ") || "N/A"}. Genres: ${t.genres.join(", ") || "N/A"}. Placements: ${placementInfo}.`;
    })
    .join("\n\n");

  const openai = getOpenAIClient();

  try {
    const response = await openai.chat.completions.create({
      model: EXPLANATION.model,
      max_tokens: EXPLANATION.maxTokens * topTracks.length,
      messages: [
        { role: "system", content: EXPLANATION.systemPrompt },
        {
          role: "user",
          content: `Scene description: "${query}"\n\n${tracksContext}\n\nProvide a 1-2 sentence explanation for each track. Format as:\nTrack 1: [explanation]\nTrack 2: [explanation]\n...`,
        },
      ],
    });

    const content = response.choices[0]?.message?.content ?? "";
    return parseExplanations(content, topTracks.length);
  } catch {
    // GPT-4o-mini error — return fallback explanations
    return topTracks.map((t) => {
      const mood = t.moods.length > 0 ? t.moods.slice(0, 2).join(", ") : "";
      const show =
        t.placements.length > 0
          ? `Featured on ${t.placements[0].showName}.`
          : "";
      return [mood, show].filter(Boolean).join(". ") || t.title;
    });
  }
}

function parseExplanations(content: string, count: number): string[] {
  const lines = content.split("\n").filter((l) => l.trim());
  const explanations: string[] = [];

  for (const line of lines) {
    const match = line.match(/^Track \d+:\s*(.+)/i);
    if (match) {
      explanations.push(match[1].trim().slice(0, 280));
    }
  }

  // Pad with empty strings if parsing missed some
  while (explanations.length < count) {
    explanations.push("");
  }

  return explanations.slice(0, count);
}
