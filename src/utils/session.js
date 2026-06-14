function generateId() {
  // Short, non-identifying random id. Persisted per-browser for anonymous session attribution.
  return `rs_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
}

const KEY = 'rise_session_id'

export function getSessionId() {
  if (typeof window === 'undefined') return null
  try {
    const existing = window.localStorage.getItem(KEY)
    if (existing) return existing
    const next = generateId()
    window.localStorage.setItem(KEY, next)
    return next
  } catch {
    return null
  }
}

