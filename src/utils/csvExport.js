/**
 * Export leads to CSV for download.
 */
export function leadsToCsvRows(leads) {
  const headers = [
    'fullName',
    'company',
    'email',
    'phone',
    'interest',
    'status',
    'priority',
    'createdAt',
  ]

  const rows = leads.map((lead) =>
    headers.map((key) => {
      let value = lead[key]
      if (value instanceof Date) {
        value = value.toISOString()
      } else if (value?.toDate) {
        value = value.toDate().toISOString()
      }
      const str = value == null ? '' : String(value)
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`
      }
      return str
    }),
  )

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
}

export function downloadLeadsCsv(leads, filenamePrefix = 'rise-institute-leads') {
  const date = new Date().toISOString().slice(0, 10)
  const filename = `${filenamePrefix}-${date}.csv`
  const csv = leadsToCsvRows(leads)
  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
  return filename
}
