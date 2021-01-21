import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import AppError from '@shared/errors/AppError';
import redis from 'redis';

//verifica quantas vezes um IP acessa a aplicacao
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
    password: undefined,
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'ratelimit',
    points: 5, // 5 requests
    duration: 1, // per 1 second by IP
});

export default async function rateLimiter(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
        await limiter.consume(request.ip);

        return next();
    } catch {
        throw new AppError('Too many requests', 429);
    }
}