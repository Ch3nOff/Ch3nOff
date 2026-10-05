# Research Lab — Supabase + Vercel Setup

The `/lab` route is a shared research chat: visitors post **experiments, thoughts,
research notes and prototypes** to an open bench feed stored in Supabase.

## 1. Create the database (5 minutes)

1. Create a project at [database.new](https://supabase.com/dashboard).
2. Open **SQL Editor**, paste the whole contents of [`supabase/schema.sql`](../supabase/schema.sql), **Run**.
   This creates `public.lab_benches`, indexes, RLS policies, the atomic
   `bump_reaction()` function, and adds the table to the realtime publication.

## 2. Local environment

```bash
cp .env.example .env.local   # then fill in your real values
npm run dev
```

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Dashboard → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Dashboard → Project Settings → API → anon public |

> Without env vars the lab still works in **offline scratchpad mode**
> (localStorage + seed entries), so builds never break pre-provisioning.

## 3. Deploy on Vercel

1. Push this repo, import it at vercel.com/new (framework auto-detected: Next.js).
2. **Project → Settings → Environment Variables** → add both `NEXT_PUBLIC_*`
   vars above (Production + Preview), then redeploy.
3. Optional: edit `vercel.json` → `regions` to the edge closest to your users
   (default `hnd1`; e.g. `iad1`, `cdg1`, `sin1`).

## 4. Performance notes already baked in

- `/lab` feed JS is code-split via `next/dynamic` — other pages stay lean.
- Pagination (`PAGE_SIZE = 12`) instead of loading the whole table.
- Realtime INSERT subscription replaces polling; one websocket per visitor.
- Reactions use a `security definer` SQL function → atomic jsonb bump, no
  read-modify-write races, one vote per visitor enforced client-side.
- Immutable cache headers for `/_next/static` and baseline security headers
  via `vercel.json`.
- All static routes prerendered (see `next build` output).

## 5. Seed content

`data/labSeeds.ts` ships 4 example benches (also used offline). To mirror them
into Supabase once, copy the JSON into the Table Editor or run extra inserts
after `schema.sql`.
