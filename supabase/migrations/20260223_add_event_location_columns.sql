-- Add structured location columns for events
ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS venue_name text,
  ADD COLUMN IF NOT EXISTS city text,
  ADD COLUMN IF NOT EXISTS country_code text;

-- Keep country codes standardized (ISO alpha-2 style)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'events_country_code_len_chk'
  ) THEN
    ALTER TABLE public.events
      ADD CONSTRAINT events_country_code_len_chk
      CHECK (country_code IS NULL OR char_length(country_code) = 2);
  END IF;
END
$$;

-- Backfill city and venue_name from legacy venue values shaped like "City - Venue"
UPDATE public.events
SET
  city = NULLIF(trim(split_part(venue, '-', 1)), ''),
  venue_name = NULLIF(trim(split_part(venue, '-', 2)), '')
WHERE venue IS NOT NULL
  AND position('-' in venue) > 0
  AND (city IS NULL OR venue_name IS NULL);

-- If venue had a single value, use it as venue_name when empty
UPDATE public.events
SET venue_name = NULLIF(trim(venue), '')
WHERE venue IS NOT NULL
  AND venue_name IS NULL;

-- Normalize existing country codes to uppercase
UPDATE public.events
SET country_code = upper(country_code)
WHERE country_code IS NOT NULL;

-- Useful indexes for search/filtering
CREATE INDEX IF NOT EXISTS events_city_idx ON public.events (city);
CREATE INDEX IF NOT EXISTS events_country_code_idx ON public.events (country_code);
CREATE INDEX IF NOT EXISTS events_country_city_idx ON public.events (country_code, city);
