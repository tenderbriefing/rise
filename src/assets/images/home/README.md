# Homepage imagery

Add production photography here. The UI loads files automatically via `import.meta.glob` — no code changes required.

## Required images

| File | Category |
|------|----------|
| `classroom-training.jpg` | Modern classroom / facilitator-led learning |
| `boardroom-training.jpg` | Corporate boardroom strategy session |
| `workplace-learning.jpg` | Workplace practical / on-the-job training |
| `agricultural-training.jpg` | Agricultural / farming skills |
| `ohs-training.jpg` | Occupational health & safety / PPE |

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

## Attribution

Credits for the current homepage photos live in `src/data/imageCredits.js` and `README.md` (Image Credits section).

## Behaviour without images

If a file is missing or fails to load, the slot shows a **premium gradient panel** with a Lucide icon and descriptive overlay. The build never breaks on missing files.

## Image guidelines

- Professional, authentic African corporate/educational environments
- Minimum ~1200px wide recommended
- Optimise for web (target &lt; 250KB per image)
- Avoid generic stock-photo aesthetics
