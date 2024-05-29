import { prisma } from '@/server/prisma';
import { z } from 'zod';
import { t } from '@/trpc/server/trpc';
import { PrismaClient } from '@prisma/client';
import { unitValidator } from '@/forms/schemas/services';
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
};

export const delRouter = t.router(delRoutes);
