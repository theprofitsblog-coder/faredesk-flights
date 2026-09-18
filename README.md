# FareDesk — programmatic SEO site for the Airline Ticket Calls offer

A fully static Next.js site built for the **Airline Ticket Calls** CPA offer. Every page drives to
one toll-free number: **+1 (855) 715-0929**.

- **Stack:** Next.js 15 (App Router) + Tailwind CSS, `output: "export"` — pure static HTML.
- **Hosting:** Vercel free tier. No serverless functions, no ISR budget, no database.
- **Scale:** ~3,270 statically generated pages, all served as flat files from the CDN.

---

## What gets generated

| Route | Count | Purpose |
| --- | --- | --- |
| `/` | 1 | Conversion homepage |
| `/flights` | 1 | Index of all 57 airports |
| `/flights/[origin]` | 57 | City hub pages |
| `/flights/[origin]/[destination]` | 3,192 | Core programmatic SEO pages — every ordered city pair |
| `/airlines` + `/airlines/[slug]` | 16 | Only the 15 carriers on the offer's accepted list |
| `/how-it-works`, `/faq`, `/contact`, `/privacy-policy`, `/terms` | 5 | Trust + legal |

Plus a generated `sitemap.xml` (all ~3,270 URLs) and `robots.txt`.

### Why the route pages are not thin content

Programmatic SEO gets penalised when 3,000 pages are one paragraph with two nouns swapped. Here
every figure is computed from real data rather than templated:

- **Distance** — true great-circle calculation from published airport reference-point coordinates
  (`lib/geo.ts` → `greatCircleMiles`).
- **Duration** — distance over average block speed plus taxi allowance, so a 300-mile hop and a
  4,900-mile Alaska run report honestly different times.
- **Time-zone shift** — real UTC offsets, surfaced in copy and FAQs only where it is non-zero.
- **Copy branching** — intro, seasonal advice and "why call" bullets branch on distance band,
  transborder status, hub overlap and time-zone difference (`lib/content.ts`).
- **Carriers** — derived from actual hub overlap, never asserting a specific nonstop exists.
- **Related routes** — nearest routes by real distance, both directions, for internal linking.

Each page also ships `BreadcrumbList`, `FAQPage`, `Flight` and `Service` JSON-LD.

---

## Configuration

Everything lives in [`lib/config.ts`](lib/config.ts). The one thing you must set for production is
the site URL, or canonicals and the sitemap will point at the placeholder.

| Variable | Where | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Vercel → Settings → Environment Variables | Your real domain. Drives canonical URLs, Open Graph and `sitemap.xml`. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Vercel (optional) | Overrides the GSC ownership token. Hardcoded fallback exists in `lib/config.ts`, so the tag renders even with no env set. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Vercel (optional) | If unset, no email is rendered anywhere — so the site never advertises a dead inbox. |
| `NEXT_PUBLIC_GA_ID` | Vercel (optional) | If set, gtag is injected in `app/layout.tsx`. Unset = no third-party requests. |

### Google Search Console

Ownership is verified by meta tag. It is emitted from `app/layout.tsx` via the `verification.google`
metadata field, which means it renders in `<head>` on **all 3,161 pages**, not just the homepage —
so it cannot be dropped by regenerating a single template.

Do not remove it. GSC re-checks periodically and will de-verify the property if it disappears.

Change the phone number in `lib/config.ts` only — `PHONE_E164`, `PHONE_DISPLAY` and `PHONE_HREF`
are the single source of truth used by every component, every `tel:` link and the JSON-LD.

---

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export into ./out
```

---

## Deploying to Vercel

1. Push this repo to GitHub (already configured for you).
2. In Vercel: **Add New → Project → Import** the repository.
3. Framework preset auto-detects **Next.js**. Leave build command and output as detected.
4. Add `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com` under **Environment Variables**.
5. Deploy. Subsequent pushes to `main` deploy automatically.

After the first deploy, point your domain at Vercel and update `NEXT_PUBLIC_SITE_URL` to match,
then redeploy so canonicals resolve correctly.

---

## Compliance notes (worth reading)

The site is built to stay inside the offer's rules and general advertising norms:

- **No impersonation.** Every page states FareDesk is an independent booking service and is *not*
  affiliated with, endorsed by or sponsored by the airlines named. The FAQ explicitly answers
  "Is this the airline's phone number?" with **no**.
- **No fabricated prices.** No average fares, no invented savings figures, no fake urgency. Prices
  are described qualitatively and always attributed to a live quote on the call.
- **No fabricated reviews.** There are no testimonials, star ratings or "as seen in" claims, because
  inventing them is deceptive and is the kind of thing that gets an offer terminated.
- **Affiliate disclosure** on every page via the site footer.
- **Single number.** Only `+18557150929` is used — consistent with the offer's "don't create more
  than 5 numbers without speaking with us first" rule.
- **Traffic source.** The offer bans social media and Facebook Marketplace. This is a
  search/organic play only; nothing here is wired for paid social.

If you add content later, keep those four constraints — they are what keeps the campaign alive.

---

## Repository layout

```
app/
  layout.tsx                     Root layout, org JSON-LD, optional gtag
  page.tsx                       Homepage
  flights/page.tsx               Airport index
  flights/[origin]/page.tsx      City hub
  flights/[origin]/[destination]/page.tsx   Route page (core)
  airlines/page.tsx              Airline index
  airlines/[slug]/page.tsx       Airline detail
  sitemap.ts / robots.ts         Generated at build time
lib/
  config.ts                      Number, brand, URLs, disclosure
  cities.ts                      56 airports with real coordinates
  airlines.ts                    The 15 accepted carriers
  geo.ts                         Distance, duration, carriers, linking
  content.ts                     Copy engine
components/                      Header, footer, CTAs, search, FAQ, JSON-LD
```
