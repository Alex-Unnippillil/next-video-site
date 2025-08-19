# Next Video Site

This project demonstrates a simple Next.js application configured to use AWS Cognito
with Google and Apple identity providers. It stores user consent timestamps in
PostgreSQL.

## Development

```
npm install
npm run dev
```

Environment variables:

- `NEXT_PUBLIC_COGNITO_DOMAIN` – Cognito domain
- `NEXT_PUBLIC_COGNITO_CLIENT_ID` – Cognito client ID
- `NEXT_PUBLIC_COGNITO_REDIRECT_URI` – Redirect URI for callbacks
- `DATABASE_URL` – PostgreSQL connection string

Run the SQL migration in `db/migrations/001_create_user_consent.sql` to create
the table for consent timestamps.
