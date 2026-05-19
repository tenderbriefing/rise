import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getFirebaseAnalytics } from '../lib/firebase'
import { trackPageView } from '../utils/analytics'
import { routeMeta } from '../data/seoRoutes'

export function usePageAnalytics() {
  const location = useLocation()

  useEffect(() => {
    getFirebaseAnalytics()
  }, [])

  useEffect(() => {
    const meta = routeMeta[location.pathname]
    const title = meta?.title || document.title
    trackPageView(location.pathname, title)
  }, [location.pathname])
}
