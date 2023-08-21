import Redis from 'ioredis';

const redis = new Redis(process.env.CACHE_URL);

const CacheService = {
    ttl: process.env.CACHE_TTL,
    get: async (key, subKey) => {
        await CacheService.resetTtl(key, subKey);
        const formedkey = CacheService.getKey(key, subKey);

        const raw = await redis.get(formedkey);

        return await CacheService.deserializa(raw);
    },
    set: async (key, subKey, value) => {
        const formedKey = CacheService.getKey(key, subKey);

        await redis.set(formedKey, CacheService.serialize(value));
        await CacheService.resetTtl(key, subKey);
    },
    del: async (key, subKey) => {
        const formedKey = CacheService.getKey(key, subKey);
        await redis.del(formedKey);
    },
    put: async (key, subKey, value) => {
        await CacheService.resetTtl(key, subKey);

        const formedKey = CacheService.getKey(key, subKey);
        await redis.hset(formedKey, CacheService.serialize(value));
    },
    resetTtl: async (key, subKey) => {
        const formedKey = CacheService.getKey(key, subKey);
        await redis.expire(formedKey, CacheService.ttl);
    },
    getKey: (key, subKey) => {
        return `${key}/${subKey}`
    },
    deserializa: (input) => JSON.parse(input),
    serialize: (input) => JSON.stringify(input)
}



export default CacheService;