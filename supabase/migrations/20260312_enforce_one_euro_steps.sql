-- Update bid and ask tick size to €1.00

CREATE OR REPLACE FUNCTION public.enforce_bids_half_euro_step()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  bid_cents integer;
BEGIN
  IF NEW.status = 'pending' AND NEW.bid_price IS NOT NULL THEN
    bid_cents := round(NEW.bid_price * 100);
    IF bid_cents <= 0 OR mod(bid_cents, 100) <> 0 THEN
      RAISE EXCEPTION 'Biedingen moeten in stappen van €1,00 en groter dan €0 zijn.'
        USING ERRCODE = '23514';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.enforce_tickets_half_euro_step()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  ask_cents integer;
BEGIN
  IF NEW.ask_price IS NOT NULL THEN
    ask_cents := round(NEW.ask_price * 100);
    IF ask_cents <= 0 OR mod(ask_cents, 100) <> 0 THEN
      RAISE EXCEPTION 'Vraagprijzen moeten in stappen van €1,00 en groter dan €0 zijn.'
        USING ERRCODE = '23514';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
