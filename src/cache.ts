import Redis, { Redis as RedisClient } from "ioredis";

export interface CacheOptions {
  /** Time to live for cached entries in seconds */
  ttlSeconds: number;
}

export class RedisCache {
  private client: RedisClient;
  private ttlSeconds: number;

  constructor(redisUrl: string, options: CacheOptions) {
    this.client = new Redis(redisUrl);
    this.ttlSeconds = options.ttlSeconds;
  }

  /**
   * Retrieve a value from cache or fallback to a fetcher.
   * Implements the cache-aside pattern.
   */
  async get<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    const cached = await this.client.get(key);
    if (cached) {
      return JSON.parse(cached) as T;
    }
    const value = await fetcher();
    await this.client.set(key, JSON.stringify(value), "EX", this.ttlSeconds);
    return value;
  }

  /** Store a value in cache with the configured TTL */
  async set<T>(key: string, value: T): Promise<void> {
    await this.client.set(key, JSON.stringify(value), "EX", this.ttlSeconds);
  }

  /** Simple health check using Redis PING */
  async isHealthy(): Promise<boolean> {
    try {
      await this.client.ping();
      return true;
    } catch {
      return false;
    }
  }

  /** Close the underlying Redis connection */
  async disconnect(): Promise<void> {
    await this.client.quit();
  }
}
