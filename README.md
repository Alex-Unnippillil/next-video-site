# Next Video Site

This project includes Amazon Personalize integration with scripts for dataset creation, event ingestion, and an API route for fetching recommendations.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Create dataset group, schema, dataset, and event tracker**

   ```bash
   AWS_REGION=<region> node scripts/personalize-setup.js
   ```

   Capture the `TrackingId` and `DatasetGroupArn` from the output.

3. **Ingest user events**

   ```bash
   AWS_REGION=<region> PERSONALIZE_TRACKING_ID=<tracking-id> node scripts/send-event.js <userId> <itemId>
   ```

4. **Deploy a campaign (inference endpoint)**

   ```bash
   AWS_REGION=<region> PERSONALIZE_DATASET_GROUP_ARN=<dataset-group-arn> node scripts/deploy-campaign.js
   ```

   When the campaign becomes active, record its ARN.

5. **Fetch recommendations**

   After setting `PERSONALIZE_CAMPAIGN_ARN` and `AWS_REGION` in the environment:

   ```bash
   curl "/api/recommendations?userId=<userId>"
   ```

## Environment variables

- `AWS_REGION`
- `PERSONALIZE_TRACKING_ID` (for event ingestion)
- `PERSONALIZE_DATASET_GROUP_ARN` (for campaign deployment)
- `PERSONALIZE_CAMPAIGN_ARN` (for recommendation API)

