/** Convert album name to URL-safe slug */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[&]/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Smart title case for display. Handles music industry conventions:
 * - Title cases most words
 * - Keeps short conjunctions/prepositions lowercase (a, an, the, and, or, of, in, on, at, to, for, with, vs, by)
 * - Preserves known acronyms (EDM, DJ, R&B, BPM, TV, MTV, VH1, HBO, EP, LP, MIX)
 * - Always capitalizes first and last word
 * - Handles "WORD - WORD" separator patterns
 */
export function displayName(text: string | null | undefined): string {
  if (!text) return "";

  const lowercase = new Set(["a", "an", "the", "and", "or", "of", "in", "on", "at", "to", "for", "with", "vs", "by", "nor", "but", "so", "yet"]);
  const acronyms = new Set(["edm", "dj", "r&b", "bpm", "tv", "mtv", "vh1", "hbo", "ep", "lp", "mix", "ii", "iii", "iv", "usa", "uk", "nyc", "la"]);

  return text
    .toLowerCase()
    .split(/(\s+[-–—&]\s+|\s+)/)
    .map((segment, i, arr) => {
      if (/^[\s\-–—&]+$/.test(segment)) return segment;

      return segment.split(" ").map((word, wi, warr) => {
        const cleanWord = word.replace(/[^a-z0-9&]/g, "");
        if (acronyms.has(cleanWord)) return word.toUpperCase();

        const isFirst = i === 0 && wi === 0;
        const isLast = i === arr.length - 1 && wi === warr.length - 1;

        if (!isFirst && !isLast && lowercase.has(cleanWord)) return word;

        return word.charAt(0).toUpperCase() + word.slice(1);
      }).join(" ");
    })
    .join("");
}
