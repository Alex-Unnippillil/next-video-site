# next-video-site

This repository contains a CloudFormation template that configures API Gateway with
usage plans and API keys for server-to-server clients. A Web Application Firewall
(WAF) with AWS managed rules and a rate-based rule protects the API.

## Testing

Install test requirements and run:

```
pip install -r requirements.txt
pytest
```
