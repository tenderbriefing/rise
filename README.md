# Rise Institute Website

Official institutional website for **Rise Institute** — QCTO-accredited occupational training in Midrand, Gauteng.

**GitHub:** [https://github.com/tenderbriefing/rise](https://github.com/tenderbriefing/rise)  
**Production:** [https://riseinstitute.co.za](https://riseinstitute.co.za)  
**Firebase project:** `rise-f62a4`

---

## Project overview

Launch-ready React SPA with:

- Five pages: Home, About, Qualifications, Corporate & Funding, Contact
- **Firestore lead capture** (`enquiries` collection)
- **Firebase Analytics** / GA4 conversion events
- SEO, sitemap, Search Console verification support
- Firebase Hosting deployment

---

## Tech stack

React · Vite · Tailwind CSS v4 · React Router · Framer Motion · React Helmet Async · Firebase (Hosting, Firestore, Analytics) · Lucide React

---

## Local development

```bash
cd /Users/billionaire/Projects/rise
npm install
cp .env.example .env.local
# Add Firebase web app credentials to .env.local
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

## Firestore enquiry collection

Contact form writes to **`enquiries`** with:

- `fullName`, `company`, `email`, `phone`, `interest`, `message`
- `source`: `website-contact-form`
- `status`: `new`
- `createdAt`: server timestamp
- `page`, `userAgent`

Service: `src/services/contactService.js`  
Future notifications: `src/services/leadNotificationService.js` (placeholders for Cloud Functions)

---

## Firestore rules deployment

Rules file: `firestore.rules` — public **create only** on `/enquiries`, no public read/update/delete.

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
| `src/data/homeImages.js` | Homepage visual story (5 strategic slots) |
| `src/data/imageCredits.js` | Homepage photography attribution |

### Homepage imagery system

Place real photos in `src/assets/images/home/`:

- `classroom-training.jpg` — hero & classroom learning
- `boardroom-training.jpg` — corporate positioning section
- `workplace-learning.jpg` — workplace-integrated learning
- `agricultural-training.jpg` — agriculture qualifications preview
- `ohs-training.jpg` — occupational health & safety preview

Files are picked up automatically via Vite `import.meta.glob`. **No code changes** are needed when images are added.

If an image fails to load, the UI falls back to **premium gradients** with Lucide icons (no broken imports).

Components: `ImageFeatureCard`, `ImageFeatureGrid`, `HomeVisualStory`, updated `HomeHero`.

---

## Image Credits

Homepage photography is sourced from [Pexels](https://www.pexels.com) under the Pexels License. Full metadata: `src/data/imageCredits.js`.

| Category | Photographer | Platform | Source |
|----------|--------------|----------|--------|
| Modern Classroom Training | fauxels | Pexels | [View photo](https://www.pexels.com/photo/man-standing-beside-people-sitting-beside-table-with-laptops-3184395/) |
| Corporate Boardroom Strategy | Pavel Danilyuk | Pexels | [View photo](https://www.pexels.com/photo/a-group-of-men-in-black-suit-sitting-near-the-table-while-having-conversation-5520287/) |
| Workplace Practical Learning | SHVETS production | Pexels | [View photo](https://www.pexels.com/photo/woman-explaining-detail-of-project-to-colleague-7176287/) |
| Agricultural Training | Şeyhmus Kino | Pexels | [View photo](https://www.pexels.com/photo/rural-african-farmers-with-agricultural-supplies-30403190/) |
| Occupational Health & Safety | Mikael Blomkvist | Pexels | [View photo](https://www.pexels.com/photo/a-man-and-a-woman-with-ppe-s-talking-at-a-construction-site-8961065/) |

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
  components/     UI including ContactForm, BrandLogo, PremiumCTA
  data/           Content, images registry, CTA presets
  hooks/          usePageAnalytics
  lib/            Firebase app, Firestore, Analytics
  pages/          Route pages
  services/       contactService, leadNotificationService
  assets/         brand + images (placeholders)
public/           favicon, sitemap, robots.txt
firestore.rules   Security rules
firebase.json   Hosting + Firestore config
```

---

## License

Proprietary — Rise Institute.
