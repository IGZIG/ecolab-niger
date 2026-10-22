-- Ecolab — schéma Supabase de départ
-- À exécuter dans Supabase > SQL Editor, après vérification.
-- Chaque école est isolée : toutes les tables métier sont protégées par RLS.

create extension if not exists pgcrypto;

create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.school_members (
  school_id uuid not null references public.schools(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin','staff','teacher')),
  created_at timestamptz not null default now(),
  primary key (school_id, user_id)
);

create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  name text not null,
  class_name text not null default '',
  gender text not null default '',
  parent_name text not null default '',
  phone text not null default '',
  annual_fee integer not null default 0 check (annual_fee >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists students_school_id_idx on public.students(school_id);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  amount integer not null check (amount > 0),
  paid_on date not null default current_date,
  method text not null default 'Espèces',
  created_at timestamptz not null default now()
);
create index if not exists payments_school_student_idx on public.payments(school_id, student_id);

create table if not exists public.attendance (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  student_id uuid not null references public.students(id) on delete cascade,
  attendance_date date not null default current_date,
  present boolean not null default true,
  created_at timestamptz not null default now(),
  unique (student_id, attendance_date)
);
create index if not exists attendance_school_date_idx on public.attendance(school_id, attendance_date);

-- Fonction d'aide RLS : évite la récursion entre politiques de school_members.
create or replace function public.is_ecolab_member(target_school uuid)
returns boolean language sql stable security definer
set search_path = '' as $$
  select exists (
    select 1 from public.school_members sm
    where sm.school_id = target_school and sm.user_id = (select auth.uid())
  );
$$;
revoke all on function public.is_ecolab_member(uuid) from public;
grant execute on function public.is_ecolab_member(uuid) to authenticated;

alter table public.schools enable row level security;
alter table public.school_members enable row level security;
alter table public.students enable row level security;
alter table public.payments enable row level security;
alter table public.attendance enable row level security;

drop policy if exists "school members can read school" on public.schools;
create policy "school members can read school" on public.schools for select to authenticated
using (owner_id = (select auth.uid()) or public.is_ecolab_member(id));
drop policy if exists "authenticated users create own school" on public.schools;
create policy "authenticated users create own school" on public.schools for insert to authenticated
with check (owner_id = (select auth.uid()));
drop policy if exists "school owner updates school" on public.schools;
create policy "school owner updates school" on public.schools for update to authenticated
using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));

drop policy if exists "members read memberships" on public.school_members;
create policy "members read memberships" on public.school_members for select to authenticated
using (user_id = (select auth.uid()) or public.is_ecolab_member(school_id));
drop policy if exists "owner adds school members" on public.school_members;
create policy "owner adds school members" on public.school_members for insert to authenticated
with check (
  exists (select 1 from public.schools s where s.id = school_id and s.owner_id = (select auth.uid()))
  or (user_id = (select auth.uid()) and exists (select 1 from public.schools s where s.id = school_id and s.owner_id = (select auth.uid())))
);

drop policy if exists "members manage students" on public.students;
create policy "members manage students" on public.students for all to authenticated
using (public.is_ecolab_member(school_id)) with check (public.is_ecolab_member(school_id));
drop policy if exists "members manage payments" on public.payments;
create policy "members manage payments" on public.payments for all to authenticated
using (public.is_ecolab_member(school_id)) with check (public.is_ecolab_member(school_id));
drop policy if exists "members manage attendance" on public.attendance;
create policy "members manage attendance" on public.attendance for all to authenticated
using (public.is_ecolab_member(school_id)) with check (public.is_ecolab_member(school_id));

grant select, insert, update on public.schools to authenticated;
grant select, insert, delete on public.school_members to authenticated;
grant select, insert, update, delete on public.students to authenticated;
grant select, insert, update, delete on public.payments to authenticated;
grant select, insert, update, delete on public.attendance to authenticated;
