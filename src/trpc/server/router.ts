import { getRouter } from '@/trpc/server/routes/get';
import { t } from './trpc';
import { z } from 'zod';
import { prisma } from '@/server/prisma';
import { postRouter } from './routes/post';
import { delRouter } from './routes/del';

export const appRouter = t.router({
	get: getRouter,
	post: postRouter,
	del: delRouter,
});

export type AppRouter = typeof appRouter;
