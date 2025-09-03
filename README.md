# Next Video Site

## Overview
This repository contains a Next.js example app that serves video content and demonstrates how to integrate Amazon Personalize for tailored recommendations.

## Storage
Video files and other assets are expected to live in an **Amazon S3** bucket.
This is the primary storage backend for the application.

For projects that need an alternative object store, you can point the app at
any service that offers an S3‑compatible API. Cloudflare R2 is one such
option: by configuring the SDK with R2's S3 endpoint and credentials, the app
will interact with R2 just like it would with S3. This provides an escape
hatch while keeping Amazon S3 as the default.

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

## Testing
Execute tests (if any are defined):
```bash
npm test
```
