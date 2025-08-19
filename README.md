# Next Video API

This project defines AWS Lambda functions exposed via API Gateway for working with videos, playlists, and search.

- Requests are validated with [`zod`](https://github.com/colinhacks/zod).
- JWTs from Amazon Cognito are verified in each handler.
- An OpenAPI 3.0 specification is provided in [`openapi.yaml`](./openapi.yaml).

## Development

```bash
npm install
npm run build
```

## Testing

```bash
npm test
```

