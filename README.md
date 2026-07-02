# Vejle Gel Blaster Mission Control 2.0

Stabil React/Vite-version med Firebase live-sync, scoreboard, admin, kameraer, briefing og command-center design.

## Netlify
Build command: `npm run build`
Publish directory: `dist`

## Firebase env variables
Tilføj disse i Netlify Environment variables:

- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_DATABASE_URL
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_FIREBASE_MEASUREMENT_ID (valgfri)

Hvis Netlify secret scan blokerer pga. Firebase-pakken, brug:
SECRETS_SCAN_SMART_DETECTION_ENABLED=false
