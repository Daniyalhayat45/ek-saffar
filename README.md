# Ek Safar — Travel Agency Website

A full-stack Next.js 15 site: public marketing pages, a booking/contact/newsletter
backend, and a password-protected admin dashboard.

## What's real vs. static

- **Public pages** (destinations, packages, blog, etc.) read from static data files
  in `src/data/` — fast, no DB needed, edit the `.ts` files directly to change content.
- **Booking form, contact form, newsletter form** write to a real Postgres database
  through API routes (`src/app/api/*`).
- **Admin dashboard** (`/admin`) is protected by a hardcoded login (see below) and
  reads/writes that same database — view booking inquiries, update their status,
  read contact messages, export the newsletter list as CSV.

## Admin login

Hardcoded credentials, no database lookup needed to sign in:
- Email: `admin@admin.com`
- Password: `eksaffar2026!`

To change them, set `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables —
they override the defaults. No code changes or database writes needed either way.

## 1. Local setup

```bash
npm install
cp .env.example .env.local
```

Get a free Postgres database — takes about 2 minutes:
- **Neon** (neon.tech) — free tier, gives you a connection string immediately, or
- **Vercel Postgres** — create it from your Vercel dashboard once your project is deployed there.

Paste the connection string into `.env.local` as `DATABASE_URL`.

Generate an auth secret and paste it into `AUTH_SECRET`:
```bash
openssl rand -base64 32
```

Create the database tables. Either run:
```bash
npm run db:push
```
or paste the equivalent SQL (see `drizzle/` after running `db:generate`, or ask
for the raw SQL) into your database provider's web SQL editor if you'd rather not
use the CLI at all.

Run the app:
```bash
npm run dev
```

Visit `http://localhost:3000` for the site, `http://localhost:3000/admin/login` to
sign in to the dashboard with the credentials above.

## 2. Deploying to Vercel

1. Push this project to a GitHub repo (drag-and-drop upload on github.com works
   fine, no git required) or run `npx vercel` from this folder if you do have Node.
2. On vercel.com, **Add New Project** → import the repo. Vercel auto-detects Next.js.
3. Before the first deploy, add environment variables under
   **Project → Settings → Environment Variables**:
   - `DATABASE_URL` — your Postgres connection string
   - `AUTH_SECRET` — the value you generated above
   - `NEXTAUTH_URL` — your production URL, e.g. `https://ek-safar.vercel.app`
     (add this one after your first deploy once you know the URL, then redeploy)
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` — optional, only if you want to change the
     defaults above
4. Deploy.
5. Make sure the database tables exist (via `npm run db:push` locally, or by
   running the equivalent `CREATE TABLE` statements in your provider's SQL editor).
6. Log in at `https://your-domain.vercel.app/admin/login`.

## Notes

- The booking/contact/newsletter forms fail gracefully with a clear on-screen
  message if `DATABASE_URL` isn't set yet — they won't crash the page.
- The admin dashboard shows a "could not reach the database" banner instead of
  erroring if the DB isn't reachable, but login itself works independently of the
  database since credentials are hardcoded/env-based.
- The CMS content (packages, destinations, blog posts, testimonials, FAQs) lives in
  `src/data/*.ts` as static, typed data — there's no admin UI to edit these yet.
  That would be the next backend piece to add if you want full CMS editing from
  the dashboard instead of editing code.
