-- Leads from the landing page: email entered in the hero before booking the Erstgespräch.
-- Anonymous visitors may insert; nobody reads through the API (dashboard / service role only).

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  name text,
  branche text,
  ref text,
  page_path text
);

alter table public.leads enable row level security;

create policy "landing page may insert leads"
  on public.leads
  for insert
  to anon
  with check (true);

-- Column-level: anon can only write, never read, the table.
revoke all on public.leads from anon;
grant insert on public.leads to anon;
