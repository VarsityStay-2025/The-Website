# VarsityStay — Student accommodation platform

A clean, responsive, real-data-first Vite website designed around the uploaded VarsityStay prototype. Includes student search, accounts, landlord property submissions, image upload, reservation/viewing requests, public reviews with private manager leads, confidential complaints, university directory, featured advertising slots, and student / landlord dashboards. **No fake property or university data is preloaded.**

## 1. Local setup (Windows / Mac / Linux)

Install current Node.js LTS and Git. Unzip this project; open the project folder in VS Code. Open **Terminal → New Terminal**:

```bash
npm install
cp .env.example .env  # Windows PowerShell: Copy-Item .env.example .env
npm run dev
```

Open the local URL shown by Vite (normally http://localhost:5173). The site works visually without a backend but deliberately has zero accommodation listings and account submissions cannot persist until connected.

## 2. Backend: Supabase (the included SQL schema targets PostgreSQL/Supabase)

1. Create a project at https://supabase.com/dashboard (choose a region suitable for South African users).
2. Open **SQL Editor → New query**, paste the full `supabase/schema.sql`, and **Run**. This creates tables, relationships, indexes, role checks, RLS policies, a signup trigger, and the storage bucket. The script inserts **no** sample listings or accounts.
3. Under **Project Settings → API**, copy **Project URL** and **publishable/anon key**. Update `.env`:

   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-public-key
   ```

   Never use the `service_role` or secret API key in `.env` with a `VITE_` prefix: Vite exposes that to browsers.
4. In **Authentication → Providers**, enable Email and choose email confirmation. Configure **Authentication → URL Configuration**: Site URL `http://localhost:5173` during development, then your live HTTPS domain; add both development and production URLs to redirect allowlist. Configure proper SMTP for production email delivery.
5. In **SQL Editor**, insert *real* university names to activate the campus selector, e.g. using actual campus records verified by your team. Do not insert invented listings. You can also enter real universities via the **Table Editor**.
6. Create your own landlord account, verify its email, log in and submit your actual property with photos. In **Table Editor → properties**, review the submission, then set `status='published'` and `verified=true` *only after independent verification*. Admin promotion happens only through the privileged SQL Editor or a secure backend.
7. Refresh the website: approved entries appear in Explore, homepage featured spaces, and campus counts.

**Important production follow-ups:** The SQL file is a starting point, not a substitute for a security audit. The browser's public-read listings currently expose submitted property contact/address fields to visitors; review your privacy requirements. Pending listing photos are uploaded to a public storage bucket; migrate unapproved assets to a private bucket with signed URLs or server-controlled approval before production. Introduce rate limiting and CAPTCHA on public complaints to protect against spam. For user-submitted reviews, perform moderation, defamation/privacy checks, and POPIA compliance review. `manager_contact` is not readable through browser API grants and is intended for a privileged staff backend only.

## 3. Deploy using Cloudflare Pages (recommended alternative to Vercel)

1. Create a GitHub repository for VarsityStay; in the project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial VarsityStay platform"
   git branch -M main
   git remote add origin https://github.com/YOUR_ORG/varsity-stay.git
   git push -u origin main
   ```
2. Go to https://dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git**; select the repository.
3. Framework preset: **Vite**. Build command: `npm run build`; output directory: `dist`.
4. In Cloudflare Pages, configure environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (public key only) for Production and Preview. Redeploy after adding them.
5. Visit the issued `*.pages.dev` site; in **Custom domains**, add a domain you control and follow the displayed DNS instructions. Use HTTPS. Add this HTTPS domain to Supabase Auth URLs.
6. Push new changes with `git add . && git commit -m "Update" && git push`; Cloudflare automatically deploys the latest branch.

**Alternative frontend hosting**: Netlify (`npm run build` → `dist`), Firebase Hosting (Firebase CLI; `public=dist` and SPA rewrite), or Render Static Sites (`npm run build` → `dist`). Cloudflare Pages is a good low-ops option for a Vite site.

## 4. Backend and API alternatives (instead of Supabase)

The included working code integrates **Supabase**. Switching backend is an intentional code migration, not a one-click environment variable change.

| Provider | Best use | What changes |
|---|---|---|
| **Appwrite Cloud** | All-in-one auth, databases, storage, functions and hosting | Replace Supabase JS calls with Appwrite SDK; recreate collection permissions and tables |
| **Firebase Authentication + Cloud Firestore + Cloud Storage** | Strong managed auth and document-oriented data | Replace SQL with Firestore documents, security rules and Firebase SDK |
| **Neon PostgreSQL + Clerk + Cloudflare R2** | Modular SQL + managed sign-in + image storage | Write secure server APIs; use Clerk webhooks to maintain profiles |
| **Railway (Node API + PostgreSQL) + Clerk** | Fully owned booking/payment backend | Build Node/Fastify API, auth middleware, migrations and file storage |
| **PocketBase** | Compact self-hosted prototype | Configure collections/permissions and self-hosted server |

Recommended balanced stack: **Cloudflare Pages + Supabase + Paystack/PayFast + Resend**, with the payments flow implemented server-side in Phase 2. If avoiding both Supabase and Vercel: **Cloudflare Pages + Appwrite Cloud + Paystack + Resend** is a good all-in-one alternative, but the supplied frontend needs an Appwrite adapter and the provided SQL will not run unchanged on its API database.

## 5. Payment and notification integrations (not enabled yet)

**Do not expose a payment provider secret key to browser JavaScript.** Use a server endpoint (Supabase Edge Functions / Cloudflare Workers / Railway API) to create payment sessions, store an initial pending transaction, and receive webhooks. Verify the Paystack `x-paystack-signature` with HMAC SHA-512 and independently validate amount, currency, transaction reference and reservation ownership; make webhook processing idempotent. Only then update reservation/payment status. PayFast is another South African payments option. Send transactional emails using **Resend**, **Postmark**, or **Amazon SES** from a verified domain, via a secure backend. Payment flow and notification delivery are **not** operational in this starter.

## 6. Important scope notes

### Working once backend is configured
- Email signup/sign-in, student and landlord role onboarding, email verification through Supabase Auth.
- Real university selector and filters: room type, minutes to campus, maximum budget **showing only the chosen amount**, NSFAS, Wi-Fi, security, parking.
- Landlord property submissions, photo upload, approval-based public display.
- Student viewing/room requests (not confirmed paid bookings), own dashboard list.
- Confidential complaint intake to an RLS-protected table. Anonymous complaint submissions can be read by privileged admins; logged-in users can see their own complaints.
- Moderated off-platform student reviews; private manager contacts withheld from normal reads.
- Viewing availability publishing for landlord properties, after their listings exist; student-facing selection of specific slots is not yet implemented.
- Sponsored space placeholder design; approved ads will render when staff add advertisement records.

### Explicitly not yet implemented or launch-ready
- Live payment collection, payment refunds, reservation confirmation emails, and a reservation status management UI.
- Student-facing viewing-slot picker and confirmed appointments.
- In-app messaging, AI lease analysis, subletting/replacements, e-signature, lease storage, document verification, custom staff dashboard.
- Full moderation back office, complaint notifications, image approval/private media flow, anti-abuse protections, optional 2FA and POPIA audit.

The uploaded Phase 1 plan treats AI lease analysis, sublets, community reviews and viewing scheduling as later-stage work. This build includes a moderated experiences page and a basic landlord viewing-slot entry because the prototype explicitly references them; the fully featured versions are future development work.

## 7. Recommended launch acceptance tests

1. Register and verify distinct student and landlord accounts. Confirm neither can grant themselves admin privileges.
2. Upload real property images, confirm listing is pending, approve as admin, confirm public browse/search displays it.
3. Filter by a campus and choose budget R3,500; verify the label reads **R3,500**, not a range.
4. Create a room request as a student; verify it appears to the student and owner, never to an unrelated account.
5. Submit a complaint anonymously and while logged in; confirm only authorized users can read it.
6. Submit an off-platform review with a private manager phone; confirm regular users cannot query `manager_contact` through the browser API.
7. Test responsive layouts at 360, 768 and 1440px widths; test invalid input and expired sessions.
8. Do not take any money until webhook validation, reconciliation, refund procedures, owner verification and legal disclosures have been tested end to end.

## 8. Files

- `src/main.js` — complete routed frontend and database calls.
- `src/style.css` — responsive visual design.
- `supabase/schema.sql` — PostgreSQL schema, security and image storage configuration (no demo data).
- `.env.example` — safe public environment-variable template.
- `index.html`, `package.json` — Vite application setup.


## Supplied brand stylesheet
The original supplied `styles.css` is preserved in the project root. Its brand colours, DM Sans/Sora fonts, navbar, buttons, search panel, cards, and responsive styling have been adapted to the existing Vite component classes through overrides at the end of `src/style.css`. Edit `src/style.css` for the live site.
