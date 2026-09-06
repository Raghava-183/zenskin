-- ═══════════════════════════════════════════════════════════════
--  Zenskin — order storage
--
--  HOW TO RUN THIS:
--   1. Go to supabase.com and create a free project.
--   2. Open the project → SQL Editor → New query.
--   3. Paste this whole file in and press Run.
--   4. Orders will then show up under Table Editor → orders.
-- ═══════════════════════════════════════════════════════════════

-- Human-readable order numbers: ZS-01001, ZS-01002, ...
create sequence if not exists zenskin_order_seq start 1001;

create table if not exists public.orders (
  id             uuid primary key default gen_random_uuid(),

  -- What the customer quotes back to you on WhatsApp.
  reference      text not null unique
                 default ('ZS-' || lpad(nextval('zenskin_order_seq')::text, 5, '0')),

  qty            integer not null check (qty > 0 and qty <= 99),
  unit_price     numeric(10,2) not null,
  total          numeric(10,2) not null,

  customer_name  text,
  delivery_area  text,
  phone          text,

  -- Move an order along as you pack and ship it.
  status         text not null default 'new'
                 check (status in ('new','confirmed','packed','shipped','delivered','cancelled')),

  -- 'web' today. Room for 'instagram', 'counter', 'phone' later.
  source         text not null default 'web',

  -- Your own private notes. Never shown on the site.
  notes          text,

  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Newest orders first, which is how you will always read this table.
create index if not exists orders_created_at_idx
  on public.orders (created_at desc);

create index if not exists orders_status_idx
  on public.orders (status)
  where status in ('new', 'confirmed', 'packed');

-- Keep updated_at honest.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists orders_touch_updated_at on public.orders;
create trigger orders_touch_updated_at
  before update on public.orders
  for each row execute function public.touch_updated_at();

-- ── Security ──────────────────────────────────────────────────
-- RLS on with NO policies means: the public anon key can neither
-- read nor write this table. Only the service-role key (which lives
-- in the server environment and never reaches a browser) can touch
-- it. That is deliberate — customer names and phone numbers are in
-- here and must not be readable by anyone who opens the site.
alter table public.orders enable row level security;

-- ── A view for your own eyes ──────────────────────────────────
-- Open this in the SQL Editor to see what still needs packing.
create or replace view public.orders_to_pack as
  select reference,
         created_at at time zone 'Asia/Kolkata' as placed_at_ist,
         qty,
         total,
         customer_name,
         delivery_area,
         phone,
         status
  from public.orders
  where status in ('new', 'confirmed')
  order by created_at asc;
