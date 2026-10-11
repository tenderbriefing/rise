# Rise Institute — Firebase Functions

Server-side lead email notifications. **Do not put SMTP credentials in this repo or in `VITE_*` variables.**

## Behaviour

1. Visitor submits a contact / programme / SEO enquiry form.
2. Client validates and writes the enquiry to Firestore `enquiries/{id}`.
3. Visitor receives the normal success state (lead is already persisted).
4. Cloud Function `onEnquiryCreated` (Firestore `onDocumentCreated`) sends a notification to **Calvin@riseinstitute.co.za**.
5. Delivery status is written to `enquiries/{id}.emailNotification` (admin-readable). Temporary SMTP failures do not delete the lead.

Recipient is hard-coded in `src/notifyLead.js`. The browser cannot choose the notification recipient.

## Idempotency

Uses `emailNotification.status` on the enquiry document (`processing` → `sent` / `failed` / `blocked_config`) so function retries and duplicate triggers do not send duplicate emails once `sent`.

## Secrets (Founder / ops configuration)

```bash
firebase functions:secrets:set SMTP_HOST --project rise-f62a4
firebase functions:secrets:set SMTP_PORT --project rise-f62a4
firebase functions:secrets:set SMTP_USER --project rise-f62a4
firebase functions:secrets:set SMTP_PASS --project rise-f62a4
firebase functions:secrets:set SMTP_FROM --project rise-f62a4
```

`SMTP_FROM` must be a verified Rise Institute sender address on the chosen SMTP provider (for example `info@riseinstitute.co.za` or a transactional noreply address). Do **not** spoof `Calvin@riseinstitute.co.za` as From unless the provider is configured to send from that mailbox.

Then deploy:

```bash
cd functions && npm install && cd ..
firebase deploy --only functions --project rise-f62a4
```

## Status flags for release reporting

| Capability | Status when this code ships |
|---|---|
| FORM STORAGE (Firestore) | READY (existing public create rules + client submit) |
| EMAIL NOTIFICATION | BLOCKED until SMTP secrets are set and functions are deployed |

## Admin claim (before Firestore rules deploy)

```bash
cd functions && npm install && cd ..
GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccount.json \
  node scripts/set-admin-claim.mjs your-admin@example.com
```

The administrator must sign out and sign in again (or refresh the ID token) so `request.auth.token.admin == true` is present before rules that require the claim are deployed.
