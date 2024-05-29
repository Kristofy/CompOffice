import { prisma } from '@/server/prisma';
import { z } from 'zod';
import { t } from '@/trpc/server/trpc';
import { PrismaClient } from '@prisma/client';
import { ReadClaims, auth } from '@/auth';

function wait(ms: number) {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, ms);
	});
}

type Models = keyof Omit<
	PrismaClient,
	'disconnect' | 'connect' | 'executeRaw' | 'queryRaw' | 'transaction' | 'on'
>;

type RouterObject = Partial<{
	[K in Models]: any;
}>;

const getRoutes: RouterObject = {
	unit: t.procedure.query(async () => {
		const session = await auth();

		if (!session) {
			throw new Error('Un authenticated');
		}

		if ((session.user.role & ReadClaims.General) === 0) {
			throw new Error('Permission denied');
		}

		const result = await prisma.unit.findMany({
			include: {
				topic_field: {
					select: {
						name: true,
					},
				},
			},
		});
		return result.map(({ topic_field, ...item }) => ({
			...item,
			topic_name: topic_field?.name,
		}));
	}),
	participant: t.procedure.query(async () => {
		const result = await prisma.participant.findMany();
		return result.map((item) => ({
			...item,
			test_elek: 'Heyyy from the server',
		}));
	}),
	topic: t.procedure.query(async () => {
		const result = await prisma.topic.findMany();
		return result;
	}),
};

export const getRouter = t.router(getRoutes);
