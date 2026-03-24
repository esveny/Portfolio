create table if not exists public.contact_submissions (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  message text not null,
  source text default 'portfolio_web',
  ip_address text,
  created_at timestamptz not null default now()
);

-- Recommended: enable row-level security for client access safety.
alter table public.contact_submissions enable row level security;

-- Inserts should happen through the secure API route using the service role key.
-- If you later allow direct inserts with anon key, create an explicit insert policy.