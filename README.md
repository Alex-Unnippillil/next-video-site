# next-video-site

Example Next.js app with Stripe subscriptions for **Free**, **Pro**, and **Enterprise** plans.

## Setup

Create a `.env` file with the following keys:

```
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_key
FREE_PRICE_ID=price_free
PRO_PRICE_ID=price_pro
ENTERPRISE_PRICE_ID=price_enterprise
```

Then install dependencies and start the dev server:

```
npm install
npm run dev
```

## Webhooks

Configure Stripe to send `checkout.session.completed` events to `/api/webhook`. The handler verifies signatures and stores user entitlements in `data/entitlements.json`.

## Usage

1. Visit `/subscribe` and enter your email.
2. Choose a plan and complete checkout.
3. After checkout you will be redirected to `/video?email=your@email` where playback is allowed only if a matching entitlement exists.

This is a simplified demo and not production-ready.
