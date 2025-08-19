# next-video-site

This repository demonstrates how to emit playback metrics to Amazon CloudWatch and how to monitor service level objectives (SLOs) with dashboards and alarms.

## Metrics

The `metrics/metrics.js` module exports helper functions that send custom metrics to CloudWatch:

- **StartupTime** – record page/player startup time in milliseconds.
- **ApiLatency** – latency of backend API calls in milliseconds.
- **PlayerErrors** – increments whenever a player error occurs.
- **RebufferDuration** – duration of rebuffer events in milliseconds.

These functions all publish metrics in the `NextVideoSite` namespace.

## Monitoring

CloudWatch resources for monitoring live in `infra/`:

- `cloudwatch-dashboard.json` defines a dashboard with graphs for each metric.
- `slo-alarms.yml` creates an SNS topic and CloudWatch alarms that notify when SLO thresholds are breached.

Deploy the alarms and dashboard using the AWS CLI or a deployment pipeline:

```bash
aws cloudformation deploy --template-file infra/slo-alarms.yml \
  --stack-name next-video-slo --parameter-overrides NotificationEmail=you@example.com
aws cloudwatch put-dashboard --dashboard-name NextVideoSite \
  --dashboard-body file://infra/cloudwatch-dashboard.json
```
