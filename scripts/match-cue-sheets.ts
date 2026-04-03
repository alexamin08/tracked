import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs";
import { createClient } from "@supabase/supabase-js";

const CSV_PATH = "/tmp/cue_sheet_cleaned.csv";
const OUTPUT_PATH = "/tmp/cue_sheet_matches.csv";

interface CueRow {
  coreName: string;
  show: string;
  network: string;
  episodeCount: string;
}

interface DbTrack {
  id: string;
  track_id: string;
  title: string;
}

function normalize(s: string): string {
  return s
    .toUpperCase()
    .replace(/^(A |AN |THE )/i, "")
    .replace(/[^A-Z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function main() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`File not found: ${CSV_PATH}`);
    process.exit(1);
  }

  // Parse cue sheet CSV
  const raw = fs.readFileSync(CSV_PATH, "utf-8");
  const lines = raw.split("\n").filter((l) => l.trim());

  // Detect if first line is a header
  const firstLine = lines[0];
  const hasHeader =
    firstLine.toLowerCase().includes("core_name") ||
    firstLine.toLowerCase().includes("show");
  const dataLines = hasHeader ? lines.slice(1) : lines;

  const cueRows: CueRow[] = [];
  for (const line of dataLines) {
    // Split on comma, but respect that show/network names might not have quotes
    const parts = line.split(",");
    if (parts.length < 4) continue;
    cueRows.push({
      coreName: parts[0].trim(),
      show: parts[1].trim(),
      network: parts[2].trim(),
      episodeCount: parts[3].trim(),
    });
  }

  console.log(`Read ${cueRows.length} cue sheet entries`);

  // Fetch all tracks from Supabase
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const allTracks: DbTrack[] = [];
  let offset = 0;
  const PAGE = 1000;
  while (true) {
    const { data, error } = await supabase
      .from("tracks")
      .select("id, track_id, title")
      .range(offset, offset + PAGE - 1);

    if (error) {
      console.error("Supabase error:", error.message);
      break;
    }
    if (!data || data.length === 0) break;
    allTracks.push(...data);
    offset += data.length;
    if (data.length < PAGE) break;
  }

  console.log(`Fetched ${allTracks.length} tracks from DB\n`);

  // Build lookup maps
  const byExact = new Map<string, DbTrack>();
  const byNormalized = new Map<string, DbTrack>();
  const allTracksList: DbTrack[] = [];

  for (const t of allTracks) {
    const upper = t.title.toUpperCase();
    byExact.set(upper, t);
    byNormalized.set(normalize(t.title), t);
    allTracksList.push(t);
  }

  // Match
  let exactMatches = 0;
  let containsMatches = 0;
  let normalizedMatches = 0;
  let unmatched = 0;
  const unmatchedSamples: string[] = [];

  const outputLines: string[] = [
    "track_id,db_title,show,network,episode_count,match_type",
  ];

  for (const cue of cueRows) {
    const cueUpper = cue.coreName.toUpperCase();
    const cueNorm = normalize(cue.coreName);

    // 1. Exact match
    const exact = byExact.get(cueUpper);
    if (exact) {
      exactMatches++;
      outputLines.push(
        `${exact.track_id},"${exact.title.replace(/"/g, '""')}","${cue.show.replace(/"/g, '""')}","${cue.network.replace(/"/g, '""')}",${cue.episodeCount},exact`
      );
      continue;
    }

    // 2. Contains match
    let containsMatch: DbTrack | null = null;
    for (const t of allTracksList) {
      const tUpper = t.title.toUpperCase();
      if (tUpper.includes(cueUpper) || cueUpper.includes(tUpper)) {
        if (
          tUpper.length >= 3 &&
          cueUpper.length >= 3
        ) {
          containsMatch = t;
          break;
        }
      }
    }

    if (containsMatch) {
      containsMatches++;
      outputLines.push(
        `${containsMatch.track_id},"${containsMatch.title.replace(/"/g, '""')}","${cue.show.replace(/"/g, '""')}","${cue.network.replace(/"/g, '""')}",${cue.episodeCount},contains`
      );
      continue;
    }

    // 3. Normalized match
    const normMatch = byNormalized.get(cueNorm);
    if (normMatch && cueNorm.length >= 3) {
      normalizedMatches++;
      outputLines.push(
        `${normMatch.track_id},"${normMatch.title.replace(/"/g, '""')}","${cue.show.replace(/"/g, '""')}","${cue.network.replace(/"/g, '""')}",${cue.episodeCount},normalized`
      );
      continue;
    }

    // No match
    unmatched++;
    if (unmatchedSamples.length < 20) {
      unmatchedSamples.push(cue.coreName);
    }
  }

  // Write output
  fs.writeFileSync(OUTPUT_PATH, outputLines.join("\n") + "\n");

  const totalMatched = exactMatches + containsMatches + normalizedMatches;

  console.log("=== MATCH RESULTS ===");
  console.log(`Total cue sheet tracks: ${cueRows.length}`);
  console.log(`Exact matches:         ${exactMatches}`);
  console.log(`Contains matches:      ${containsMatches}`);
  console.log(`Normalized matches:    ${normalizedMatches}`);
  console.log(`Total matched:         ${totalMatched} (${Math.round((totalMatched / cueRows.length) * 100)}%)`);
  console.log(`Unmatched:             ${unmatched}`);
  console.log(`\nOutput written to: ${OUTPUT_PATH}`);

  if (unmatchedSamples.length > 0) {
    console.log(`\nSample unmatched names (${unmatchedSamples.length}):`);
    unmatchedSamples.forEach((n) => console.log(`  - ${n}`));
  }
}

main().catch((err) => {
  console.error("Match failed:", err);
  process.exit(1);
});
