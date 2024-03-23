import { initTRPC } from '@trpc/server';
import { getRouter } from '@/server/routes/get';

export const t = initTRPC.create();

export const appRouter = t.router({
	get: getRouter,
});

export type AppRouter = typeof appRouter;
