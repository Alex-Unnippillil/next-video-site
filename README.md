# next-video-site

Utility scripts and server utilities for the video site.

## Cognito

Run the script below to ensure required groups exist in the user pool:

```bash
COGNITO_USER_POOL_ID=your_pool AWS_REGION=us-east-1 node scripts/create-cognito-groups.js
```

## Auth Helpers

`lib/auth/roles.ts` exposes helpers for decoding Cognito groups and asserting roles in API routes.

`middleware.ts` protects `/admin` and `/creator` routes based on the authenticated user's groups.
