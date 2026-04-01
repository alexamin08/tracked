/**
 * Import Signature Tracks catalog from Excel
 * Usage: npx tsx scripts/import-catalog.ts [--limit 100] [--skip-embeddings]
 *
 * Reads data/catalog.xlsx, separates masters (Version=Full) from alt versions,
 * inserts tracks + versions into Supabase, generates embeddings for masters.
 */

import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import Papa from "papaparse";
import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import path from "path";

const BATCH_SIZE = 50;
const EMBEDDING_MODEL = "text-embedding-3-small";
// Prefer CSV (pre-converted from xlsx), fall back to xlsx
const CSV_PATH = path.resolve("data/catalog.csv");
const XLSX_PATH = path.resolve("data/catalog.xlsx");

// Parse args
const limitArg = process.argv.find((a) => a.startsWith("--limit="));
const LIMIT = limitArg ? parseInt(limitArg.split("=")[1]) : Infinity;
const SKIP_EMBEDDINGS = process.argv.includes("--skip-embeddings");

interface CatalogRow {
  "SourceAudio ID": number;
  Title: string;
  "Title Only"?: string;
  "Writer 1 First Name"?: string;
  "Writer 1 Last Name"?: string;
  Descriptions?: string;
  Description?: string;
  Moods?: string;
  Genre?: string;
  "Sub Genre"?: string;
  Tempo?: string;
  "Has Vocals"?: string;
  Version?: string;
  "Parent Track"?: string;
  "Master Filename"?: string;
  Filename?: string;
  Keywords?: string;
  Styles?: string;
  "Master ID"?: number;
  "Cue Type"?: string;
  "Has MP3"?: string;
  "Has WAV"?: string;
}

function getTitle(row: CatalogRow): string {
  if (row["Title Only"] && row["Title Only"].trim()) {
    return row["Title Only"].trim();
  }
  // Fallback: clean the internal filename-style title
  let title = row.Title || "";
  // Remove "SIG " prefix and common suffixes
  title = title.replace(/^SIG\s+/i, "").replace(/\s+(FULL MIX|FULL)\s*/i, "");
  // Remove composer initials at end (2-3 uppercase letters)
  title = title.replace(/\s+[A-Z]{2,3}\s*$/, "");
  return title.trim() || row.Title;
}

function getComposer(row: CatalogRow): string {
  const first = row["Writer 1 First Name"]?.trim() || "";
  const last = row["Writer 1 Last Name"]?.trim() || "";
  return [first, last].filter(Boolean).join(" ") || "Signature Tracks";
}

function buildMetadataBlob(row: CatalogRow): string {
  const parts: string[] = [];

  const title = getTitle(row);
  const composer = getComposer(row);
  parts.push(`${title} by ${composer}.`);

  if (row.Descriptions) parts.push(row.Descriptions);
  if (row.Genre) parts.push(`Genre: ${row.Genre}.`);
  if (row["Sub Genre"]) parts.push(`Sub-genre: ${row["Sub Genre"]}.`);
  if (row.Moods) parts.push(`Moods: ${row.Moods}.`);
  if (row.Tempo) parts.push(`Tempo: ${row.Tempo}.`);
  if (row["Has Vocals"]) parts.push(`Vocals: ${row["Has Vocals"]}.`);

  return parts.join(" ");
}

function parseTags(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

async function main() {
  console.log("Reading CSV file...");
  const csvContent = fs.readFileSync(CSV_PATH, "utf-8");
  const { data: allRows } = Papa.parse<CatalogRow>(csvContent, {
    header: true,
    skipEmptyLines: true,
  });

  const rows = LIMIT < Infinity ? allRows.slice(0, LIMIT) : allRows;
  console.log(`Parsed ${rows.length} rows (limit: ${LIMIT === Infinity ? "none" : LIMIT})`);

  // Separate masters from alt versions
  const masters = rows.filter((r) => r.Version === "Full");
  const alts = rows.filter((r) => r.Version && r.Version !== "Full");

  console.log(`Masters (Full): ${masters.length}`);
  console.log(`Alt versions: ${alts.length}`);
  console.log("");

  // Connect to Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const openai = SKIP_EMBEDDINGS
    ? null
    : new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

  // Phase 1: Insert master tracks
  console.log("=== Phase 1: Inserting master tracks ===");
  let tracksInserted = 0;
  let trackErrors = 0;

  for (let i = 0; i < masters.length; i += BATCH_SIZE) {
    const batch = masters.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(masters.length / BATCH_SIZE);

    const trackRecords = batch.map((row) => {
      const genres = [row.Genre, row["Sub Genre"]]
        .filter(Boolean)
        .map((g) => g!.trim());

      return {
        track_id: String(row["SourceAudio ID"]),
        title: getTitle(row),
        composer: getComposer(row),
        description: row.Descriptions || null,
        moods: parseTags(row.Moods),
        genres,
        instruments: [] as string[],
        tempo_bpm: null,
        duration_sec: null,
        metadata_blob: buildMetadataBlob(row),
        embedding: null,
        preview_url: null,
        full_url: null,
      };
    });

    const { error } = await supabase
      .from("tracks")
      .upsert(trackRecords, { onConflict: "track_id" });

    if (error) {
      console.error(`  Batch ${batchNum}/${totalBatches} ERROR: ${error.message}`);
      trackErrors += batch.length;
    } else {
      tracksInserted += batch.length;
      console.log(`  Batch ${batchNum}/${totalBatches}: ${tracksInserted}/${masters.length} tracks inserted`);
    }
  }

  console.log(`\nTracks: ${tracksInserted} inserted, ${trackErrors} errors`);

  // Phase 2: Insert alt versions
  console.log("\n=== Phase 2: Inserting alt versions ===");
  let versionsInserted = 0;
  let versionsSkipped = 0;
  let versionErrors = 0;

  // Alt versions reference their parent via "Master ID" which matches the parent's "SourceAudio ID"
  const masterTrackIds = masters.map((m) => String(m["SourceAudio ID"]));

  // Get track UUIDs from Supabase for the master track_ids
  // Batch the query to avoid URL length limits
  const trackIdToUuid = new Map<string, string>();
  for (let i = 0; i < masterTrackIds.length; i += 200) {
    const batch = masterTrackIds.slice(i, i + 200);
    const { data: trackRows } = await supabase
      .from("tracks")
      .select("id, track_id")
      .in("track_id", batch);
    for (const t of trackRows || []) {
      trackIdToUuid.set(t.track_id, t.id);
    }
  }

  for (let i = 0; i < alts.length; i += BATCH_SIZE) {
    const batch = alts.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(alts.length / BATCH_SIZE);

    const versionRecords: {
      track_id: string;
      version_name: string;
      duration_sec: number | null;
      preview_url: string | null;
      full_url: string | null;
    }[] = [];

    for (const row of batch) {
      const masterId = row["Master ID"];
      if (!masterId) {
        versionsSkipped++;
        continue;
      }

      const parentUuid = trackIdToUuid.get(String(masterId));
      if (!parentUuid) {
        versionsSkipped++;
        continue;
      }

      versionRecords.push({
        track_id: parentUuid,
        version_name: row.Version || "Alt",
        duration_sec: null,
        preview_url: null,
        full_url: null,
      });
    }

    if (versionRecords.length > 0) {
      const { error } = await supabase.from("versions").insert(versionRecords);

      if (error) {
        console.error(`  Batch ${batchNum}/${totalBatches} ERROR: ${error.message}`);
        versionErrors += versionRecords.length;
      } else {
        versionsInserted += versionRecords.length;
        console.log(
          `  Batch ${batchNum}/${totalBatches}: ${versionsInserted} versions inserted (${versionsSkipped} skipped, no parent match)`
        );
      }
    } else {
      console.log(`  Batch ${batchNum}/${totalBatches}: all skipped (no parent match)`);
    }
  }

  console.log(
    `\nVersions: ${versionsInserted} inserted, ${versionsSkipped} skipped, ${versionErrors} errors`
  );

  // Phase 3: Generate embeddings for masters
  if (SKIP_EMBEDDINGS || !openai) {
    console.log("\n=== Phase 3: Skipped (--skip-embeddings) ===");
  } else {
    console.log("\n=== Phase 3: Generating embeddings ===");

    // Get all tracks that need embeddings (batch query to avoid URL limits)
    const toEmbed: { id: string; metadata_blob: string }[] = [];
    let offset = 0;
    const PAGE = 1000;
    while (true) {
      const { data: page } = await supabase
        .from("tracks")
        .select("id, metadata_blob")
        .is("embedding", null)
        .range(offset, offset + PAGE - 1);
      if (!page || page.length === 0) break;
      toEmbed.push(...page);
      offset += page.length;
      if (page.length < PAGE) break;
    }
    console.log(`Tracks needing embeddings: ${toEmbed.length}`);

    let embedded = 0;
    let embedErrors = 0;

    for (let i = 0; i < toEmbed.length; i += BATCH_SIZE) {
      const batch = toEmbed.slice(i, i + BATCH_SIZE);
      const batchNum = Math.floor(i / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(toEmbed.length / BATCH_SIZE);

      const blobs = batch.map((t) => t.metadata_blob);

      // Retry with backoff
      let embeddings: number[][] | null = null;
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
        } catch (err: any) {
          const waitMs = Math.min(1000 * Math.pow(2, attempt), 30000);
          console.warn(
            `  Embedding attempt ${attempt + 1} failed: ${err.message}. Retrying in ${waitMs}ms...`
          );
          await new Promise((r) => setTimeout(r, waitMs));
        }
      }

      if (!embeddings) {
        console.error(`  Batch ${batchNum}/${totalBatches} FAILED after 3 attempts`);
        embedErrors += batch.length;
        continue;
      }

      // Update each track with its embedding
      for (let j = 0; j < batch.length; j++) {
        const { error } = await supabase
          .from("tracks")
          .update({ embedding: JSON.stringify(embeddings[j]) })
          .eq("id", batch[j].id);

        if (error) {
          embedErrors++;
        } else {
          embedded++;
        }
      }

      console.log(
        `  Batch ${batchNum}/${totalBatches}: ${embedded}/${toEmbed.length} embedded`
      );
    }

    console.log(
      `\nEmbeddings: ${embedded} generated, ${embedErrors} errors`
    );
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("IMPORT SUMMARY");
  console.log("=".repeat(50));
  console.log(`Source: ${CSV_PATH}`);
  console.log(`Rows processed: ${rows.length}`);
  console.log(`Master tracks inserted: ${tracksInserted}`);
  console.log(`Alt versions inserted: ${versionsInserted}`);
  console.log(`Alt versions skipped (no parent): ${versionsSkipped}`);
  console.log(`Errors: tracks=${trackErrors}, versions=${versionErrors}`);

  // Data quality check
  const { count: descCount } = await supabase
    .from("tracks")
    .select("*", { count: "exact", head: true })
    .not("description", "is", null);

  const { count: totalTracks } = await supabase
    .from("tracks")
    .select("*", { count: "exact", head: true });

  const { count: embeddedCount } = await supabase
    .from("tracks")
    .select("*", { count: "exact", head: true })
    .not("embedding", "is", null);

  const { count: totalVersions } = await supabase
    .from("versions")
    .select("*", { count: "exact", head: true });

  console.log("");
  console.log("=== DATABASE STATE ===");
  console.log(`Total tracks in DB: ${totalTracks}`);
  console.log(`Total versions in DB: ${totalVersions}`);
  console.log(`Tracks with description: ${descCount}/${totalTracks} (${totalTracks ? Math.round(((descCount || 0) / totalTracks) * 100) : 0}%)`);
  console.log(`Tracks with embedding: ${embeddedCount}/${totalTracks} (${totalTracks ? Math.round(((embeddedCount || 0) / totalTracks) * 100) : 0}%)`);
}

main().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
