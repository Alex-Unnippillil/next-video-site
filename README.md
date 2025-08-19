# next-video-site

This repository contains IAM policy examples and validation tooling.

## Policies
- `policies/permission-boundary.json` defines a sample permission boundary limiting privileges.

## Validation
The script `scripts/validate_iam_policies.sh` uses AWS IAM Access Analyzer to validate policy JSON files and blocks wildcard actions or resources. GitHub Actions runs this script on policy changes.

Run locally:

```bash
./scripts/validate_iam_policies.sh
```
