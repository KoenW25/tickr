-- Block new pending bids on expired events
CREATE OR REPLACE FUNCTION public.prevent_bids_on_expired_events()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  resolved_event_id bigint;
  resolved_event_date timestamptz;
BEGIN
  -- Only enforce this for bids that are open/pending.
  IF NEW.status IS DISTINCT FROM 'pending' THEN
    RETURN NEW;
  END IF;

  resolved_event_id := NEW.event_id;

  IF resolved_event_id IS NULL AND NEW.ticket_id IS NOT NULL THEN
    SELECT t.event_id
      INTO resolved_event_id
    FROM public.tickets t
    WHERE t.id = NEW.ticket_id;
  END IF;

  IF resolved_event_id IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT e.date
    INTO resolved_event_date
  FROM public.events e
  WHERE e.id = resolved_event_id;

  IF resolved_event_date IS NOT NULL AND resolved_event_date::date < CURRENT_DATE THEN
    RAISE EXCEPTION 'Bieden op verlopen events is niet toegestaan.'
      USING ERRCODE = '23514';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS bids_prevent_expired_event_trg ON public.bids;
CREATE TRIGGER bids_prevent_expired_event_trg
BEFORE INSERT OR UPDATE OF status, event_id, ticket_id ON public.bids
FOR EACH ROW
EXECUTE FUNCTION public.prevent_bids_on_expired_events();
