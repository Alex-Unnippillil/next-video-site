# Next Video Site

Simple backend services for video search using OpenSearch.

## Scripts

- `node scripts/setup-opensearch.js` - Provision OpenSearch domain and create mappings.
- `npm start` - Run local server exposing `/api/search`.

## Lambda

- `lambda/indexer.js` - Handles SQS messages and indexes documents into OpenSearch.

Environment variables:

- `OPENSEARCH_URL` - Endpoint of OpenSearch domain.
- `AWS_REGION` - AWS region for the domain.
- `OPENSEARCH_DOMAIN` - Name of the domain when provisioning.
