# next-video-site

This repository contains infrastructure configuration for the Next Video Site. 

## WAF

The CloudFormation template in [`cloudformation/waf.yaml`](cloudformation/waf.yaml) attaches AWS managed rule groups, includes a placeholder rule to block GraphQL introspection attempts, and publishes CloudWatch metrics and an alarm for blocked requests.

Deploy with:

```bash
aws cloudformation deploy --template-file cloudformation/waf.yaml --stack-name NextVideoSiteWAF --capabilities CAPABILITY_NAMED_IAM
```
