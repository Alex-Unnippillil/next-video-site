# Next Video Site

## Overview
This repository contains a Next.js example app that serves video content and demonstrates how to integrate Amazon Personalize for tailored recommendations.

## Prerequisites
- Node.js 18+
- npm

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```

## Scripts
Utilities for working with Amazon Personalize live in `scripts/`:
- `deploy-campaign.js` – deploys a recommendation campaign in Amazon Personalize.
- `personalize-setup.js` – initializes dataset groups, datasets, and solutions required by Personalize.
- `send-event.js` – sends user interaction events to Personalize for model training and real-time recommendations.

## Using Cloudflare R2 via S3-Compatible API
You can host video assets or datasets in [Cloudflare R2](https://developers.cloudflare.com/r2/), which exposes an S3-compatible API. Configure your tooling to point at the R2 endpoint and provide your R2 access keys.

For example, the AWS CLI can target an R2 bucket by specifying the endpoint URL:

```bash
aws s3 ls --endpoint-url https://<accountid>.r2.cloudflarestorage.com
```

Replace `<accountid>` with your Cloudflare account ID. The command above lists buckets, and other `s3://` URLs work the same way when pointed at R2.

## Testing
Execute tests (if any are defined):
```bash
npm test
```
