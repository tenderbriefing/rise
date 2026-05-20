export const ENQUIRIES_COLLECTION = 'enquiries'

export const LEAD_STATUSES = [
  'new',
  'contacted',
  'qualified',
  'proposal-sent',
  'follow-up',
  'closed-won',
  'closed-lost',
]

export const LEAD_PRIORITIES = ['low', 'normal', 'high', 'urgent']

export const DEFAULT_LEAD_STATUS = 'new'
export const DEFAULT_LEAD_PRIORITY = 'normal'

export const STATUS_LABELS = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  'proposal-sent': 'Proposal Sent',
  'follow-up': 'Follow-up',
  'closed-won': 'Closed Won',
  'closed-lost': 'Closed Lost',
}

export const PRIORITY_LABELS = {
  low: 'Low',
  normal: 'Normal',
  high: 'High',
  urgent: 'Urgent',
}

export const STATUS_STYLES = {
  new: 'bg-sa-blue/15 text-sa-blue ring-sa-blue/25',
  contacted: 'bg-amber-100 text-amber-900 ring-amber-200',
  qualified: 'bg-emerald-100 text-emerald-900 ring-emerald-200',
  'proposal-sent': 'bg-violet-100 text-violet-900 ring-violet-200',
  'follow-up': 'bg-orange-100 text-orange-900 ring-orange-200',
  'closed-won': 'bg-primary/15 text-primary ring-primary/25',
  'closed-lost': 'bg-slate-200 text-slate-700 ring-slate-300',
}

export const PRIORITY_STYLES = {
  low: 'bg-slate-100 text-slate-600',
  normal: 'bg-mint text-primary',
  high: 'bg-amber-100 text-amber-900',
  urgent: 'bg-red-100 text-red-800',
}
