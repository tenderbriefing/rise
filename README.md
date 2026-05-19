# Rise Institute Website

Official institutional website for **Rise Institute** — a QCTO-accredited occupational training institution in Midrand, Gauteng. Built for corporate clients, SETAs, government stakeholders, and funding partners.

**Repository:** [https://github.com/tenderbriefing/rise](https://github.com/tenderbriefing/rise)  
**Production URL:** [https://www.riseinstitute.co.za](https://www.riseinstitute.co.za)

---

## Project Overview

A premium, production-ready React SPA delivering:

- Five core pages (Home, About, Qualifications, Corporate & Funding, Contact)
- QCTO-aligned content and institutional positioning
- Firebase Hosting deployment
- Firebase Analytics event tracking
- Advanced SEO (JSON-LD, Open Graph, breadcrumbs, canonical URLs)
- Accessible, mobile-first corporate UX

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Routing | React Router DOM v7 |
| Animation | Framer Motion |
| SEO | React Helmet Async |
| Icons | Lucide React |
| Analytics | Firebase Analytics |
| Hosting | Firebase Hosting |

---

## Architecture

```
src/
├── components/       # Reusable UI (Header, PremiumCTA, ContactForm, etc.)
├── data/             # Content, navigation, CTA presets, SEO routes
├── hooks/            # usePageAnalytics
├── lib/              # Firebase initialization
├── pages/            # Route-level page components
├── services/         # contactService (Firestore/EmailJS-ready)
└── utils/            # motion presets, analytics helpers
```

### Key patterns

- **Data-driven content** — qualifications, pillars, and CTAs live in `src/data/`
- **Service layer** — `contactService.js` abstracts form submission (currently mock; swap provider when ready)
- **Analytics abstraction** — `utils/analytics.js` wraps Firebase Analytics with dev fallbacks
- **Motion system** — standardized Framer Motion presets in `utils/motion.js`

---

## Installation

```bash
npm install
```

Copy environment template and add your Firebase project credentials:

```bash
cp .env.example .env.local
```

---

## Development

```bash
npm run dev
```

Runs at `http://localhost:5173` by default.

---

## Production Build

```bash
npm run build
```

Output: `dist/` (served by Firebase Hosting).

Preview locally:

```bash
npm run preview
```

---

## Firebase Setup

### 1. Login & init (first time)

```bash
firebase login
firebase init hosting
```

Use:

- **Public directory:** `dist`
- **Single-page app:** Yes

### 2. Environment variables

Add to `.env.local` (from Firebase Console → Project settings):

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

Analytics initializes automatically when these are set.

### 3. Deploy

```bash
npm run build
firebase deploy
```

Or combined:

```bash
npm run build && firebase deploy
```

### Hosting configuration

`firebase.json` includes:

- SPA rewrites to `/index.html`
- Long-cache headers for hashed JS/CSS
- Security headers (X-Frame-Options, HSTS, Referrer-Policy, etc.)
- `index.html` no-cache for fresh deploys

---

## Analytics Setup

Events tracked via `src/utils/analytics.js`:

| Event | Trigger |
|-------|---------|
| `page_view` | Route change |
| `cta_click` | Button / CTA clicks |
| `nav_click` | Navigation links |
| `form_submit` | Contact form success |
| `download_corporate_profile` | PDF download clicks |

In development, events log to the console when Firebase is not configured.

---

## SEO Setup

- Per-page `<title>`, description, canonical URL
- Open Graph + Twitter Card metadata
- JSON-LD: WebSite, Organization, EducationalOrganization, LocalBusiness, BreadcrumbList
- `public/robots.txt` and `public/sitemap.xml`
- Font preloading in `index.html`

---

## Scalability Notes

### Contact form backends

Edit `ACTIVE_PROVIDER` in `src/services/contactService.js`:

- `MOCK` — current (client-side simulation)
- `FIRESTORE` — implement `submitToFirestore`
- `EMAILJS` — implement `submitViaEmailJS`
- `CLOUD_FUNCTION` — implement `submitViaCloudFunction`
- `API` — implement `submitViaApi`

### Future enhancements

- CMS integration for qualifications content
- Blog/articles with `SEO` `article` prop
- Real photography replacing gradient visual panels
- Corporate profile PDF in `public/`

---

## Folder Structure

```
rise/
├── public/              # Static assets, robots, sitemap
├── src/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── services/
│   └── utils/
├── firebase.json
├── .env.example
└── README.md
```

---

## Quality Checklist

```bash
npm run lint
npm run build
```

- Responsive: mobile → desktop
- Keyboard navigation + skip link
- Reduced motion support
- No lorem ipsum or fake testimonials

---

## License

Proprietary — Rise Institute. All rights reserved.
