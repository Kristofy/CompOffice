import { getRouter } from '@/trpc/server/routes/get';
import { t } from './trpc';
import { z } from 'zod';
import { prisma } from '@/server/prisma';

export const appRouter = t.router({
	get: getRouter,
	set: t.procedure.input(z.object({ id: z.number(), code: z.string() })).mutation(async (ops) => {
		const { id, code } = ops.input;
		const updated = await prisma.unit.update({
			where: { id },
			data: { code },
		});
		return updated;
	}),
});

export type AppRouter = typeof appRouter;
