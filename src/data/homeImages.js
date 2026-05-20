/**
 * Homepage hero slideshow — photos in src/assets/images/home/
 * Credits: src/data/imageCredits.js
 */
const homeImageModules = import.meta.glob('../assets/images/home/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

function resolveHomeImage(filename) {
  const entry = Object.entries(homeImageModules).find(([path]) =>
    path.toLowerCase().includes(filename.toLowerCase()),
  )
  return entry ? entry[1] : null
}

export const HERO_SLIDE_INTERVAL_MS = 10_000

export const heroSlides = [
  {
    id: 'classroom-training',
    title: 'Modern Classroom Training',
    image: resolveHomeImage('classroom-training'),
    imageFile: 'classroom-training.jpg',
    fallbackGradient: 'from-emerald-900 via-primary to-green-700',
    alt: 'Diverse South African professionals in a modern classroom training session with facilitator and presentation screen',
  },
  {
    id: 'boardroom-training',
    title: 'Corporate Boardroom Strategy',
    image: resolveHomeImage('boardroom-training'),
    imageFile: 'boardroom-training.jpg',
    fallbackGradient: 'from-forest via-primary to-emerald-800',
    alt: 'Diverse group of South African business professionals in a strategic boardroom meeting',
  },
  {
    id: 'workplace-learning',
    title: 'Workplace Practical Learning',
    image: resolveHomeImage('workplace-learning'),
    imageFile: 'workplace-learning.jpg',
    fallbackGradient: 'from-charcoal via-primary to-emerald-700',
    alt: 'Diverse coworkers collaborating on workplace-integrated occupational learning in a modern office',
  },
  {
    id: 'agricultural-training',
    title: 'Agricultural Training',
    image: resolveHomeImage('agricultural-training'),
    imageFile: 'agricultural-training.jpg',
    fallbackGradient: 'from-green-900 via-primary to-accent',
    alt: 'Young learner receiving hands-on agricultural training while applying fertilizer in a crop field',
  },
  {
    id: 'ohs-training',
    title: 'Occupational Health & Safety',
    image: resolveHomeImage('ohs-training'),
    imageFile: 'ohs-training.jpg',
    fallbackGradient: 'from-slate-800 via-primary to-emerald-800',
    alt: 'Professionals in PPE conducting an occupational health and safety briefing at a construction site',
  },
  {
    id: 'youth-classroom-training',
    title: 'Youth Classroom Learning',
    image: resolveHomeImage('youth-classroom-training'),
    imageFile: 'youth-classroom-training.jpg',
    fallbackGradient: 'from-emerald-800 via-primary to-sa-green',
    alt: 'Youth students in a classroom with a facilitator at the front delivering a lesson',
  },
]

/** @param {string} id */
export function getHeroSlideById(id) {
  return heroSlides.find((item) => item.id === id) ?? null
}

/** @deprecated Use heroSlides — kept for legacy components */
export const homeImages = heroSlides

/** @deprecated */
export const boardroomHomeImage = getHeroSlideById('boardroom-training')

/** @deprecated */
export const qualificationPreviewImages = [
  getHeroSlideById('agricultural-training'),
  getHeroSlideById('workplace-learning'),
  getHeroSlideById('ohs-training'),
].filter(Boolean)
