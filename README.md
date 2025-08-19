# next-video-site

This repository contains automation for building and publishing container images.

## ECR repository

Use the provided script to create the Amazon ECR repository with scan-on-push enabled:

```bash
./scripts/create-ecr-repo.sh
```

## Continuous Integration

The GitHub Actions workflow builds multi-architecture images, pushes them to ECR, and publishes an SBOM artifact.
