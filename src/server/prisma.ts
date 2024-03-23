import { ENV } from './env';
import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

// TODO(Kristofy): Look into redis caching (https://www.npmjs.com/package/prisma-redis-middleware)
export const prisma: PrismaClient = globalThis.prisma ||
  new PrismaClient({
    log:
      ENV.PRODUCTION ? ['error'] : ['query', 'error', 'warn'] ,
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;