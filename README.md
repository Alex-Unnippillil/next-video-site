# next-video-site

This repository includes a simple Node-based server-side rendering (SSR) app and Terraform configuration for deploying it to AWS ECS with an Application Load Balancer and autoscaling policies.

## Development

```bash
npm install
npm start
```

## Docker

```bash
docker build -t next-video-site .
```

## Terraform

Terraform files in the `terraform` directory create an ECS Fargate service fronted by an ALB with health checks and autoscaling based on CPU utilization and request count.
