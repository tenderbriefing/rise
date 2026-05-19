const sizes = {
  default: 'max-w-7xl',
  content: 'max-w-5xl',
  narrow: 'max-w-3xl',
}

export default function Container({
  children,
  size = 'default',
  className = '',
  as: Component = 'motion.div',
}) {
  const Tag = Component === 'motion.div' ? 'div' : Component
  return (
    <Tag className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizes[size]} ${className}`}>
      {children}
    </Tag>
  )
}
