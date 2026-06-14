import { Link } from 'react-router-dom'
import { ArrowRight, Cpu, Leaf, ShieldCheck } from 'lucide-react'
import Container from './Container'
import AnimatedSection from './AnimatedSection'

const academies = [
  {
    label: '4IR Academy',
    path: '/4ir-academy',
    description: 'AI, data science, cloud & IoT qualifications',
    icon: Cpu,
  },
  {
    label: 'Agriculture Academy',
    path: '/agriculture-academy',
    description: 'Crop, poultry & livestock occupational training',
    icon: Leaf,
  },
  {
    label: 'OHS Academy',
    path: '/occupational-health-safety',
    description: 'Workplace health, safety & compliance',
    icon: ShieldCheck,
  },
]

export default function AcademyLinksBand() {
  return (
    <AnimatedSection className="section-padding-compact relative overflow-hidden border-y-2 border-sa-gold/30 bg-navy-dark">
      <div className="hero-decor-dots pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-sa-gold" aria-hidden="true" />
      <Container className="relative z-10">
        <p className="eyebrow-executive-light text-center">Faculty Pathways</p>
        <p className="mx-auto mt-2 max-w-2xl text-center font-heading text-xl font-bold text-white sm:text-2xl">
          Explore our specialised academies
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {academies.map(({ label, path, description, icon: Icon }) => (
            <li key={path}>
              <Link
                to={path}
                className="group flex h-full flex-col rounded-sm border border-white/15 bg-white/5 p-5 transition-colors hover:border-sa-gold/40 hover:bg-white/10"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-sa-gold/15 text-sa-gold">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="mt-4 font-heading text-base font-bold text-white group-hover:text-sa-gold">
                  {label}
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-white/70">
                  {description}
                </span>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-sa-gold">
                  View academy
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </AnimatedSection>
  )
}
