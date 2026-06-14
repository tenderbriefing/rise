import { useEffect, useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'
import SectionHeader from '../../components/SectionHeader'
import AnalyticsSummaryCards from '../../components/admin/analytics/AnalyticsSummaryCards'
import DateRangeFilter from '../../components/admin/analytics/DateRangeFilter'
import LeadSourceChart from '../../components/admin/analytics/LeadSourceChart'
import ConversionFunnelChart from '../../components/admin/analytics/ConversionFunnelChart'
import DeviceBreakdownChart from '../../components/admin/analytics/DeviceBreakdownChart'
import TopPagesTable from '../../components/admin/analytics/TopPagesTable'
import CTAConversionTable from '../../components/admin/analytics/CTAConversionTable'
import CorporateInterestChart from '../../components/admin/analytics/CorporateInterestChart'
import QualificationInterestHeatmap from '../../components/admin/analytics/QualificationInterestHeatmap'
import { getEventsByDateRange } from '../../services/analyticsEventService'
import { fetchLeads } from '../../services/leadService'
import {
  calculateCTAConversions,
  calculateCorporateInterest,
  calculateDeviceBreakdown,
  calculateFunnel,
  calculateLeadSources,
  calculateQualificationInterest,
  calculateTopPages,
} from '../../utils/analyticsAggregations'

function startOfDay(d) {
  const date = new Date(d)
  date.setHours(0, 0, 0, 0)
  return date
}

function endOfDay(d) {
  const date = new Date(d)
  date.setHours(23, 59, 59, 999)
  return date
}

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [events, setEvents] = useState([])
  const [leads, setLeads] = useState([])

  const [range, setRange] = useState(() => {
    const end = endOfDay(new Date())
    const start = startOfDay(new Date(Date.now() - 1000 * 60 * 60 * 24 * 30))
    return { start, end }
  })

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const [eventsData, leadsData] = await Promise.all([
          getEventsByDateRange(range.start, range.end),
          fetchLeads(),
        ])
        if (cancelled) return
        setEvents(eventsData)
        setLeads(leadsData)
      } catch (err) {
        if (!cancelled) setError(err?.message || 'Failed to load analytics')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [range.start, range.end])

  const summary = useMemo(() => {
    const funnel = calculateFunnel(events)
    return {
      events: events.length,
      sessions: new Set(events.map((e) => e.sessionId).filter(Boolean)).size,
      leads: leads.length,
      conversionRate:
        funnel.page_views > 0 ? Math.round((funnel.generated_leads / funnel.page_views) * 1000) / 10 : 0,
    }
  }, [events, leads])

  const leadSources = useMemo(() => calculateLeadSources(events, leads), [events, leads])
  const funnel = useMemo(() => calculateFunnel(events), [events])
  const qualification = useMemo(() => calculateQualificationInterest(events), [events])
  const topPages = useMemo(() => calculateTopPages(events, leads), [events, leads])
  const ctas = useMemo(() => calculateCTAConversions(events, leads), [events, leads])
  const corporate = useMemo(() => calculateCorporateInterest(events), [events])
  const devices = useMemo(() => calculateDeviceBreakdown(events), [events])

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading analytics" />
      </div>
    )
  }

  if (error) {
    return (
      <p className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
        {error}
      </p>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-charcoal sm:text-3xl">Analytics</h1>
          <p className="mt-1 text-muted">
            Lead generation intelligence across traffic, behaviour, and conversion.
          </p>
        </div>
        <DateRangeFilter
          start={range.start}
          end={range.end}
          onChange={(next) => setRange({ start: startOfDay(next.start), end: endOfDay(next.end) })}
        />
      </div>

      <AnalyticsSummaryCards summary={summary} />

      <div className="grid gap-6 lg:grid-cols-2">
        <LeadSourceChart data={leadSources} />
        <DeviceBreakdownChart data={devices} />
      </div>

      <ConversionFunnelChart data={funnel} />

      <div className="grid gap-6 lg:grid-cols-2">
        <TopPagesTable rows={topPages} />
        <CTAConversionTable rows={ctas} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CorporateInterestChart data={corporate} />
        <QualificationInterestHeatmap data={qualification} />
      </div>

      <div className="rounded-sm border border-border bg-surface p-6 shadow-soft">
        <SectionHeader
          eyebrow="Roadmap"
          title="Future Aggregation"
          description="Client-side aggregation is used for speed and simplicity today. A scheduled Cloud Function can roll up daily metrics into an analytics summary collection for long-term scale."
          align="left"
        />
      </div>
    </div>
  )
}

