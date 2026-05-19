/**
 * Institutional image registry.
 *
 * Add real photography to src/assets/images/<section>/ and set `src` below.
 * Until assets exist, components fall back to gradient visual panels (no broken imports).
 *
 * Expected files (examples):
 * - src/assets/images/home/hero.jpg
 * - src/assets/images/about/classroom.jpg
 * - src/assets/images/qualifications/agriculture.jpg
 * - src/assets/images/corporate/workplace.jpg
 * - src/assets/images/contact/office.jpg
 * - src/assets/brand/rise-logo.svg (also in public)
 */

// Uncomment and import when real assets are added:
// import homeHeroImg from '../assets/images/home/hero.jpg'

export const imageRegistry = {
  homeHero: {
    src: null,
    alt: 'Rise Institute occupational training — professional skills development in Gauteng',
    variant: 'corporate',
    folder: 'home',
  },
  agricultureTraining: {
    src: null,
    alt: 'Sustainable agriculture occupational training at Rise Institute',
    variant: 'agriculture',
    folder: 'qualifications',
  },
  corporateTraining: {
    src: null,
    alt: 'Corporate workplace-integrated learning and skills development',
    variant: 'corporate',
    folder: 'corporate',
  },
  safetyTraining: {
    src: null,
    alt: 'Occupational health and safety practitioner training',
    variant: 'safety',
    folder: 'qualifications',
  },
  classroomLearning: {
    src: null,
    alt: 'Facilitator-led classroom learning at Rise Institute, Midrand',
    variant: 'classroom',
    folder: 'about',
  },
  workplaceLearning: {
    src: null,
    alt: 'Structured workplace experience and practical learning',
    variant: 'workplace',
    folder: 'corporate',
  },
  midrandOffice: {
    src: null,
    alt: 'Rise Institute training centre at Maxwell Office Park, Midrand, Gauteng',
    variant: 'workplace',
    folder: 'contact',
  },
  brandLogo: {
    src: '/favicon.svg',
    alt: 'Rise Institute logo',
    variant: null,
    folder: 'brand',
  },
  brandMark: {
    src: null,
    alt: 'Rise Institute mark',
    variant: null,
    folder: 'brand',
  },
}

/** @param {keyof typeof imageRegistry} key */
export function getImage(key) {
  return imageRegistry[key] ?? null
}

/** @param {keyof typeof imageRegistry} key */
export function hasImageAsset(key) {
  const entry = imageRegistry[key]
  return Boolean(entry?.src)
}
