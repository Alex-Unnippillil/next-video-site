# next-video-site

## Provisioning Redis with Terraform

The `infra/redis.tf` configuration provisions an Amazon ElastiCache Redis cluster.

1. Ensure you have Terraform and AWS credentials configured.
2. Provide `region` and a list of `subnet_ids` when applying:

```bash
terraform -chdir=infra init
terraform -chdir=infra apply -var 'region=us-east-1' -var 'subnet_ids=["subnet-123","subnet-456"]'
```

## Cache Wrapper

`src/cache.ts` exposes a simple cache-aside wrapper around Redis using a TTL and health checks.

Example usage:

```ts
import { RedisCache } from "./src/cache";

const cache = new RedisCache(process.env.REDIS_URL!, { ttlSeconds: 60 });
const value = await cache.get("key", async () => "fresh" );
const healthy = await cache.isHealthy();
```
