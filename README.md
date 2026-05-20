# Rise Institute Website

Official institutional website for **Rise Institute** — QCTO-accredited occupational training in Midrand, Gauteng.

**GitHub:** [https://github.com/tenderbriefing/rise](https://github.com/tenderbriefing/rise)  
**Production:** [https://riseinstitute.co.za](https://riseinstitute.co.za)  
**Firebase project:** `rise-f62a4`

---

## Project overview

Launch-ready React SPA with:

- Five public pages: Home, About, Qualifications, Corporate & Funding, Contact
- **Admin lead dashboard** (`/admin`) with Firebase Auth
- **Firestore lead capture** (`enquiries` collection)
- **Firebase Analytics** / GA4 conversion events
- SEO, sitemap, Search Console verification support
- Firebase Hosting deployment

---

## Tech stack

React · Vite · Tailwind CSS v4 · React Router · Framer Motion · React Helmet Async · Firebase (Hosting, Firestore, Auth, Analytics) · Lucide React

---

## Local development

```bash
cd /Users/billionaire/Projects/rise
npm install
cp .env.example .env.local
# Add Firebase web app credentials as VITE_* keys (not JSON). Or run:
# firebase apps:sdkconfig web  # then convert output to VITE_FIREBASE_* format
npm run dev
```

---

## Firebase setup

1. Create/use project **rise-f62a4** (or your project).
2. Enable **Firestore** and **Analytics**.
3. Copy web app config into `.env.local`:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
```

4. Link CLI: `firebase use rise-f62a4`

---

## Lead management system (V1)

Internal CRM-style admin at `/admin` for managing website enquiries.

| Route | Purpose |
|-------|---------|
| `/admin/login` | Email/password sign-in (Firebase Auth) |
| `/admin` | Dashboard — stats and recent leads |
| `/admin/leads` | Searchable, filterable lead table + CSV export |
| `/admin/leads/:id` | Lead detail — status, notes, timeline |

**Services:** `src/services/leadService.js`, `src/services/contactService.js`, `src/services/emailService.js`  
**Templates:** `src/templates/autoReplyTemplate.js`, `src/templates/internalLeadTemplate.js`  
**Functions scaffold:** `functions/` (email send on enquiry create — configure SMTP via secrets, do not commit credentials)

### Firebase Authentication (admin)

1. Firebase Console → **Authentication** → **Sign-in method** → enable **Email/Password**
2. **Users** → **Add user** for each admin (no public registration)
3. Ensure `.env.local` includes `VITE_FIREBASE_AUTH_DOMAIN` (e.g. `rise-f62a4.firebaseapp.com`)

Sign in at `https://riseinstitute.co.za/admin/login` (or `/admin/login` locally).

### Firestore `enquiries` schema

| Field | Description |
|-------|-------------|
| `fullName`, `company`, `email`, `phone`, `interest`, `message` | Contact form |
| `source` | `website-contact-form` |
| `status` | `new` → `contacted` → `qualified` → `proposal-sent` → `follow-up` → `closed-won` / `closed-lost` |
| `priority` | `low`, `normal`, `high`, `urgent` |
| `assignedTo`, `notes`, `tags` | Admin-managed |
| `createdAt`, `updatedAt`, `lastContactedAt` | Timestamps |
| `route`, `page`, `userAgent`, `analyticsId` | Attribution |
| `activityLog` | Status/notes timeline |

### CSV export

From `/admin/leads`, export filtered or all leads as `rise-institute-leads-YYYY-MM-DD.csv`.

### Email notifications (architecture)

- **Internal alert:** `info@riseinstitute.co.za` — subject: *New Website Enquiry — Rise Institute*
- **Auto-reply:** enquirer receives *Thank You for Contacting Rise Institute*
- HTML built in `src/templates/`; delivery via Firebase Functions (`functions/src/index.js`) when SMTP is configured

---

## Firestore rules deployment

Rules file: `firestore.rules`:

- Public **create only** on `/enquiries` (validated fields, `status: new` only)
- **Authenticated admins** can read and update leads
- No public read/update/delete; no client access to `mail` queue

```bash
firebase deploy --only firestore:rules
```

Deploy hosting + rules together:

```bash
npm run build
firebase deploy
```

---

## Google Search Console setup

1. Open [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://riseinstitute.co.za`
3. Choose **HTML tag** verification
4. Copy the `content` value from Google
5. Replace in `index.html`:

   ```html
   <meta name="google-site-verification" content="REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE" />
   ```

6. Build and deploy:

   ```bash
   npm run build
   firebase deploy --only hosting
   ```

7. Click **Verify** in Search Console

---

## Sitemap submission

`public/sitemap.xml` lists all primary URLs on `https://riseinstitute.co.za`.

`public/robots.txt` references the sitemap.

After verification:

1. Search Console → **Sitemaps**
2. Submit: `sitemap.xml`

---

## GA4 conversion tracking

Implemented in `src/utils/analytics.js` (Firebase Analytics → GA4 when linked).

| Event | When |
|-------|------|
| `form_start` | First interaction with contact form |
| `form_submit` | Submit attempt |
| `generate_lead` | Successful Firestore submission |
| `export` | Admin CSV export |
| `admin_update` | Admin lead status/notes update |
| `file_download` | Corporate profile PDF |
| `click` / `cta_click` | CTA buttons |
| `contact` | Phone (`tel:`) or email (`mailto:`) clicks |

Link GA4 property in Firebase Console → Project settings → Integrations.

---

## Brand assets & imagery

| Path | Purpose |
|------|---------|
| `public/favicon.svg` | Browser favicon |
| `public/apple-touch-icon.svg` | iOS home screen |
| `src/assets/brand/` | Logo SVG source files |
| `src/assets/images/` | Section photography (see READMEs in subfolders) |
| `src/data/images.js` | General image registry |
| `src/data/homeImages.js` | Hero slideshow slide registry |
| `src/data/imageCredits.js` | Homepage photography attribution |

### Homepage hero slideshow

Six rotating hero backgrounds live in `src/assets/images/home/` (10 seconds each):

- `classroom-training.jpg` — modern classroom / facilitator-led learning
- `boardroom-training.jpg` — diverse corporate strategy session
- `workplace-learning.jpg` — workplace-integrated collaboration
- `agricultural-training.jpg` — agricultural & green economy training
- `ohs-training.jpg` — occupational health & safety
- `youth-classroom-training.jpg` — youth students with facilitator-led classroom learning

Loaded via `import.meta.glob` in `src/data/homeImages.js` and rendered by `HeroSlideshow` (10s crossfade, Ken Burns zoom, pause/play, progress bar). Images appear **only in the hero** — the rest of the homepage is text-led and executive in tone.

If a slide image fails, the slot falls back to a premium gradient (no broken imports).

Subtle South African flag-inspired accents (`sa-green`, `sa-gold`, `sa-blue`, `sa-red`) are used in dividers, eyebrows, and hero controls — not as loud patriotic branding.

---

## Image Credits

Homepage photography is sourced from [Pexels](https://www.pexels.com) under the Pexels License. Full metadata: `src/data/imageCredits.js`.

| Category | Photographer | Platform | Source |
|----------|--------------|----------|--------|
| Modern Classroom Training | Christina Morillo | Pexels | [View photo](https://www.pexels.com/photo/people-sitting-on-chairs-in-front-of-projector-1181406/) |
| Corporate Boardroom Strategy | Rebrand Cities | Pexels | [View photo](https://www.pexels.com/photo/group-of-people-on-a-meeting-1367272/) |
| Workplace Practical Learning | MART PRODUCTION | Pexels | [View photo](https://www.pexels.com/photo/a-people-having-a-business-meeting-7550385/) |
| Agricultural Training | Nirjon Nakib | Pexels | [View photo](https://www.pexels.com/photo/young-man-with-a-bucket-spreading-fertilizer-on-a-crop-field-18185333/) |
| Occupational Health & Safety | Mikael Blomkvist | Pexels | [View photo](https://www.pexels.com/photo/a-man-and-a-woman-with-ppe-s-talking-at-a-construction-site-8961065/) |
| Youth Classroom Learning | RDNE Stock project | Pexels | [View photo](https://www.pexels.com/photo/teacher-discussing-his-lesson-to-his-students-7092352/) |

**License note:** Free to use under the Pexels License (attribution appreciated, not required).

---

## Firebase Hosting deployment

```bash
npm run build
firebase deploy --only hosting
```

Full deploy (hosting + Firestore rules):

```bash
npm run build
firebase deploy
```

---

## Quality checks

```bash
npm run lint
npm run build
```

---

## Folder structure

```
src/
  components/     UI including ContactForm, admin CRM components
  components/admin/  LeadTable, LeadFilters, ExportCSVButton, etc.
  contexts/       AuthContext (Firebase Auth)
  data/           Content, leadConstants, images registry
  hooks/          usePageAnalytics
  layouts/        AdminLayout
  lib/            Firebase app, Firestore, Auth, Analytics
  pages/          Public route pages
  pages/admin/    AdminLogin, AdminDashboard, LeadsList, LeadDetails
  services/       contactService, leadService, emailService
  templates/      HTML email templates (auto-reply, internal alert)
  assets/         brand + images
functions/        Cloud Functions scaffold (email on enquiry create)
public/           favicon, sitemap, robots.txt
firestore.rules   Security rules (public create, admin read/update)
firebase.json     Hosting + Firestore config
```

---

## License

Proprietary — Rise Institute.
