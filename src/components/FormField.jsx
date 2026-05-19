import { motion } from 'framer-motion'

export default function FormField({
  id,
  name,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  required = false,
  autoComplete,
  as = 'input',
  rows = 5,
  children,
  options,
}) {
  const hasValue = Boolean(value?.toString().trim())
  const hasError = Boolean(error)

  const baseInputClass = `peer w-full rounded-xl border bg-white px-4 pb-3 pt-6 text-charcoal transition-all duration-200 placeholder-transparent focus:outline-none focus:ring-2 ${
    hasError
      ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
      : 'border-border hover:border-primary/40 focus:border-primary focus:ring-primary/20'
  }`

  const labelClass = `pointer-events-none absolute left-4 transition-all duration-200 ${
    hasValue
      ? 'top-2 text-xs font-medium text-primary'
      : 'top-4 text-sm text-muted peer-focus:top-2 peer-focus:text-xs peer-focus:font-medium peer-focus:text-primary'
  }`

  return (
    <div className="relative">
      {as === 'select' ? (
        <>
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${id}-error` : undefined}
            className={`${baseInputClass} appearance-none`}
          >
            {options}
          </select>
          <label htmlFor={id} className={labelClass}>
            {label}
            {required && <span className="text-primary"> *</span>}
          </label>
        </>
      ) : as === 'textarea' ? (
        <>
          <textarea
            id={id}
            name={name}
            rows={rows}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${id}-error` : undefined}
            className={`${baseInputClass} resize-y min-h-[140px]`}
            placeholder=" "
          />
          <label htmlFor={id} className={labelClass}>
            {label}
            {required && <span className="text-primary"> *</span>}
          </label>
        </>
      ) : (
        <>
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            required={required}
            autoComplete={autoComplete}
            aria-invalid={hasError}
            aria-describedby={hasError ? `${id}-error` : undefined}
            className={baseInputClass}
            placeholder=" "
          />
          <label htmlFor={id} className={labelClass}>
            {label}
            {required && <span className="text-primary"> *</span>}
          </label>
        </>
      )}

      {children}

      {hasError && (
        <motion.p
          id={`${id}-error`}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-xs font-medium text-red-600"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}
