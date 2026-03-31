/**
 * Data import script for Signature Tracks catalog
 * Usage: npx tsx scripts/import-csv.ts --file ./data/tracks.csv
 *
 * Expects CSV with columns: track_id, title, composer, description,
 * moods, genres, instruments, tempo_bpm, duration_sec, preview_url, full_url,
 * show_name, network, season, episode, scene_type, scene_description,
 * version_name, version_duration_sec, version_preview_url, version_full_url
 */

import fs from "fs";
import Papa from "papaparse";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import type { ImportRow } from "../types";

const BATCH_SIZE = 100;
const EMBEDDING_MODEL = "text-embedding-3-small";

function buildMetadataBlob(row: ImportRow): string {
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

async function main() {
  const fileArg = process.argv.find((a) => a.startsWith("--file="));
  const filePath = fileArg?.split("=")[1] ?? process.argv[process.argv.indexOf("--file") + 1];

  if (!filePath || !fs.existsSync(filePath)) {
    console.error("Usage: npx tsx scripts/import-csv.ts --file ./data/tracks.csv");
    process.exit(1);
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

  // Parse CSV
  const csvContent = fs.readFileSync(filePath, "utf-8");
  const { data: rows, errors } = Papa.parse<ImportRow>(csvContent, {
    header: true,
    skipEmptyLines: true,
  });

  if (errors.length > 0) {
    console.error("CSV parse errors:", errors.slice(0, 5));
  }

  // Validate required columns
  const requiredCols = ["track_id", "title", "composer"];
  const firstRow = rows[0];
  for (const col of requiredCols) {
    if (!(col in firstRow)) {
      console.error(`Missing required column: ${col}`);
      process.exit(1);
    }
  }

  console.log(`Parsed ${rows.length} rows from CSV`);

  let imported = 0;
  let embedded = 0;
  let withSceneDesc = 0;
  const totalBatches = Math.ceil(rows.length / BATCH_SIZE);

  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    const batch = rows.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;

    // Build metadata blobs
    const blobs = batch.map(buildMetadataBlob);

    // Embed batch with retry
    let embeddings: number[][] = [];
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await openai.embeddings.create({
          model: EMBEDDING_MODEL,
          input: blobs,
        });
        embeddings = response.data
          .sort((a, b) => a.index - b.index)
          .map((d) => d.embedding);
        break;
      } catch (err) {
        const waitMs = Math.min(1000 * Math.pow(2, attempt), 30000);
        console.warn(`Embedding attempt ${attempt + 1} failed, retrying in ${waitMs}ms...`);
        await new Promise((r) => setTimeout(r, waitMs));
        if (attempt === 2) {
          console.error("Embedding failed after 3 attempts, skipping batch");
        }
      }
    }

    // Upsert tracks
    const trackRecords = batch.map((row, j) => ({
      track_id: row.track_id,
      title: row.title,
      composer: row.composer,
      description: row.description || null,
      moods: row.moods ? row.moods.split(",").map((m) => m.trim()) : [],
      genres: row.genres ? row.genres.split(",").map((g) => g.trim()) : [],
      instruments: row.instruments ? row.instruments.split(",").map((i) => i.trim()) : [],
      tempo_bpm: row.tempo_bpm ? parseInt(row.tempo_bpm) : null,
      duration_sec: row.duration_sec ? parseInt(row.duration_sec) : null,
      metadata_blob: blobs[j],
      embedding: embeddings[j] ? JSON.stringify(embeddings[j]) : null,
      preview_url: row.preview_url || null,
      full_url: row.full_url || null,
    }));

    const { error: trackError } = await supabase
      .from("tracks")
      .upsert(trackRecords, { onConflict: "track_id" });

    if (trackError) {
      console.error(`Batch ${batchNum} track upsert error:`, trackError.message);
      continue;
    }

    // Get track UUIDs for foreign keys
    const trackIds = batch.map((r) => r.track_id);
    const { data: trackRows } = await supabase
      .from("tracks")
      .select("id, track_id")
      .in("track_id", trackIds);

    const idMap = new Map(trackRows?.map((t) => [t.track_id, t.id]) ?? []);

    // Upsert placements
    const placements = batch
      .filter((row) => row.show_name && idMap.has(row.track_id))
      .map((row) => ({
        track_id: idMap.get(row.track_id)!,
        show_name: row.show_name!,
        network: row.network || null,
        season: row.season || null,
        episode: row.episode || null,
        scene_type: row.scene_type || null,
        scene_description: row.scene_description || null,
      }));

    if (placements.length > 0) {
      await supabase.from("placements").upsert(placements);
    }

    // Upsert versions
    const versions = batch
      .filter((row) => row.version_name && idMap.has(row.track_id))
      .map((row) => ({
        track_id: idMap.get(row.track_id)!,
        version_name: row.version_name!,
        duration_sec: row.version_duration_sec ? parseInt(row.version_duration_sec) : null,
        preview_url: row.version_preview_url || null,
        full_url: row.version_full_url || null,
      }));

    if (versions.length > 0) {
      await supabase.from("versions").upsert(versions);
    }

    imported += batch.length;
    embedded += embeddings.length;
    withSceneDesc += batch.filter((r) => r.scene_description).length;

    console.log(`Batch ${batchNum}/${totalBatches} complete (${imported}/${rows.length})`);
  }

  // Data quality report
  const coverage = rows.length > 0 ? ((withSceneDesc / rows.length) * 100).toFixed(1) : "0";
  console.log("\n--- Import Complete ---");
  console.log(`Total rows: ${rows.length}`);
  console.log(`Tracks imported: ${imported}`);
  console.log(`Tracks embedded: ${embedded}`);
  console.log(`Scene descriptions: ${withSceneDesc} (${coverage}%)`);

  if (parseFloat(coverage) < 30) {
    console.warn(
      "\nWARNING: Scene description coverage is below 30%. " +
      "Search quality may be limited. Consider hybrid approach."
    );
  }
}

main().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
