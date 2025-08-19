# Next Video Site

This project demonstrates client-side multipart uploads to S3 using pre-signed URLs. Upload progress, pause/resume, and abort are supported. The server enforces file size and type limits and stores upload session state in Redis.

## Setup

1. Set environment variables `AWS_S3_BUCKET`, `AWS_REGION`, and optional `REDIS_URL`.
2. Install dependencies: `npm install`.
3. Run tests: `npm test`.
4. Start server: `npm start`.

The client-side helper is found in `client/uploadClient.js`.
