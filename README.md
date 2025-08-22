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

## Testing
Execute tests (if any are defined):
```bash
npm test
```
