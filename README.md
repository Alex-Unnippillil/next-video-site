# next-video-site

## Configuration

### Public runtime config

The app reads public configuration values from `next.config.js`. These values are
exposed to the browser and should only contain non‑sensitive information.

Required variables:

- `NEXT_PUBLIC_API_BASE_URL` – Base URL for public API requests.

### Secure parameters

Sensitive values are loaded from AWS Systems Manager Parameter Store at runtime
using a small helper with in-memory caching. During development the helper falls
back to values defined in a local `.env.local` file.

Required secure parameters:

- `VIDEO_API_KEY` – API key for the video service.

For local development create an `.env.local` file:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
VIDEO_API_KEY=dev-api-key
```

Ensure AWS credentials with permission to read the parameters are available in
production environments.
