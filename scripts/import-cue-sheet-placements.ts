import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs";
import { createClient } from "@supabase/supabase-js";

const CSV_PATH = "/tmp/cue_sheet_matches.csv";

interface MatchRow {
  trackId: string;
  dbTitle: string;
  show: string;
  network: string;
  episodeCount: string;
  matchType: string;
}

async function main() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`File not found: ${CSV_PATH}`);
    process.exit(1);
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Parse CSV
  const raw = fs.readFileSync(CSV_PATH, "utf-8");
  const lines = raw.split("\n").filter((l) => l.trim());

  // Skip header
  const dataLines = lines.slice(1);
  const rows: MatchRow[] = [];

  for (const line of dataLines) {
    // CSV has quoted fields — parse carefully
    const parts: string[] = [];
    let current = "";
    let inQuotes = false;
    for (const ch of line) {
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        parts.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    parts.push(current.trim());

    if (parts.length < 6) continue;
    rows.push({
      trackId: parts[0],
      dbTitle: parts[1],
      show: parts[2],
      network: parts[3],
      episodeCount: parts[4],
      matchType: parts[5],
    });
  }

  console.log(`Read ${rows.length} matched rows from ${CSV_PATH}`);

  // Look up track UUIDs in batches
  const sourceIds = Array.from(new Set(rows.map((r) => r.trackId)));
  const idToUuid = new Map<string, string>();

  for (let i = 0; i < sourceIds.length; i += 500) {
    const batch = sourceIds.slice(i, i + 500);
    const { data } = await supabase
      .from("tracks")
      .select("id, track_id")
      .in("track_id", batch);

    for (const t of data ?? []) {
      idToUuid.set(t.track_id, t.id);
    }
  }

  console.log(`Resolved ${idToUuid.size} track UUIDs`);

  // Fetch existing placements to skip duplicates
  const existingKeys = new Set<string>();
  let offset = 0;
  while (true) {
    const { data } = await supabase
      .from("placements")
      .select("track_id, show_name")
      .range(offset, offset + 999);

    if (!data || data.length === 0) break;
    for (const p of data) {
      existingKeys.add(`${p.track_id}|${p.show_name}`);
    }
    offset += data.length;
    if (data.length < 1000) break;
  }

  console.log(`${existingKeys.size} existing placements loaded for dedup`);

  // Insert placements
  let inserted = 0;
  let skippedNoUuid = 0;
  let skippedDupe = 0;
  let errors = 0;

  const toInsert: { track_id: string; show_name: string; network: string }[] = [];

  for (const row of rows) {
    const uuid = idToUuid.get(row.trackId);
    if (!uuid) {
      skippedNoUuid++;
      continue;
    }

    const key = `${uuid}|${row.show}`;
    if (existingKeys.has(key)) {
      skippedDupe++;
      continue;
    }

    existingKeys.add(key);
    toInsert.push({
      track_id: uuid,
      show_name: row.show,
      network: row.network,
    });
  }

  // Batch insert
  for (let i = 0; i < toInsert.length; i += 200) {
    const batch = toInsert.slice(i, i + 200);
    const { error } = await supabase.from("placements").insert(batch);

    if (error) {
      console.error(`Insert error at batch ${Math.floor(i / 200) + 1}: ${error.message}`);
      errors += batch.length;
    } else {
      inserted += batch.length;
    }

    if ((i + 200) % 1000 === 0 || i + 200 >= toInsert.length) {
      console.log(`Inserted ${inserted}/${toInsert.length} placements...`);
    }
  }

  console.log(`\n=== RESULTS ===`);
  console.log(`Total matched rows:  ${rows.length}`);
  console.log(`Placements inserted: ${inserted}`);
  console.log(`Skipped (no UUID):   ${skippedNoUuid}`);
  console.log(`Skipped (duplicate): ${skippedDupe}`);
  console.log(`Errors:              ${errors}`);
}

main().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
