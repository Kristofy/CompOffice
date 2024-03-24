import { prisma } from '@/server/prisma';
import { z } from 'zod';
import { t } from '@/trpc/server/trpc';

export const getRouter = t.router({
	units: t.procedure.query(async () => {
		return prisma.unit.findMany();
	}),
	unit: t.procedure
		.input(
			z.object({
				id: z.number(),
			})
		)
		.query(async (ops) => {
			const { id } = ops.input;
			console.log(ops);
			return prisma.unit.findUnique({
				where: {
					id: id,
				},
			});
		}),
});

export type GetRouter = typeof getRouter;
