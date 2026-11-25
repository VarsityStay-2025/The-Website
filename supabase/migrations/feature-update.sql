-- VarsityStay: viewing selection and admin photo review/deletion.
-- Run as database owner in Supabase SQL Editor. Review existing policies first.
BEGIN;
ALTER TABLE public.reservations
  ADD COLUMN IF NOT EXISTS viewing_slot_id uuid REFERENCES public.viewing_slots(id) ON DELETE SET NULL;

-- Keep any selected slot tied to the same property, in the future, and to a viewing request.
CREATE OR REPLACE FUNCTION public.validate_reservation_viewing_slot()
RETURNS trigger LANGUAGE plpgsql SET search_path = '' AS $$
BEGIN
 IF NEW.viewing_slot_id IS NOT NULL THEN
  IF NEW.request_type <> 'viewing' THEN RAISE EXCEPTION 'Viewing slots only apply to viewing requests'; END IF;
  IF NOT EXISTS (
   SELECT 1 FROM public.viewing_slots v
   WHERE v.id = NEW.viewing_slot_id AND v.property_id = NEW.property_id AND v.start_at > now()
  ) THEN RAISE EXCEPTION 'Selected viewing time is no longer available'; END IF;
 END IF;
 RETURN NEW;
END; $$;
DROP TRIGGER IF EXISTS check_reservation_viewing_slot ON public.reservations;
CREATE TRIGGER check_reservation_viewing_slot
BEFORE INSERT OR UPDATE OF viewing_slot_id, property_id, request_type
ON public.reservations FOR EACH ROW EXECUTE FUNCTION public.validate_reservation_viewing_slot();

-- Published viewing times are readable by prospective students; landlords
-- can manage their own, and admins may inspect them.
ALTER TABLE public.viewing_slots ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.viewing_slots TO authenticated;
DROP POLICY IF EXISTS varsity_viewing_slot_read ON public.viewing_slots;
CREATE POLICY varsity_viewing_slot_read ON public.viewing_slots
FOR SELECT TO authenticated USING (
 start_at > now() AND (
  EXISTS (SELECT 1 FROM public.properties p WHERE p.id=property_id AND p.status='published')
  OR owner_id = (SELECT auth.uid())
  OR (SELECT public.is_admin())
 )
);

-- Admins can inspect metadata for photos on pending properties.
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
GRANT SELECT, DELETE ON public.property_images TO authenticated;
DROP POLICY IF EXISTS varsity_admin_photo_read ON public.property_images;
CREATE POLICY varsity_admin_photo_read ON public.property_images
FOR SELECT TO authenticated USING ((SELECT public.is_admin()));
DROP POLICY IF EXISTS varsity_admin_photo_delete ON public.property_images;
CREATE POLICY varsity_admin_photo_delete ON public.property_images
FOR DELETE TO authenticated USING ((SELECT public.is_admin()));

-- Admins may remove objects in the dedicated property photos bucket.
-- Existing landlord storage policies should remain in place.
DROP POLICY IF EXISTS varsity_admin_storage_photo_delete ON storage.objects;
CREATE POLICY varsity_admin_storage_photo_delete ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'property-images' AND (SELECT public.is_admin()));
COMMIT;

-- NOTE: For a PRIVATE property-images bucket, replace public image URLs in the
-- frontend with time-limited signed URLs issued for authorised users. This
-- implementation retains your site's current public-URL image design.
-- Verify storage bucket RLS and publication privacy before production launch.
