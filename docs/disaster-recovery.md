# Disaster Recovery Plan

This project enables automated backups and replication for critical services.

## RDS
- Automated backups retained for seven days (`backup_retention_period = 7`).
- Snapshots are tagged and can be restored in the primary or DR region.

## DynamoDB
- Point-in-time recovery is enabled allowing restoration to any second in the last 35 days.

## S3 Assets
- Object versioning is enabled and the bucket replicates to a bucket in the DR region via cross‑region replication.

## Failover Procedure
1. Ensure the DR infrastructure is healthy.
2. Run [`scripts/failover.sh`](../scripts/failover.sh) to promote the DR database and update DNS records.
3. Verify application health in the DR region.
4. After the primary region is restored, reverse the replication and switch DNS back.
