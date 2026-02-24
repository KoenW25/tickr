-- Add ticket verification columns
ALTER TABLE public.tickets
  ADD COLUMN IF NOT EXISTS barcode_data text,
  ADD COLUMN IF NOT EXISTS verified text;

-- Ensure verification status only uses allowed values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'tickets_verified_allowed_chk'
  ) THEN
    ALTER TABLE public.tickets
      ADD CONSTRAINT tickets_verified_allowed_chk
      CHECK (verified IS NULL OR verified IN ('pending', 'verified', 'rejected'));
  END IF;
END
$$;

-- Normalize existing rows
UPDATE public.tickets
SET verified = COALESCE(verified, 'pending');

ALTER TABLE public.tickets
  ALTER COLUMN verified SET DEFAULT 'pending';

-- Block duplicate barcodes (ignore null/empty)
CREATE UNIQUE INDEX IF NOT EXISTS tickets_barcode_data_unique_idx
  ON public.tickets (barcode_data)
  WHERE barcode_data IS NOT NULL AND barcode_data <> '';

CREATE INDEX IF NOT EXISTS tickets_verified_idx
  ON public.tickets (verified);
