# next-video-site

This repository contains an example workflow for processing uploaded videos using AWS Step Functions. The workflow is triggered by an S3 object arrival via EventBridge and performs the following steps:

1. Validates the input file.
2. Submits an AWS Elemental MediaConvert job.
3. Waits for job completion and updates a DynamoDB table.
4. Publishes errors to an SNS topic and routes failed events to an SQS dead-letter queue.

Infrastructure templates live in `infra/`:

- `state-machine.asl.json` defines the Step Functions state machine with retry policies and error handling.
- `eventbridge-rule.json` provides an EventBridge rule that targets the state machine and includes DLQ and retry settings.

These files are starting points and require proper resource ARNs and IAM roles before deployment.
