#!/usr/bin/env bash
# One-button failover script
# Requires AWS CLI and credentials configured.
set -euo pipefail

PRIMARY_REGION=${PRIMARY_REGION:-us-east-1}
DR_REGION=${DR_REGION:-us-west-2}
DB_IDENTIFIER=${DB_IDENTIFIER:-myapp-db}
HOSTED_ZONE_ID=${HOSTED_ZONE_ID:-Z123456789}
RECORD_NAME=${RECORD_NAME:-app.example.com}
DR_ELB_NAME=${DR_ELB_NAME:-myapp-dr}

printf 'Promoting RDS read replica in %s\n' "$DR_REGION"
aws rds promote-read-replica \
  --db-instance-identifier "${DB_IDENTIFIER}-dr" \
  --region "$DR_REGION"

printf 'Updating DNS record %s to DR region\n' "$RECORD_NAME"
ELB_ZONE=$(aws elbv2 describe-load-balancers --names "$DR_ELB_NAME" --region "$DR_REGION" --query 'LoadBalancers[0].CanonicalHostedZoneId' --output text)
ELB_DNS=$(aws elbv2 describe-load-balancers --names "$DR_ELB_NAME" --region "$DR_REGION" --query 'LoadBalancers[0].DNSName' --output text)

aws route53 change-resource-record-sets \
  --hosted-zone-id "$HOSTED_ZONE_ID" \
  --change-batch "{\"Changes\":[{\"Action\":\"UPSERT\",\"ResourceRecordSet\":{\"Name\":\"$RECORD_NAME\",\"Type\":\"A\",\"AliasTarget\":{\"HostedZoneId\":\"$ELB_ZONE\",\"DNSName\":\"$ELB_DNS\",\"EvaluateTargetHealth\":false}}}]}"

printf 'Failover complete.\n'
