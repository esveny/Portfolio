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

drop policy if exists "Allow anonymous contact inserts" on public.contact_submissions;

create policy "Allow anonymous contact inserts"
on public.contact_submissions
for insert
to anon
with check (source = 'portfolio_web');