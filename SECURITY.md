# Security Policy

## Scope

This is a personal portfolio website. The attack surface is intentionally small:

- a contact form (`/api/contact`) that sends email via Gmail SMTP
- a custom analytics endpoint (`/api/analytics`) that accepts POST events and serves admin reads
- an analytics admin page (`/analytics`) protected by password auth

## Reporting a Vulnerability

If you find a security issue, please email **trijbsprod@icloud.com** with:

- a description of the vulnerability
- steps to reproduce or a proof of concept
- the potential impact

I aim to respond within 72 hours and resolve confirmed issues as quickly as possible. I'll credit you in the commit message if you'd like.

Please do not open a public GitHub issue for security vulnerabilities.

## Security Design

### Contact form (`api/contact.js`)

- Rate limited to 3 requests per IP per 15 minutes
- Input validated server-side (name, email format, message length)
- All user input HTML-escaped before insertion into email templates
- Client IP parsed from `x-forwarded-for` correctly (first IP in comma-separated list)
- SMTP debug/logger disabled in production (`NODE_ENV === 'production'`)

### Analytics auth (`api/_lib/analytics-auth.js`)

- Password is never stored or compared in plain text
- Auth token is derived with `crypto.scryptSync` and compared using `crypto.timingSafeEqual` (prevents timing attacks)
- Auth cookie is HTTP-only, SameSite=Lax, and Secure in production
- Cookie valid for 7 days

### Analytics endpoint (`api/analytics.js`)

- Public POST (event ingestion) is rate limited to 1000 events/IP/hour
- All admin GET actions require a valid auth cookie
- Admin responses served only after `isAnalyticsAuthorized` passes

### Headers (`vercel.json`)

- `Strict-Transport-Security` with `includeSubDomains` and `preload`
- `Content-Security-Policy` restricts scripts to self and known CDNs
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` denies camera, microphone, geolocation, payment

## Out of Scope

The following are known limitations and are accepted by design:

- **In-memory analytics storage** — events are lost on serverless cold starts when Supabase is not configured. This is intentional for zero-config usage.
- **Rate limiting is in-memory** — limits reset per serverless instance, not globally across all instances. This is a known trade-off of the serverless model without a shared store.
- **SMTP credentials** — the contact form requires a Gmail App Password stored as a Vercel environment variable. Credential rotation is the operator's responsibility.
