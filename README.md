# Next Video Site

## Goals
- Demonstrate a minimal Next.js application that serves video content and integrates with **Amazon Personalize** to deliver tailored recommendations.
- Provide example scripts for setting up datasets, sending user events, and deploying a recommendation campaign.

## Constraints
- Intended for educational use and not optimized for production environments.
- Requires Node.js 18+ and npm.
- Assumes AWS credentials with permissions to access Amazon Personalize.
- Uses the legacy `pages` router with a single `index` page and a placeholder video player.
- The recommendation API currently returns stubbed data until Personalize is configured.

## High-Level Architecture
- **Client**: `pages/index.js` renders the UI and fetches recommendations when the page loads.
- **API**: `pages/api/recommendations.js` exposes an endpoint that can be wired to Amazon Personalize.
- **Personalization Scripts**: utilities in `scripts/` prepare datasets, ingest events, and deploy a Personalize campaign.

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
