# next-video-site

Infrastructure templates for deploying a CloudFront distribution with:
- Application Load Balancer origin for server‑side rendering.
- S3 origin for static assets and video on demand.
- Cache policies tuned for dynamic and static content.
- Origin access control for securing the S3 bucket.
- Origin group failover from the ALB to S3.
- WAFv2 Web ACL integration.

The template is located at `infra/cloudfront-distribution.yaml` and can be
validated locally with [cfn-lint](https://github.com/aws-cloudformation/cfn-lint):

```bash
cfn-lint infra/cloudfront-distribution.yaml
```
