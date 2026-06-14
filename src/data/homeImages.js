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
    description: 'Facilitator-led learning in professional training environments across Gauteng.',
    image: resolveHomeImage('classroom-training'),
    imageFile: 'classroom-training.jpg',
    fallbackGradient: 'from-primary-dark via-primary to-primary-dark',
    alt: 'Diverse South African professionals in a modern classroom training session with facilitator and presentation screen',
  },
  {
    id: 'boardroom-training',
    title: 'Corporate Boardroom Strategy',
    description: 'Executive skills development aligned to corporate governance and compliance.',
    image: resolveHomeImage('boardroom-training'),
    imageFile: 'boardroom-training.jpg',
    fallbackGradient: 'from-primary via-primary-dark to-primary',
    alt: 'Diverse group of South African business professionals in a strategic boardroom meeting',
  },
  {
    id: 'workplace-learning',
    title: 'Workplace Practical Learning',
    description: 'Workplace-integrated occupational training with real on-the-job experience.',
    image: resolveHomeImage('workplace-learning'),
    imageFile: 'workplace-learning.jpg',
    fallbackGradient: 'from-navy-dark via-navy to-navy-dark',
    alt: 'Diverse coworkers collaborating on workplace-integrated occupational learning in a modern office',
  },
  {
    id: 'agricultural-training',
    title: 'Agricultural Training',
    description: 'Hands-on agricultural skills for sustainable farming and food security.',
    image: resolveHomeImage('agricultural-training'),
    imageFile: 'agricultural-training.jpg',
    fallbackGradient: 'from-primary-dark via-primary to-primary-dark',
    alt: 'Young learner receiving hands-on agricultural training while applying fertilizer in a crop field',
  },
  {
    id: 'ohs-training',
    title: 'Occupational Health & Safety',
    description: 'Workplace safety training for construction, mining, and industrial sectors.',
    image: resolveHomeImage('ohs-training'),
    imageFile: 'ohs-training.jpg',
    fallbackGradient: 'from-navy-dark via-navy to-navy-dark',
    alt: 'Professionals in PPE conducting an occupational health and safety briefing at a construction site',
  },
  {
    id: 'youth-classroom-training',
    title: 'Youth Classroom Learning',
    description: 'Structured classroom delivery preparing youth for accredited occupational pathways.',
    image: resolveHomeImage('youth-classroom-training'),
    imageFile: 'youth-classroom-training.jpg',
    fallbackGradient: 'from-primary-dark via-primary to-primary-dark',
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
