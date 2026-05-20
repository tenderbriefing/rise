import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { ensureFirebaseInitialized, getFirestoreDb } from '../lib/firebase'
import { ENQUIRIES_COLLECTION, DEFAULT_LEAD_STATUS } from '../data/leadConstants'

const MAX_LEADS = 500

function mapLeadDoc(snap) {
  const data = snap.data()
  return {
    id: snap.id,
    ...data,
    createdAt: data.createdAt?.toDate?.() ?? null,
    updatedAt: data.updatedAt?.toDate?.() ?? null,
    lastContactedAt: data.lastContactedAt?.toDate?.() ?? null,
    activityLog: Array.isArray(data.activityLog) ? data.activityLog : [],
  }
}

export async function fetchLeads() {
  await ensureFirebaseInitialized()
  const db = getFirestoreDb()
  if (!db) throw new Error('Firestore is not configured')

  const q = query(
    collection(db, ENQUIRIES_COLLECTION),
    orderBy('createdAt', 'desc'),
    limit(MAX_LEADS),
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(mapLeadDoc)
}

export async function fetchLeadById(id) {
  await ensureFirebaseInitialized()
  const db = getFirestoreDb()
  if (!db) throw new Error('Firestore is not configured')

  const snap = await getDoc(doc(db, ENQUIRIES_COLLECTION, id))
  if (!snap.exists()) return null
  return mapLeadDoc(snap)
}

export async function fetchLeadStats(leads) {
  const list = leads ?? (await fetchLeads())
  return {
    total: list.length,
    new: list.filter((l) => l.status === 'new').length,
    qualified: list.filter((l) => l.status === 'qualified').length,
    closed: list.filter((l) => l.status === 'closed-won' || l.status === 'closed-lost').length,
  }
}

/**
 * @param {string} id
 * @param {object} updates
 * @param {{ email?: string }} actor
 */
export async function updateLead(id, updates, actor = {}) {
  await ensureFirebaseInitialized()
  const db = getFirestoreDb()
  if (!db) throw new Error('Firestore is not configured')

  const ref = doc(db, ENQUIRIES_COLLECTION, id)
  const existing = await getDoc(ref)
  if (!existing.exists()) throw new Error('Lead not found')

  const current = existing.data()
  const activityEntries = [...(current.activityLog || [])]
  const actorLabel = actor.email || 'admin'

  if (updates.status && updates.status !== current.status) {
    activityEntries.unshift({
      type: 'status_change',
      message: `Status changed from "${current.status}" to "${updates.status}"`,
      field: 'status',
      oldValue: current.status,
      newValue: updates.status,
      createdAt: new Date().toISOString(),
      createdBy: actorLabel,
    })
  }

  if (updates.priority && updates.priority !== current.priority) {
    activityEntries.unshift({
      type: 'priority_change',
      message: `Priority changed from "${current.priority}" to "${updates.priority}"`,
      field: 'priority',
      oldValue: current.priority,
      newValue: updates.priority,
      createdAt: new Date().toISOString(),
      createdBy: actorLabel,
    })
  }

  if (updates.notes !== undefined && updates.notes !== current.notes) {
    activityEntries.unshift({
      type: 'note_update',
      message: 'Notes updated',
      field: 'notes',
      createdAt: new Date().toISOString(),
      createdBy: actorLabel,
    })
  }

  if (updates.assignedTo !== undefined && updates.assignedTo !== current.assignedTo) {
    activityEntries.unshift({
      type: 'assignment',
      message: updates.assignedTo
        ? `Assigned to ${updates.assignedTo}`
        : 'Assignment cleared',
      field: 'assignedTo',
      oldValue: current.assignedTo,
      newValue: updates.assignedTo,
      createdAt: new Date().toISOString(),
      createdBy: actorLabel,
    })
  }

  const patch = {
    ...updates,
    updatedAt: serverTimestamp(),
    activityLog: activityEntries.slice(0, 50),
  }

  if (updates.status === 'contacted' && updates.status !== current.status) {
    patch.lastContactedAt = serverTimestamp()
  }

  await updateDoc(ref, patch)
  return fetchLeadById(id)
}

export function filterLeads(leads, { search = '', status = '', priority = '' } = {}) {
  const term = search.trim().toLowerCase()
  return leads.filter((lead) => {
    if (status && lead.status !== status) return false
    if (priority && lead.priority !== priority) return false
    if (!term) return true
    const haystack = [
      lead.fullName,
      lead.company,
      lead.email,
      lead.phone,
      lead.interest,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return haystack.includes(term)
  })
}

export function sortLeads(leads, { field = 'createdAt', direction = 'desc' } = {}) {
  const sorted = [...leads]
  sorted.sort((a, b) => {
    let aVal = a[field]
    let bVal = b[field]
    if (aVal instanceof Date) aVal = aVal.getTime()
    if (bVal instanceof Date) bVal = bVal.getTime()
    if (typeof aVal === 'string') aVal = aVal.toLowerCase()
    if (typeof bVal === 'string') bVal = bVal.toLowerCase()
    if (aVal == null) return 1
    if (bVal == null) return -1
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
  return sorted
}

export function paginateLeads(leads, page = 1, pageSize = 15) {
  const total = leads.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * pageSize
  return {
    items: leads.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    total,
    totalPages,
  }
}

export { DEFAULT_LEAD_STATUS }
