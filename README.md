# next-video-site

Infrastructure template and utilities for serving VOD assets via CloudFront with origin access control and signed URLs.

## CloudFront distribution

`infrastructure/cloudfront.yml` provisions:

- An S3 bucket for VOD assets.
- A CloudFront distribution using Origin Access Control (OAC).
- Cache behaviors with short TTL for manifests (`*.m3u8`, `*.mpd`) and longer caching for segments.
- Enforcement of signed URLs via a CloudFront key group.

Deploy with:

```bash
aws cloudformation deploy \
  --template-file infrastructure/cloudfront.yml \
  --stack-name vod-distribution \
  --parameter-overrides VODBucketName=your-vod-bucket KeyGroupId=YOUR_KEY_GROUP_ID
```

## Signing URLs

`scripts/sign-url.js` creates signed URLs for HLS or DASH assets.

Set environment variables:

- `CF_KEY_PAIR_ID` – CloudFront key pair ID.
- `CF_PRIVATE_KEY_PATH` – path to the private key file.

Usage:

```bash
node scripts/sign-url.js https://dxxxxx.cloudfront.net/path/manifest.m3u8 900
```

The optional second argument sets the expiration in seconds (default: 3600).

## Development

Install dependencies and run tests:

```bash
npm install
npm test
```
