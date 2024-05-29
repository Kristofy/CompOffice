import { prisma } from '@/server/prisma';
import { z } from 'zod';
import { t } from '@/trpc/server/trpc';
import { PrismaClient } from '@prisma/client';
import { ReadClaims, WriteClaims, auth } from '@/auth';
import { unitValidator } from '@/forms/schemas/services';

type Models = keyof Omit<
	PrismaClient,
	'disconnect' | 'connect' | 'executeRaw' | 'queryRaw' | 'transaction' | 'on'
>;

type RouterObject = Partial<{
	[K in Models]: any;
}>;

const createRoutes: RouterObject = {
	unit: t.procedure.input(unitValidator.schema.api).mutation(async (ops) => {
		const session = await auth();

		if (!session) {
			throw new Error('Un authenticated');
		}

		if ((session.user.role & WriteClaims.General) === 0) {
			throw new Error('Permission denied');
		}

		const unitEntry = ops.input;
		const result = await prisma.unit.create({
			data: unitEntry,
		});

		return result;
	}),
};

export const createRouter = t.router(createRoutes);
