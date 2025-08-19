# next-video-site

Example project demonstrating AWS X-Ray and OpenTelemetry instrumentation for API routes, Lambda functions, and ECS handlers.

## Sampling

Sampling for X-Ray is configured in [`xray-sampling-rules.json`](xray-sampling-rules.json). OpenTelemetry sampling is controlled via the `OTEL_SAMPLE_RATE` environment variable, which defaults to `1.0` (always sample).

## Usage

```bash
npm install
npm run start:api      # start API route server
npm run start:lambda   # invoke Lambda handler locally
npm run start:ecs      # start ECS-style service
```
