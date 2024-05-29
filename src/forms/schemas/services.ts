import { participant, unit } from '@prisma/client';
import { z } from 'zod';
import { DataHandler } from '@/forms/type-info';

export const unitValidator = new DataHandler<unit>({
	tableName: 'unit',
	server: {
		fields: {
			topic_name: {
				calc: ({ data }) => {
					return 'Pending...';
				},
				type: {
					kind: 'string',
				},
				displayName: 'Topic Name',
				hidden: false,
			},
		},
	},
	fields: {
		id: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number(),
			displayName: 'ID',
			type: {
				kind: 'number',
			},
		},
		code: {
			form: z.string().min(1).max(50),
			api: z.string().min(1).max(50),
			type: {
				kind: 'string',
			},
			filter: ({ target, data }) => data.code.toLowerCase().includes(target.toLowerCase()),
		},
		name: {
			form: z.string().min(1).max(500).nullable(),
			api: z.string().min(1).max(500).nullable(),
			displayName: 'Name',
			type: {
				kind: 'string',
			},
			filter: ({ target, data }) => {
				if (!target) return true;
				return !!data.name?.toLowerCase().includes(target.toLowerCase());
			},
		},
		status: {
			form: z.enum(['A', 'I']),
			api: z.enum(['A', 'I']),
			displayName: 'Status',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'A', label: 'Active' },
					{ value: 'I', label: 'Inactive' },
				],
			},
			filter: ({ target, data }) => data.status.toLowerCase().includes(target.toLowerCase()),
		},
		type: {
			form: z.string(),
			api: z.enum(['T', 'S', 'C']),
			displayName: 'Type',
			type: {
				kind: 'enum',
				possibleValues: [
					{ value: 'T', label: 'Training' },
					{ value: 'S', label: 'Support' },
					{ value: 'C', label: 'Consulting' },
				],
			},
			filter: ({ target, data }) => data.type.toLowerCase().includes(target.toLowerCase()),
		},
		topic: {
			form: z.string().min(1).pipe(z.coerce.number()),
			api: z.number().nullable(),
			displayName: 'Topic',
			type: {
				kind: 'connected',
				connected_table: 'topic',
				connected_label: 'name',
				connected_value: 'id',
			},
			hidden: true,
		},
		list_price_HUF: {
			form: z.string().nullable().pipe(z.coerce.number().nullable()),
			api: z.number().nullable(),
			displayName: 'List Price HUF',
			type: {
				kind: 'number',
			},
		},
		list_price_EUR: {
			form: z.string().nullable().pipe(z.coerce.number().nullable()),
			api: z.number().nullable(),
			displayName: 'List Price EUR',
			type: {
				kind: 'number',
			},
		},
		length: {
			form: z.string().pipe(z.coerce.number().min(0)).nullable(),
			api: z.number().nullable(),
			displayName: 'Length',
			type: {
				kind: 'number',
			},
		},
	},
	additional: {
		testing: {
			calc: ({ data }: { data: unit }) => {
				return (data.list_price_HUF ?? 0) % 2;
			},
			filter: ({ target, data }: { target: string; data: unit & Record<string, any> }) => {
				return parseInt(target) % 2 === data.testing;
			},
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
