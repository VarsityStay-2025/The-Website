Visitors may browse. Students must register and confirm their email before requesting rooms/viewings or submitting complaints. Landlords must register and confirm their email before submitting listings.

For NEW Supabase projects run supabase/schema.sql. For EXISTING projects run ONLY supabase/migrations/20261011_require_accounts.sql, not the original schema again.

Enable email confirmation in Supabase Authentication settings, and configure Vercel URL redirects. RLS protects booking/listing/complaint writes by role. Email confirmation is currently enforced in the frontend; add database-side verification before production if API-level enforcement is required. Room bookings are requests, not confirmed payments.
