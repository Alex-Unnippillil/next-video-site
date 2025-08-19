#!/usr/bin/env bash
set -euo pipefail

# Usage: ./create-ecr-repo.sh [repository-name]
# Requires AWS CLI v2 and proper credentials.

REPO_NAME="${1:-next-video-site}"
AWS_REGION="${AWS_REGION:-us-east-1}"

if aws ecr describe-repositories --repository-names "$REPO_NAME" --region "$AWS_REGION" >/dev/null 2>&1; then
  echo "ECR repository '$REPO_NAME' already exists in $AWS_REGION"
else
  echo "Creating ECR repository '$REPO_NAME' in $AWS_REGION with scan-on-push enabled"
  aws ecr create-repository \
    --repository-name "$REPO_NAME" \
    --image-scanning-configuration scanOnPush=true \
    --region "$AWS_REGION" >/dev/null
  echo "Repository created"
fi
