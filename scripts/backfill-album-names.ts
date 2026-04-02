import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs";
import { createClient } from "@supabase/supabase-js";

const CSV_PATH = "/tmp/track_albums.csv";

async function main() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const raw = fs.readFileSync(CSV_PATH, "utf-8");
  const lines = raw.split("\n").filter((l) => l.trim());
  console.log(`Read ${lines.length} rows from ${CSV_PATH}`);

  const albumToIds = new Map<string, string[]>();
  for (const line of lines) {
    const commaIdx = line.indexOf(",");
    if (commaIdx === -1) continue;
    const sourceaudioId = line.slice(0, commaIdx).trim();
    const albumName = line.slice(commaIdx + 1).trim();
    if (!sourceaudioId || !albumName) continue;
    const ids = albumToIds.get(albumName) ?? [];
    ids.push(sourceaudioId);
    albumToIds.set(albumName, ids);
  }

  console.log(`Grouped into ${albumToIds.size} albums\n`);

  let albumIdx = 0;
  let errors = 0;

  for (const [albumName, ids] of Array.from(albumToIds.entries())) {
    albumIdx++;
    for (let i = 0; i < ids.length; i += 500) {
      const batch = ids.slice(i, i + 500);
      const { error } = await supabase
        .from("tracks")
        .update({ album_name: albumName })
        .in("track_id", batch);

      if (error) {
        console.error(`Error on '${albumName}': ${error.message}`);
        errors++;
      }
    }

    if (albumIdx % 50 === 0 || albumIdx === albumToIds.size) {
      console.log(`Processed ${albumIdx}/${albumToIds.size} albums...`);
    }
  }

  const { count } = await supabase
    .from("tracks")
    .select("id", { count: "exact", head: true })
    .not("album_name", "is", null);

  console.log(`\nDone. ${count} tracks now have album_name set. ${errors} errors.`);
}

main().catch((err) => {
  console.error("Backfill failed:", err);
  process.exit(1);
});
