import { Link } from 'react-router-dom'
import { ArrowRight, Cpu, Leaf, ShieldCheck } from 'lucide-react'
import Container from './Container'
import AnimatedSection from './AnimatedSection'

const academies = [
  {
    label: '4IR Academy',
    path: '/4ir-academy',
    description: 'AI, data, cloud & IoT qualifications for digital workforce pipelines',
    icon: Cpu,
  },
  {
    label: 'Agriculture Academy',
    description: 'Crop, poultry & livestock programmes for agri-sector partners',
    path: '/agriculture-academy',
    icon: Leaf,
  },
  {
    label: 'OHS Academy',
    path: '/occupational-health-safety',
    description: 'Workplace safety qualifications for industrial compliance',
    icon: ShieldCheck,
  },
]

export default function AcademyLinksBand() {
  return (
    <AnimatedSection className="section-padding-compact relative overflow-hidden border-y border-border bg-ivory">
      <Container className="relative z-10">
        <p className="text-center text-sm font-semibold text-accent">Academies</p>
        <p className="mx-auto mt-2 max-w-2xl text-center font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Specialised training pathways
        </p>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted">
          Choose a faculty for learnership design, workplace hosting, and QCTO-aligned delivery.
        </p>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {academies.map(({ label, path, description, icon: Icon }) => (
            <li key={path}>
              <Link
                to={path}
                className="group flex h-full flex-col rounded-sm border border-border bg-white p-6 shadow-soft transition-all hover:border-navy/25 hover:shadow-card"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-navy/10 text-navy">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="mt-4 font-heading text-base font-bold text-ink group-hover:text-navy">
                  {label}
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {description}
                </span>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy">
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
