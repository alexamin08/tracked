import { getOpenAIClient } from "./openai";
import { EMBEDDING } from "./constants";
import type { ImportRow } from "@/types";

export async function embedText(text: string): Promise<number[]> {
  const openai = getOpenAIClient();
  const response = await openai.embeddings.create({
    model: EMBEDDING.model,
    input: text,
  });
  const embedding = response.data[0].embedding;
  if (embedding.length !== EMBEDDING.dimensions) {
    throw new Error(
      `Embedding dimension mismatch: expected ${EMBEDDING.dimensions}, got ${embedding.length}`
    );
  }
  return embedding;
}

export async function embedBatch(texts: string[]): Promise<number[][]> {
  const openai = getOpenAIClient();
  const response = await openai.embeddings.create({
    model: EMBEDDING.model,
    input: texts,
  });
  return response.data
    .sort((a, b) => a.index - b.index)
    .map((d) => d.embedding);
}

export function buildMetadataBlob(
  row: Pick<
    ImportRow,
    | "title"
    | "composer"
    | "description"
    | "moods"
    | "genres"
    | "instruments"
    | "show_name"
    | "season"
    | "episode"
    | "scene_type"
    | "scene_description"
  >
): string {
  const parts: string[] = [];
  parts.push(`${row.title} by ${row.composer}.`);
  if (row.description) parts.push(row.description);
  if (row.moods) parts.push(`Mood: ${row.moods}.`);
  if (row.genres) parts.push(`Genre: ${row.genres}.`);
  if (row.instruments) parts.push(`Instruments: ${row.instruments}.`);
  if (row.show_name) {
    let placement = `Featured on ${row.show_name}`;
    if (row.season) placement += ` S${row.season}`;
    if (row.episode) placement += `E${row.episode}`;
    placement += ".";
    parts.push(placement);
  }
  if (row.scene_type) parts.push(`Scene type: ${row.scene_type}.`);
  if (row.scene_description) parts.push(`Scene: ${row.scene_description}`);
  return parts.join(" ");
}
