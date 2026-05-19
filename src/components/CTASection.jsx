import PremiumCTA from './PremiumCTA'

/** @deprecated Use PremiumCTA directly — kept for backward compatibility */
export default function CTASection(props) {
  return <PremiumCTA {...props} location={props.location || 'legacy_cta'} />
}
