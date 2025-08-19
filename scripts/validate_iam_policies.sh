#!/usr/bin/env bash
set -euo pipefail

BASE=${1:-origin/main}
HEAD=${2:-HEAD}

CHANGED=$(git diff --name-only "$BASE" "$HEAD" -- 'policies/*.json')
if [ -z "$CHANGED" ]; then
  echo "No policy changes detected."
  exit 0
fi

status=0
for file in $CHANGED; do
  echo "Validating $file"
  if [ -n "${AWS_ACCESS_KEY_ID:-}" ] && [ -n "${AWS_SECRET_ACCESS_KEY:-}" ]; then
    aws accessanalyzer validate-policy \
      --region us-east-1 \
      --policy-document file://"$file" \
      --policy-type IDENTITY_POLICY > /tmp/va.json

    if jq -e '.findings[] | select(.findingType=="ERROR")' /tmp/va.json >/dev/null; then
      echo "Access Analyzer found errors in $file"
      jq '.findings' /tmp/va.json
      status=1
    fi

    rm /tmp/va.json
  else
    echo "Skipping Access Analyzer validation for $file; AWS credentials not configured." >&2
  fi

  if git diff "$BASE" "$HEAD" -- "$file" | grep -E '^\+.*"Action"\s*:\s*"\*"'; then
    echo "Wildcard action detected in $file"
    status=1
  fi
  if git diff "$BASE" "$HEAD" -- "$file" | grep -E '^\+.*"Resource"\s*:\s*"\*"'; then
    echo "Wildcard resource detected in $file"
    status=1
  fi

done
exit $status
