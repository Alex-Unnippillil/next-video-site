# next-video-site

Serverless utilities for processing uploaded media.

## Lambda: probe

`src/handlers/probe.js` uses `ffprobe` to extract container, codecs, duration, frame rate and resolution from a media file and persists the result in PostgreSQL via Prisma.

### Database

Prisma schema and migrations create a `media_assets` table:

- `container`
- `videoCodec`
- `audioCodec`
- `duration`
- `frameRate`
- `width`
- `height`

Run migrations with `npx prisma migrate deploy`.
