import { ENV } from './env';
import { PrismaClient } from '@prisma/client';

const prismaGlobal = global as typeof global & {
  prisma?: PrismaClient;
};

// TODO(Kristofy): Look into redis caching (https://www.npmjs.com/package/prisma-redis-middleware)
export const prisma: PrismaClient =
  prismaGlobal.prisma ??
  new PrismaClient({
    log:
      ENV.PRODUCTION ? ['error'] : ['query', 'error', 'warn'] ,
  });
