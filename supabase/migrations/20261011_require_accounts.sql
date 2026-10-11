drop policy if exists complaints_insert on public.complaints;
create policy complaints_insert on public.complaints for insert to authenticated
with check (status='new' and reporter_id=(select auth.uid()) and exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='student'));
