import { Download } from 'lucide-react'
import { downloadLeadsCsv } from '../../utils/csvExport'
import { trackCsvExport } from '../../utils/analytics'

export default function ExportCSVButton({ leads, filteredLeads, label = 'Export CSV' }) {
  const handleExport = (scope) => {
    const data = scope === 'all' ? leads : filteredLeads
    const filename = downloadLeadsCsv(data)
    trackCsvExport({ count: data.length, scope })
    return filename
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => handleExport('filtered')}
        className="inline-flex items-center gap-2 rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        {label}
      </button>
      {filteredLeads.length !== leads.length && (
        <button
          type="button"
          onClick={() => handleExport('all')}
          className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-ivory"
        >
          Export all ({leads.length})
        </button>
      )}
    </div>
  )
}
