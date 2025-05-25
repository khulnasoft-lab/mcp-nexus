import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from '@/types/agent';
import { LRUCache } from 'lru-cache';

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export const rateLimit = (options?: Options) => {
  const tokenCache = new LRUCache<string, number[]>({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (req: NextApiRequest, res: NextApiResponse, limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        
        tokenCount[0] += 1;
        
        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage > limit;
        
        res.setHeader('X-RateLimit-Limit', limit);
        res.setHeader('X-RateLimit-Remaining', isRateLimited ? 0 : limit - currentUsage);
        
        if (isRateLimited) {
          const error: ApiError = {
            status: 429,
            message: 'Rate limit exceeded',
            code: 'RATE_LIMIT_EXCEEDED',
            details: {
              limit,
              current: currentUsage,
              retryAfter: '60s',
            },
          };
          res.status(429).json({
            error,
            timestamp: new Date().toISOString(),
          });
          return reject(error);
        }
        
        return resolve();
      }),
  };
};

// Rate limiter instance with default settings
const limiter = rateLimit({
  uniqueTokenPerInterval: 100, // Max users per interval
  interval: 60000, // 1 minute
});

export default limiter;
