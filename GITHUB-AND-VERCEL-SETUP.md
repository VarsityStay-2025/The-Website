# VarsityStay: GitHub → Vercel → Supabase

## Files to upload to GitHub
Upload all files and folders inside `VarsityStay` except `.env.local`. Include `.env.example` (placeholders only), `src`, `supabase`, `index.html`, `package.json`, `vercel.json`, `styles.css`, and the documentation. The .env.local file is included in the downloaded ZIP so you can edit it in VS Code, but NEVER upload a populated .env.local file to a public GitHub repository.

## Add Supabase
1. Create a Supabase project.
2. For a new database, run `supabase/schema.sql` in Supabase SQL Editor. For an existing database, run the relevant migration instead of the initial schema.
3. Find Project URL and publishable key in Supabase settings.
4. Edit `.env.local` on your PC and replace both placeholders.
5. Run `npm install`, then `npm run dev`.

## Deploy Vercel
1. Import your GitHub repository in Vercel.
2. Framework: Vite; build command `npm run build`; output directory `dist`.
3. In Vercel Settings → Environment Variables add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` with the same real values. These are frontend public values; never use a service_role or secret key.
4. Deploy or redeploy after changing environment variables.
5. In Supabase Authentication → URL Configuration set Site URL to your production Vercel URL, and add your production URL and `http://localhost:5173/**` to allowed redirects.
6. Enable email confirmation in Supabase Authentication settings.
7. Test student signup/login, landlord signup/login, property listing, and complaint permissions.

Note: The booking flow is a request, not a paid/confirmed reservation. A secure payment service and production verification still need to be implemented.
