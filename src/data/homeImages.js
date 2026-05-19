import {
  BriefcaseBusiness,
  Leaf,
  Presentation,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'

/**
 * Homepage imagery — photos in src/assets/images/home/
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

export const homeImages = [
  {
    id: 'classroom-training',
    title: 'Modern Classroom Training',
    description:
      'Facilitator-led learning environments that prepare learners for workplace success.',
    image: resolveHomeImage('classroom-training'),
    imageFile: 'classroom-training.jpg',
    icon: Presentation,
    fallbackGradient: 'from-emerald-900 via-primary to-green-700',
    alt: 'Professional classroom training session with adult learners and facilitator',
  },
  {
    id: 'boardroom-training',
    title: 'Corporate Boardroom Strategy',
    description:
      'Strategic engagement with employers and institutions on skills development outcomes.',
    image: resolveHomeImage('boardroom-training'),
    imageFile: 'boardroom-training.jpg',
    icon: UsersRound,
    fallbackGradient: 'from-forest via-primary to-emerald-800',
    alt: 'Corporate boardroom strategy session with professionals discussing skills development',
  },
  {
    id: 'workplace-learning',
    title: 'Workplace Practical Learning',
    description:
      'Workplace-integrated exposure aligned to QCTO occupational qualification requirements.',
    image: resolveHomeImage('workplace-learning'),
    imageFile: 'workplace-learning.jpg',
    icon: BriefcaseBusiness,
    fallbackGradient: 'from-charcoal via-primary to-emerald-700',
    alt: 'Workplace practical learning session with trainees receiving hands-on occupational training',
  },
  {
    id: 'agricultural-training',
    title: 'Agricultural Training',
    description:
      'Programmes supporting food security, productivity, and Green Economy workforce development.',
    image: resolveHomeImage('agricultural-training'),
    imageFile: 'agricultural-training.jpg',
    icon: Leaf,
    fallbackGradient: 'from-green-900 via-primary to-accent',
    alt: 'Agricultural training environment with learners engaging in practical farming skills',
  },
  {
    id: 'ohs-training',
    title: 'Occupational Health & Safety',
    description:
      'OHS compliance, risk assessment, and workplace safety systems for every industry.',
    image: resolveHomeImage('ohs-training'),
    imageFile: 'ohs-training.jpg',
    icon: ShieldCheck,
    fallbackGradient: 'from-slate-800 via-primary to-emerald-800',
    alt: 'Occupational health and safety training session with professionals in PPE',
  },
]

/** @param {string} id */
export function getHomeImageById(id) {
  return homeImages.find((item) => item.id === id) ?? null
}

export const heroHomeImage = getHomeImageById('classroom-training')
export const boardroomHomeImage = getHomeImageById('boardroom-training')

export const qualificationPreviewImages = [
  getHomeImageById('agricultural-training'),
  getHomeImageById('workplace-learning'),
  getHomeImageById('ohs-training'),
].filter(Boolean)
