/**
 * Set Firebase Auth custom claim { admin: true } for a user.
 *
 * REQUIRED BEFORE deploying firestore.rules that check request.auth.token.admin.
 * Without this claim, legitimate administrators will be denied lead access.
 *
 * Prerequisites:
 *   1. Firebase project rise-f62a4
 *   2. A service account key (never commit it)
 *   3. functions dependencies installed: cd functions && npm install
 *
 * Usage:
 *   GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccount.json \
 *     node scripts/set-admin-claim.mjs admin@example.com
 *
 * Or by UID:
 *   GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccount.json \
 *     node scripts/set-admin-claim.mjs --uid <FIREBASE_AUTH_UID>
 */

import { createRequire } from 'node:module'
import { resolve } from 'node:path'

const require = createRequire(resolve(process.cwd(), 'functions/package.json'))
const admin = require('firebase-admin')

const arg = process.argv[2]
const maybeUid = process.argv[3]

if (!arg) {
  console.error('Usage: node scripts/set-admin-claim.mjs <email> | --uid <uid>')
  process.exit(1)
}

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  console.error(
    'Set GOOGLE_APPLICATION_CREDENTIALS to a Firebase service account JSON path before running.',
  )
  process.exit(1)
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  })
}

const auth = admin.auth()

async function main() {
  let user
  if (arg === '--uid') {
    if (!maybeUid) throw new Error('Missing UID after --uid')
    user = await auth.getUser(maybeUid)
  } else {
    user = await auth.getUserByEmail(arg)
  }

  const existing = user.customClaims || {}
  await auth.setCustomUserClaims(user.uid, { ...existing, admin: true })

  console.log(`Admin claim set for ${user.email || user.uid} (${user.uid}).`)
  console.log('The user must sign out and sign in again (or refresh their ID token).')
}

main().catch((error) => {
  console.error(error.message || error)
  process.exit(1)
})
