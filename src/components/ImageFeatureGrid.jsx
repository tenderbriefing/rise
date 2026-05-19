import { motion } from 'framer-motion'
import ImageFeatureCard from './ImageFeatureCard'
import Container from './Container'
import SectionHeader from './SectionHeader'
import AnimatedSection from './AnimatedSection'
import { homeImages } from '../data/homeImages'
import { staggerContainer } from '../utils/motion'

export default function ImageFeatureGrid() {
  return (
    <AnimatedSection className="section-padding bg-mint/50">
      <Container>
        <SectionHeader
          eyebrow="Learning Environments"
          title="Learning Environments Built for Real-World Impact"
          description="From classroom instruction to workplace exposure, Rise Institute connects structured learning with the practical environments where skills are applied."
        />
        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {homeImages.map((item, index) => (
            <motion.div
              key={item.id}
              className={index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: index * 0.08 },
                },
              }}
            >
              <ImageFeatureCard
                title={item.title}
                description={item.description}
                image={item.image}
                alt={item.alt}
                icon={item.icon}
                fallbackGradient={item.fallbackGradient}
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </AnimatedSection>
  )
}
