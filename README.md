# Next Video Site

This project uses the AWS Cloud Development Kit (CDK) to define infrastructure for a Next.js video site.
It also includes a GitHub Actions workflow that deploys to multiple environments using AWS IAM roles
configured for OpenID Connect (OIDC).

## IAM Role for GitHub Actions

`lib/next-video-site-stack.ts` defines an IAM role that trusts the GitHub OIDC provider. Replace
`OWNER/REPO` in the stack with your repository coordinates to restrict access.

## CI/CD

The workflow at `.github/workflows/deploy.yml` synthesizes the CDK app, deploys to a `dev` environment,
and promotes to `stage` and `prod` environments which can be protected with required approvals.
