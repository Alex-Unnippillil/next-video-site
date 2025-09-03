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

### IAM Policy

If using Amazon S3 to store interaction data, grant your Personalize role access only to the required prefix. The following policy snippet allows read access to objects under `events/` while restricting bucket listing to the same prefix:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/events/*"
    },
    {
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME",
      "Condition": {
        "StringLike": {"s3:prefix": "events/*"}
      }
    }
  ]
}
```

## Testing
Execute tests (if any are defined):
```bash
npm test
```
