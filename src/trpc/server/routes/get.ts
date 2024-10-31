import { prisma } from '@/server/prisma';
import { z } from 'zod';
import { t } from '@/trpc/server/trpc';
import { PrismaClient } from '@prisma/client';
import { ReadClaims, auth } from '@/auth';

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

	unit_version: t.procedure.query(async () => {
		// Also get unit_name from unit
		const result = await prisma.unit_version.findMany({
			include: {
				unit_field: {
					select: {
						name: true,
					},
				},
			},
		});
		return result.map(({ unit_field, ...item }) => ({
			...item,
			unit_name: unit_field?.name,
		}));
	}),

	pack: t.procedure.query(async () => {
		// Also include the topic name as topic_name
		const result = await prisma.pack.findMany({
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

	pack_version: t.procedure.query(async () => {
		// Also include the pack name as pack_name
		const result = await prisma.pack_version.findMany({
			include: {
				pack_field: {
					select: {
						name: true,
					},
				},
			},
		});

		return result.map(({ pack_field, ...item }) => ({
			...item,
			pack_name: pack_field?.name,
		}));
	}),

	pack_event: t.procedure.query(async () => {
		// Also include the pack name and name as pack_version_name
		const result = await prisma.pack_event.findMany({
			include: {
				pack_version_field: {
					select: {
						pack_field: {
							select: {
								name: true,
							},
						},
						version: true,
					},
				},
			},
		});

		// return the pack_event with the added pack_version_name fielt that is pack_name:pack_version
		return result.map(({ pack_version_field, ...item }) => ({
			...item,
			pack_version_name: `${pack_version_field.pack_field?.name}:${pack_version_field.version}`,
		}));
	}),

	pack_unit: t.procedure.query(async () => {
		// Also include the pack name and name as pack_version_name
		// And do the same with the unit and unit_version

		const result = await prisma.pack_unit.findMany({
			include: {
				pack_version_field: {
					select: {
						pack_field: {
							select: {
								name: true,
							},
						},
						version: true,
					},
				},
				unit_version_field: {
					select: {
						unit_field: {
							select: {
								name: true,
							},
						},
						version: true,
					},
				},
			},
		});

		// return the pack_event with the added pack_version_name fielt that is pack_name:pack_version
		return result.map(({ pack_version_field, unit_version_field, ...item }) => ({
			...item,
			pack_version_name: `${pack_version_field.pack_field?.name}:${pack_version_field.version}`,
			unit_version_name: `${unit_version_field.unit_field?.name}:${unit_version_field.version}`,
		}));
	}),

	pack_unit_event: t.procedure.query(async () => {
		// Also include the pack name and name as pack_version_name
		// And do the same with the unit and unit_version
		// And do the same with the pack_event

		const result = await prisma.pack_unit_event.findMany({
			include: {
				pack_unit_field: {
					select: {
						pack_version_field: {
							select: {
								pack_field: {
									select: {
										name: true,
									},
								},
								version: true,
							},
						},
						unit_version_field: {
							select: {
								unit_field: {
									select: {
										name: true,
									},
								},
								version: true,
							},
						},
					},
				},
				pack_event_field: {
					select: {
						pack_version_field: {
							select: {
								pack_field: {
									select: {
										name: true,
									},
								},
								version: true,
							},
						},
					},
				},
			},
		});

		// return the pack_event with the added pack_version_name fielt that is pack_name:pack_version
		return result.map(({ pack_unit_field, pack_event_field, ...item }) => ({
			...item,
			pack_version_name: `${pack_unit_field.pack_version_field.pack_field?.name}:${pack_unit_field.pack_version_field.version}`,
			unit_version_name: `${pack_unit_field.unit_version_field.unit_field?.name}:${pack_unit_field.unit_version_field.version}`,
			pack_event_name: `${pack_event_field.pack_version_field.pack_field?.name}:${pack_event_field.pack_version_field.version}`,
		}));
	}),

	topic: t.procedure.query(async () => {
		const result = await prisma.topic.findMany();
		return result;
	}),

	customer: t.procedure.query(async () => {
		// with industry name
		const result = await prisma.customer.findMany({
			include: {
				industry_field: {
					select: {
						name: true,
					},
				},
			},
		});

		return result.map(({ industry_field, ...item }) => ({
			...item,
			industry_name: industry_field?.name,
		}));
	}),

	industry: t.procedure.query(async () => {
		const result = await prisma.industry.findMany();
		return result;
	}),

	participant: t.procedure.query(async () => {
		// with customer name
		const result = await prisma.participant.findMany({
			include: {
				customer_fields: {
					select: {
						name: true,
					},
				},
			},
		});

		return result.map(({ customer_fields, ...item }) => ({
			...item,
			customer_name: customer_fields?.name,
		}));
	}),
};

export const getRouter = t.router(getRoutes);
