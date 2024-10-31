import { prisma } from '@/server/prisma';
import { z } from 'zod';
import { t } from '@/trpc/server/trpc';
import { PrismaClient } from '@prisma/client';
import { ReadClaims, WriteClaims, auth } from '@/auth';
import {
	packEventValidator,
	packUnitEventValidator,
	packUnitValidator,
	packValidator,
	packVersionValidator,
	topicValidator,
	unitValidator,
	unitVersionValidator,
} from '@/forms/schemas/services';
import { customerValidator, participantValidator } from '@/forms/schemas/order';

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

	unit_version: t.procedure.input(unitVersionValidator.schema.api).mutation(async (ops) => {
		const session = await auth();

		if (!session) {
			throw new Error('Un authenticated');
		}

		if ((session.user.role & WriteClaims.General) === 0) {
			throw new Error('Permission denied');
		}

		const unitVersionEntry = ops.input;
		const result = await prisma.unit_version.create({
			data: unitVersionEntry,
		});

		return result;
	}),

	pack: t.procedure.input(packValidator.schema.api).mutation(async (ops) => {
		const session = await auth();

		if (!session) {
			throw new Error('Un authenticated');
		}

		if ((session.user.role & WriteClaims.General) === 0) {
			throw new Error('Permission denied');
		}

		const packEntry = ops.input;
		const result = await prisma.pack.create({
			data: packEntry,
		});

		return result;
	}),

	pack_version: t.procedure.input(packVersionValidator.schema.api).mutation(async (ops) => {
		const session = await auth();

		if (!session) {
			throw new Error('Un authenticated');
		}

		if ((session.user.role & WriteClaims.General) === 0) {
			throw new Error('Permission denied');
		}

		const packVersionEntry = ops.input;
		const result = await prisma.pack_version.create({
			data: packVersionEntry,
		});

		return result;
	}),

	pack_event: t.procedure.input(packEventValidator.schema.api).mutation(async (ops) => {
		const session = await auth();

		if (!session) {
			throw new Error('Un authenticated');
		}

		if ((session.user.role & WriteClaims.General) === 0) {
			throw new Error('Permission denied');
		}

		const packEventEntry = ops.input;
		const result = await prisma.pack_event.create({
			data: packEventEntry,
		});

		return result;
	}),

	pack_unit: t.procedure.input(packUnitValidator.schema.api).mutation(async (ops) => {
		const session = await auth();

		if (!session) {
			throw new Error('Un authenticated');
		}

		if ((session.user.role & WriteClaims.General) === 0) {
			throw new Error('Permission denied');
		}

		const packUnitEntry = ops.input;
		const result = await prisma.pack_unit.create({
			data: packUnitEntry,
		});

		return result;
	}),

	pack_unit_event: t.procedure.input(packUnitEventValidator.schema.api).mutation(async (ops) => {
		const session = await auth();

		if (!session) {
			throw new Error('Un authenticated');
		}

		if ((session.user.role & WriteClaims.General) === 0) {
			throw new Error('Permission denied');
		}

		const packUnitEventEntry = ops.input;
		const result = await prisma.pack_unit_event.create({
			data: packUnitEventEntry,
		});

		return result;
	}),

	topic: t.procedure.input(topicValidator.schema.api).mutation(async (ops) => {
		const session = await auth();

		if (!session) {
			throw new Error('Un authenticated');
		}

		if ((session.user.role & WriteClaims.General) === 0) {
			throw new Error('Permission denied');
		}

		const topicEntry = ops.input;
		const result = await prisma.topic.create({
			data: topicEntry,
		});

		return result;
	}),

	customer: t.procedure.input(customerValidator.schema.api).mutation(async (ops) => {
		const session = await auth();

		if (!session) {
			throw new Error('Un authenticated');
		}

		if ((session.user.role & WriteClaims.Order) === 0) {
			throw new Error('Permission denied');
		}

		const customerEntry = ops.input;
		const result = await prisma.customer.create({
			data: customerEntry,
		});

		return result;
	}),
	participant: t.procedure.input(participantValidator.schema.api).mutation(async (ops) => {
		const session = await auth();

		if (!session) {
			throw new Error('Un authenticated');
		}

		if ((session.user.role & WriteClaims.Order) === 0) {
			throw new Error('Permission denied');
		}

		const participantEntry = ops.input;
		const result = await prisma.participant.create({
			data: participantEntry,
		});

		return result;
	}),
};

export const createRouter = t.router(createRoutes);
