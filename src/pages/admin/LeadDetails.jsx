import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Loader2, Mail, Phone, Save } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import LeadStatusBadge from '../../components/admin/LeadStatusBadge'
import LeadPriorityBadge from '../../components/admin/LeadPriorityBadge'
import LeadTimeline from '../../components/admin/LeadTimeline'
import GlassCard from '../../components/GlassCard'
import { fetchLeadById, updateLead } from '../../services/leadService'
import { LEAD_PRIORITIES, LEAD_STATUSES, PRIORITY_LABELS, STATUS_LABELS } from '../../data/leadConstants'
import { trackAdminLeadUpdate } from '../../utils/analytics'

function formatDateTime(value) {
  if (!value) return '—'
  const date = value instanceof Date ? value : value.toDate?.() ?? new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleString('en-ZA', { dateStyle: 'medium', timeStyle: 'short' })
}

export default function LeadDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const [lead, setLead] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [notes, setNotes] = useState('')
  const [assignedTo, setAssignedTo] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchLeadById(id)
        if (cancelled) return
        if (!data) {
          setError('Lead not found')
          setLead(null)
          return
        }
        setLead(data)
        setStatus(data.status || 'new')
        setPriority(data.priority || 'normal')
        setNotes(data.notes || '')
        setAssignedTo(data.assignedTo || '')
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    if (id) load()
    return () => {
      cancelled = true
    }
  }, [id])

  const handleSave = async () => {
    if (!lead) return
    setSaving(true)
    setError(null)
    try {
      const updated = await updateLead(
        lead.id,
        {
          status,
          priority,
          notes,
          assignedTo: assignedTo.trim() || null,
        },
        { email: user?.email },
      )
      setLead(updated)
      setStatus(updated.status)
      setPriority(updated.priority)
      setNotes(updated.notes || '')
      setAssignedTo(updated.assignedTo || '')
      await trackAdminLeadUpdate({
        leadId: lead.id,
        field: 'multiple',
        status: updated.status,
        priority: updated.priority,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading lead" />
      </div>
    )
  }

  if (!lead) {
    return (
      <div className="space-y-4">
        <Link to="/admin/leads" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
          <ArrowLeft className="h-4 w-4" />
          Back to leads
        </Link>
        <p className="text-red-800" role="alert">
          {error || 'Lead not found'}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            to="/admin/leads"
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to leads
          </Link>
          <h1 className="font-heading text-2xl font-bold text-charcoal">{lead.fullName}</h1>
          <p className="mt-1 text-muted">{lead.company}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <LeadStatusBadge status={lead.status} />
            <LeadPriorityBadge priority={lead.priority} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={`mailto:${lead.email}`}
            className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-ivory"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
          <a
            href={`tel:${lead.phone}`}
            className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-ivory"
          >
            <Phone className="h-4 w-4" />
            Call
          </a>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 p-4 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6 lg:col-span-2">
          <h2 className="font-heading text-lg font-semibold text-charcoal">Enquiry details</h2>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-semibold uppercase text-muted">Email</dt>
              <dd className="mt-1 text-sm">{lead.email}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-muted">Phone</dt>
              <dd className="mt-1 text-sm">{lead.phone}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase text-muted">Interest</dt>
              <dd className="mt-1 text-sm">{lead.interest}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs font-semibold uppercase text-muted">Message</dt>
              <dd className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{lead.message}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-muted">Submitted</dt>
              <dd className="mt-1 text-sm">{formatDateTime(lead.createdAt)}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-muted">Source</dt>
              <dd className="mt-1 text-sm">{lead.source || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-muted">Route</dt>
              <dd className="mt-1 text-sm">{lead.route || lead.page || '—'}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase text-muted">Last contacted</dt>
              <dd className="mt-1 text-sm">{formatDateTime(lead.lastContactedAt)}</dd>
            </div>
          </dl>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="font-heading text-lg font-semibold text-charcoal">Manage lead</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="lead-status" className="mb-1 block text-xs font-semibold uppercase text-muted">
                Status
              </label>
              <select
                id="lead-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm"
              >
                {LEAD_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="lead-priority" className="mb-1 block text-xs font-semibold uppercase text-muted">
                Priority
              </label>
              <select
                id="lead-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm"
              >
                {LEAD_PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {PRIORITY_LABELS[p]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="lead-assigned" className="mb-1 block text-xs font-semibold uppercase text-muted">
                Assigned to
              </label>
              <input
                id="lead-assigned"
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Team member email or name"
                className="w-full rounded-lg border border-border px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label htmlFor="lead-notes" className="mb-1 block text-xs font-semibold uppercase text-muted">
                Notes
              </label>
              <textarea
                id="lead-notes"
                rows={5}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm"
                placeholder="Internal notes about this lead…"
              />
            </div>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-forest disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save changes
            </button>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <h2 className="font-heading text-lg font-semibold text-charcoal">Activity timeline</h2>
        <div className="mt-4">
          <LeadTimeline activityLog={lead.activityLog} />
        </div>
      </GlassCard>
    </div>
  )
}
