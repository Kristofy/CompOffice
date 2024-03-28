import { prisma } from '@/server/prisma';
import { z } from 'zod';
import { t } from '@/trpc/server/trpc';

function wait(ms: number) {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}

export const getRouter = t.router({
	units: t.procedure.query(async () => {
		await wait(1000);
		return prisma.unit.findMany();
	}),
	participants: t.procedure.query(async () => {
		return prisma.participant.findMany();
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
