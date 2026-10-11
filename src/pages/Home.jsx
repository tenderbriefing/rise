import SEO from '../components/SEO'
import Button from '../components/Button'
import SectionHeader from '../components/SectionHeader'
import PremiumCTA from '../components/PremiumCTA'
import HeroSlideshow from '../components/HeroSlideshow'
import SectionShell from '../components/SectionShell'
import StatsStrip from '../components/StatsStrip'
import ProgrammeCard from '../components/ProgrammeCard'
import { getCanonical } from '../data/seoRoutes'
import { ctaPresets } from '../data/ctaPresets'
import { allQualifications, seoKeywords } from '../data/qualifications'
import { corporateHomeStats } from '../data/corporateSolutions'
import { Cpu, Leaf, ShieldCheck, GraduationCap, Building2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { easePremium, staggerContainer, staggerItem } from '../utils/motion'

const audiencePaths = [
  {
    title: 'For Learners',
    headline: 'Find a course',
    description: 'Compare NQF level, duration, and credits — then enquire about enrolment.',
    to: '/programmes',
    cta: 'Browse Courses',
    icon: GraduationCap,
  },
  {
    title: 'For Employers',
    headline: 'Train your workforce',
    description: 'Learnerships, B-BBEE skills development, and Section 12H tax incentives.',
    to: '/corporate-funding',
    cta: 'Corporate Solutions',
    icon: Building2,
  },
]

const academies = [
  {
    label: '4IR Academy',
    path: '/4ir-academy',
    description: 'AI · Data · Cloud · IoT',
    icon: Cpu,
  },
  {
    label: 'Agriculture',
    path: '/agriculture-academy',
    description: 'Crop · Poultry · Livestock',
    icon: Leaf,
  },
  {
    label: 'OHS',
    path: '/occupational-health-safety',
    description: 'Safety · Compliance · Risk',
    icon: ShieldCheck,
  },
]

export default function Home() {
  const cta = ctaPresets.home
  const featuredCourses = allQualifications.slice(0, 6)

  return (
    <>
      <SEO
        title="Rise Institute | QCTO Courses · NQF Qualifications · Skills for Africa"
        description="Browse QCTO-accredited courses with clear NQF levels, duration, credits, and learning outcomes. Partner with Rise Institute for learnerships and workforce development."
        keywords={seoKeywords}
        canonical={getCanonical('/')}
        courses={allQualifications}
      />

      <HeroSlideshow />

      <StatsStrip stats={corporateHomeStats} variant="page" />

      <SectionShell tone="white" padding="default" id="home-paths">
        <SectionHeader
          eyebrow="Get started"
          title="Choose your path"
          description="One place for learners and employers — pick the route that fits."
        />
        <motion.div
          className="mt-12 grid gap-5 md:grid-cols-2"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {audiencePaths.map((path) => {
            const Icon = path.icon
            return (
              <motion.div key={path.title} variants={staggerItem}>
                <Link
                  to={path.to}
                  className="group block rounded-3xl border border-border bg-white p-8 shadow-soft transition-colors hover:border-accent/30"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3, ease: easePremium }}
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <p className="mt-5 text-sm font-semibold text-accent">{path.title}</p>
                    <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight text-ink">
                      {path.headline}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-muted">{path.description}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-accent">
                      {path.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </SectionShell>

      <SectionShell tone="pattern" padding="default">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Featured Courses"
            title="Popular qualifications"
            description="Every course shows NQF level, duration, credits, and learning outcomes."
            align="left"
            className="!mb-0"
          />
          <Button
            to="/programmes"
            variant="primary"
            analyticsLabel="view_all_courses_home"
            analyticsLocation="home_featured"
          >
            View All Courses
          </Button>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredCourses.map((qual) => (
            <ProgrammeCard key={qual.slug} {...qual} faculty={qual.facultyTitle} compact />
          ))}
        </div>
      </SectionShell>

      <SectionShell tone="white" padding="compact">
        <SectionHeader
          eyebrow="Academies"
          title="Specialised training pathways"
          description="Digital skills, agriculture, and workplace safety."
        />
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {academies.map(({ label, path, description, icon: Icon }) => (
            <li key={path}>
              <Link
                to={path}
                className="group flex h-full flex-col rounded-3xl border border-border bg-white p-6 shadow-soft transition-all hover:border-accent/30 hover:shadow-card"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="mt-4 font-heading text-lg font-bold tracking-tight text-ink group-hover:text-accent">
                  {label}
                </span>
                <span className="mt-2 text-sm text-muted">{description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </SectionShell>

      <PremiumCTA {...cta} location="home_footer" variant="forest" />
    </>
  )
}
