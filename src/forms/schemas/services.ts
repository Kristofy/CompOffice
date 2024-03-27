import { participant, unit } from '@prisma/client';
import { z } from 'zod';
import { DataHandler } from '@/forms/type-info';
import { trpc } from '@/trpc/client/client';

export const unitValidator = new DataHandler<unit>({
	server: {
		useQuery: trpc.get.units.useQuery,
	},
	fields: {
		id: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			type: 'number',
			filter({ target, data }) {
				return data.id.toString().toLowerCase().includes(target.toLowerCase());
			},
		},
		code: {
			form: z.string().min(1).max(50),
			api: z.string().min(1).max(50),
			type: 'string',
			filter: ({ target, data }) => data.code.toLowerCase().includes(target.toLowerCase()),
		},
		name: {
			form: z.string().nullable(),
			api: z.string().min(1).max(500),
			type: 'string',
			filter: ({ target, data }) => !!data.name?.toLowerCase().includes(target.toLowerCase()),
		},
		status: {
			form: z.enum(['A', 'I']),
			api: z.enum(['A', 'I']),
			type: 'string',
			filter: ({ target, data }) => data.status.toLowerCase().includes(target.toLowerCase()),
		},
		type: {
			form: z.string(),
			api: z.enum(['T', 'S', 'C']),
			type: 'string',
			filter: ({ target, data }) => data.type.toLowerCase().includes(target.toLowerCase()),
		},
		topic: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number().nullable(),
			type: 'number',
			filter: ({ target, data }) =>
				!!data.topic?.toString().toLowerCase().includes(target.toLowerCase()),
		},
		list_price_HUF: {
			form: z.string().min(1).pipe(z.coerce.number().min(0)).nullable(),
			api: z.number().nullable(),
			type: 'number',
		},
		list_price_EUR: {
			form: z.string().min(1).pipe(z.coerce.number().min(0)).nullable(),
			api: z.number().nullable(),
			type: 'number',
		},
		length: {
			form: z.string().min(1).pipe(z.coerce.number().min(0)).nullable(),
			api: z.number().nullable(),
			type: 'number',
		},
	},
});

// for each key in unit I have a field in the form

// unit_version

// pack

// pack_version

// pack_evnet

// pack_unit

// pack_unit_event

// topic
