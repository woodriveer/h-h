-- Enable UUID extension (usually already enabled in Supabase)
create extension if not exists "pgcrypto";

-- ──────────────────────────────────────────────
-- profiles: one row per auth.users row
-- ──────────────────────────────────────────────
create table if not exists public.profiles (
  id         uuid        primary key references auth.users(id) on delete cascade,
  nickname   text        unique not null,
  full_name  text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Anyone can read any profile (for friend search)
create policy "profiles: public read"
  on public.profiles for select
  using (true);

-- Users can only insert/update their own profile
create policy "profiles: own write"
  on public.profiles for insert
  with check (id = auth.uid());

create policy "profiles: own update"
  on public.profiles for update
  using (id = auth.uid());

-- ──────────────────────────────────────────────
-- game_results: one row per completed game
-- ──────────────────────────────────────────────
create table if not exists public.game_results (
  id            uuid        primary key default gen_random_uuid(),
  user_id       uuid        not null references auth.users(id) on delete cascade,
  ending_type   text        not null check (ending_type in ('good', 'bad')),
  ending_title  text        not null,
  path          jsonb       not null,
  completed_at  timestamptz not null default now()
);

alter table public.game_results enable row level security;

-- Users can read their own results, and results of accepted friends
create policy "game_results: own read"
  on public.game_results for select
  using (
    auth.uid() = user_id
    or exists (
      select 1 from public.friendships f
      where f.status = 'accepted'
        and (
          (f.requester_id = auth.uid() and f.addressee_id = user_id)
          or (f.addressee_id = auth.uid() and f.requester_id = user_id)
        )
    )
  );

create policy "game_results: own insert"
  on public.game_results for insert
  with check (auth.uid() = user_id);

-- ──────────────────────────────────────────────
-- friendships
-- ──────────────────────────────────────────────
create table if not exists public.friendships (
  id           uuid        primary key default gen_random_uuid(),
  requester_id uuid        not null references auth.users(id) on delete cascade,
  addressee_id uuid        not null references auth.users(id) on delete cascade,
  status       text        not null default 'pending'
                           check (status in ('pending', 'accepted', 'declined')),
  created_at   timestamptz not null default now(),
  unique (requester_id, addressee_id)
);

alter table public.friendships enable row level security;

-- Requester and addressee can both read the row
create policy "friendships: participants read"
  on public.friendships for select
  using (auth.uid() = requester_id or auth.uid() = addressee_id);

-- Only requester can create
create policy "friendships: requester insert"
  on public.friendships for insert
  with check (auth.uid() = requester_id);

-- Only addressee can update status (accept / decline)
create policy "friendships: addressee update"
  on public.friendships for update
  using (auth.uid() = addressee_id);

-- ──────────────────────────────────────────────
-- Trigger: auto-create profile on signup
-- ──────────────────────────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, nickname, full_name, avatar_url)
  values (
    new.id,
    -- Default nickname: part before @ in email
    split_part(new.email, '@', 1),
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ──────────────────────────────────────────────
-- Helper view: friends feed
-- Returns game_results for all accepted friends of the current user
-- ──────────────────────────────────────────────
create or replace view public.friends_feed as
  select
    gr.*,
    p.nickname,
    p.full_name,
    p.avatar_url
  from public.game_results gr
  join public.profiles p on p.id = gr.user_id
  where exists (
    select 1 from public.friendships f
    where f.status = 'accepted'
      and (
        (f.requester_id = auth.uid() and f.addressee_id = gr.user_id)
        or (f.addressee_id = auth.uid() and f.requester_id = gr.user_id)
      )
  );
