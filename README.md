# Trijbs Portfolio

Design-led portfolio for UI/UX, creative coding, and interactive front-end work.

Live site: [trijbsworld.nl](https://www.trijbsworld.nl)

## Overview

Vercel-hosted portfolio with:

- custom static front end in `public/`
- serverless contact and analytics endpoints in `api/`
- privacy-gated analytics with optional Supabase persistence
- responsive project media pipeline (`public/img/` → `public/media/`)
- analytics admin page at `/analytics`

## Stack

- HTML, CSS, vanilla JavaScript
- Vercel serverless functions (Node.js 18+)
- Nodemailer — contact form via Gmail SMTP
- Supabase — optional persistent analytics storage
- Sharp — responsive image generation (avif, webp, jpg)
- Feather icons
- Local font files in `public/fonts/`

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
# Required — contact form
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

# Required — analytics admin page
ANALYTICS_ADMIN_PASSWORD=choose-a-strong-password
ANALYTICS_AUTH_SALT=optional-custom-salt

# Optional — persistent analytics storage
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_ANALYTICS_TABLE=analytics_events
```

Without Supabase variables, analytics falls back to in-memory storage per serverless runtime instance.

### Run locally

```bash
npm run dev
```

Starts `vercel dev`, which emulates both the static site and serverless endpoints.
Default URL: `http://localhost:3000`

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server via Vercel CLI |
| `npm run deploy` | Deploy to Vercel production |
| `npm run test:email` | Validate local email config |
| `npm run build:media` | Generate responsive image variants into `public/media/` |
| `npm run check:media` | Verify all expected media variants exist |

## Project Structure

```
.
├── api/
│   ├── _lib/
│   │   ├── analytics-auth.js   — cookie auth with timing-safe comparison
│   │   └── analytics-store.js  — Supabase or in-memory event storage
│   ├── analytics-auth.js       — login / logout endpoint
│   ├── analytics.js            — event ingestion + admin reads
│   ├── contact.js              — contact form handler
│   └── test-email.js           — SMTP test endpoint
├── config/
│   ├── CNAME
│   └── supabase-analytics.sql  — table schema for persistent analytics
├── public/
│   ├── analytics/
│   │   └── index.html          — analytics admin UI
│   ├── css/
│   │   └── styles.css
│   ├── data/
│   │   ├── project-details.json
│   │   └── status.json         — drives the "currently" hero block
│   ├── fonts/
│   ├── img/                    — source images (input for build:media)
│   ├── js/
│   │   ├── analytics-dashboard.js
│   │   ├── cache-buster.js
│   │   ├── contact-form.js
│   │   ├── main.js
│   │   ├── privacy-controls.js
│   │   └── vercel-analytics.js
│   ├── media/                  — generated responsive variants (git-ignored)
│   ├── index.html
│   └── info.html
├── scripts/
│   └── build-media.mjs
├── test-email-config.js
├── package.json
├── vercel.json
└── README.md
```

## Media Pipeline

Source images live in `public/img/`. The build script generates avif, webp, and jpg variants at multiple widths into `public/media/`.

```bash
npm run build:media   # generate
npm run check:media   # verify
```

Run after adding or replacing any cover image, then redeploy.

**To add a cover image for a new project:**
1. Drop a JPG or PNG (≥1400×900px) into `public/img/` — e.g. `kaar-cover.jpg`
2. Run `npm run build:media`
3. Update the project card in `public/index.html` to use a `<picture>` element pointing at the generated variants (`media/kaar-cover-480.*`, `media/kaar-cover-768.*`, `media/kaar-cover-1200.*`)

## Analytics

Two layers:

1. **Vercel Web Analytics** — loaded only after the visitor grants consent
2. **Custom event tracking** — posts to `/api/analytics`, gated by the same consent check

The admin dashboard at `/analytics` requires `ANALYTICS_ADMIN_PASSWORD`. Auth uses an HTTP-only cookie with a scrypt-derived token compared via `crypto.timingSafeEqual`.

### Persistent storage with Supabase

1. Create a Supabase project
2. Run `config/supabase-analytics.sql`
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel environment variables

Without these, analytics runs in-memory per serverless instance and resets on cold starts.

## Contact Form

Posts to `api/contact.js`. Includes:

- per-IP rate limiting (3 requests per 15 minutes)
- input validation (name, email, message length)
- HTML-escaped email templates (prevents injection)
- Gmail SMTP via Nodemailer (debug logging disabled in production)
- confirmation email to the sender

Use a [Gmail App Password](https://myaccount.google.com/apppasswords) for `EMAIL_PASS`, not your account password.

## Deployment

```bash
npm run deploy
```

`vercel.json` configures:

- clean URLs
- security headers (HSTS, CSP, X-Frame-Options, Referrer-Policy, etc.)
- cache-control per asset type (CSS/JS: 1h revalidate; images/fonts/media: 1y immutable)
- CORS for API routes (`GET, POST, DELETE, OPTIONS`)
- HTTP → HTTPS redirect

## Troubleshooting

**Contact form returns 500** — check `EMAIL_USER` and `EMAIL_PASS` are set in Vercel dashboard. `EMAIL_PASS` must be a Gmail App Password.

**`/analytics` is locked** — set `ANALYTICS_ADMIN_PASSWORD` in Vercel dashboard.

**`/api/analytics` fails in production** — check `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and that the table was created from `config/supabase-analytics.sql`. Remove both Supabase variables to fall back to in-memory mode.

**Media looks outdated after deploy** — run `npm run build:media` and redeploy.

**Browser shows old CSS or JS** — assets use query-string versioning. Hard-refresh after deploy (`Cmd+Shift+R` / `Ctrl+Shift+R`).

## Notes

- Fonts are local — no Google Fonts requests.
- Theme system uses `data-theme` on `<html>` (`poster` / `dark` / `proof`), stored in `localStorage`.
- The "currently building" hero block is driven by `public/data/status.json`.
- Live demo embeds open in a sandboxed iframe with an "Open in New Tab" fallback for sites that block embedding.

## License

MIT
