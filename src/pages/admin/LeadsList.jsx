import { useEffect, useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'
import LeadTable from '../../components/admin/LeadTable'
import LeadFilters from '../../components/admin/LeadFilters'
import ExportCSVButton from '../../components/admin/ExportCSVButton'
import { fetchLeads, filterLeads, sortLeads, paginateLeads } from '../../services/leadService'

export default function LeadsList() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [sortField, setSortField] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState('desc')
  const [page, setPage] = useState(1)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const data = await fetchLeads()
        if (!cancelled) setLeads(data)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(
    () => sortLeads(filterLeads(leads, { search, status, priority }), { field: sortField, direction: sortDirection }),
    [leads, search, status, priority, sortField, sortDirection],
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / 15) || 1)
  const currentPage = Math.min(page, totalPages)
  const pagination = useMemo(
    () => paginateLeads(filtered, currentPage, 15),
    [filtered, currentPage],
  )

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" aria-label="Loading leads" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-charcoal">Leads</h1>
          <p className="mt-1 text-sm text-muted">{filtered.length} enquiry records</p>
        </div>
        <ExportCSVButton leads={leads} filteredLeads={filtered} />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 p-4 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}

      <LeadFilters
        search={search}
        onSearchChange={(value) => {
          setSearch(value)
          setPage(1)
        }}
        status={status}
        onStatusChange={(value) => {
          setStatus(value)
          setPage(1)
        }}
        priority={priority}
        onPriorityChange={(value) => {
          setPriority(value)
          setPage(1)
        }}
        sortField={sortField}
        onSortFieldChange={(value) => {
          setSortField(value)
          setPage(1)
        }}
        sortDirection={sortDirection}
        onSortDirectionChange={(value) => {
          setSortDirection(value)
          setPage(1)
        }}
      />

      <LeadTable leads={pagination.items} />

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between rounded-sm border border-border bg-surface px-4 py-3">
          <p className="text-sm text-muted">
            Page {pagination.page} of {pagination.totalPages}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={pagination.page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={pagination.page >= pagination.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
