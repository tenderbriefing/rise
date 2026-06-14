// Client-side aggregation utilities for admin analytics views.
// TODO (future): move heavy aggregation to scheduled Cloud Function and store daily rollups.

function safeString(value) {
  if (value == null) return ''
  return String(value)
}

function normalizeChannel(event) {
  const channel = safeString(event.channel || '').toLowerCase()
  if (channel) return channel
  const medium = safeString(event.medium || '').toLowerCase()
  const source = safeString(event.source || '').toLowerCase()
  if (!medium && !source) return 'direct'
  if (/(cpc|ppc|paid)/.test(medium)) return 'paid'
  if (/email/.test(medium)) return 'email'
  if (/social/.test(medium) || /(facebook|instagram|linkedin|twitter|tiktok)/.test(source)) return 'social'
  if (/organic/.test(medium) || /(google|bing|yahoo)/.test(source)) return 'organic'
  if (medium === 'referral') return 'referral'
  return 'unknown'
}

export function calculateLeadSources(events, leads) {
  const counts = new Map()
  for (const e of events) {
    if (!e) continue
    const type = safeString(e.eventType || e.eventName)
    if (type !== 'generate_lead' && type !== 'form_submit') continue
    const channel = normalizeChannel(e)
    counts.set(channel, (counts.get(channel) || 0) + 1)
  }

  // Fallback: if no events yet, infer from lead attribution fields if present.
  if (counts.size === 0 && Array.isArray(leads)) {
    for (const l of leads) {
      const channel = safeString(l.channel || '').toLowerCase() || 'unknown'
      counts.set(channel, (counts.get(channel) || 0) + 1)
    }
  }

  const order = ['direct', 'organic', 'referral', 'social', 'paid', 'email', 'unknown']
  return order
    .map((name) => ({ name, value: counts.get(name) || 0 }))
    .filter((x) => x.value > 0 || counts.size === 0)
}

export function calculateFunnel(events) {
  const funnel = {
    page_views: 0,
    cta_clicks: 0,
    form_starts: 0,
    form_submits: 0,
    generated_leads: 0,
    file_downloads: 0,
  }

  for (const e of events) {
    const t = safeString(e.eventType || e.eventName)
    if (t === 'page_view') funnel.page_views += 1
    else if (t === 'cta_click') funnel.cta_clicks += 1
    else if (t === 'form_start') funnel.form_starts += 1
    else if (t === 'form_submit') funnel.form_submits += 1
    else if (t === 'generate_lead') funnel.generated_leads += 1
    else if (t === 'file_download') funnel.file_downloads += 1
  }

  return funnel
}

export function calculateQualificationInterest(events) {
  const byKey = new Map()
  for (const e of events) {
    const t = safeString(e.eventType || e.eventName)
    if (t !== 'qualification_interest') continue
    const q = e.qualificationInterest || {}
    const faculty = safeString(q.faculty || 'Unknown')
    const title = safeString(q.title || 'Unknown qualification')
    const key = `${faculty}|||${title}`
    byKey.set(key, (byKey.get(key) || 0) + 1)
  }

  return Array.from(byKey.entries())
    .map(([key, count]) => {
      const [faculty, title] = key.split('|||')
      return { faculty, title, count }
    })
    .sort((a, b) => b.count - a.count)
}

export function calculateTopPages(events, leads) {
  const pages = new Map()
  const inc = (path, field, by = 1) => {
    const key = safeString(path || '/')
    const current = pages.get(key) || { path: key, pageViews: 0, ctaClicks: 0, leads: 0 }
    current[field] += by
    pages.set(key, current)
  }

  for (const e of events) {
    const t = safeString(e.eventType || e.eventName)
    if (t === 'page_view') inc(e.path, 'pageViews')
    else if (t === 'cta_click') inc(e.path, 'ctaClicks')
    else if (t === 'generate_lead') inc(e.path, 'leads')
  }

  // Fallback: attribute leads to their route/page field.
  if (pages.size === 0 && Array.isArray(leads)) {
    for (const l of leads) inc(l.route || l.page, 'leads')
  }

  return Array.from(pages.values())
    .map((p) => ({
      ...p,
      conversionRate: p.pageViews > 0 ? Math.round((p.leads / p.pageViews) * 1000) / 10 : 0,
    }))
    .sort((a, b) => b.leads - a.leads || b.pageViews - a.pageViews)
    .slice(0, 12)
}

export function calculateCTAConversions(events) {
  const map = new Map()
  for (const e of events) {
    const t = safeString(e.eventType || e.eventName)
    if (t !== 'cta_click') continue
    const label = safeString(e.ctaLabel || 'Unknown CTA')
    const current = map.get(label) || { label, clicks: 0, leads: 0, conversionRate: 0 }
    current.clicks += 1
    map.set(label, current)
  }

  // Approximate: attribute generate_lead events with ctaLabel if present.
  for (const e of events) {
    const t = safeString(e.eventType || e.eventName)
    if (t !== 'generate_lead') continue
    const label = safeString(e.ctaLabel || '')
    if (!label) continue
    const current = map.get(label) || { label, clicks: 0, leads: 0, conversionRate: 0 }
    current.leads += 1
    map.set(label, current)
  }

  const rows = Array.from(map.values()).map((r) => ({
    ...r,
    conversionRate: r.clicks > 0 ? Math.round((r.leads / r.clicks) * 1000) / 10 : 0,
  }))
  rows.sort((a, b) => b.clicks - a.clicks)
  return rows.slice(0, 12)
}

export function calculateCorporateInterest(events) {
  const map = new Map()
  for (const e of events) {
    const t = safeString(e.eventType || e.eventName)
    if (t !== 'corporate_interest') continue
    const c = e.corporateInterest || {}
    const section = safeString(c.section || 'Unknown')
    map.set(section, (map.get(section) || 0) + 1)
  }
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

export function calculateDeviceBreakdown(events) {
  const map = new Map()
  for (const e of events) {
    const d = safeString(e.deviceType || 'unknown').toLowerCase() || 'unknown'
    map.set(d, (map.get(d) || 0) + 1)
  }
  const order = ['desktop', 'mobile', 'tablet', 'unknown']
  return order.map((name) => ({ name, value: map.get(name) || 0 }))
}

