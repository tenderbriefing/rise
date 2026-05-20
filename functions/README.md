# Rise Institute — Firebase Functions

Server-side triggers for lead email notifications. **Do not put SMTP credentials in this repo.**

## Planned behaviour

1. `onEnquiryCreated` — Firestore trigger on `enquiries/{id}` create
2. Queue or send internal alert to `info@riseinstitute.co.za`
3. Send auto-reply to the enquirer

HTML templates live in the main app at `src/templates/` (copy or share into functions when implementing send).

## Setup (when ready)

```bash
cd functions
npm install
firebase deploy --only functions
```

Configure secrets via Firebase CLI (example names only):

- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` — institutional mail server
- Or use **Firebase Extension**: Trigger Email from Firestore

## Security

- `mail` collection is denied to clients in `firestore.rules`
- Only Functions service account should write/send mail
