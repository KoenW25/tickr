-- Enforce €0.50 tick size for bid and ask prices

CREATE OR REPLACE FUNCTION public.enforce_bids_half_euro_step()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  bid_cents integer;
BEGIN
  -- Only validate open bids.
  IF NEW.status = 'pending' AND NEW.bid_price IS NOT NULL THEN
    bid_cents := round(NEW.bid_price * 100);
    IF bid_cents <= 0 OR mod(bid_cents, 50) <> 0 THEN
      RAISE EXCEPTION 'Biedingen moeten in stappen van €0,50 en groter dan €0 zijn.'
        USING ERRCODE = '23514';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS bids_enforce_half_euro_step_trg ON public.bids;
CREATE TRIGGER bids_enforce_half_euro_step_trg
BEFORE INSERT OR UPDATE OF bid_price, status ON public.bids
FOR EACH ROW
EXECUTE FUNCTION public.enforce_bids_half_euro_step();

CREATE OR REPLACE FUNCTION public.enforce_tickets_half_euro_step()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  ask_cents integer;
BEGIN
  -- Ask price can be NULL before listing.
  IF NEW.ask_price IS NOT NULL THEN
    ask_cents := round(NEW.ask_price * 100);
    IF ask_cents <= 0 OR mod(ask_cents, 50) <> 0 THEN
      RAISE EXCEPTION 'Vraagprijzen moeten in stappen van €0,50 en groter dan €0 zijn.'
        USING ERRCODE = '23514';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS tickets_enforce_half_euro_step_trg ON public.tickets;
CREATE TRIGGER tickets_enforce_half_euro_step_trg
BEFORE INSERT OR UPDATE OF ask_price ON public.tickets
FOR EACH ROW
EXECUTE FUNCTION public.enforce_tickets_half_euro_step();
