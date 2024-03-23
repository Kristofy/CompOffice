import { unit } from '@prisma/client';
import { z } from 'zod';
import { Properties, createValidator } from '@/forms/type-info';

export const unitValidator = createValidator<unit>({
	id: {
		form: z.string().min(1).pipe(z.coerce.number()),
		api: z.number(),
		type: 'number',
	},
	code: {
		form: z.string().min(1).max(50),
		api: z.string().min(1).max(50),
		type: 'string',
	},
	name: {
		form: z.string().nullable(),
		api: z.string().min(1).max(500),
		type: 'string',
	},
	status: {
		form: z.enum(['A', 'I']),
		api: z.enum(['A', 'I']),
		type: 'string',
	},
	type: {
		form: z.string(),
		api: z.enum(['T', 'S', 'C']),
		type: 'string',
	},
	topic: {
		form: z.string().min(1).pipe(z.coerce.number()),
		api: z.number().nullable(),
		type: 'number',
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
});

// for each key in unit I have a field in the form

// unit_version

// pack

// pack_version

// pack_evnet

// pack_unit

// pack_unit_event

// topic
