import { prisma } from '@/server/prisma';
import { z } from 'zod';
import { t } from '@/trpc/server/trpc';
import { PrismaClient } from '@prisma/client';
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
import {
	PrismaClientInitializationError,
	PrismaClientKnownRequestError,
	PrismaClientRustPanicError,
	PrismaClientUnknownRequestError,
	PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { customerValidator, participantValidator } from '@/forms/schemas/order';

type Models = keyof Omit<
	PrismaClient,
	'disconnect' | 'connect' | 'executeRaw' | 'queryRaw' | 'transaction' | 'on'
>;

type RouterObject = Partial<{
	[K in Models]: any;
}>;

const editRoutes: RouterObject = {
	unit: t.procedure.input(unitValidator.schema.api).mutation(async (ops) => {
		try {
			const unitEntry = ops.input;
			const id = unitEntry.id;
			const updated = await prisma.unit.update({
				where: { id: id },
				data: unitEntry,
			});
			return updated;
		} catch (error: any) {
			let errorMessage: string;
			if (error instanceof PrismaClientRustPanicError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientValidationError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientKnownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientUnknownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientInitializationError) {
				errorMessage = error.message;
			} else if (error.statusCode && error.statusCode >= 400 && error.statusCode <= 499) {
				errorMessage = error.message;
			} else {
				errorMessage = 'Sorry! something went to wrong on our end, Please try again later';
			}
			throw new Error(errorMessage);
		}
	}),

	unit_version: t.procedure.input(unitVersionValidator.schema.api).mutation(async (ops) => {
		try {
			const unitVersionEntry = ops.input;
			const id = unitVersionEntry.id;
			const updated = await prisma.unit_version.update({
				where: { id: id },
				data: unitVersionEntry,
			});
			return updated;
		} catch (error: any) {
			let errorMessage: string;
			if (error instanceof PrismaClientRustPanicError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientValidationError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientKnownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientUnknownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientInitializationError) {
				errorMessage = error.message;
			} else if (error.statusCode && error.statusCode >= 400 && error.statusCode <= 499) {
				errorMessage = error.message;
			} else {
				errorMessage = 'Sorry! something went to wrong on our end, Please try again later';
			}
			throw new Error(errorMessage);
		}
	}),

	pack: t.procedure.input(packValidator.schema.api).mutation(async (ops) => {
		try {
			const packEntry = ops.input;
			const id = packEntry.id;
			const updated = await prisma.pack.update({
				where: { id: id },
				data: packEntry,
			});
			return updated;
		} catch (error: any) {
			let errorMessage: string;
			if (error instanceof PrismaClientRustPanicError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientValidationError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientKnownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientUnknownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientInitializationError) {
				errorMessage = error.message;
			} else if (error.statusCode && error.statusCode >= 400 && error.statusCode <= 499) {
				errorMessage = error.message;
			} else {
				errorMessage = 'Sorry! something went to wrong on our end, Please try again later';
			}
			throw new Error(errorMessage);
		}
	}),

	pack_version: t.procedure.input(packVersionValidator.schema.api).mutation(async (ops) => {
		try {
			const packVersionEntry = ops.input;
			const id = packVersionEntry.id;
			const updated = await prisma.pack_version.update({
				where: { id: id },
				data: packVersionEntry,
			});
			return updated;
		} catch (error: any) {
			let errorMessage: string;
			if (error instanceof PrismaClientRustPanicError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientValidationError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientKnownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientUnknownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientInitializationError) {
				errorMessage = error.message;
			} else if (error.statusCode && error.statusCode >= 400 && error.statusCode <= 499) {
				errorMessage = error.message;
			} else {
				errorMessage = 'Sorry! something went to wrong on our end, Please try again later';
			}
			throw new Error(errorMessage);
		}
	}),

	pack_event: t.procedure.input(packEventValidator.schema.api).mutation(async (ops) => {
		try {
			const packEventEntry = ops.input;
			const id = packEventEntry.id;
			const updated = await prisma.pack_event.update({
				where: { id: id },
				data: packEventEntry,
			});
			return updated;
		} catch (error: any) {
			let errorMessage: string;
			if (error instanceof PrismaClientRustPanicError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientValidationError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientKnownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientUnknownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientInitializationError) {
				errorMessage = error.message;
			} else if (error.statusCode && error.statusCode >= 400 && error.statusCode <= 499) {
				errorMessage = error.message;
			} else {
				errorMessage = 'Sorry! something went to wrong on our end, Please try again later';
			}
			throw new Error(errorMessage);
		}
	}),

	pack_unit: t.procedure.input(packUnitValidator.schema.api).mutation(async (ops) => {
		try {
			const packUnitEntry = ops.input;
			const id = packUnitEntry.id;
			const updated = await prisma.pack_unit.update({
				where: { id: id },
				data: packUnitEntry,
			});
			return updated;
		} catch (error: any) {
			let errorMessage: string;
			if (error instanceof PrismaClientRustPanicError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientValidationError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientKnownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientUnknownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientInitializationError) {
				errorMessage = error.message;
			} else if (error.statusCode && error.statusCode >= 400 && error.statusCode <= 499) {
				errorMessage = error.message;
			} else {
				errorMessage = 'Sorry! something went to wrong on our end, Please try again later';
			}
			throw new Error(errorMessage);
		}
	}),

	pack_unit_event: t.procedure.input(packUnitEventValidator.schema.api).mutation(async (ops) => {
		try {
			const packUnitEventEntry = ops.input;
			const id = packUnitEventEntry.id;
			const updated = await prisma.pack_unit_event.update({
				where: { id: id },
				data: packUnitEventEntry,
			});
			return updated;
		} catch (error: any) {
			let errorMessage: string;
			if (error instanceof PrismaClientRustPanicError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientValidationError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientKnownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientUnknownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientInitializationError) {
				errorMessage = error.message;
			} else if (error.statusCode && error.statusCode >= 400 && error.statusCode <= 499) {
				errorMessage = error.message;
			} else {
				errorMessage = 'Sorry! something went to wrong on our end, Please try again later';
			}
			throw new Error(errorMessage);
		}
	}),

	topic: t.procedure.input(topicValidator.schema.api).mutation(async (ops) => {
		try {
			const topicEntry = ops.input;
			const id = topicEntry.id;
			const updated = await prisma.topic.update({
				where: { id: id },
				data: topicEntry,
			});
			return updated;
		} catch (error: any) {
			let errorMessage: string;
			if (error instanceof PrismaClientRustPanicError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientValidationError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientKnownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientUnknownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientInitializationError) {
				errorMessage = error.message;
			} else if (error.statusCode && error.statusCode >= 400 && error.statusCode <= 499) {
				errorMessage = error.message;
			} else {
				errorMessage = 'Sorry! something went to wrong on our end, Please try again later';
			}
			throw new Error(errorMessage);
		}
	}),

	customer: t.procedure.input(customerValidator.schema.api).mutation(async (ops) => {
		try {
			const customerEntry = ops.input;
			const id = customerEntry.id;
			const updated = await prisma.customer.update({
				where: { id: id },
				data: customerEntry,
			});
			return updated;
		} catch (error: any) {
			let errorMessage: string;
			if (error instanceof PrismaClientRustPanicError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientValidationError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientKnownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientUnknownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientInitializationError) {
				errorMessage = error.message;
			} else if (error.statusCode && error.statusCode >= 400 && error.statusCode <= 499) {
				errorMessage = error.message;
			} else {
				errorMessage = 'Sorry! something went to wrong on our end, Please try again later';
			}
			throw new Error(errorMessage);
		}
	}),

	participant: t.procedure.input(participantValidator.schema.api).mutation(async (ops) => {
		try {
			const participantEntry = ops.input;
			const id = participantEntry.id;
			const updated = await prisma.participant.update({
				where: { id: id },
				data: participantEntry,
			});
			return updated;
		} catch (error: any) {
			let errorMessage: string;
			if (error instanceof PrismaClientRustPanicError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientValidationError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientKnownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientUnknownRequestError) {
				errorMessage = error.message;
			} else if (error instanceof PrismaClientInitializationError) {
				errorMessage = error.message;
			} else if (error.statusCode && error.statusCode >= 400 && error.statusCode <= 499) {
				errorMessage = error.message;
			} else {
				errorMessage = 'Sorry! something went to wrong on our end, Please try again later';
			}
			throw new Error(errorMessage);
		}
	}),
};

export const editRouter = t.router(editRoutes);
