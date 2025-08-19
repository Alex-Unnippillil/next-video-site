# next-video-site

## Deployment

The `infra/codedeploy-ecs-bluegreen.yaml` template configures AWS CodeDeploy for ECS blue/green deployments with a canary traffic shift. Automatic rollback is enabled through CloudWatch alarms for 5xx errors and unhealthy targets.
