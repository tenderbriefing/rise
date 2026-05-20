import { motion } from 'framer-motion'
import Container from './Container'
import Button from './Button'
import SectionHeader from './SectionHeader'
import ImageFeatureCard from './ImageFeatureCard'
import AnimatedSection from './AnimatedSection'
import { boardroomHomeImage, qualificationPreviewImages } from '../data/homeImages'
import { slideInRight, slideIn } from '../utils/motion'

export function CorporatePositioningSection() {
  const image = boardroomHomeImage

  return (
    <AnimatedSection className="section-padding section-surface">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={slideIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <SectionHeader
              eyebrow="Corporate Partnership"
              title="A Strategic Training Partner for Corporates and Public Institutions"
              align="left"
              description="Rise Institute works with employers, public institutions, and funding partners to deliver skills development programmes that support compliance, workforce pipelines, and measurable economic participation."
            />
            <div className="mt-8">
              <Button
                to="/contact"
                variant="primary"
                size="lg"
                analyticsLabel="partner_corporate_section"
                analyticsLocation="home_corporate_story"
              >
                Partner With Us
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <ImageFeatureCard
              title={image.title}
              description={image.description}
              image={image.image}
              alt={image.alt}
              icon={image.icon}
              fallbackGradient={image.fallbackGradient}
              aspectClass="aspect-[5/4] min-h-[320px]"
              className="shadow-card"
            />
          </motion.div>
        </div>
      </Container>
    </AnimatedSection>
  )
}

export function QualificationsPreviewSection() {
  return (
    <AnimatedSection className="section-padding bg-light">
      <Container>
        <SectionHeader
          eyebrow="Our Programmes"
          title="Occupational Qualifications Across Key Economic Sectors"
          description="QCTO-accredited programmes in agriculture, workplace-integrated learning, and occupational health and safety — designed for institutional and corporate implementation."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {qualificationPreviewImages.map((item) => (
            <ImageFeatureCard
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              alt={item.alt}
              icon={item.icon}
              fallbackGradient={item.fallbackGradient}
              aspectClass="aspect-[3/4] min-h-[280px]"
            />
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            to="/qualifications"
            variant="primary"
            size="lg"
            analyticsLabel="explore_qualifications_preview"
            analyticsLocation="home_qualifications_preview"
          >
            Explore Our Qualifications
          </Button>
          <Button
            to="/corporate-funding"
            variant="secondary"
            size="lg"
            analyticsLabel="corporate_funding_preview"
            analyticsLocation="home_qualifications_preview"
          >
            Corporate &amp; Funding Solutions
          </Button>
        </div>
      </Container>
    </AnimatedSection>
  )
}

export default function HomeVisualStory() {
  return (
    <>
      <CorporatePositioningSection />
      <QualificationsPreviewSection />
    </>
  )
}
