# Next Video Site

This repository contains infrastructure for scanning uploaded media files. An AWS Lambda function is triggered whenever a new object is created in the uploads bucket. The function uses ClamAV to check for viruses and performs simple media sniffing. Suspicious files are moved to the `STLS-quarantine` bucket, an SNS notification is sent, and the results are stored in DynamoDB.

Resources are defined using AWS SAM in `template.yaml` and the Lambda source lives in `scan_lambda/`.
