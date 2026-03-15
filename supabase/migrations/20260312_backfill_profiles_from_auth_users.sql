-- Backfill missing profile rows for existing auth users (e.g. OAuth users created before trigger rollout)

INSERT INTO public.profiles (user_id, email, full_name)
SELECT
  u.id::text AS user_id,
  COALESCE(u.email, '') AS email,
  COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name', '') AS full_name
FROM auth.users u
LEFT JOIN public.profiles p ON p.user_id::text = u.id::text
WHERE p.user_id IS NULL;
