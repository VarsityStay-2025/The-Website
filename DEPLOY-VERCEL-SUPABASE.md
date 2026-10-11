# VarsityStay: Vercel + Supabase deployment

## 1. Supabase database
1. Create a project at https://supabase.com/dashboard.
2. Open **SQL Editor**, paste the contents of `supabase/schema.sql`, and run it **once** on a new project. Do not re-run the full schema on an existing database.
3. In **Authentication > Providers**, enable Email; decide whether email confirmation is required.
4. In **Authentication > URL Configuration**, set Site URL to your final `https://YOUR-SITE.vercel.app` address, and add `https://YOUR-SITE.vercel.app/**` to redirect URLs. Add localhost for local testing. Update after obtaining your Vercel domain.
5. In **Project Settings > API / Connect**, copy Project URL and **publishable** (or legacy anon) key. Never use the `service_role` or secret key in the browser or in `VITE_` variables.
6. Review Row Level Security and storage rules before accepting real users. The provided `property-images` bucket is public; uploaded photos should not contain private IDs, documents, or unapproved sensitive material. Move pending listing photos to a private bucket before production if moderation requires privacy.
7. Add actual university rows through the Supabase Table Editor; this project intentionally has no demo entries.

## 2. Run locally
1. Install Node.js 22 and open this folder in VS Code.
2. Copy `.env.example` to `.env.local`, replacing both values with your project URL and publishable key.
3. Run `npm install`, then `npm run dev`.
4. Test student signup, email confirmation, landlord signup, listing submission, public browsing, complaint submission, and role restrictions.
5. Run `npm run build` and `npm run preview`.

## 3. Deploy to Vercel
1. Push this project root (the folder containing `package.json`) to a GitHub repository. Never commit `.env.local`.
2. At https://vercel.com/new, import that repository.
3. **Framework preset:** Vite; **Root directory:** the folder containing `package.json`; **Build command:** `npm run build`; **Output directory:** `dist`.
4. Under **Environment Variables**, set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the same values used locally, for Production and Preview as needed. Redeploy after changes.
5. Deploy, then copy the final URL into Supabase Authentication URL Configuration and confirm signup links and login work on the live domain.
6. Test the published site in a private browser session on mobile and desktop.

## 4. What is and is not live
- Vercel serves the Vite frontend; Supabase provides authentication, database and storage. No demo property records are included.
- The current app records room requests, **not paid bookings**. Do not claim payment or booking confirmation until a verified server-side payment flow and webhook are implemented.
- Advertising and property approval require administrator action in Supabase.
- AI lease reading and subletting are not production-ready payment or legal-advice services.
- Run privacy/security reviews, spam prevention and end-to-end browser tests before opening public registration.

## Troubleshooting
- Blank listings: the database has no approved listings yet, by design.
- Client not configured: check both Vercel environment variables and redeploy. Only `VITE_`-prefixed values are available in browser code.
- 401/403: check authentication state and Supabase RLS policies.
- Confirmation link redirects incorrectly: check Supabase Auth Site URL and redirect allow-list.
- Build fails: verify Vercel root directory and Node.js 22.
