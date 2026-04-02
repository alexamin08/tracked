-- Add album_name column to tracks table
ALTER TABLE tracks ADD COLUMN album_name TEXT;
CREATE INDEX idx_tracks_album_name ON tracks (album_name);

-- Recreate match_tracks to include album_name in results
DROP FUNCTION IF EXISTS match_tracks(vector, double precision, integer);
CREATE OR REPLACE FUNCTION match_tracks(
  query_embedding vector(1536),
  match_threshold FLOAT DEFAULT 0.6,
  match_count INT DEFAULT 10
)
RETURNS TABLE (
  id          UUID,
  track_id    TEXT,
  title       TEXT,
  composer    TEXT,
  description TEXT,
  moods       TEXT[],
  genres      TEXT[],
  preview_url TEXT,
  album_name  TEXT,
  similarity  FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.id, t.track_id, t.title, t.composer, t.description,
    t.moods, t.genres, t.preview_url, t.album_name,
    1 - (t.embedding <=> query_embedding) AS similarity
  FROM tracks t
  WHERE t.embedding IS NOT NULL
    AND 1 - (t.embedding <=> query_embedding) > match_threshold
  ORDER BY t.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
