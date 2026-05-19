# Rise Institute Website

Official website for **Rise Institute**, a QCTO-accredited occupational training institution based in Midrand, Gauteng. The site is designed for corporate clients, government stakeholders, SETAs, and funding partners.

**Repository:** [https://github.com/tenderbriefing/rise](https://github.com/tenderbriefing/rise)

## Tech Stack

- React + Vite
- Tailwind CSS
- React Router DOM
- Lucide React icons
- Framer Motion
- React Helmet Async
- Firebase Hosting

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local URL shown in the terminal (typically `http://localhost:5173`).

## Production Build

```bash
npm run build
```

Build output is written to the `dist/` directory.

## Firebase Hosting Deployment

This project is configured for **Firebase Hosting only** (see `firebase.json`).

```bash
firebase login
firebase init hosting
firebase deploy
```

When running `firebase init hosting`, use:

- **Public directory:** `dist`
- **Single-page app:** Yes (rewrite all routes to `/index.html`)

Deploy after each production build:

```bash
npm run build && firebase deploy
```

## Project Structure

```
src/
  components/   # Reusable UI components
  data/         # Content and navigation data
  pages/        # Route pages
  utils/        # Animation utilities
public/         # Static assets, robots.txt, sitemap.xml
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About Us |
| `/qualifications` | QCTO Qualifications |
| `/corporate-funding` | Corporate & Funding |
| `/contact` | Contact |

## License

Proprietary — Rise Institute.
