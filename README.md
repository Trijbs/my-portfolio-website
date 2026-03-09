# Ruben Trijbs Portfolio

Design-led portfolio website for UI/UX, web design, and interactive front-end work.

Live site: [https://www.trijbsworld.nl](https://www.trijbsworld.nl)

## Overview

This project is a Vercel-hosted portfolio with:

- a custom static front end in `public/`
- serverless contact and analytics endpoints in `api/`
- privacy-gated analytics tracking
- responsive project media generated into `public/media/`
- a dedicated analytics admin page at `/analytics`

The current site is positioned around UI/UX and web design work rather than a generic developer portfolio.

## Stack

- HTML, CSS, vanilla JavaScript
- Vercel serverless functions
- Nodemailer for the contact form
- Supabase for optional persistent analytics storage
- Feather icons
- Local font files in `public/fonts`
- Sharp for responsive media generation

## Local Development

### Prerequisites

- Node.js 18+
- npm
- Vercel CLI access for local function emulation

### Install

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password

ANALYTICS_ADMIN_PASSWORD=choose-a-strong-password
ANALYTICS_AUTH_SALT=optional-custom-salt

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_ANALYTICS_TABLE=analytics_events
```

Notes:

- `EMAIL_USER` and `EMAIL_PASS` are required for the contact form.
- `ANALYTICS_ADMIN_PASSWORD` is required only if you want to use the `/analytics` admin page.
- Supabase variables are optional. Without them, analytics falls back to in-memory storage for the current runtime.

### Run locally

```bash
npm run dev
```

That starts `vercel dev`, which is the recommended way to run both the static site and the serverless endpoints locally.

Default local URL:

```text
http://localhost:3000
```

## Useful Commands

```bash
npm run dev
npm run deploy
npm run test:email
npm run build:media
npm run check:media
```

What they do:

- `npm run dev`: runs the Vercel local dev server
- `npm run deploy`: deploys to Vercel production
- `npm run test:email`: validates local email config
- `npm run build:media`: generates responsive image assets into `public/media`
- `npm run check:media`: verifies generated media output

## Project Structure

```text
.
├── api/
│   ├── _lib/
│   │   ├── analytics-auth.js
│   │   └── analytics-store.js
│   ├── analytics-auth.js
│   ├── analytics.js
│   ├── contact.js
│   └── test-email.js
├── config/
│   ├── CNAME
│   └── supabase-analytics.sql
├── public/
│   ├── analytics/
│   │   └── index.html
│   ├── css/
│   │   └── styles.css
│   ├── data/
│   │   └── project-details.json
│   ├── files/
│   ├── fonts/
│   ├── img/
│   ├── js/
│   │   ├── analytics-dashboard.js
│   │   ├── cache-buster.js
│   │   ├── contact-form.js
│   │   ├── main.js
│   │   ├── privacy-controls.js
│   │   └── vercel-analytics.js
│   ├── media/
│   ├── index.html
│   └── info.html
├── scripts/
│   └── build-media.mjs
├── test-email-config.js
├── package.json
├── vercel.json
└── README.md
```

## Front-End Notes

Main entry points:

- `public/index.html`: main portfolio page
- `public/info.html`: secondary info page
- `public/analytics/index.html`: analytics admin UI

Main front-end files:

- `public/css/styles.css`: full site styling
- `public/js/main.js`: navigation, modals, filtering, UI interactions
- `public/js/contact-form.js`: contact form logic
- `public/js/privacy-controls.js`: privacy banner and consent state
- `public/js/vercel-analytics.js`: consent-aware analytics bridge

Recent UI changes include:

- stronger hero card hover interactions
- wider section-title line lengths
- tighter project-card spacing

## Analytics

There are two analytics layers in this project:

1. Vercel Web Analytics
2. Custom event tracking to `/api/analytics`

Custom analytics behavior:

- events are sent only after the user grants analytics consent
- the public site posts to `/api/analytics`
- the admin dashboard reads from `/analytics`
- `/analytics` authentication is handled through `api/analytics-auth.js`

### Persistent analytics with Supabase

If you want persistent analytics storage:

1. Create a Supabase project.
2. Run `config/supabase-analytics.sql`.
3. Set `SUPABASE_URL`.
4. Set `SUPABASE_SERVICE_ROLE_KEY`.
5. Optionally set `SUPABASE_ANALYTICS_TABLE`.

If Supabase is not configured, analytics uses in-memory storage for the current runtime.

## Contact Form

The contact form posts to `api/contact.js`.

It includes:

- rate limiting
- input validation
- email sending through Gmail SMTP via Nodemailer
- confirmation email handling

For production, set `EMAIL_USER` and `EMAIL_PASS` in Vercel environment variables.

## Media Pipeline

Source images live in `public/img`.

Responsive output is generated into `public/media` by:

```bash
npm run build:media
```

Run this after replacing cover images, portrait images, or other major portfolio assets.

## Deployment

This project is intended for Vercel deployment.

Key deployment behavior is defined in `vercel.json`:

- clean URLs
- security headers
- CSP
- cache-control headers for CSS, JS, fonts, images, media, and files
- API CORS headers
- HTTP to HTTPS redirect

Deploy with:

```bash
npm run deploy
```

## Troubleshooting

### Contact form returns 500

Check:

- `EMAIL_USER`
- `EMAIL_PASS`

### `/analytics` is locked

Set:

- `ANALYTICS_ADMIN_PASSWORD`

### `/api/analytics` fails in production

Check:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- the table created from `config/supabase-analytics.sql`

If you do not want persistent storage, remove the Supabase variables so the function can use in-memory mode instead.

### Media looks outdated after deploy

Run:

```bash
npm run build:media
```

Then redeploy.

### Browser still shows old CSS or JS

Static assets are cacheable and versioned with query strings in the HTML. Hard-refresh the page after deployment if the browser keeps old files.

## Notes

- The repository currently uses local font files, not Google Fonts.
- The core stylesheet is `public/css/styles.css`.
- Live demo embeds open inside a sandboxed iframe and also provide an "Open External" fallback.

## License

MIT
