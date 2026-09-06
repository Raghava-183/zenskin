# Zenskin

The online shop for **Zenskin**, an aloe-led herbal face wash from
HRV Global Naturities, Nagole, Hyderabad.

Orders are placed on the site, saved to a database with an order number,
and handed to WhatsApp with the whole message already written.

- **Framework** — Next.js 16 (App Router) + React 19 + TypeScript
- **Styling** — Tailwind CSS v4
- **Database** — Supabase (Postgres). Optional: the site sells fine without it.
- **Hosting** — Vercel

---

## 1. Run it on your own machine

```bash
npm install
cp .env.example .env.local     # Windows: copy .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

It works straight away with no database — orders go to WhatsApp without an
order number. Set up Supabase (step 2) when you want them saved.

---

## 2. Set up the order database

1. Go to [supabase.com](https://supabase.com) and create a free project.
   Pick the **Mumbai / ap-south-1** region — it is closest to your customers.
2. In the project, open **SQL Editor → New query**.
3. Paste the whole of [`supabase/schema.sql`](supabase/schema.sql) and press **Run**.
4. Open **Settings → API** and copy two values into your `.env.local`:

   | Supabase field | Goes into |
   | --- | --- |
   | Project URL | `NEXT_PUBLIC_SUPABASE_URL` |
   | `service_role` secret | `SUPABASE_SERVICE_ROLE_KEY` |

5. Restart `npm run dev`. Place a test order — it will appear under
   **Table Editor → orders**.

> **Keep the service-role key secret.** It bypasses every security rule.
> It lives only in `.env.local` (which git ignores) and in Vercel's
> environment variables. Never paste it into a component, a screenshot,
> or a WhatsApp message.

### Reading your orders

Supabase's **Table Editor → orders** is your order book. There is also a
ready-made view — run this in the SQL Editor to see only what still needs
packing:

```sql
select * from orders_to_pack;
```

Change an order's `status` as you go: `new → confirmed → packed → shipped
→ delivered`.

---

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "Zenskin storefront"
git branch -M main
git remote add origin https://github.com/<your-username>/zenskin.git
git push -u origin main
```

Create the empty `zenskin` repo on GitHub first (no README, no .gitignore —
this project already has both).

**`.env.local` is in `.gitignore` and must stay there.** If you ever push a
key by accident, rotate it in Supabase immediately.

---

## 4. Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the GitHub repo.
2. Vercel detects Next.js on its own — leave every build setting alone.
3. Under **Environment Variables**, add all three from `.env.example`:
   - `NEXT_PUBLIC_SITE_URL` — your live URL, e.g. `https://zenskin.vercel.app`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Click **Deploy**.

Every `git push` to `main` redeploys automatically from then on.

### Your own domain

Buy a domain (`zenskin.in` reads better than a `.vercel.app` address) and
add it under **Vercel → Settings → Domains**. Then update
`NEXT_PUBLIC_SITE_URL` to match, or link previews and Google results will
point at the old address.

---

## 5. Changing things

Almost everything you will want to edit lives in **one file**:

### `lib/site.ts`

Price, WhatsApp number, email, address, batch number, expiry, bottles sold.
Change it here and it updates across the whole site — the hero, the order
form, the label panel, the footer, the SEO tags and the Google listing.

New batch? Update `label.batch`, `label.mfg` and `label.expiry`.
Price change? Update `price`. Nothing else to touch.

### The rest

| What | Where |
| --- | --- |
| Headline and hero copy | `components/Hero.tsx` |
| The four benefit cards | `components/Benefits.tsx` |
| How-to-use steps | `components/Ritual.tsx` |
| Campaign lines (posters, reels) | `components/CampaignLines.tsx` |
| Order form and label panel | `components/OrderSection.tsx` |
| Colours, fonts, light/dark themes | `app/globals.css` |
| Page title, description, Google listing | `app/layout.tsx` |
| Link preview image | `public/og.png` (1200×630) |

---

## How an order actually flows

```
Customer picks quantity, types name and area
        │
        ▼
POST /api/orders  ──►  Supabase inserts a row, returns ZS-01001
        │
        ▼
WhatsApp opens, prefilled, quoting ZS-01001
        │
        ▼
You reply on WhatsApp and mark the row 'confirmed' in Supabase
```

**If the database is down or missing, the order still goes to WhatsApp** —
just without a number. That is deliberate. A lost order number is an
annoyance; a lost customer is not. See the comment at the top of
`app/api/orders/route.ts`.

---

## Still to do

- [ ] Full ingredient list on the site (needed for trust, and for
      Legal Metrology compliance on a cosmetic sold online)
- [ ] Delivery charges and delivery time stated on the page
- [ ] Real customer reviews, once you have permission to publish them
- [ ] A `/privacy` page — required before running Meta or Google ads,
      since the order form collects names and areas
- [ ] Online payments (Razorpay) if WhatsApp payment collection gets heavy

---

© HRV Global Naturities. Product photography and brand are theirs; the code
is yours to change.
