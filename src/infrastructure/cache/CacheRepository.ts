import Redis from "ioredis";
import { CacheRepository } from "../../domain/repositories/CacheRepository";

export class RedisCacheRepository implements CacheRepository {
    private client: Redis;

    constructor() {
        this.client = new Redis({
            host: process.env.REDIS_HOST || "127.0.0.1",
            port: Number(process.env.REDIS_PORT) || 6379,
        });

        this.client.on("error", (err) => {
            console.error("❌ Redis Error:", err);
        });
    }

    async get<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);
        return data ? JSON.parse(data) : null;
    }

    async set(key: string, value: any, ttl: number = 3600): Promise<void> {
        await this.client.setex(key, ttl, JSON.stringify(value));
    }

    async del(key: string): Promise<void> {
        await this.client.del(key);
    }
}
