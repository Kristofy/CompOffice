import { prisma } from '@/server/prisma';
import { z } from 'zod';
import { t } from '@/trpc/server/trpc';
import { PrismaClient } from '@prisma/client';
import {
	packEventValidator,
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

type Models = keyof Omit<
	PrismaClient,
	'disconnect' | 'connect' | 'executeRaw' | 'queryRaw' | 'transaction' | 'on'
>;

type RouterObject = Partial<{
	[K in Models]: any;
}>;

const delRoutes: RouterObject = {
	unit: t.procedure.input(unitValidator.schema.api).mutation(async (ops) => {
		try {
			const unitEntry = ops.input;
			const id = unitEntry.id;
			const deleted = await prisma.unit.delete({
				where: { id: id },
			});
			return deleted;
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
			const deleted = await prisma.unit_version.delete({
				where: { id: id },
			});
			return deleted;
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
			const deleted = await prisma.pack.delete({
				where: { id: id },
			});
			return deleted;
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
			const deleted = await prisma.pack_version.delete({
				where: { id: id },
			});
			return deleted;
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
			const deleted = await prisma.pack_event.delete({
				where: { id: id },
			});
			return deleted;
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
			const deleted = await prisma.pack_unit.delete({
				where: { id: id },
			});
			return deleted;
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

	pack_unit_event: t.procedure.input(packEventValidator.schema.api).mutation(async (ops) => {
		try {
			const packUnitEventEntry = ops.input;
			const id = packUnitEventEntry.id;
			const deleted = await prisma.pack_unit_event.delete({
				where: { id: id },
			});
			return deleted;
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
			const deleted = await prisma.topic.delete({
				where: { id: id },
			});
			return deleted;
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

export const delRouter = t.router(delRoutes);
