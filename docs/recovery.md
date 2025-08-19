# Object Recovery Guide

This guide covers restoring objects from the versioned input bucket.

## Restoring a Previous Version
1. Browse object versions in the S3 console.
2. Select the desired version and choose **Restore**.
3. Copy or download the restored version.

## Retrieving from Glacier
Objects transition to Glacier after 30 days. To access them:
1. In the S3 console, choose the object and select **Initiate restore**.
2. Pick a retrieval tier (Expedited, Standard, or Bulk) and a retention period.
3. Wait for the restore to complete, then download the temporary copy.

## Cancelling Lifecycle Rules
If recovery requires disabling the lifecycle rules:
1. Open the bucket's **Management** tab.
2. Delete or pause the rules that transition to Glacier or delete aborted uploads.
3. Re-enable the rules after recovery operations are complete.
