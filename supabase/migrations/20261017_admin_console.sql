-- Apply AFTER supabase/schema.sql. Run in Supabase SQL Editor as project owner.
-- Never put a service_role key in the browser or Vite environment variables.
create table if not exists public.admin_audit_log (
 id uuid primary key default gen_random_uuid(),
 admin_id uuid not null references public.profiles(id),
 record_type text not null check(record_type in ('properties','reservations','complaints')),
 record_id uuid not null,
 before_data jsonb not null,
 after_data jsonb not null,
 reason text not null,
 created_at timestamptz not null default now()
);
alter table public.admin_audit_log enable row level security;
drop policy if exists admin_audit_read on public.admin_audit_log;
create policy admin_audit_read on public.admin_audit_log for select to authenticated using(public.is_admin());
revoke all on public.admin_audit_log from anon,authenticated;
grant select on public.admin_audit_log to authenticated;

create or replace function public.admin_update_record(p_kind text,p_id uuid,p_changes jsonb,p_reason text)
returns void
language plpgsql security definer set search_path = ''
as $$
declare
  old_record jsonb;
  new_record jsonb;
  allowed text[];
  key_name text;
  new_status text;
  new_rent numeric;
  new_rooms integer;
begin
  if (select auth.uid()) is null or not public.is_admin() then
    raise exception 'Administrator access required';
  end if;
  if p_reason is null or length(trim(p_reason)) < 5 or length(p_reason)>500 then
    raise exception 'Provide a change reason (5–500 characters)';
  end if;
  if p_changes is null or jsonb_typeof(p_changes) <> 'object' then
    raise exception 'Invalid change payload';
  end if;
  if p_kind='properties' then
    allowed := array['monthly_rent','available_rooms','status','verified','wifi','security','parking','nsfas_friendly'];
  elsif p_kind in ('reservations','complaints') then
    allowed := array['status'];
  else
    raise exception 'Unsupported record type';
  end if;
  for key_name in select jsonb_object_keys(p_changes) loop
    if not (key_name=any(allowed)) then raise exception 'Unsupported field: %',key_name; end if;
  end loop;
  if p_kind='properties' then
    select to_jsonb(p) into old_record from public.properties p where p.id=p_id for update;
    if old_record is null then raise exception 'Property not found'; end if;
    new_status:=coalesce(p_changes->>'status',old_record->>'status');
    if new_status not in ('pending','published','rejected','archived') then raise exception 'Invalid property status'; end if;
    if new_status='published' and not coalesce((p_changes->>'verified')::boolean,(old_record->>'verified')::boolean) then
      raise exception 'Cannot publish an unverified listing';
    end if;
    new_rent:=coalesce((p_changes->>'monthly_rent')::numeric,(old_record->>'monthly_rent')::numeric);
    new_rooms:=coalesce((p_changes->>'available_rooms')::integer,(old_record->>'available_rooms')::integer);
    if new_rent<0 or new_rooms<0 then raise exception 'Price and room count cannot be negative'; end if;
    update public.properties set
      monthly_rent=new_rent, available_rooms=new_rooms, status=new_status,
      verified=coalesce((p_changes->>'verified')::boolean,verified),
      wifi=coalesce((p_changes->>'wifi')::boolean,wifi),
      security=coalesce((p_changes->>'security')::boolean,security),
      parking=coalesce((p_changes->>'parking')::boolean,parking),
      nsfas_friendly=coalesce((p_changes->>'nsfas_friendly')::boolean,nsfas_friendly),
      updated_at=now()
    where id=p_id;
    select to_jsonb(p) into new_record from public.properties p where p.id=p_id;
  elsif p_kind='reservations' then
    select to_jsonb(r) into old_record from public.reservations r where r.id=p_id for update;
    if old_record is null then raise exception 'Application not found'; end if;
    new_status:=p_changes->>'status';
    if new_status is null or new_status not in ('requested','accepted','declined','cancelled','awaiting_payment','confirmed') then raise exception 'Invalid application status'; end if;
    update public.reservations set status=new_status where id=p_id;
    select to_jsonb(r) into new_record from public.reservations r where r.id=p_id;
  else
    select to_jsonb(c) into old_record from public.complaints c where c.id=p_id for update;
    if old_record is null then raise exception 'Complaint not found'; end if;
    new_status:=p_changes->>'status';
    if new_status is null or new_status not in ('new','reviewing','resolved','closed') then raise exception 'Invalid complaint status'; end if;
    update public.complaints set status=new_status where id=p_id;
    select to_jsonb(c) into new_record from public.complaints c where c.id=p_id;
  end if;
  insert into public.admin_audit_log(admin_id,record_type,record_id,before_data,after_data,reason)
  values((select auth.uid()),p_kind,p_id,old_record,new_record,trim(p_reason));
end;
$$;
revoke all on function public.admin_update_record(text,uuid,jsonb,text) from public,anon;
grant execute on function public.admin_update_record(text,uuid,jsonb,text) to authenticated;
-- Admin role is assigned only via privileged SQL after user signs up:
-- update public.profiles set role='admin' where id='EXISTING-VERIFIED-AUTH-USER-UUID';
