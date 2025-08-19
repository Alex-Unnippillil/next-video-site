# next-video-site

Utilities and scripts for DynamoDB tables used by the project.

## Provisioning

Run `node scripts/provisionTables.js` to create the `stream_stats` and `upload_sessions` tables.
Both tables use on-demand capacity, TTL on the `expiresAt` attribute, and a global secondary index on `userId`.

## SDK Utilities

- `src/streamStats.js` – helpers for writing and querying stream statistics.
- `src/uploadSessions.js` – helpers for managing upload sessions.
